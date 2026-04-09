import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";

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
      <div className="page-content smooth-scroll">
        <Outlet />
      </div>
      {!shouldHideNav && <BottomNav />}
    </div>
  );
}