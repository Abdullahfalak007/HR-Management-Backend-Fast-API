// src/components/layout/Navbar.tsx
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/constants/assets";
import UserDropdown from "./UserDropdown";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";

type Notification = { read: boolean };

export default function Navbar({
  title,
  subtitle,
  onMenuClick,
}: {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/notifications")
        .then((r) => r.json())
        .then((data: Notification[]) =>
          setUnread(data.filter((n) => !n.read).length)
        )
        .catch(console.error);
    }
  }, [session]);

  return (
    <header
      className="
        flex items-center justify-between
        px-4 py-3
        bg-[var(--header-bg)] border-b border-[var(--border)]
      "
    >
      {/* Left: menu + title */}
      <div className="flex items-center space-x-3">
        <button
          className="md:hidden p-2"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[var(--text-primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden sm:block text-sm text-[var(--text-secondary)]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Center: search only on sm+ */}
      <div className="hidden sm:block w-64">
        <SearchBar placeholder="Search…" className="w-full" />
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center space-x-4">
        <button
          className="relative p-2 rounded bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
          onClick={() => router.push("/notification")}
          title="View notifications"
        >
          <Image
            src={assets.icons.bell}
            alt="Notifications"
            width={24}
            height={24}
            className="icon-theme"
          />
          {unread > 0 && (
            <span
              className="
                absolute -top-1 -right-1
                inline-flex items-center justify-center
                h-4 w-4 rounded-full
                bg-[var(--error)] text-xs text-[var(--text-primary)]
              "
            >
              {unread}
            </span>
          )}
        </button>

        {session?.user && <UserDropdown />}
      </div>
    </header>
  );
}
