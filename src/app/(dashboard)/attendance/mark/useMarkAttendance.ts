import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployees } from "@/store/slices/employeeSlice";
import { createAttendance } from "@/store/slices/attendanceSlice";
import { AttendancePayload, Emp } from "@/types/types";
import { toast } from "react-toastify";

export function useMarkAttendance() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((s) => s.employees.employees);
  const status = useAppSelector((s) => s.employees.status);
  const loading = status === "loading";

  const [selected, setSelected] = useState<Emp | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const open = (e: Emp) => {
    setSelected(e);
    setModalOpen(true);
  };
  const close = () => {
    setSelected(null);
    setModalOpen(false);
  };
  const onSubmit = async (payload: AttendancePayload) => {
    const result = await dispatch(createAttendance(payload));
    if (createAttendance.fulfilled.match(result)) {
      toast.success("Attendance recorded");
    } else {
      toast.error(result.error?.message || "Could not record attendance");
    }
    close();
    router.refresh();
  };

  return { employees, loading, selected, modalOpen, open, close, onSubmit };
}
