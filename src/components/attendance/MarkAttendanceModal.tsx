// src/components/attendance/MarkAttendanceModal.tsx
"use client";

import { AttendancePayload } from "@/types/types";
import { useState } from "react";

type Props = {
  employee: {
    id: string;
    name: string;
  };
  onClose: () => void;
  onSubmit: (payload: AttendancePayload) => Promise<void>;
};

export default function MarkAttendanceModal({
  employee,
  onClose,
  onSubmit,
}: Props) {
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [status, setStatus] = useState<AttendancePayload["status"] | "">("");
  const [submitting, setSubmitting] = useState(false);

  const statusOptions: { label: string; value: AttendancePayload["status"] }[] =
    [
      { label: "On Time", value: "ON_TIME" },
      { label: "Late", value: "LATE" },
      { label: "Absent", value: "ABSENT" },
    ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({
      employeeId: employee.id,
      date,
      checkIn,
      checkOut,
      breakTime,
      workHours,
      status: status as AttendancePayload["status"],
    });
    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[var(--surface)] p-6 rounded-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[var(--text-secondary)]"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
          Mark Attendance for {employee.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Date", type: "date", value: date, onChange: setDate },
            {
              label: "Check In",
              type: "time",
              value: checkIn,
              onChange: setCheckIn,
            },
            {
              label: "Check Out",
              type: "time",
              value: checkOut,
              onChange: setCheckOut,
            },
          ].map(({ label, type, value, onChange }) => (
            <div className="space-y-1" key={label}>
              <label className="text-sm text-[var(--text-secondary)]">
                {label}
              </label>
              <input
                type={type}
                value={value}
                required
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent border border-[var(--border)] rounded px-3 py-2 focus:border-[var(--accent)] focus:ring-0 "
              />
            </div>
          ))}

          {[
            {
              label: "Break Time (HH:MM)",
              placeholder: "e.g., 01:30",
              value: breakTime,
              onChange: setBreakTime,
            },
            {
              label: "Working Hours (HH:MM)",
              placeholder: "e.g., 07:30",
              value: workHours,
              onChange: setWorkHours,
            },
          ].map(({ label, placeholder, value, onChange }) => (
            <div className="space-y-1" key={label}>
              <label className="text-sm text-[var(--text-secondary)]">
                {label}
              </label>
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent border border-[var(--border)] rounded px-3 py-2 focus:border-[var(--accent)] focus:ring-0"
              />
            </div>
          ))}

          <div className="space-y-1">
            <label className="text-sm text-[var(--text-secondary)]">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full bg-transparent border border-[var(--border)] rounded px-3 py-2 focus:border-[var(--accent)] focus:ring-0bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
            >
              <option value="">Select an option</option>
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[var(--success)] hover:bg-[var(--success-dark)] text-[var(--text-primary)] py-2 rounded transition"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
