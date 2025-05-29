"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SearchBarProps {
  /** the placeholder text */
  placeholder?: string;
  /** if provided, use this as the path instead of current pathname */
  basePath?: string;
  /** query-param key */
  paramKey?: string;
  /** container <div> classes */
  className?: string;
  /** <input> classes */
  inputClassName?: string;
}

export default function SearchBar({
  placeholder = "Search",
  basePath,
  paramKey = "search",
  className = "",
  inputClassName = "",
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // local state so typing is instant
  const [search, setSearch] = useState(searchParams.get(paramKey) || "");

  // whenever URL changes from outside, sync back
  useEffect(() => {
    setSearch(searchParams.get(paramKey) || "");
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setSearch(q);

    const trimmed = q.trim();
    const base = basePath ?? pathname;
    const target = trimmed
      ? `${base}?${paramKey}=${encodeURIComponent(trimmed)}`
      : base;
    router.replace(target);
  }

  // clear button sets search to empty and updates the URL
  function clear() {
    setSearch("");
    const base = basePath ?? pathname;
    router.replace(base);
  }

  return (
    <div className={className + " relative"}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleChange}
        className={
          `w-full
           bg-[var(--surface)]
           border border-[var(--input-border)]
           rounded-lg
           px-3 py-2
           placeholder-[var(--input-placeholder)]
           text-[var(--text-primary)]
           outline-none
           focus:ring-0
           focus:border-[var(--accent)]` + ` ${inputClassName}`
        }
      />
      {search && (
        <button
          onClick={clear}
          className={`
            absolute right-2 top-1/2 -translate-y-1/2
            text-[var(--text-secondary)]
            hover:text-[var(--text-primary)]
          `}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
