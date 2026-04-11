import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClassroomLayout } from "./components/ClassroomLayout";
import { CoachLayout } from "./components/CoachLayout";
import { StudentClassroomLogin } from "./pages/student/StudentClassroomLogin";
import { StudentWaitingRoom } from "./pages/student/StudentWaitingRoom";
import { StudentLiveGame } from "./pages/student/StudentLiveGame";
import { StudentPostGameLesson } from "./pages/student/StudentPostGameLesson";
import { StudentDrillFlow } from "./pages/student/StudentDrillFlow";
import { StudentMasterySummary } from "./pages/student/StudentMasterySummary";
import { CoachLogin } from "./pages/coach/CoachLogin";
import { CoachClassroomDashboard } from "./pages/coach/CoachClassroomDashboard";
import { ClassroomProvider } from "./context/ClassroomContext";
import { GameProvider } from "./context/GameContext";

export default function App() {
  return (
    <BrowserRouter>
      <ClassroomProvider>
        <GameProvider>
          <Routes>
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
            <Route path="/" element={<Navigate to="/coach/login" replace />} />
            <Route path="*" element={<Navigate to="/coach/login" replace />} />
          </Routes>
        </GameProvider>
      </ClassroomProvider>
    </BrowserRouter>
  );
}