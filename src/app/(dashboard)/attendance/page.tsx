"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import { useAttendanceOverview } from "./useAttendanceOverview";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export default function AttendanceOverviewPage() {
  const {
    loading,
    pageItems,
    pageSizeOptions,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useAttendanceOverview();
  const router = useRouter();

  if (loading) return <Loader />;

  return (
    <Suspense>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <SearchBar placeholder="Search attendance…" basePath="/attendance" />
          <button
            onClick={() => router.push("/attendance/mark")}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] px-4 py-2 rounded transition"
          >
            Mark Attendance
          </button>
        </div>

        <AttendanceTable
          records={pageItems.map((r) => ({
            ...r,
            checkIn: new Date(r.checkIn).toLocaleString(),
            checkOut: new Date(r.checkOut).toLocaleString(),
          }))}
        />

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
              className="border border-[var(--border)] rounded px-2 py-1 bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>{" "}
            / page
          </label>

          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`
                px-3 py-1 rounded
                ${
                  p === currentPage
                    ? "bg-[var(--accent)] text-[var(--button-text)]"
                    : "hover:bg-[var(--surface-hover)]"
                }
                  `}
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
