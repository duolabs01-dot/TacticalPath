import { Outlet } from "react-router-dom";

import { SideNav } from "./SideNav";

export function ClassroomLayout() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar – hidden on mobile */}
      <SideNav />
      {/* Main content – takes remaining width */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <Outlet />
      </div>
    </div>
  );
}