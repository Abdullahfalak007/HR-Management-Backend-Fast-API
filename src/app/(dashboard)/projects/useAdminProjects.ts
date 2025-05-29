import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchProjects, patchProjectStatus } from "@/store/slices/projectSlice";
import { toast } from "react-toastify";

export function useAdminProjects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((s) => s.projects.items);
  const loading = useAppSelector((s) => s.projects.loading);

  // — Filter —
  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";
  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.assignee.name.toLowerCase().includes(q)
  );

  // — Pagination —
  const pageSizeOptions = [6, 10, 15];
  const [perPage, setPerPage] = useState(pageSizeOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  // clamp currentPage when filtered/perPage changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const pageItems = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // — Modal & Actions —
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  // mark complete
  const markComplete = async (id: string) => {
    const result = await dispatch(
      patchProjectStatus({ id, status: "COMPLETED" })
    );
    if (patchProjectStatus.fulfilled.match(result)) {
      toast.success("Project marked complete");
    } else {
      toast.error("Could not update project");
    }
    dispatch(fetchProjects());
  };

  // initial fetch & refresh
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  const refresh = () => dispatch(fetchProjects());

  return {
    loading,
    filtered, // full filtered list if you ever need it
    pageItems, // only the items for current page
    pageSizeOptions,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    modalOpen,
    open,
    close,
    markComplete,
    refresh,
  };
}
