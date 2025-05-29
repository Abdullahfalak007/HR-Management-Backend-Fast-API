import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchLeaves, updateLeaveStatus } from "@/store/slices/leaveSlice";
import { toast } from "react-toastify";

export function useAdminLeaves() {
  const dispatch = useAppDispatch();
  const leaves = useAppSelector((s) => s.leaves.items);
  const loading = useAppSelector((s) => s.leaves.loading);

  // — Filter —
  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";
  const filtered = leaves.filter((l) =>
    [l.employeeId || "", l.reason].some((field) =>
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

  // — Initial Fetch & Status Update —
  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const updateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const result = await dispatch(updateLeaveStatus({ id, status }));
    if (updateLeaveStatus.fulfilled.match(result)) {
      toast.success(`Leave ${status.toLowerCase()}`);
    } else {
      toast.error("Could not update leave");
    }
  };

  return {
    loading,
    filtered,
    pageItems,
    pageSizeOptions,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    updateStatus,
  };
}
