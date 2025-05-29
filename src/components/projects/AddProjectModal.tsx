// src/components/projects/AddProjectModal.tsx
"use client";

import { useState, useEffect } from "react";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

type Emp = { id: string; name: string };

export default function AddProjectModal({ onClose, onSuccess }: Props) {
  const [employees, setEmployees] = useState<Emp[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((r) => r.json())
      .then((list: Emp[]) => {
        setEmployees(list.map((e) => ({ id: e.id, name: e.name })));
      })
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        startDate,
        endDate,
        employeeId,
      }),
    });
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[var(--surface)] p-6 rounded-lg w-96 space-y-4">
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
          New Project
        </h3>

        {[
          {
            label: "Project Title",
            type: "text",
            value: title,
            onChange: setTitle,
          },
          {
            label: "Project Description",
            type: "textarea",
            value: description,
            onChange: setDescription,
          },
          {
            label: "Start Date",
            type: "date",
            value: startDate,
            onChange: setStartDate,
          },
          {
            label: "End Date",
            type: "date",
            value: endDate,
            onChange: setEndDate,
          },
        ].map(({ label, type, value, onChange }) => (
          <label className="block" key={label}>
            <span className="text-[var(--text-primary)]">{label}</span>
            {type === "textarea" ? (
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2 text-[var(--text-primary)] focus:border-[var(--accent)]"
                placeholder={label}
              />
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2 text-[var(--text-primary)] focus:border-[var(--accent)]"
              />
            )}
          </label>
        ))}

        <label className="block">
          <span className="text-[var(--text-primary)]">Select Employee</span>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            disabled={loading}
            className="mt-1 block w-full bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2 text-[var(--text-primary)] focus:border-[var(--accent)]"
          >
            <option value="">Select an Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface)] transition"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={!title || !startDate || !endDate || !employeeId}
            className="px-4 py-2 rounded bg-[var(--accent)] text-[var(--text-primary)] disabled:opacity-50 transition"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}
