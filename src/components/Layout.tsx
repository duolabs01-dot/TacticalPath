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
  "/coach/login",
];

export function Layout() {
  const location = useLocation();
  const shouldHideNav = HIDE_NAV_ROUTES.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col font-sans text-slate-900 md:flex-row">
      {!shouldHideNav && (
        <>
          <SideNav />
          <BottomNav />
        </>
      )}
      <div className={shouldHideNav ? "flex min-h-screen w-full flex-col" : "flex min-h-screen w-full flex-col pb-16 md:pb-0 md:pl-64"}>
        <Outlet />
      </div>
    </div>
  );
}
