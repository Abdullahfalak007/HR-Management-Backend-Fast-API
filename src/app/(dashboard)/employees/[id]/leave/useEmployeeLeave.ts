import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchLeaves, createLeave } from "@/store/slices/leaveSlice";

export function useEmployeeLeave() {
  const { id: rawId } = useParams();
  const employeeId = Array.isArray(rawId) ? rawId[0] : rawId!;
  const dispatch = useAppDispatch();

  const all = useAppSelector((s) => s.leaves.items);
  const loading = useAppSelector((s) => s.leaves.loading);
  const leaves = all.filter((l) => l.employeeId === employeeId);

  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);
  const resetForm = () => {
    setStartDate("");
    setEndDate("");
    setReason("");
  };
  const submitLeave = async () => {
    await dispatch(createLeave({ employeeId, reason, startDate, endDate }));
    close();
    resetForm();
  };

  return {
    leaves,
    loading,
    modalOpen,
    open,
    close,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reason,
    setReason,
    submitLeave,
  };
}
