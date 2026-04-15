import { Outlet } from "react-router-dom";

export function CoachLayout() {
  return (
    <div className="flex min-h-screen font-sans bg-slate-50">
      <div className="flex-1 flex-col min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
