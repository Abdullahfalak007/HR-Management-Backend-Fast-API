import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

export function useAttendanceOverview() {
  const dispatch = useAppDispatch();
  const records = useAppSelector((s) => s.attendance.records);
  const status = useAppSelector((s) => s.attendance.status);
  const loading = status === "loading";

  // — Filter —
  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";
  const filtered = records.filter((r) =>
    [r.employee.name, r.employee.designation, r.employee.type].some((field) =>
      field.toLowerCase().includes(q)
    )
  );

  // — Pagination —
  const pageSizeOptions = [6, 10, 15];
  const [perPage, setPerPage] = useState(pageSizeOptions[1]); // default 10
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const pageItems = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // — Initial Fetch —
  useEffect(() => {
    if (status === "idle") dispatch(fetchAttendanceRecords());
  }, [status, dispatch]);

  return {
    loading,
    filtered, // full list, if needed
    pageItems, // current page slice
    pageSizeOptions,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
