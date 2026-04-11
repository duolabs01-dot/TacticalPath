import { Outlet } from "react-router-dom";

export function ClassroomLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 font-sans">
      <Outlet />
    </div>
  );
}