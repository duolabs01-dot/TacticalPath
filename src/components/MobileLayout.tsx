import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";

const HIDE_NAV_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/checkout",
  "/subscription",
  "/coach-review",
  "/coach-connect",
  "/puzzle-play",
  "/game-analysis",
  "/italian-game",
];

export function MobileLayout() {
  const location = useLocation();
  const shouldHideNav = HIDE_NAV_ROUTES.includes(location.pathname);

  return (
    <div className="app-container">
      {/* Desktop sidebar */}
      <SideNav />
      {/* Main content */}
      <main className="main-content smooth-scroll">
        <Outlet />
      </main>
      {/* Mobile bottom nav */}
      {!shouldHideNav && <BottomNav />}
    </div>
  );
}