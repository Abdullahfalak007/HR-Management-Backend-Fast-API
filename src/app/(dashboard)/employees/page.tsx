"use client";
export const dynamic = "force-dynamic";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/components/common/SearchBar";
import EmployeeTable from "@/components/employees/EmployeeTable";
import FilterModal from "@/components/employees/FilterModal";
import { useEmployeesList } from "./useEmployeesList";
import { assets } from "@/constants/assets";
import Loader from "@/components/common/Loader";

const ITEMS_PER_PAGE_OPTIONS = [6, 10, 15];

export default function EmployeesPage() {
  const router = useRouter();
  const { session, loading, filtered, isAdmin, refresh } = useEmployeesList();

  // UI state
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDeps, setSelectedDeps] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  if (loading) return <Loader />;
  if (!session) return <p className="p-6">Unauthorized</p>;

  // derive departments, apply filters & pagination
  const allDepartments = Array.from(new Set(filtered.map((e) => e.department)));
  const deptFiltered =
    selectedDeps.length > 0
      ? filtered.filter((e) => selectedDeps.includes(e.department))
      : filtered;
  const total = deptFiltered.length;
  const totalPages = Math.ceil(total / perPage);
  const paginated = deptFiltered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <Suspense>
      <div className="p-6 space-y-6">
        {/* top bar */}
        <div className="flex justify-between items-center">
          <SearchBar placeholder="Search employees…" basePath="/employees" />

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={() => router.push("/employees/add")}
                className="flex items-center space-x-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] px-4 py-2 rounded transition"
              >
                <Image
                  src={assets.icons.plus}
                  alt="Add"
                  width={16}
                  height={16}
                  className="icon-theme"
                />
                <span>Add New</span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className="flex items-center space-x-1 bg-[var(--surface)] border border-[var(--border)] px-4 py-2 rounded hover:bg-[var(--surface-hover)]"
              >
                <Image
                  src={assets.icons.filter}
                  alt="Filter"
                  width={16}
                  height={16}
                  className="icon-theme"
                />
                <span>Filter</span>
              </button>

              {filterOpen && (
                <FilterModal
                  departments={allDepartments}
                  selected={selectedDeps}
                  onToggle={(dep) =>
                    setSelectedDeps((prev) =>
                      prev.includes(dep)
                        ? prev.filter((d) => d !== dep)
                        : [...prev, dep]
                    )
                  }
                  onClose={() => setFilterOpen(false)}
                  className="absolute top-full mt-1 right-0 z-10"
                />
              )}
            </div>
          </div>
        </div>

        {/* table */}
        <EmployeeTable
          employees={paginated}
          onDeleteSuccess={refresh}
          isAdmin={isAdmin}
        />

        {/* pagination */}
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
              {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>{" "}
          </label>

          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded ${
                  currentPage === p
                    ? "bg-[var(--accent)] text-[var(--button-text)]"
                    : "hover:bg-[var(--surface-hover)]"
                }`}
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
