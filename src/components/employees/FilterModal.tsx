"use client";

import clsx from "clsx";

type Props = {
  departments: string[];
  selected: string[];
  onToggle: (dep: string) => void;
  onClose: () => void;
  className?: string;
};

export default function FilterModal({
  departments,
  selected,
  onToggle,
  onClose,
  className = "",
}: Props) {
  return (
    <div
      className={clsx(
        "bg-[var(--surface)] p-4 rounded-lg w-60 shadow-lg",
        className
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Departments</h3>
        <button onClick={onClose} className="text-[var(--text-secondary)]">
          ✕
        </button>
      </div>
      <div className="max-h-48 overflow-auto space-y-2">
        {departments.map((dep) => (
          <label key={dep} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(dep)}
              onChange={() => onToggle(dep)}
              className="h-4 w-4"
            />
            <span>{dep}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 text-right">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-[var(--accent)] text-[var(--button-text)] rounded hover:bg-[var(--accent-hover)] transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
