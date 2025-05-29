// src/components/dashboard/StatsCard.tsx
"use client";

import React from "react";
import { format } from "date-fns";
import { StatsCardProps } from "@/types/types";
import Image from "next/image";

export default function StatsCard({
  title,
  value,
  icon,
  change,
  positive = true,
  updatedAt = new Date(),
}: StatsCardProps) {
  const Arrow = positive ? (
    <svg
      className="w-3 h-3"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d="M10 4l5 6H5l5-6z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg
      className="w-3 h-3"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d="M10 16l-5-6h10l-5 6z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div
      className="
        bg-[var(--card-bg)]
        border border-[var(--border)]
        rounded-lg p-6
        flex flex-col justify-between
        shadow-md
      "
    >
      {/* Top section: icon + title */}
      <div>
        <div className="flex items-center space-x-3">
          <div className="bg-[var(--surface)] p-2 rounded">
            <Image
              src={icon}
              alt="icon"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <h3 className="text-[var(--text-primary)] text-sm font-medium">
            {title}
          </h3>
        </div>
        {/* Value */}
        <p className="mt-4 text-[var(--text-primary)] text-3xl font-bold">
          {value}
        </p>
      </div>

      {/* Footer: update on left, change pill on right */}
      <div className="mt-6 flex items-center justify-between border-t border-[var(--divider)] pt-2">
        <p className="text-xs text-[var(--text-secondary)]">
          Update: {format(updatedAt, "LLLL d, yyyy")}
        </p>
        <div
          className={`
            flex items-center rounded px-2 py-1
            ${positive ? "bg-[var(--success)]" : "bg-[var(--error)]"}
          `}
        >
          <span className="text-white">{Arrow}</span>
          <span className="ml-1 text-xs font-semibold text-white">
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </div>
  );
}
