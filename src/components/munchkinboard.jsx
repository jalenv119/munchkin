import { useMemo, useState } from "react";
import {
  PHASES,
  finishCharity,
  getCombatBonus,
  getCombatStrength,
  kickOpenDoor,
  lookForTrouble,
  lootRoom,
  resolveCombat,
  initiateRunAway,
  useCard,
  confirmEquipReplace,
  cancelEquip,
  discardCard,
  giveToCharity,
  sellItems,
} from "../engine/gameEngine.js";

function cardColor(card) {
  if (!card) return "#777";
  if (card.type === "monster") return "#b13a2f";
  if (card.type === "curse") return "#8e44ad";
  if (card.type === "class") return "#2d7fb8";
  if (card.type === "race") return "#30985a";
  if (card.type === "item") return "#d4a017";
  if (card.type === "oneshot") return "#16a085";
  if (card.type === "levelup") return "#f39c12";
  return "#777";
}

function Card({ card, onClick, selected = false, hidden = false, dimmed = false, badge = null }) {
  const color = cardColor(card);
  return (
    <button
      onClick={() => onClick?.(card)}
      style={{
        width: 112,
        minHeight: 150,
        borderRadius: 10,
        border: `2px solid ${selected ? "#46c37b" : color}`,
        background: hidden ? "#151515" : dimmed ? "#111" : "#1a1612",
        color: dimmed ? "#666" : "#f5e6c8",
        padding: 8,
        textAlign: "left",
        cursor: onClick ? "pointer" : "default",
        boxShadow: selected ? "0 0 18px #46c37b88" : "none",
        position: "relative",
        opacity: dimmed ? 0.6 : 1,
      }}
    >
      {badge && (
        <div style={{
          position: "absolute", top: -8, right: -8,
          background: "#46c37b", color: "#000", borderRadius: "50%",
          width: 22, height: 22, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 11, fontWeight: "bold",
        }}>{badge}</div>
      )}
      {hidden ? (
        <div style={{ height: 130, display: "grid", placeItems: "center", color: "#555", fontSize: 32 }}>?</div>
      ) : (
        <>
          <div style={{ color, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{card.type}</div>
          <strong style={{ display: "block", fontSize: 15, lineHeight: 1.15 }}>{card.name}</strong>
          <div style={{ marginTop: 10, fontSize: 12, color: "#c8aa84", lineHeight: 1.35 }}>
            {card.type === "monster" && <>Level {card.level}<br />Treasures {card.treasures}</>}
            {card.type === "item" && (
              <>
                Bonus +{card.bonus || 0}
                <br />{card.slot}{card.hands ? `, ${card.hands} hand(s)` : ""}
                {card.value > 0 && <><br /><span style={{ color: "#f1c40f" }}>💰 {card.value}g</span></>}
              </>
            )}
            {card.type === "oneshot" && <>Combat bonus +{card.bonus || 0}</>}
            {card.effect && <><br />{card.effect}</>}
            {card.badStuff && <><br /><span style={{ color: "#e28a80" }}>Bad Stuff: {card.badStuff}</span></>}
          </div>
        </>
      )}
    </button>
  );
}

function PlayerBox({ player, active }) {
  return (
    <div style={{
      background: active ? "#1f170d" : "#12100e",
      border: `1px solid ${active ? "#d4a017" : "#3a2f25"}`,
      borderRadius: 12,
      padding: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <strong>{player.name}</strong>
        <span style={{ color: active ? "#d4a017" : "#8b7a64" }}>{active ? "current turn" : "waiting"}</span>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 10, fontSize: 13, color: "#c8aa84", flexWrap: "wrap" }}>
        <span>Level: <b style={{ color: "#fff" }}>{player.level}</b></span>
        <span>Bonus: <b style={{ color: "#f1c40f" }}>+{getCombatBonus(player)}</b></span>
        <span>Combat: <b style={{ color: "#e74c3c" }}>{getCombatStrength(player)}</b></span>
        <span>Hand: <b>{player.hand.length}</b></span>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: "#8b7a64" }}>
        Race: {player.race?.name || "Human"} | Class: {player.classCard?.name || "None"}
      </div>
    </div>
  );
}

function Equipment({ player }) {
  const equippedIds = [
    player.equipped.headgear?.instanceId,
    player.equipped.armor?.instanceId,
    player.equipped.footgear?.instanceId,
    player.equipped.hand1?.instanceId,
    player.equipped.hand2?.instanceId,
  ].filter(Boolean);

  const otherItems = player.inPlay.filter(
    (card) => card.type === "item" && !equippedIds.includes(card.instanceId)
  );

  const slots = [
    ["Headgear", player.equipped.headgear],
    ["Armor", player.equipped.armor],
    ["Footgear", player.equipped.footgear],
    ["Hand 1", player.equipped.hand1],
    ["Hand 2", player.equipped.hand2],
  ];

  const showItem = (item) =>
    item ? `${item.name} (+${item.bonus || 0})` : "— empty";

  return (
    <div style={panelStyle}>
      <h3 style={headingStyle}>Your Table / Equipped</h3>

      {slots.map(([label, item]) => (
        <div key={label} style={{
          display: "flex", justifyContent: "space-between",
          borderBottom: "1px solid #2b241c", padding: "6px 0", fontSize: 13,
        }}>
          <span style={{ color: "#8b7a64" }}>{label}</span>
          <span style={{ color: item ? "#f5e6c8" : "#444" }}>{showItem(item)}</span>
        </div>
      ))}

      <div style={{ borderBottom: "1px solid #2b241c", padding: "6px 0", fontSize: 13 }}>
        <div style={{ color: "#8b7a64", marginBottom: 4 }}>Other Items</div>
        {otherItems.length > 0 ? (
          otherItems.map((item) => (
            <div key={item.instanceId} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
              <span>{item.name}</span>
              <span style={{ color: "#f1c40f" }}>+{item.bonus || 0}</span>
            </div>
          ))
        ) : (
          <div style={{ color: "#444" }}>empty</div>
        )}
      </div>

      {player.inPlay
        .filter((c) => c.type === "class" || c.type === "race")
        .map((card) => (
          <div key={card.instanceId} style={{ marginTop: 8, color: "#c8aa84", fontSize: 13 }}>
            {card.type}: {card.name}
          </div>
        ))}
    </div>
  );
}

// ─── MODAL: Equip Replace ─────────────────────────────────────────────────────
function EquipReplaceModal({ pendingEquip, player, onReplace, onCancel }) {
  const { card, conflictSlots } = pendingEquip;
  const slotLabels = { headgear: "Headgear", armor: "Armor", footgear: "Footgear", hand1: "Hand 1", hand2: "Hand 2" };

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h3 style={{ color: "#d4a017", margin: "0 0 12px" }}>Replace Equipment?</h3>
        <p style={{ color: "#c8aa84", fontSize: 13, margin: "0 0 14px" }}>
          You want to equip <strong style={{ color: "#f5e6c8" }}>{card.name}</strong> (+{card.bonus || 0}).
          {(card.hands || 1) === 2 && " (2-handed — clears both hand slots)"}
          <br />Choose which item to replace (it will return to your hand):
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {conflictSlots.map(slot => {
            const current = player.equipped[slot];
            return (
              <button key={slot} style={{ ...buttonStyle, background: "#2a1a0a", textAlign: "left" }}
                onClick={() => onReplace(slot)}>
                <span style={{ color: "#8b7a64" }}>{slotLabels[slot]}: </span>
                <span style={{ color: "#f5e6c8" }}>{current ? `${current.name} (+${current.bonus || 0})` : "empty"}</span>
                <span style={{ color: "#46c37b", float: "right" }}>→ Replace</span>
              </button>
            );
          })}
        </div>
        <button onClick={onCancel} style={{ ...buttonStyle, marginTop: 12, borderColor: "#555", color: "#aaa", width: "100%" }}>
          Cancel — Keep Current Equipment
        </button>
      </div>
    </div>
  );
}

// ─── MODAL: Curse Target ─────────────────────────────────────────────────────
function CurseTargetModal({ curseCard, players, onTarget, onCancel }) {
  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h3 style={{ color: "#8e44ad", margin: "0 0 12px" }}>Choose Curse Target</h3>
        <p style={{ color: "#c8aa84", fontSize: 13, margin: "0 0 14px" }}>
          <strong style={{ color: "#f5e6c8" }}>{curseCard.name}</strong>
          <br />{curseCard.effect}
          <br /><br />Who do you want to curse?
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {players.map(player => (
            <button key={player.id} style={{ ...buttonStyle, background: "#1a0a2a", textAlign: "left" }}
              onClick={() => onTarget(player.id)}>
              <span style={{ color: "#f5e6c8" }}>{player.name}</span>
              <span style={{ color: "#8b7a64", fontSize: 12 }}> — Level {player.level}</span>
              <span style={{ color: "#8e44ad", float: "right" }}>Curse! →</span>
            </button>
          ))}
        </div>
        <button onClick={onCancel} style={{ ...buttonStyle, marginTop: 12, borderColor: "#555", color: "#aaa", width: "100%" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

const panelStyle = {
  background: "#12100e",
  border: "1px solid #3a2f25",
  borderRadius: 14,
  padding: 14,
};

const headingStyle = { margin: "0 0 10px", color: "#d4a017", fontSize: 15, letterSpacing: 1, textTransform: "uppercase" };

const buttonStyle = {
  background: "#1e1812",
  border: "1px solid #8B4513",
  color: "#f5e6c8",
  borderRadius: 10,
  padding: "10px 14px",
  cursor: "pointer",
  fontFamily: "Georgia, serif",
};

const modalOverlay = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 1000,
};

const modalBox = {
  background: "#1a1410", border: "2px solid #8B4513",
  borderRadius: 16, padding: 24, maxWidth: 420, width: "90%",
};

export default function MunchkinBoard({ gameSetup, onBackToMenu }) {
  const [game, setGame] = useState(gameSetup);
  const [selectedMonsterId, setSelectedMonsterId] = useState(null);
  const [pendingCurse, setPendingCurse] = useState(null); // curse card awaiting target selection
  const [sellMode, setSellMode] = useState(false);
  const [selectedSellIds, setSelectedSellIds] = useState([]);

  const activePlayer = game.players.find((p) => p.id === game.activePlayerId) || game.players[0];
  const me = game.players.find((p) => p.isMe) || game.players[0];
  const isMyTurn = activePlayer?.isMe;

  const handLimit = me.race?.name === "Gnome" ? 6 : 5;
  const overHandLimit = me.hand.length > handLimit;
  const inCombat = game.phase === PHASES.COMBAT || game.phase === "Run Away";

  // Gold calculation for sell mode
  const sellSelectedCards = selectedSellIds
    .map(id => me.hand.find(c => c.instanceId === id))
    .filter(Boolean);
  const sellTotalGold = sellSelectedCards.reduce((sum, c) => sum + (c.value || 0), 0);
  const sellLevelsGained = Math.floor(sellTotalGold / 1000);

  const combatNumbers = useMemo(() => {
    if (!game.combat) return null;
    const oneShotBonus = game.combat.oneShots.reduce((sum, c) => sum + (c.bonus || 0), 0);
    return {
      player: getCombatStrength(activePlayer) + oneShotBonus,
      monster: game.combat.monster.level,
      oneShotBonus,
    };
  }, [game, activePlayer]);

  const update = (next) => setGame(next);

  function botAutoTurn() {
    const nextIndex = game.turnOrder.findIndex((entry) => entry.playerId === game.activePlayerId);
    const nextEntry = game.turnOrder[(nextIndex + 1) % game.turnOrder.length] || game.turnOrder[0];
    setGame({
      ...game,
      activePlayerId: nextEntry.playerId,
      phase: PHASES.KICK_OPEN_DOOR,
      log: [`${activePlayer.name}'s bot turn was skipped.`, ...game.log],
    });
  }

  function handleCardClick(clicked) {
    // Curses always open the target selector (even for your own player)
    if (clicked.type === "curse") {
      // Check: if I'm the active combatant, block immediately
      const iAmActiveCombatant = inCombat && game.activePlayerId === me.id;
      if (iAmActiveCombatant) {
        update({ ...game, log: ["You can't play curses while you're in active combat!", ...game.log] });
        return;
      }
      setPendingCurse(clicked);
      return;
    }

    // Look For Trouble: select monster first
    if (game.phase === PHASES.LOOK_OR_LOOT && clicked.type === "monster") {
      setSelectedMonsterId(clicked.instanceId);
      return;
    }

    // Sell mode: toggle item selection
    if (sellMode && clicked.type === "item" && isMyTurn) {
      setSelectedSellIds(prev =>
        prev.includes(clicked.instanceId)
          ? prev.filter(id => id !== clicked.instanceId)
          : [...prev, clicked.instanceId]
      );
      return;
    }

    update(useCard(game, clicked.instanceId));
  }

  const canSell = isMyTurn && !inCombat;
  const itemsInHand = me.hand.filter(c => c.type === "item");

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at top, #241405 0%, #090706 65%)", color: "#f5e6c8", padding: 18, fontFamily: "Georgia, serif" }}>

      {/* ─── MODALS ─── */}
      {game.pendingEquip && (
        <EquipReplaceModal
          pendingEquip={game.pendingEquip}
          player={me}
          onReplace={slot => update(confirmEquipReplace(game, slot))}
          onCancel={() => update(cancelEquip(game))}
        />
      )}

      {pendingCurse && (
        <CurseTargetModal
          curseCard={pendingCurse}
          players={game.players}
          onTarget={targetId => {
            update(useCard(game, pendingCurse.instanceId, targetId));
            setPendingCurse(null);
          }}
          onCancel={() => setPendingCurse(null)}
        />
      )}

      {/* ─── HEADER ─── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <h1 style={{ margin: 0, color: "#d4a017", letterSpacing: 3 }}>MUNCHKIN</h1>
        <button onClick={onBackToMenu} style={buttonStyle}>Main Menu</button>
      </div>

      {/* ─── PHASE BAR ─── */}
      <div style={{ ...panelStyle, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#8b7a64", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Current Phase</div>
            {game.phase === PHASES.ROLL_FOR_ORDER && (
              <button style={buttonStyle} onClick={() => {
                const orderedPlayers = [...game.players]
                  .map(player => ({ ...player, roll: player.isMe ? 6 : Math.floor(Math.random() * 6) + 1 }))
                  .sort((a, b) => b.roll - a.roll);
                const turnOrder = orderedPlayers.map(p => ({ playerId: p.id, name: p.name, roll: p.roll }));
                update({
                  ...game, players: orderedPlayers, turnOrder,
                  activePlayerId: turnOrder[0].playerId, phase: PHASES.KICK_OPEN_DOOR,
                  setupRolls: Object.fromEntries(orderedPlayers.map(p => [p.id, p.roll])),
                  log: [`Turn order rolled. ${turnOrder[0].name} goes first.`, ...game.log],
                });
              }}>Roll For Turn Order</button>
            )}
            <div style={{ fontSize: 22, color: "#fff" }}>{game.phase}</div>
            <div style={{ color: "#c8aa84", fontSize: 13 }}>Active: <b>{activePlayer.name}</b></div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {game.phase === PHASES.KICK_OPEN_DOOR && isMyTurn && (
              <button style={buttonStyle} onClick={() => update(kickOpenDoor(game))}>Kick Open The Door</button>
            )}
            {game.phase === PHASES.COMBAT && isMyTurn && (
              <button style={buttonStyle} onClick={() => update(resolveCombat(game))}>Resolve Combat</button>
            )}
            {game.phase === PHASES.COMBAT && isMyTurn && (
              <button style={buttonStyle} onClick={() => update({ ...game, phase: "Run Away", log: ["You chose to run away!", ...game.log] })}>
                Run Away
              </button>
            )}
            {game.phase === "Run Away" && isMyTurn && (
              <button style={buttonStyle} onClick={() => update(initiateRunAway(game))}>Roll To Run Away!</button>
            )}
            {/* Loot Room / Look For Trouble: ONLY when phase is LOOK_OR_LOOT (never after combat) */}
            {game.phase === PHASES.LOOK_OR_LOOT && isMyTurn && !game.lastDoorWasMonster && (
              <>
                <button style={buttonStyle} onClick={() => update(lootRoom(game))}>Loot The Room</button>
                <button
                  style={{ ...buttonStyle, borderColor: selectedMonsterId ? "#46c37b" : "#8B4513" }}
                  onClick={() => {
                    if (!selectedMonsterId) {
                      update({ ...game, log: ["Select a monster card from your hand first.", ...game.log] });
                    } else {
                      update(lookForTrouble(game, selectedMonsterId));
                      setSelectedMonsterId(null);
                    }
                  }}
                >
                  Look For Trouble {selectedMonsterId ? "✓" : "(select monster)"}
                </button>
              </>
            )}
            {game.phase === PHASES.CHARITY && isMyTurn && (
              <button
                style={{ ...buttonStyle, borderColor: overHandLimit ? "#e74c3c" : "#8B4513", opacity: overHandLimit ? 0.6 : 1 }}
                onClick={() => update(finishCharity(game))}
                title={overHandLimit ? `Discard ${me.hand.length - handLimit} card(s) first!` : ""}
              >
                {overHandLimit ? `⚠ Discard First (${me.hand.length}/${handLimit})` : "Finish Charity / End Turn"}
              </button>
            )}
            {!isMyTurn && <button style={buttonStyle} onClick={botAutoTurn}>Skip Bot Turn</button>}
          </div>
        </div>
      </div>

      {/* ─── CHARITY / HAND LIMIT SECTION ─── */}
      {game.phase === PHASES.CHARITY && isMyTurn && overHandLimit && (
        <div style={{ ...panelStyle, marginBottom: 14, borderColor: "#e74c3c" }}>
          <h3 style={{ ...headingStyle, color: "#e74c3c" }}>
            ⚠ Hand Limit Exceeded — {me.hand.length}/{handLimit} cards
          </h3>
          <p style={{ color: "#c8aa84", fontSize: 13, margin: "0 0 12px" }}>
            Discard {me.hand.length - handLimit} card(s) or give them to the lowest-level player.
            {game.players.filter(p => p.id !== me.id && !p.eliminated).length === 0 && " (No other players — must discard.)"}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {me.hand.map(card => (
              <div key={card.instanceId} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                <Card card={card} />
                <div style={{ display: "flex", gap: 4 }}>
                  <button style={{ ...buttonStyle, padding: "5px 8px", fontSize: 11, borderColor: "#e74c3c" }}
                    onClick={() => update(discardCard(game, card.instanceId))}>
                    Discard
                  </button>
                  {game.players.filter(p => p.id !== me.id && !p.eliminated).length > 0 && (
                    <button style={{ ...buttonStyle, padding: "5px 8px", fontSize: 11, borderColor: "#16a085" }}
                      onClick={() => update(giveToCharity(game, card.instanceId))}>
                      Give Away
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── SELL ITEMS SECTION ─── */}
      {canSell && itemsInHand.length > 0 && (
        <div style={{ ...panelStyle, marginBottom: 14, borderColor: sellMode ? "#f1c40f" : "#3a2f25" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: sellMode ? 12 : 0 }}>
            <h3 style={{ ...headingStyle, margin: 0, color: "#f1c40f" }}>💰 Sell Items for Levels</h3>
            <div style={{ display: "flex", gap: 8 }}>
              {!sellMode ? (
                <button style={{ ...buttonStyle, borderColor: "#f1c40f" }} onClick={() => setSellMode(true)}>
                  Sell Items
                </button>
              ) : (
                <>
                  <button
                    style={{ ...buttonStyle, borderColor: sellLevelsGained > 0 ? "#f1c40f" : "#555", opacity: sellLevelsGained > 0 ? 1 : 0.5 }}
                    disabled={sellLevelsGained < 1}
                    onClick={() => {
                      update(sellItems(game, selectedSellIds));
                      setSellMode(false);
                      setSelectedSellIds([]);
                    }}
                  >
                    {sellLevelsGained > 0
                      ? `Sell for +${sellLevelsGained} Level${sellLevelsGained > 1 ? "s" : ""} (${sellTotalGold}g)`
                      : `Need 1,000g (have ${sellTotalGold}g)`}
                  </button>
                  <button style={{ ...buttonStyle, borderColor: "#555", color: "#aaa" }}
                    onClick={() => { setSellMode(false); setSelectedSellIds([]); }}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          {sellMode && (
            <div>
              <p style={{ color: "#8b7a64", fontSize: 12, margin: "0 0 10px" }}>
                Select item cards to sell. 1,000 gold = 1 level (max level 9 by selling).
                {selectedSellIds.length > 0 && ` Selected: ${sellTotalGold}g = ${sellLevelsGained} level${sellLevelsGained !== 1 ? "s" : ""}`}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {itemsInHand.map(card => (
                  <Card
                    key={card.instanceId}
                    card={card}
                    selected={selectedSellIds.includes(card.instanceId)}
                    badge={selectedSellIds.includes(card.instanceId) ? "✓" : null}
                    onClick={clicked => {
                      setSelectedSellIds(prev =>
                        prev.includes(clicked.instanceId)
                          ? prev.filter(id => id !== clicked.instanceId)
                          : [...prev, clicked.instanceId]
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── MAIN GRID ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "310px 1fr 300px", gap: 14 }}>

        {/* LEFT: Players + Turn Order */}
        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <div style={panelStyle}>
            <h3 style={headingStyle}>Players</h3>
            <div style={{ display: "grid", gap: 8 }}>
              {game.players.map(player => (
                <PlayerBox key={player.id} player={player} active={player.id === game.activePlayerId} />
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <h3 style={headingStyle}>Turn Order</h3>
            {game.turnOrder.map((entry, index) => (
              <div key={entry.playerId} style={{ color: entry.playerId === game.activePlayerId ? "#d4a017" : "#c8aa84", margin: "6px 0" }}>
                {index + 1}. {entry.name}{entry.roll ? ` rolled ${entry.roll}` : ""}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Combat + Hand + Table */}
        <main style={{ display: "grid", gap: 12, alignContent: "start" }}>
          {game.combat && (
            <div style={{ ...panelStyle, borderColor: "#b13a2f" }}>
              <h3 style={headingStyle}>Combat</h3>
              <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <Card card={game.combat.monster} />
                <div style={{ fontSize: 18 }}>
                  <div>Your strength: <b style={{ color: combatNumbers.player > combatNumbers.monster ? "#46c37b" : "#e74c3c" }}>{combatNumbers.player}</b></div>
                  <div>Monster strength: <b>{combatNumbers.monster}</b></div>
                  <div style={{ color: "#8b7a64", fontSize: 13, marginTop: 8 }}>Must strictly exceed monster strength. Ties go to the monster.</div>
                  {game.combat.oneShots.length > 0 && (
                    <div style={{ color: "#16a085", fontSize: 13, marginTop: 8 }}>
                      One-shots used: {game.combat.oneShots.map(c => c.name).join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Hand */}
          <div style={panelStyle}>
            <h3 style={headingStyle}>Your Hand ({me.hand.length}/{handLimit}{me.hand.length > handLimit ? " ⚠ OVER LIMIT" : ""})</h3>
            <div style={{ color: "#8b7a64", fontSize: 12, marginBottom: 10 }}>
              {sellMode
                ? "Click items to select them for selling. Click Sell when ready."
                : inCombat
                  ? "During combat: click one-shot cards to boost your strength. Curses can be played on any player anytime (except while you're fighting)."
                  : "Click class/race/items to play. Click a curse to target any player. Select a monster then click Look For Trouble."}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {me.hand.map(card => {
                const isSellSelected = selectedSellIds.includes(card.instanceId);
                const isMonsterSelected = selectedMonsterId === card.instanceId;
                return (
                  <Card
                    key={card.instanceId}
                    card={card}
                    selected={isSellSelected || isMonsterSelected}
                    dimmed={sellMode && card.type !== "item"}
                    onClick={handleCardClick}
                  />
                );
              })}
              {me.hand.length === 0 && <div style={{ color: "#8b7a64" }}>Your hand is empty.</div>}
            </div>
          </div>

          {/* Table */}
          <div style={panelStyle}>
            <h3 style={headingStyle}>Face-up Table</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {game.tableCards.map(card => <Card key={card.instanceId} card={card} />)}
              {game.tableCards.length === 0 && <div style={{ color: "#8b7a64" }}>Nothing face-up.</div>}
            </div>
          </div>
        </main>

        {/* RIGHT: Equipment + Decks + Log */}
        <aside style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <Equipment player={me} />

          <div style={panelStyle}>
            <h3 style={headingStyle}>Decks</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13 }}>
              <div>Door deck<br /><b>{game.doorDeck.length}</b></div>
              <div>Treasure deck<br /><b>{game.treasureDeck.length}</b></div>
              <div>Door discard<br /><b>{game.doorDiscard.length}</b></div>
              <div>Treasure discard<br /><b>{game.treasureDiscard.length}</b></div>
            </div>
          </div>

          <div style={panelStyle}>
            <h3 style={headingStyle}>Game Log</h3>
            <div style={{ maxHeight: 360, overflow: "auto", display: "grid", gap: 8 }}>
              {game.log.map((line, index) => (
                <div key={`${line}-${index}`} style={{ fontSize: 13, color: index === 0 ? "#fff" : "#a99577", borderBottom: "1px solid #231d17", paddingBottom: 6 }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
