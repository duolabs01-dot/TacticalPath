import { Outlet } from "react-router-dom";

export function ClassroomLayout() {
  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <div className="flex-1 flex-col min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
