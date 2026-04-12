import { Outlet } from "react-router-dom";

import { SideNav } from "./SideNav";

export function CoachLayout() {
  return (
    <div className="flex min-h-screen font-sans bg-slate-50">
      {/* Sidebar – hidden on mobile */}
      <SideNav />
      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}