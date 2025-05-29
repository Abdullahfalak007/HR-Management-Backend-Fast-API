// src/app/(dashboard)/employees/[id]/leave/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { format } from "date-fns";
import { useEmployeeLeave } from "./useEmployeeLeave";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export default function EmployeeLeavePage() {
  const {
    leaves,
    loading,
    modalOpen,
    open,
    close,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reason,
    setReason,
    submitLeave,
  } = useEmployeeLeave();

  if (loading) return <Loader />;

  return (
    <Suspense>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Leave Management</h2>
          <button
            onClick={open}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] px-4 py-2 rounded"
          >
            Request Leave
          </button>
        </div>

        <div className="overflow-x-auto border border-[var(--border)] rounded-lg p-6">
          <table className="min-w-full table-auto text-[var(--text-primary)] text-sm">
            <thead className="border-b border-[var(--border)]">
              <tr>
                {["Reason", "Start Date", "End Date", "Status"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {leaves.map((l) => (
                <tr key={l.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{l.reason}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {format(new Date(l.startDate), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {format(new Date(l.endDate), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-[var(--overlay)]">
            <div className="bg-[var(--card-bg)] p-6 rounded-lg w-80 space-y-4">
              <h3 className="text-xl font-semibold">Request Leave</h3>
              <label className="block">
                <span className="text-[var(--text-secondary)]">Start Date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full border border-[var(--border)] rounded px-3 py-2 focus:border-[var(--accent)]"
                />
              </label>
              <label className="block">
                <span className="text-[var(--text-secondary)]">End Date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full border border-[var(--border)] rounded px-3 py-2 focus:border-[var(--accent)]"
                />
              </label>
              <label className="block">
                <span className="text-[var(--text-secondary)]">Reason</span>
                <input
                  type="text"
                  placeholder="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 block w-full border border-[var(--border)] rounded px-3 py-2 focus:border-[var(--accent)]"
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={close}
                  className="px-4 py-2 rounded bg-[var(--button-muted-bg)] hover:bg-[var(--button-muted-hover)]"
                >
                  Cancel
                </button>
                <button
                  onClick={submitLeave}
                  className="px-4 py-2 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
