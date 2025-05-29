// src/app/(dashboard)/leaves/page.tsx
"use client";
export const dynamic = "force-dynamic";

import { format } from "date-fns";
import SearchBar from "@/components/common/SearchBar";
import { useAdminLeaves } from "./useAdminLeaves";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { Suspense } from "react";

export default function AdminLeavePage() {
  const {
    loading,
    pageItems,
    pageSizeOptions,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    updateStatus,
  } = useAdminLeaves();

  if (loading) return <Loader />;

  return (
    <Suspense>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <SearchBar placeholder="Search leave requests…" basePath="/leaves" />
        </div>

        <div className="overflow-x-auto border border-[var(--border)] rounded-lg">
          <table className="min-w-full table-auto text-[var(--text-primary)] text-sm">
            <thead className="border-b border-[var(--border)]">
              <tr>
                {[
                  "Employee",
                  "Email",
                  "Reason",
                  "Start Date",
                  "End Date",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {pageItems.map((l) => {
                // Get employee info from the nested employee object
                const avatar =
                  l.employee?.avatar || "/assets/icons/default-avatar.png";
                const name = l.employee?.name || "Employee";
                const email =
                  l.employee?.personalInfo?.email ||
                  l.employee?.accountLinks?.email ||
                  "";

                return (
                  <tr key={l.id} className="border-b border-[var(--border)]">
                    <td className="px-4 py-3 flex items-center space-x-2 whitespace-nowrap">
                      <Image
                        src={
                          avatar ? avatar : "/assets/icons/default-avatar.png"
                        }
                        alt={name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="px-4 py-3">{name}</span>
                    </td>
                    <td className="px-4 py-3 ">{email}</td>
                    <td className="px-4 py-3 ">{l.reason}</td>
                    <td className="px-4 py-3 ">
                      {format(new Date(l.startDate), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-3 ">
                      {format(new Date(l.endDate), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-3 ">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          l.status === "APPROVED"
                            ? "bg-[var(--success)]"
                            : l.status === "PENDING"
                            ? "bg-[var(--warning)]"
                            : "bg-[var(--error)]"
                        } text-[var(--button-text)]`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      {l.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => updateStatus(l.id, "APPROVED")}
                            className="px-3 py-1 rounded bg-[var(--success)] text-[var(--button-text)] text-xs hover:opacity-90 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(l.id, "REJECTED")}
                            className="px-3 py-1 rounded bg-[var(--error)] text-[var(--button-text)] text-xs hover:opacity-90 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <label className="text-sm">
            Show{" "}
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-[var(--border)] rounded px-2 py-1 bg-[var(--surface)] hover:bg-[var(--surface-hover)] whitespace-nowrap"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>{" "}
            / page
          </label>

          <div className="space-x-2 whitespace-nowrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded ${
                  p === currentPage
                    ? "bg-[var(--accent)] text-[var(--button-text)]"
                    : "hover:bg-[var(--surface-hover)]"
                } whitespace-nowrap`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
