import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";

const HIDE_NAV_ROUTES = ["/"];

export function Layout() {
  const location = useLocation();
  const shouldHideNav = HIDE_NAV_ROUTES.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#f8fafc_46%,_#eef2ff_100%)] font-sans text-slate-900 md:flex-row">
      {!shouldHideNav && (
        <>
          <SideNav />
          <BottomNav />
        </>
      )}
      <div className={shouldHideNav ? "flex min-h-screen w-full flex-col" : "flex min-h-screen w-full flex-col pb-16 md:pb-0 md:pl-72"}>
        <Outlet />
      </div>
    </div>
  );
}
