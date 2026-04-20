import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { GameProvider } from "./context/GameContext";
import { RouteSkeleton } from "./components/RouteSkeleton";

const Landing = lazy(() => import("./pages/Landing").then((module) => ({ default: module.Landing })));
const Dashboard = lazy(() => import("./pages/Dashboard").then((module) => ({ default: module.Dashboard })));
const DailyBoard = lazy(() => import("./pages/DailyBoard").then((module) => ({ default: module.DailyBoard })));
const Play = lazy(() => import("./pages/Play").then((module) => ({ default: module.Play })));
const Progress = lazy(() => import("./pages/Progress").then((module) => ({ default: module.Progress })));
const Profile = lazy(() => import("./pages/Profile").then((module) => ({ default: module.Profile })));
const Settings = lazy(() => import("./pages/Settings").then((module) => ({ default: module.Settings })));
const Multiplayer = lazy(() => import("./pages/Multiplayer").then((module) => ({ default: module.Multiplayer })));
const PlayChess = lazy(() => import("./pages/PlayChess").then((module) => ({ default: module.PlayChess })));
const TicTacToe = lazy(() => import("./pages/TicTacToe").then((module) => ({ default: module.TicTacToe })));
const Checkers = lazy(() => import("./pages/Checkers").then((module) => ({ default: module.Checkers })));
const Morris = lazy(() => import("./pages/Morris").then((module) => ({ default: module.Morris })));
const FourInARow = lazy(() => import("./pages/FourInARow").then((module) => ({ default: module.FourInARow })));
const OnlineTicTacToe = lazy(() => import("./pages/OnlineTicTacToe").then((module) => ({ default: module.OnlineTicTacToe })));
const OnlineChess = lazy(() => import("./pages/OnlineChess").then((module) => ({ default: module.OnlineChess })));
const OnlineCheckers = lazy(() => import("./pages/OnlineCheckers").then((module) => ({ default: module.OnlineCheckers })));
const OnlineMorris = lazy(() => import("./pages/OnlineMorris").then((module) => ({ default: module.OnlineMorris })));
const PuzzleBank = lazy(() => import("./pages/PuzzleBank").then((module) => ({ default: module.PuzzleBank })));
const PuzzlePlay = lazy(() => import("./pages/PuzzlePlay").then((module) => ({ default: module.PuzzlePlay })));

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Suspense fallback={<RouteSkeleton />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/daily" element={<DailyBoard />} />
              <Route path="/play" element={<Play />} />
              <Route path="/multiplayer" element={<Multiplayer />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/play/chess" element={<PlayChess />} />
              <Route path="/tictactoe" element={<TicTacToe />} />
              <Route path="/checkers" element={<Checkers />} />
              <Route path="/morris" element={<Morris />} />
              <Route path="/fourinarow" element={<FourInARow />} />
              <Route path="/multiplayer/tictactoe" element={<OnlineTicTacToe />} />
              <Route path="/multiplayer/chess" element={<OnlineChess />} />
              <Route path="/multiplayer/checkers" element={<OnlineCheckers />} />
              <Route path="/multiplayer/morris" element={<OnlineMorris />} />
              <Route path="/puzzle-bank" element={<PuzzleBank />} />
              <Route path="/puzzle-play" element={<PuzzlePlay />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </GameProvider>
    </BrowserRouter>
  );
}
