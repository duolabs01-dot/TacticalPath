import { Outlet, useLocation, Link } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const HIDE_NAV_ROUTES = ["/"];

const mainNav = [
  { to: "/dashboard", label: "Home" },
  { to: "/daily", label: "Daily" },
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
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 dark:bg-slate-900 dark:border-slate-700">
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-sm font-bold text-white">T</span>
        </div>
      </Link>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col pt-4">
            <nav className="space-y-1">
              {mainNav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition ${
                    isActive(to)
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-slate-200 mt-2 pt-2 dark:border-slate-700">
              {secondaryNav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center px-3 py-3 text-sm font-medium text-slate-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
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
      <main className={!shouldHideNav ? "pt-14" : ""}>
        <Outlet />
      </main>
    </div>
  );
}