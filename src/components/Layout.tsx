import { Outlet, useLocation, Link } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HIDE_NAV_ROUTES = ["/"];

const mainNav = [
  { to: "/dashboard", label: "Home" },
  { to: "/daily", label: "Daily Puzzle" },
  { to: "/play", label: "Play" },
  { to: "/multiplayer", label: "Online" },
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
    <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-900">
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          TP
        </div>
      </Link>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex h-full flex-col pt-4">
            <nav className="flex-1 space-y-1">
              {mainNav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-3 text-sm font-medium transition",
                    isActive(to)
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
              {secondaryNav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {!shouldHideNav && (
        <>
          <SideNav />
          <MobileHeader />
          <BottomNav />
        </>
      )}
      <main className={cn(
        "w-full",
        !shouldHideNav ? "pt-14 pb-20 md:pt-0 md:pb-0 md:pl-64" : "min-h-screen"
      )}>
        <Outlet />
      </main>
    </div>
  );
}