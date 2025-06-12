// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { assets } from "@/constants/assets";
import { navItems } from "@/constants/sidebar/navItems";
import { useTheme } from "@/constants/theme/ThemeContext";
import { useAuth } from "@/app/AuthProvider";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (status === "loading") return null;

  const isAdmin = user?.role === "ADMIN";
  const employeeAllowed = new Set(["Dashboard", "All Employees", "Settings"]);
  const items = isAdmin
    ? navItems
    : navItems.filter((i) => employeeAllowed.has(i.label));

  const isDark = theme === "dark";

  return (
    <>
      {/* overlay to dim page (no blur) */}
      <div
        className={`
          md:hidden fixed inset-0 bg-black bg-opacity-30
          transition-opacity duration-200
          ${
            isOpen
              ? "opacity-70 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={onClose}
      />

      {/* sidebar drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-[var(--sidebar-bg)] py-6 px-4
          transform transition-transform duration-200 z-30
          flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto
        `}
      >
        {/* top: logo + navigation */}
        <div>
          <div className="flex items-center space-x-2 mb-8">
            {/* <img src={assets.images.logo} alt="HR Logo" className="h-8 w-8" /> */}
            <Image
              src={assets.images.logo}
              alt="HR Logo"
              width={32} // 8×4
              height={32} // 8×4
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">HR SEARCH</span>
          </div>
          <nav className="space-y-2">
            {items.map((item) => {
              const active = pathname === item.href;
              const bgClass = active
                ? isDark
                  ? "bg-[var(--surface)]"
                  : "bg-[var(--accent)]"
                : "";
              const textClass = active
                ? isDark
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-primary)]"
                : "text-[var(--text-primary)]";
              const shapeClass = active
                ? "pl-3 pr-4 py-2 rounded-r-lg"
                : "px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)]";

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`
                      relative flex items-center space-x-3 cursor-pointer transition
                      ${bgClass} ${textClass} ${shapeClass}
                    `}
                  >
                    {active && (
                      <span className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[var(--accent)]" />
                    )}
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                      className="w-5 h-5 icon-theme"
                    />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* bottom: theme toggle */}
        <div className="flex justify-around bg-[var(--header-bg)] px-2 py-1 rounded-md">
          <button
            onClick={() => theme !== "light" && toggleTheme()}
            className={`
              flex items-center space-x-1 px-4 py-1 rounded-md transition
              ${
                theme === "light"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--header-bg)] text-[var(--text-secondary)]"
              }
            `}
          >
            <Image
              src={assets.icons.sun}
              alt="Light"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Light</span>
          </button>
          <button
            onClick={() => theme !== "dark" && toggleTheme()}
            className={`
              flex items-center space-x-1 px-4 py-1 rounded-md transition
              ${
                theme === "dark"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--header-bg)] text-[var(--text-secondary)]"
              }
            `}
          >
            <Image
              src={assets.icons.moon}
              alt="Dark"
              width={16}
              height={16}
              className="w-4 h-4"
            />

            <span>Dark</span>
          </button>
        </div>
      </aside>
    </>
  );
}
