import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClassroomLayout } from "./components/ClassroomLayout";
import { CoachLayout } from "./components/CoachLayout";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { ClassroomProvider } from "./context/ClassroomContext";
import { GameProvider } from "./context/GameContext";

// General pages
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Analyze } from "./pages/Analyze";
import { SkillInsights } from "./pages/SkillInsights";
import { PuzzleBank } from "./pages/PuzzleBank";
import { Multiplayer } from "./pages/Multiplayer";
import { PuzzlePlay } from "./pages/PuzzlePlay";
import { GameAnalysis } from "./pages/GameAnalysis";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Subscription } from "./pages/Subscription";
import { Checkout } from "./pages/Checkout";
import { CoachConnect } from "./pages/CoachConnect";
import { CoachReview } from "./pages/CoachReview";
import { Assessment } from "./pages/Assessment";
import { ItalianGame } from "./pages/ItalianGame";
import { StudyPlan } from "./pages/StudyPlan";
import { TicTacToe } from "./pages/TicTacToe";
import { Checkers } from "./pages/Checkers";
import { Morris } from "./pages/Morris";
import { Solitaire } from "./pages/Solitaire";

// Student routes
import { StudentClassroomLogin } from "./pages/student/StudentClassroomLogin";
import { StudentWaitingRoom } from "./pages/student/StudentWaitingRoom";
import { StudentLiveGame } from "./pages/student/StudentLiveGame";
import { StudentPostGameLesson } from "./pages/student/StudentPostGameLesson";
import { StudentDrillFlow } from "./pages/student/StudentDrillFlow";
import { StudentMasterySummary } from "./pages/student/StudentMasterySummary";

// Coach routes
import { CoachLogin } from "./pages/coach/CoachLogin";
import { CoachClassroomDashboard } from "./pages/coach/CoachClassroomDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ClassroomProvider>
          <GameProvider>
            <Routes>
              {/* General routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analyze" element={<Analyze />} />
                <Route path="/skill-insights" element={<SkillInsights />} />
                <Route path="/puzzle-bank" element={<PuzzleBank />} />
                <Route path="/multiplayer" element={<Multiplayer />} />
                <Route path="/puzzle-play" element={<PuzzlePlay />} />
                <Route path="/game-analysis" element={<GameAnalysis />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/coach-connect" element={<CoachConnect />} />
                <Route path="/coach-review" element={<CoachReview />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/italian-game" element={<ItalianGame />} />
                <Route path="/study-plan" element={<StudyPlan />} />
                <Route path="/tictactoe" element={<TicTacToe />} />
                <Route path="/checkers" element={<Checkers />} />
                <Route path="/morris" element={<Morris />} />
                <Route path="/solitaire" element={<Solitaire />} />
              </Route>

              {/* Coach routes */}
              <Route element={<CoachLayout />}>
                <Route path="/coach/login" element={<CoachLogin />} />
                <Route path="/coach/dashboard" element={<CoachClassroomDashboard />} />
              </Route>

              {/* Student routes - classroom-scoped */}
              <Route element={<ClassroomLayout />}>
                <Route path="/c/:slug" element={<StudentClassroomLogin />} />
                <Route path="/c/:slug/waiting" element={<StudentWaitingRoom />} />
                <Route path="/c/:slug/game/:gameId" element={<StudentLiveGame />} />
                <Route path="/c/:slug/lesson/:gameId" element={<StudentPostGameLesson />} />
                <Route path="/c/:slug/drills/:drillSetId" element={<StudentDrillFlow />} />
                <Route path="/c/:slug/summary" element={<StudentMasterySummary />} />
              </Route>

              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </GameProvider>
        </ClassroomProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
