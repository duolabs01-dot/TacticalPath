import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function Layout() {
  const location = useLocation();
  const hideNavRoutes = [
    "/",
    "/login",
    "/signup",
    "/checkout",
    "/italian-game",
    "/subscription",
    "/puzzle-play",
    "/game-analysis",
    "/coach-review",
    "/assessment",
    "/settings",
    "/skill-insights",
    "/puzzle-bank",
    "/coach-connect",
  ];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 font-sans">
      {!shouldHideNav && <BottomNav />}
      <div className={`flex-1 w-full relative ${!shouldHideNav ? 'pb-16 md:pb-0' : ''} flex flex-col min-h-screen`}>
        <Outlet />
      </div>
    </div>
  );
}
