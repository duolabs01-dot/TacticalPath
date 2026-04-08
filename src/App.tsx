import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { StudyPlan } from "./pages/StudyPlan";
import { Analyze } from "./pages/Analyze";
import { Profile } from "./pages/Profile";
import { SkillInsights } from "./pages/SkillInsights";
import { PuzzleBank } from "./pages/PuzzleBank";
import { PuzzlePlay } from "./pages/PuzzlePlay";
import { Checkout } from "./pages/Checkout";
import { CoachReview } from "./pages/CoachReview";
import { CoachConnect } from "./pages/CoachConnect";
import { GameAnalysis } from "./pages/GameAnalysis";
import { ItalianGame } from "./pages/ItalianGame";
import { Settings } from "./pages/Settings";
import { Assessment } from "./pages/Assessment";
import { Subscription } from "./pages/Subscription";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skill-insights" element={<SkillInsights />} />
          <Route path="/puzzle-bank" element={<PuzzleBank />} />
          <Route path="/puzzle-play" element={<PuzzlePlay />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/coach-review" element={<CoachReview />} />
          <Route path="/coach-connect" element={<CoachConnect />} />
          <Route path="/game-analysis" element={<GameAnalysis />} />
          <Route path="/italian-game" element={<ItalianGame />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
