import { useState, useEffect } from "react";
 
// ─── MOCK DATA ────────────────────────────────────────────────────────────────
 
const MOCK_PLAYERS = [
  {
    id: "p1", name: "You", isMe: true, level: 5, sex: "male",
    race: { id: "D057", name: "Dwarf", type: "race" },
    classCard: { id: "D055", name: "Warrior", type: "class" },
    equipped: {
      headgear: { id: "T001", name: "Horned Helmet", bonus: 3, slot: "headgear", value: 400, big: false },
      armor: { id: "T006", name: "Mithril Armor", bonus: 4, slot: "armor", value: 600, big: true },
      footgear: { id: "T010", name: "Boots of Butt-Kicking", bonus: 2, slot: "footgear", value: 400, big: false },
      hand1: { id: "T015", name: "Short Sword", bonus: 2, slot: "hand", hands: 1, value: 300, big: false },
      hand2: { id: "T035", name: "Shield of Ubiquity", bonus: 2, slot: "hand", hands: 1, value: 300, big: false },
      other: [
        { id: "T029", name: "Rat on a Stick", bonus: 1, slot: "other", value: 100, big: false },
      ],
    },
    hand: [
      { id: "D018", deck: "door", type: "monster", name: "Leprechaun", level: 3, treasures: 2, badStuff: "It steals your gold. Lose 2 Treasure cards at random from your hand.", flavorText: "He's after your Lucky Charms. And your Treasure cards." },
      { id: "T047", deck: "treasure", type: "oneshot", name: "Potion of General Studliness", playTiming: "combat", effect: "Add +2 to your combat strength for one combat.", value: 200, flavorText: "You feel... studly." },
      { id: "D054", deck: "door", type: "class", name: "Thief", abilities: ["Once per combat (not your own), you may steal an item from another player.", "Backstab: add +2 against a monster."], flavorText: "Everything not nailed down is yours. Eventually." },
      { id: "T049", deck: "treasure", type: "oneshot", name: "Wishing Ring", playTiming: "anytime", effect: "Cancel any one Curse that just affected you.", value: 500, flavorText: "You get one wish. Use it wisely." },
      { id: "D070", deck: "door", type: "monsterEnhancer", name: "Ancient", modifier: "+10 to monster level", levelDelta: 10, treasureDelta: 1, flavorText: "Old. Angry. Powerful." },
    ],
  },
  {
    id: "p2", name: "Zara", isMe: false, level: 7, sex: "female",
    race: { id: "D058", name: "Elf", type: "race" },
    classCard: { id: "D056", name: "Wizard", type: "class" },
    equipped: {
      headgear: { id: "T003", name: "Pointy Hat of Power", bonus: 3, slot: "headgear", value: 400 },
      armor: null,
      footgear: { id: "T011", name: "Boots of Running Really Fast", bonus: 0, slot: "footgear", value: 400 },
      hand1: { id: "T023", name: "Staff of Napalm", bonus: 5, slot: "hand", hands: 2, value: 800, big: true },
      hand2: null,
      other: [],
    },
    hand: [{ id: "hidden1" }, { id: "hidden2" }, { id: "hidden3" }],
  },
  {
    id: "p3", name: "Brutus", isMe: false, level: 3, sex: "male",
    race: { id: "D060", name: "Human", type: "race" },
    classCard: null,
    equipped: {
      headgear: null,
      armor: { id: "T008", name: "Plate Armor", bonus: 3, slot: "armor", value: 400, big: true },
      footgear: null,
      hand1: { id: "T021", name: "Broad Sword", bonus: 3, slot: "hand", hands: 2, value: 400, big: true },
      hand2: null,
      other: [],
    },
    hand: [{ id: "hidden4" }, { id: "hidden5" }],
  },
  {
    id: "p4", name: "Pippin", isMe: false, level: 4, sex: "male",
    race: { id: "D059", name: "Halfling", type: "race" },
    classCard: { id: "D054", name: "Thief", type: "class" },
    equipped: {
      headgear: null,
      armor: null,
      footgear: { id: "T013", name: "Sneakers of Sneakiness", bonus: 2, slot: "footgear", value: 300 },
      hand1: { id: "T014", name: "Dagger of Treachery", bonus: 3, slot: "hand", hands: 1, value: 400 },
      hand2: null,
      other: [{ id: "T028", name: "Cloak of Obscurity", bonus: 0, slot: "other", value: 300 }],
    },
    hand: [{ id: "hidden6" }, { id: "hidden7" }, { id: "hidden8" }, { id: "hidden9" }],
  },
];
 
const TABLE_CARDS = [
  { id: "D010", deck: "door", type: "monster", name: "Gazebo", level: 8, treasures: 2, badStuff: "It is made of wood. You are not. Lose 2 levels.", flavorText: "I was once at a convention where I encountered a gazebo...", placedBy: "p2", faceUp: true },
  { id: "T052", deck: "treasure", type: "oneshot", name: "Loaded Die", playTiming: "anytime", effect: "Reroll any one die roll and take the better result.", value: 300, flavorText: "Luck? Or skill? Yes.", placedBy: "p1", faceUp: true },
  { id: "D038", deck: "door", type: "curse", name: "Curse! Change Sex", effect: "Change your sex. If your class or race has different rules for different sexes, you are now subject to the rules for your new sex.", target: "self", flavorText: "Surprise!", placedBy: "p3", faceUp: true },
];
 
// ─── HELPERS ──────────────────────────────────────────────────────────────────
 
function getCardColor(card) {
  if (!card) return "#555";
  if (card.deck === "door") {
    if (card.type === "monster") return "#c0392b";
    if (card.type === "curse") return "#8e44ad";
    if (card.type === "class") return "#2980b9";
    if (card.type === "race") return "#27ae60";
    if (card.type === "monsterEnhancer") return "#e67e22";
    return "#7f8c8d";
  }
  if (card.deck === "treasure") {
    if (card.type === "item") return "#d4a017";
    if (card.type === "oneshot") return "#16a085";
    if (card.type === "levelup") return "#f39c12";
    return "#7f8c8d";
  }
  return "#555";
}
 
function getCardLabel(card) {
  if (!card) return "";
  if (card.type === "monster") return "MONSTER";
  if (card.type === "curse") return "CURSE";
  if (card.type === "class") return "CLASS";
  if (card.type === "race") return "RACE";
  if (card.type === "monsterEnhancer") return "ENHANCER";
  if (card.type === "oneshot") return "ONE-SHOT";
  if (card.type === "item") return card.slot ? card.slot.toUpperCase() : "ITEM";
  if (card.type === "levelup") return "LEVEL UP";
  return card.type?.toUpperCase() || "";
}
 
function calcBonus(player) {
  const eq = player.equipped;
  let total = 0;
  const slots = [eq.headgear, eq.armor, eq.footgear, eq.hand1, eq.hand2, ...(eq.other || [])];
  slots.forEach(item => { if (item?.bonus) total += item.bonus; });
  return total;
}
 
function calcCombatStrength(player) {
  return player.level + calcBonus(player);
}
 
// ─── CARD MODAL ───────────────────────────────────────────────────────────────
 
function CardModal({ card, onClose }) {
  if (!card) return null;
  const color = getCardColor(card);
  const label = getCardLabel(card);
 
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 320, background: "#1a1612", borderRadius: 16,
          border: `2px solid ${color}`, overflow: "hidden",
          boxShadow: `0 0 40px ${color}44`,
          fontFamily: "'Georgia', serif",
        }}
      >
        {/* Header band */}
        <div style={{ background: color, padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: 2, color: "#fff", opacity: 0.9 }}>{label}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0, opacity: 0.8 }}>×</button>
        </div>
 
        {/* Card body */}
        <div style={{ padding: "1.25rem 1.25rem 1rem" }}>
          {/* Name */}
          <h2 style={{ margin: "0 0 12px", fontSize: 20, color: "#f5e6c8", fontFamily: "'Georgia', serif", lineHeight: 1.2 }}>{card.name}</h2>
 
          {/* Monster stats */}
          {card.type === "monster" && (
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ background: "#2a1f1a", borderRadius: 8, padding: "6px 12px", textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: 10, color: "#a08060", letterSpacing: 1, textTransform: "uppercase" }}>Level</div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#e74c3c" }}>{card.level}</div>
              </div>
              <div style={{ background: "#2a1f1a", borderRadius: 8, padding: "6px 12px", textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: 10, color: "#a08060", letterSpacing: 1, textTransform: "uppercase" }}>Treasures</div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#f39c12" }}>{card.treasures}</div>
              </div>
            </div>
          )}
 
          {/* Item stats */}
          {card.type === "item" && (
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              {card.bonus > 0 && (
                <div style={{ background: "#2a1f1a", borderRadius: 8, padding: "6px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#a08060", letterSpacing: 1, textTransform: "uppercase" }}>Bonus</div>
                  <div style={{ fontSize: 24, fontWeight: "bold", color: "#f1c40f" }}>+{card.bonus}</div>
                </div>
              )}
              {card.value > 0 && (
                <div style={{ background: "#2a1f1a", borderRadius: 8, padding: "6px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#a08060", letterSpacing: 1, textTransform: "uppercase" }}>Value</div>
                  <div style={{ fontSize: 24, fontWeight: "bold", color: "#27ae60" }}>{card.value} GP</div>
                </div>
              )}
              {card.hands && (
                <div style={{ background: "#2a1f1a", borderRadius: 8, padding: "6px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#a08060", letterSpacing: 1, textTransform: "uppercase" }}>Hands</div>
                  <div style={{ fontSize: 24, fontWeight: "bold", color: "#3498db" }}>{card.hands}</div>
                </div>
              )}
            </div>
          )}
 
          {/* Main text */}
          <div style={{ borderTop: "1px solid #3a2f25", paddingTop: 12, marginBottom: 12 }}>
            {card.badStuff && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#e74c3c", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Bad Stuff</div>
                <p style={{ margin: 0, fontSize: 13, color: "#d9b99b", lineHeight: 1.5 }}>{card.badStuff}</p>
              </div>
            )}
            {card.effect && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#3498db", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Effect</div>
                <p style={{ margin: 0, fontSize: 13, color: "#d9b99b", lineHeight: 1.5 }}>{card.effect}</p>
              </div>
            )}
            {card.abilities && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#27ae60", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Abilities</div>
                {card.abilities.map((a, i) => (
                  <p key={i} style={{ margin: "0 0 6px", fontSize: 13, color: "#d9b99b", lineHeight: 1.5 }}>• {a}</p>
                ))}
              </div>
            )}
            {card.modifier && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#e67e22", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Effect</div>
                <p style={{ margin: 0, fontSize: 13, color: "#d9b99b", lineHeight: 1.5 }}>{card.modifier}</p>
              </div>
            )}
            {card.specialEffect && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#9b59b6", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Special</div>
                <p style={{ margin: 0, fontSize: 13, color: "#d9b99b", lineHeight: 1.5 }}>{card.specialEffect}</p>
              </div>
            )}
            {card.restrictions?.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#e74c3c", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Restrictions</div>
                <p style={{ margin: 0, fontSize: 13, color: "#d9b99b" }}>{card.restrictions.join(", ")}</p>
              </div>
            )}
            {card.specialRules?.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#e67e22", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Special Rules</div>
                <p style={{ margin: 0, fontSize: 13, color: "#d9b99b" }}>{card.specialRules.join(", ")}</p>
              </div>
            )}
            {card.playTiming && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#16a085", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Play Timing</div>
                <p style={{ margin: 0, fontSize: 13, color: "#d9b99b" }}>{card.playTiming}</p>
              </div>
            )}
          </div>
 
          {/* Flavor */}
          {card.flavorText && (
            <p style={{ margin: 0, fontSize: 12, color: "#7a6a55", fontStyle: "italic", borderTop: "1px solid #3a2f25", paddingTop: 10 }}>
              "{card.flavorText}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
 
// ─── CARD THUMBNAIL ───────────────────────────────────────────────────────────
 
function CardThumb({ card, size = "normal", onClick, faceDown = false }) {
  const color = faceDown ? "#2a2a2a" : getCardColor(card);
  const label = faceDown ? "?" : getCardLabel(card);
  const w = size === "small" ? 52 : size === "large" ? 80 : 64;
  const h = Math.round(w * 1.4);
 
  return (
    <div
      onClick={() => !faceDown && onClick && onClick(card)}
      title={faceDown ? "Hidden" : card?.name}
      style={{
        width: w, height: h, borderRadius: 6,
        background: faceDown
          ? "repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 4px, #222 4px, #222 8px)"
          : "#1a1612",
        border: `2px solid ${color}`,
        cursor: faceDown ? "default" : "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between",
        padding: "4px 3px",
        transition: "transform 0.15s, box-shadow 0.15s",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        if (!faceDown) {
          e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
          e.currentTarget.style.boxShadow = `0 8px 20px ${color}55`;
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {!faceDown && (
        <>
          <div style={{
            fontSize: 8, color, letterSpacing: 0.5, textTransform: "uppercase",
            fontFamily: "monospace", textAlign: "center", lineHeight: 1.1
          }}>{label}</div>
          <div style={{
            fontSize: size === "small" ? 9 : 10, color: "#f5e6c8",
            textAlign: "center", lineHeight: 1.2, padding: "0 2px",
            fontFamily: "'Georgia', serif", flex: 1, display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>{card?.name}</div>
          {card?.level && (
            <div style={{ fontSize: 14, fontWeight: "bold", color: "#e74c3c" }}>{card.level}</div>
          )}
          {card?.bonus > 0 && (
            <div style={{ fontSize: 12, fontWeight: "bold", color: "#f1c40f" }}>+{card.bonus}</div>
          )}
          {card?.value > 0 && !card?.bonus && !card?.level && (
            <div style={{ fontSize: 9, color: "#27ae60" }}>{card.value}gp</div>
          )}
        </>
      )}
      {faceDown && (
        <div style={{ color: "#555", fontSize: 24, margin: "auto" }}>?</div>
      )}
    </div>
  );
}
 
// ─── STAT TRACKER ─────────────────────────────────────────────────────────────
 
function StatTracker({ player, onCardClick }) {
  const eq = player.equipped;
  const bonus = calcBonus(player);
  const strength = calcCombatStrength(player);
 
  const SlotRow = ({ label, item, color }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderBottom: "1px solid #2a2520" }}>
      <div style={{ fontSize: 10, color: "#7a6a55", textTransform: "uppercase", letterSpacing: 1, width: 68, flexShrink: 0 }}>{label}</div>
      {item ? (
        <div
          onClick={() => onCardClick(item)}
          style={{
            flex: 1, background: "#2a1f1a", borderRadius: 4, padding: "3px 8px",
            cursor: "pointer", display: "flex", justifyContent: "space-between",
            alignItems: "center", border: `1px solid ${color}44`,
            transition: "border-color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = color}
          onMouseLeave={e => e.currentTarget.style.borderColor = `${color}44`}
        >
          <span style={{ fontSize: 11, color: "#d9b99b" }}>{item.name}</span>
          {item.bonus > 0 && <span style={{ fontSize: 11, fontWeight: "bold", color: "#f1c40f" }}>+{item.bonus}</span>}
        </div>
      ) : (
        <div style={{ flex: 1, background: "#15110e", borderRadius: 4, padding: "3px 8px", border: "1px dashed #3a2f25" }}>
          <span style={{ fontSize: 11, color: "#3a2f25" }}>empty</span>
        </div>
      )}
    </div>
  );
 
  return (
    <div style={{
      background: "#12100e", border: "1px solid #3a2f25", borderRadius: 12,
      padding: "1rem", fontFamily: "'Georgia', serif",
    }}>
      {/* Top stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{
          flex: 1, background: "#1e1812", borderRadius: 8, padding: "10px",
          textAlign: "center", border: "1px solid #8B4513"
        }}>
          <div style={{ fontSize: 10, color: "#a08060", letterSpacing: 2, textTransform: "uppercase" }}>Level</div>
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#f5e6c8", lineHeight: 1 }}>{player.level}</div>
        </div>
        <div style={{
          flex: 1, background: "#1e1812", borderRadius: 8, padding: "10px",
          textAlign: "center", border: "1px solid #d4a017"
        }}>
          <div style={{ fontSize: 10, color: "#a08060", letterSpacing: 2, textTransform: "uppercase" }}>Bonus</div>
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#f1c40f", lineHeight: 1 }}>+{bonus}</div>
        </div>
        <div style={{
          flex: 1, background: "#1e1812", borderRadius: 8, padding: "10px",
          textAlign: "center", border: "1px solid #e74c3c"
        }}>
          <div style={{ fontSize: 10, color: "#a08060", letterSpacing: 2, textTransform: "uppercase" }}>Combat</div>
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#e74c3c", lineHeight: 1 }}>{strength}</div>
        </div>
      </div>
 
      {/* Race & Class */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {player.race && (
          <div
            onClick={() => onCardClick(player.race)}
            style={{
              flex: 1, background: "#1a2a1a", border: "1px solid #27ae6066",
              borderRadius: 6, padding: "4px 8px", cursor: "pointer", textAlign: "center",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#27ae60"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#27ae6066"}
          >
            <div style={{ fontSize: 9, color: "#27ae60", letterSpacing: 1, textTransform: "uppercase" }}>Race</div>
            <div style={{ fontSize: 12, color: "#d9b99b" }}>{player.race.name}</div>
          </div>
        )}
        {player.classCard && (
          <div
            onClick={() => onCardClick(player.classCard)}
            style={{
              flex: 1, background: "#1a1f2a", border: "1px solid #2980b966",
              borderRadius: 6, padding: "4px 8px", cursor: "pointer", textAlign: "center",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#2980b9"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#2980b966"}
          >
            <div style={{ fontSize: 9, color: "#2980b9", letterSpacing: 1, textTransform: "uppercase" }}>Class</div>
            <div style={{ fontSize: 12, color: "#d9b99b" }}>{player.classCard.name}</div>
          </div>
        )}
        {!player.race && !player.classCard && (
          <div style={{ flex: 1, color: "#3a2f25", fontSize: 12, textAlign: "center", padding: 4 }}>No race or class</div>
        )}
      </div>
 
      {/* Equipment slots */}
      <div style={{ marginTop: 8 }}>
        <SlotRow label="Head" item={eq.headgear} color="#9b59b6" />
        <SlotRow label="Armor" item={eq.armor} color="#3498db" />
        <SlotRow label="Feet" item={eq.footgear} color="#27ae60" />
        <SlotRow label="Hand 1" item={eq.hand1} color="#e74c3c" />
        <SlotRow label="Hand 2" item={eq.hand2} color="#e74c3c" />
        {(eq.other || []).map((item, i) => (
          <SlotRow key={i} label={i === 0 ? "Other" : ""} item={item} color="#f39c12" />
        ))}
        {(!eq.other || eq.other.length === 0) && (
          <SlotRow label="Other" item={null} color="#f39c12" />
        )}
      </div>
 
      {/* Sex */}
      <div style={{ marginTop: 8, fontSize: 11, color: "#7a6a55", textAlign: "right" }}>
        {player.sex === "male" ? "♂ Male" : "♀ Female"}
      </div>
    </div>
  );
}
 
// ─── PLAYER PANEL (other players) ────────────────────────────────────────────
 
function PlayerPanel({ player, onCardClick }) {
  const bonus = calcBonus(player);
  const strength = calcCombatStrength(player);
 
  return (
    <div style={{
      background: "#12100e", border: "1px solid #3a2f25", borderRadius: 10,
      padding: "10px 12px", fontFamily: "'Georgia', serif",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: "#f5e6c8", fontWeight: "bold" }}>{player.name}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#a08060" }}>
            Lv <span style={{ color: "#f5e6c8", fontWeight: "bold", fontSize: 14 }}>{player.level}</span>
          </span>
          <span style={{ fontSize: 11, color: "#a08060" }}>
            +<span style={{ color: "#f1c40f", fontWeight: "bold", fontSize: 14 }}>{bonus}</span>
          </span>
          <span style={{ fontSize: 11, color: "#a08060" }}>
            ⚔ <span style={{ color: "#e74c3c", fontWeight: "bold", fontSize: 14 }}>{strength}</span>
          </span>
        </div>
      </div>
 
      {/* Race/Class badges */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
        {player.race && (
          <span
            onClick={() => onCardClick(player.race)}
            style={{ fontSize: 10, background: "#1a2a1a", border: "1px solid #27ae6066", color: "#27ae60", borderRadius: 4, padding: "2px 6px", cursor: "pointer" }}
          >{player.race.name}</span>
        )}
        {player.classCard && (
          <span
            onClick={() => onCardClick(player.classCard)}
            style={{ fontSize: 10, background: "#1a1f2a", border: "1px solid #2980b966", color: "#2980b9", borderRadius: 4, padding: "2px 6px", cursor: "pointer" }}
          >{player.classCard.name}</span>
        )}
      </div>
 
      {/* Equipped items - compact */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {[
          player.equipped.headgear,
          player.equipped.armor,
          player.equipped.footgear,
          player.equipped.hand1,
          player.equipped.hand2,
          ...(player.equipped.other || [])
        ].filter(Boolean).map((item, i) => (
          <div
            key={i}
            onClick={() => onCardClick(item)}
            style={{
              fontSize: 10, background: "#2a1f1a", borderRadius: 4, padding: "2px 6px",
              color: "#d9b99b", cursor: "pointer", border: "1px solid #3a2f25",
              display: "flex", gap: 4, alignItems: "center",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#7a5a35"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#3a2f25"}
          >
            <span>{item.name}</span>
            {item.bonus > 0 && <span style={{ color: "#f1c40f", fontWeight: "bold" }}>+{item.bonus}</span>}
          </div>
        ))}
      </div>
 
      {/* Hand count */}
      <div style={{ marginTop: 8, display: "flex", gap: 3 }}>
        {player.hand.map((_, i) => (
          <div key={i} style={{
            width: 14, height: 20, borderRadius: 2, background: "#2a1f1a",
            border: "1px solid #3a2f25",
            backgroundImage: "repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #1f1f1f 2px, #1f1f1f 4px)"
          }} />
        ))}
        <span style={{ fontSize: 10, color: "#7a6a55", marginLeft: 4, alignSelf: "center" }}>{player.hand.length} cards</span>
      </div>
    </div>
  );
}
 
// ─── TABLE ZONE ───────────────────────────────────────────────────────────────
 
function TableZone({ cards, players, onCardClick }) {
  const getPlayerName = (id) => players.find(p => p.id === id)?.name || "?";
 
  return (
    <div style={{
      background: "#0e0c0a",
      border: "2px dashed #3a2f25",
      borderRadius: 12, padding: "1rem",
      minHeight: 130,
      fontFamily: "'Georgia', serif",
    }}>
      <div style={{ fontSize: 10, color: "#5a4a35", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
        ⚔ Table — face-up cards
      </div>
      {cards.length === 0 ? (
        <div style={{ color: "#3a2f25", fontSize: 13, textAlign: "center", paddingTop: 20 }}>No cards on the table</div>
      ) : (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {cards.map(card => (
            <div key={card.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <CardThumb card={card} size="large" onClick={onCardClick} />
              <div style={{ fontSize: 9, color: "#5a4a35", fontFamily: "monospace" }}>
                by {getPlayerName(card.placedBy)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
// ─── MY HAND ─────────────────────────────────────────────────────────────────
 
function MyHand({ cards, onCardClick }) {
  return (
    <div style={{
      background: "#12100e",
      border: "1px solid #3a2f25",
      borderRadius: 12, padding: "1rem",
      fontFamily: "'Georgia', serif",
    }}>
      <div style={{ fontSize: 10, color: "#7a6a55", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
        🃏 Your hand — click to read
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {cards.map(card => (
          <CardThumb key={card.id} card={card} size="normal" onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}
 
// ─── PHASE INDICATOR ─────────────────────────────────────────────────────────
 
const PHASES = ["Kick Open the Door", "Look for Trouble / Loot the Room", "Charity"];
 
function PhaseIndicator({ phase, activePlayer }) {
  return (
    <div style={{
      background: "#12100e", border: "1px solid #3a2f25", borderRadius: 10,
      padding: "8px 12px", display: "flex", alignItems: "center", gap: 12,
      fontFamily: "'Georgia', serif",
    }}>
      <div>
        <div style={{ fontSize: 9, color: "#7a6a55", letterSpacing: 1, textTransform: "uppercase" }}>Active Player</div>
        <div style={{ fontSize: 14, color: "#f5e6c8", fontWeight: "bold" }}>{activePlayer}</div>
      </div>
      <div style={{ width: 1, height: 32, background: "#3a2f25" }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9, color: "#7a6a55", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Phase</div>
        <div style={{ display: "flex", gap: 4 }}>
          {PHASES.map((p, i) => (
            <div key={i} style={{
              fontSize: 10, padding: "2px 8px", borderRadius: 4,
              background: i === phase ? "#8B4513" : "#1a1612",
              color: i === phase ? "#f5e6c8" : "#5a4a35",
              border: `1px solid ${i === phase ? "#8B4513" : "#3a2f25"}`,
              transition: "all 0.2s",
            }}>{p}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
// ─── MAIN BOARD ───────────────────────────────────────────────────────────────
 
export default function MunchkinBoard() {
  const [players] = useState(MOCK_PLAYERS);
  const [tableCards] = useState(TABLE_CARDS);
  const [selectedCard, setSelectedCard] = useState(null);
  const [phase, setPhase] = useState(0);
  const [activePlayerIdx, setActivePlayerIdx] = useState(0);
 
  const me = players.find(p => p.isMe);
  const others = players.filter(p => !p.isMe);
 
  const cyclePhase = () => {
    setPhase(prev => (prev + 1) % PHASES.length);
  };
 
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0806",
      backgroundImage: "radial-gradient(ellipse at 50% 0%, #1a1208 0%, #0a0806 70%)",
      padding: "1rem",
      fontFamily: "'Georgia', serif",
      color: "#f5e6c8",
    }}>
      {/* Title bar */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h1 style={{
          margin: 0, fontSize: 28,
          color: "#d4a017",
          textShadow: "0 0 20px #d4a01744",
          letterSpacing: 4,
          fontFamily: "'Georgia', serif",
          textTransform: "uppercase",
        }}>⚔ MUNCHKIN ⚔</h1>
        <div style={{ fontSize: 11, color: "#5a4a35", letterSpacing: 3, textTransform: "uppercase" }}>Kill the Monsters • Steal the Treasure • Stab Your Buddy</div>
      </div>
 
      {/* Phase + controls */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", alignItems: "center" }}>
        <PhaseIndicator phase={phase} activePlayer={players[activePlayerIdx].name} />
        <button
          onClick={cyclePhase}
          style={{
            background: "#1e1812", border: "1px solid #8B4513", borderRadius: 8,
            color: "#d4a017", padding: "6px 14px", cursor: "pointer",
            fontSize: 12, fontFamily: "'Georgia', serif", letterSpacing: 1,
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#2a2010"}
          onMouseLeave={e => e.currentTarget.style.background = "#1e1812"}
        >
          Next Phase →
        </button>
        <button
          onClick={() => setActivePlayerIdx(i => (i + 1) % players.length)}
          style={{
            background: "#1e1812", border: "1px solid #3a2f25", borderRadius: 8,
            color: "#a08060", padding: "6px 14px", cursor: "pointer",
            fontSize: 12, fontFamily: "'Georgia', serif",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#2a2010"}
          onMouseLeave={e => e.currentTarget.style.background = "#1e1812"}
        >
          End Turn →
        </button>
      </div>
 
      {/* Main layout */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "1rem" }}>
 
        {/* Left: My stat tracker */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ fontSize: 10, color: "#5a4a35", letterSpacing: 2, textTransform: "uppercase" }}>
            👤 {me.name}
          </div>
          <StatTracker player={me} onCardClick={setSelectedCard} />
        </div>
 
        {/* Right: table + other players + hand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
 
          {/* Other players */}
          <div>
            <div style={{ fontSize: 10, color: "#5a4a35", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
              👥 Other Players
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
              {others.map(p => (
                <PlayerPanel key={p.id} player={p} onCardClick={setSelectedCard} />
              ))}
            </div>
          </div>
 
          {/* Table */}
          <div>
            <TableZone cards={tableCards} players={players} onCardClick={setSelectedCard} />
          </div>
 
          {/* My hand */}
          <div>
            <MyHand cards={me.hand} onCardClick={setSelectedCard} />
          </div>
        </div>
      </div>
 
      {/* Decks */}
      <div style={{ display: "flex", gap: 16, marginTop: "1rem", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: 52, height: 72, borderRadius: 6,
            background: "repeating-linear-gradient(45deg, #1a0a0a, #1a0a0a 4px, #200a0a 4px, #200a0a 8px)",
            border: "2px solid #c0392b", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 20,
          }}>🚪</div>
          <div style={{ fontSize: 10, color: "#7a6a55" }}>Door Deck</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: 52, height: 72, borderRadius: 6,
            background: "repeating-linear-gradient(45deg, #1a1500, #1a1500 4px, #201a00 4px, #201a00 8px)",
            border: "2px solid #d4a017", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 20,
          }}>💰</div>
          <div style={{ fontSize: 10, color: "#7a6a55" }}>Treasure Deck</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: 52, height: 72, borderRadius: 6,
            background: "#151510",
            border: "2px solid #3a2f25", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 20, opacity: 0.6,
          }}>🗑</div>
          <div style={{ fontSize: 10, color: "#7a6a55" }}>Discard</div>
        </div>
      </div>
 
      {/* Card modal */}
      {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </div>
  );
}