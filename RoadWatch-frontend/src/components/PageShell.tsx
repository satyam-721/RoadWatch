import { Link, useRouterState } from "@tanstack/react-router";
import { Home, FileWarning, Search, User, Globe, HelpCircle } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  showBottomNav?: boolean;
  showTopAuth?: boolean;
  title?: string;
}

export function PageShell({ children, showBottomNav = true, showTopAuth = false }: Props) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  const navItem = (to: string, icon: ReactNode, label: string) => {
    const active = path === to || (to !== "/" && path.startsWith(to));
    return (
      <Link
        to={to}
        className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium ${
          active ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      {/* Govt strip */}
      <div className="bg-[#0a3d62] text-white text-[11px] sm:text-xs">
        <div className="mx-auto max-w-3xl px-4 py-1.5 flex items-center justify-between">
          <span className="font-medium">भारत सरकार · Government of India</span>
          <span className="hidden sm:inline opacity-80">Ministry of Rural Development</span>
        </div>
      </div>

      {/* Top bar */}
      <header className="bg-white border-b border-border sticky top-0 z-30">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold text-lg shadow-sm">
              मे
            </div>
            <div className="leading-tight">
              <div className="font-bold text-base text-foreground">Meri Sadak</div>
              <div className="text-[11px] text-muted-foreground">मेरी सड़क</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-sm text-foreground">
              <Globe className="h-4 w-4" /> EN
            </button>
            {showTopAuth ? (
              <>
                <Link
                  to="/login"
                  className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link to="/help" aria-label="Help" className="rounded-full p-2 text-foreground">
                <HelpCircle className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className={`flex-1 mx-auto w-full max-w-3xl px-4 py-5 ${showBottomNav ? "pb-28" : "pb-10"}`}>
        {children}
      </main>

      {showBottomNav && (
        <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-border md:hidden">
          <div className="mx-auto max-w-3xl flex items-stretch">
            {navItem("/dashboard", <Home className="h-6 w-6" />, "Home")}
            {navItem("/report", <FileWarning className="h-6 w-6" />, "Report")}
            {navItem("/track", <Search className="h-6 w-6" />, "Track")}
            {navItem("/profile", <User className="h-6 w-6" />, "Profile")}
          </div>
        </nav>
      )}

      <footer className="bg-[#0a3d62] text-white/90 text-sm">
        <div className="mx-auto max-w-3xl px-4 py-6 grid gap-3 sm:grid-cols-3">
          <div>
            <div className="font-semibold text-white">Contact</div>
            <div className="opacity-80">Toll Free: 1800-XXX-XXXX</div>
            <div className="opacity-80">support@merisadak.gov.in</div>
          </div>
          <div>
            <div className="font-semibold text-white">Help</div>
            <Link to="/help" className="block opacity-80 underline-offset-2 hover:underline">
              How it works
            </Link>
            <Link to="/help" className="block opacity-80 underline-offset-2 hover:underline">
              FAQ
            </Link>
          </div>
          <div className="opacity-80">
            Disclaimer: This is a demo public-service portal. Content for illustration only.
          </div>
        </div>
        <div className="bg-[#082f4a] py-3 text-center text-xs text-white/70">
          © {new Date().getFullYear()} Meri Sadak · Government of India
        </div>
      </footer>
    </div>
  );
}