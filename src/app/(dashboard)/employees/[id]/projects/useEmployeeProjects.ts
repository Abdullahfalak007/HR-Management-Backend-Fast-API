// src/hooks/useEmployeeProjects.ts
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchProjects, patchProjectStatus } from "@/store/slices/projectSlice";

export function useEmployeeProjects() {
  const { id: rawId } = useParams();
  const employeeId = Array.isArray(rawId) ? rawId[0] : rawId!;
  const dispatch = useAppDispatch();

  // kick off loading all projects once
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const allProjects = useAppSelector((s) => s.projects.items);
  const loading = useAppSelector((s) => s.projects.loading);

  // **guard** against missing assignee
  const projects = allProjects.filter((p) => p.assignee?.id === employeeId);

  const changeStatus = async (
    projectId: string,
    newStatus: "IN_PROGRESS" | "COMPLETED"
  ) => {
    await dispatch(patchProjectStatus({ id: projectId, status: newStatus }));
    // re-fetch or rely on slice update?
    dispatch(fetchProjects());
  };

  return { projects, loading, changeStatus };
}
