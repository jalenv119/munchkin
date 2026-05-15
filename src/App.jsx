import { useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import MunchkinBoard from "./components/munchkinboard.jsx";

export default function App() {
  const [gameSetup, setGameSetup] = useState(null);

  if (!gameSetup) {
    return <LandingPage onStart={setGameSetup} />;
  }

  return <MunchkinBoard gameSetup={gameSetup} onBackToMenu={() => setGameSetup(null)} />;
}
