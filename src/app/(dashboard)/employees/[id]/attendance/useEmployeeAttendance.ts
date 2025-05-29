import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

export function useEmployeeAttendance() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const all = useAppSelector((s) => s.attendance.records);
  const status = useAppSelector((s) => s.attendance.status);
  const loading = status === "loading";

  const records = all.filter((r) => r.employee.id === id);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceRecords());
    }
  }, [status, dispatch]);

  return { records, loading };
}
