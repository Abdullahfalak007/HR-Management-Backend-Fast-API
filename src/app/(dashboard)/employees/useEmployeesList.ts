import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployees } from "@/store/slices/employeeSlice";

export function useEmployeesList() {
  const { data: session, status: authStatus } = useSession();
  console.log("Session:", session);
  const dispatch = useAppDispatch();

  const status = useAppSelector((s) => s.employees.status);
  const loading = status === "loading" || authStatus === "loading";
  const employees = useAppSelector((s) => s.employees.employees);

  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";
  const filtered = employees.filter((e) =>
    [e.name, e.employeeId, e.department, e.designation].some((f) =>
      f.toLowerCase().includes(q)
    )
  );

  const isAdmin = session?.user.role === "ADMIN";
  const refresh = () => dispatch(fetchEmployees());

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  return { session, loading, filtered, isAdmin, refresh };
}
