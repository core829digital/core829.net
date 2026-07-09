"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "◆" },
  { href: "/dashboard/projects", label: "Projects", icon: "■" },
  { href: "/dashboard/quotes", label: "Quotes", icon: "◇" },
  { href: "/dashboard/profile", label: "Profile", icon: "◎" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const token = getSessionToken();
  const session = useQuery(api.auth.validateSession, token ? { token } : "skip");
  const user = useQuery(
    api.profile.getProfile,
    token && session ? { token, userId: session.userId } : "skip"
  );

  const handleLogout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/");
  };

  if (session === null) {
    router.push("/login?redirect=/dashboard");
    return null;
  }
  if (session && user === null) {
    router.push("/login?redirect=/dashboard");
    return null;
  }

  return (
    <div className="pt-28 min-h-dvh bg-paper text-ink flex">
      <aside className="w-56 shrink-0 border-r border-mist flex flex-col">
        <div className="p-5 border-b border-mist">
          <span className="font-mono text-signal text-xs uppercase tracking-[0.2em]">Dashboard</span>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  active ? "bg-signal/10 text-signal" : "text-ink/60 hover:text-ink hover:bg-white/5"
                }`}
              >
                <span className="text-xs w-4 text-center shrink-0">{item.icon}</span>
                <span className="font-mono text-xs uppercase tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-mist space-y-2">
          {user && (
            <div className="text-xs text-ink/50 truncate">
              <p className="font-medium text-ink/70 truncate">{user.name}</p>
              <p className="truncate">{user.email}</p>
            </div>
          )}
          {user?.role === "admin" && (
            <Link href="/admin" className="block text-xs font-mono text-signal hover:opacity-80 transition-colors">
              &rarr; Admin panel
            </Link>
          )}
          <button onClick={handleLogout} className="w-full text-left text-xs font-mono text-red-400/60 hover:text-red-400 transition-colors">
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 lg:p-8 max-w-[1440px]">{children}</main>
    </div>
  );
}
