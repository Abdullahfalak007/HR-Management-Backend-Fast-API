// src/app/(dashboard)/employees/[id]/projects/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { format } from "date-fns";
import { useEmployeeProjects } from "./useEmployeeProjects";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export default function EmployeeProjectsPage() {
  const { projects, loading, changeStatus } = useEmployeeProjects();
  if (loading) return <Loader />;

  return (
    <Suspense>
      <div className="overflow-x-auto border border-[var(--border)] rounded-lg bg-[var(--container-bg)] p-6">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          Projects
        </h2>
        <table className="min-w-full table-auto text-[var(--text-primary)] text-sm">
          <thead className="border-b border-[var(--border)]">
            <tr>
              {["Title", "Start Date", "End Date", "Status", "Action"].map(
                (h) => (
                  <th key={h} className="px-4 py-2 text-left whitespace-nowrap">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-[var(--surface-hover)]">
                <td className="px-4 py-2 whitespace-nowrap">{p.title}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {format(new Date(p.startDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {format(new Date(p.endDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {p.status.replace("_", " ")}
                </td>
                <td className="px-4 py-2 whitespace-nowrap space-x-2">
                  {p.status !== "COMPLETED" && (
                    <button
                      onClick={() => changeStatus(p.id, "COMPLETED")}
                      className="px-3 py-1 rounded bg-[var(--success)] text-[var(--button-text)] text-xs"
                    >
                      Mark Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
}
