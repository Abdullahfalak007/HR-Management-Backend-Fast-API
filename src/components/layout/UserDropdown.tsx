// src/components/layout/UserDropdown.tsx
"use client";

import { useAuth } from "@/app/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function UserDropdown() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isAdmin = user?.role === "ADMIN";

  // fetch the current employee ID for non-admins
  const [empId, setEmpId] = useState<string | null>(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/me`)
      .then((r) => r.json())
      .then((data: { id: string | null }) => setEmpId(data.id))
      .catch(console.error);
  }, []);

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;
  const { name, image, role } = user;

  // build the “Employee Info” link
  let infoHref = "#";
  // force it to use the secondary text color when disabled
  let infoClass = "!text-[var(--text-secondary)] cursor-not-allowed";
  if (!isAdmin && empId) {
    infoHref = `/employees/${empId}`;
    infoClass = "!text-[var(--text-primary)] hover:bg-[var(--surface-hover)]";
  }

  return (
    <div ref={ref} className="relative">
      {/* trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          flex items-center space-x-2 px-3 py-2 rounded
          bg-[var(--surface)] hover:bg-[var(--surface-hover)]
          transition focus:outline-none
        "
      >
        <Image
          src={image || "/assets/icons/default-avatar.png"}
          alt="avatar"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="text-left">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {name}
          </p>
          <p className="text-xs text-[var(--text-secondary)] uppercase">
            {role}
          </p>
        </div>
        <svg
          className={`
            w-4 h-4 text-[var(--text-secondary)]
            transform transition-transform
            ${open ? "rotate-180" : ""}
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-48
            bg-[var(--surface)]
            border border-[var(--divider)]
            rounded shadow-lg
            z-[1000]
          "
        >
          <Link
            href="/profile"
            className="
              block px-4 py-2
              !text-[var(--text-primary)]
              hover:bg-[var(--surface-hover)]
            "
          >
            Profile
          </Link>

          <Link
            href={infoHref}
            className={`block px-4 py-2 ${infoClass}`}
            onClick={(e) => {
              if (isAdmin || !empId) e.preventDefault();
            }}
          >
            Employee Info
          </Link>

          <Link
            href="/change-password"
            className="
              block px-4 py-2
              !text-[var(--text-primary)]
              hover:bg-[var(--surface-hover)]
            "
          >
            Change Password
          </Link>

          <hr className="border-[var(--divider)] my-1" />

          <button
            onClick={() => {
              logout();
              window.location.href = "/signin";
            }}
            className="
              w-full text-left px-4 py-2
              !text-[var(--text-primary)]
              hover:bg-[var(--surface-hover)]
            "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
