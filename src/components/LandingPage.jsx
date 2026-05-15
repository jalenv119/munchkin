import { useState } from "react";
import { createBotGame, createLocalGame } from "../engine/gameEngine.js";

export default function LandingPage({ onStart }) {
  const [botCount, setBotCount] = useState(3);
  const [lastSetup, setLastSetup] = useState(null);

  const startBotGame = () => {
    const setup = createBotGame(botCount);
    setLastSetup(setup);
    onStart(setup);
  };

  const previewRolls = () => {
    const setup = createBotGame(botCount);
    setLastSetup(setup);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #2a1607 0%, #090706 65%)",
      color: "#f5e6c8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "Georgia, serif",
    }}>
      <div style={{ width: "min(900px, 100%)", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1rem" }}>
        <section style={{ background: "#12100e", border: "1px solid #3a2f25", borderRadius: 18, padding: "2rem", boxShadow: "0 20px 60px #0008" }}>
          <div style={{ fontSize: 12, color: "#a08060", letterSpacing: 3, textTransform: "uppercase" }}>Online Munchkin Prototype</div>
          <h1 style={{ margin: "0.75rem 0", color: "#d4a017", fontSize: 48, lineHeight: 1 }}>Munchkin</h1>
          <p style={{ color: "#b99b78", lineHeight: 1.6, maxWidth: 560 }}>
            Pick a mode and jump into the board. Bots and multiplayer are just setup options right now, so this version lets you test the turn flow without building the real bot logic yet.
          </p>

          <div style={{ display: "grid", gap: 12, marginTop: "1.5rem" }}>
            <button onClick={startBotGame} style={buttonStyle("#8B4513", "#d4a017")}>
              Play vs Bots
            </button>
            <button onClick={() => onStart(createLocalGame())} style={buttonStyle("#3a2f25", "#a08060")}>
              Solo Test Board
            </button>
            <button disabled style={{ ...buttonStyle("#25211c", "#5a4a35"), cursor: "not-allowed", opacity: 0.7 }}>
              Multiplayer Coming Later
            </button>
          </div>
        </section>

        <aside style={{ background: "#12100e", border: "1px solid #3a2f25", borderRadius: 18, padding: "1.5rem" }}>
          <h2 style={{ marginTop: 0, color: "#f5e6c8" }}>Bot setup</h2>
          <label style={{ display: "block", color: "#a08060", fontSize: 13, marginBottom: 6 }}>Number of bots</label>
          <select value={botCount} onChange={(e) => setBotCount(Number(e.target.value))} style={{ width: "100%", padding: 10, borderRadius: 8, background: "#1e1812", color: "#f5e6c8", border: "1px solid #3a2f25" }}>
            <option value={1}>1 bot</option>
            <option value={2}>2 bots</option>
            <option value={3}>3 bots</option>
          </select>

          <button onClick={previewRolls} style={{ ...buttonStyle("#1e1812", "#d4a017"), width: "100%", marginTop: 12 }}>
            Roll Order Preview
          </button>

          <div style={{ marginTop: 18, fontSize: 12, color: "#7a6a55", lineHeight: 1.5 }}>
            Dice rolls show below, but You are forced first for now so you can actually test the game.
          </div>

          {lastSetup && (
            <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
              {Object.entries(lastSetup.setupRolls || {}).map(([playerId, roll]) => (
                <div key={playerId}>
                <span>{playerId}</span>
                <strong>d6: {roll}</strong>
              </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function buttonStyle(border, color) {
  return {
    background: "#1e1812",
    border: `1px solid ${border}`,
    borderRadius: 10,
    color,
    padding: "12px 16px",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    fontSize: 15,
    textAlign: "left",
  };
}
