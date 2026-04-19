import { Outlet, useLocation, Link } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HIDE_NAV_ROUTES = ["/"];

const mainNav = [
  { to: "/dashboard", label: "Home" },
  { to: "/daily", label: "Daily Board" },
  { to: "/play", label: "Play Solo" },
  { to: "/multiplayer", label: "Multiplayer" },
  { to: "/progress", label: "Stats" },
];

const secondaryNav = [
  { to: "/profile", label: "Profile" },
  { to: "/settings", label: "Settings" },
];

function MobileHeader() {
  const location = useLocation();
  const isActive = (to: string) => location.pathname === to;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 md:hidden">
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
          T
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
          TacticalPath
        </span>
      </Link>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
              <Link to="/dashboard" className="flex items-center gap-2" onClick={() => document.body.style.pointerEvents = ""}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
                  T
                </div>
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  TacticalPath
                </span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {mainNav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => document.body.style.pointerEvents = ""}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    isActive(to)
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-slate-200 p-3 dark:border-slate-700">
              {secondaryNav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => document.body.style.pointerEvents = ""}
                  className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export function Layout() {
  const location = useLocation();
  const shouldHideNav = HIDE_NAV_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#f8fafc_46%,_#eef2ff_100%)] font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:flex-row">
      {!shouldHideNav && (
        <>
          <SideNav />
          <MobileHeader />
          <BottomNav />
        </>
      )}
      <div className={cn(
        "flex min-h-screen w-full flex-col",
        !shouldHideNav && "pb-20 md:pb-0 md:pl-72 pt-16 md:pt-0"
      )}>
        <Outlet />
      </div>
    </div>
  );
}
