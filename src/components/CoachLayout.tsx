import { Outlet } from "react-router-dom";

export function CoachLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Outlet />
    </div>
  );
}