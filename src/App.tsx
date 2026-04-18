import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { GameProvider } from "./context/GameContext";

// Active pages
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { DailyBoard } from "./pages/DailyBoard";
import { Play } from "./pages/Play";
import { Progress } from "./pages/Progress";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Multiplayer } from "./pages/Multiplayer";

// Game pages — solo vs bot
import { PlayChess } from "./pages/PlayChess";
import { TicTacToe } from "./pages/TicTacToe";
import { Checkers } from "./pages/Checkers";
import { Morris } from "./pages/Morris";

// Online multiplayer pages
import { OnlineTicTacToe } from "./pages/OnlineTicTacToe";
import { OnlineChess } from "./pages/OnlineChess";
import { OnlineCheckers } from "./pages/OnlineCheckers";
import { OnlineMorris } from "./pages/OnlineMorris";

// Kept for Daily Board reuse (hidden from nav)
import { PuzzleBank } from "./pages/PuzzleBank";
import { PuzzlePlay } from "./pages/PuzzlePlay";

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Core routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daily" element={<DailyBoard />} />
            <Route path="/play" element={<Play />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Solo vs bot routes */}
            <Route path="/play/chess" element={<PlayChess />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/checkers" element={<Checkers />} />
            <Route path="/morris" element={<Morris />} />

            {/* Online multiplayer routes */}
            <Route path="/multiplayer/tictactoe" element={<OnlineTicTacToe />} />
            <Route path="/multiplayer/chess" element={<OnlineChess />} />
            <Route path="/multiplayer/checkers" element={<OnlineCheckers />} />
            <Route path="/multiplayer/morris" element={<OnlineMorris />} />

            {/* Hidden — kept for Daily Board infrastructure reuse */}
            <Route path="/puzzle-bank" element={<PuzzleBank />} />
            <Route path="/puzzle-play" element={<PuzzlePlay />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}
