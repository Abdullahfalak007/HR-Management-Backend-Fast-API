"use client";
import React from "react";

type Props = {
  isEditing: boolean;
  data: {
    employeeId: string;
    username: string;
    employeeType: string;
    department: string;
    designation: string;
    workingDays: string;
    joiningDate: string;
    officeLocation: string;
    status: string;
  };
  onChange: (d: Partial<Props["data"]>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepProfessionalInfo({
  isEditing,
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ [e.target.name]: e.target.value });
  };

  const fieldClasses =
    "h-12 w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 placeholder-[var(--input-placeholder)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]";

  const employeeTypes = ["Office", "Remote"];
  const workingDayOptions = [
    "Monday to Saturday",
    "Monday to Thursday",
    "Flexible",
  ];
  const departments = [
    "Engineering",
    "Quality Assurance",
    "DevOps",
    "Product",
    "Design",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Support",
  ];
  const designations = [
    "Intern",
    "Junior Developer",
    "Software Engineer",
    "Senior Software Engineer",
    "QA Engineer",
    "DevOps Engineer",
    "Team Lead",
    "Project Manager",
    "Product Manager",
    "Designer",
    "HR Manager",
    "Sales Executive",
  ];
  const statusOptions = ["Permanent", "Contractual"];
  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Peshawar",
    "Quetta",
    "Multan",
    "Sialkot",
    "Gujranwala",
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={data.employeeId}
          onChange={handleChange}
          readOnly={isEditing && Boolean(data.employeeId)}
          className={`${fieldClasses} ${
            isEditing && data.employeeId
              ? "cursor-not-allowed bg-opacity-50"
              : ""
          }`}
        />
        <input
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          readOnly={isEditing && Boolean(data.username)}
          className={`${fieldClasses} ${
            isEditing && data.username ? "cursor-not-allowed bg-opacity-50" : ""
          }`}
        />
        <select
          name="employeeType"
          value={data.employeeType}
          onChange={handleChange}
          className={fieldClasses}
        >
          <option value="">Employee Type</option>
          {employeeTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          name="department"
          value={data.department}
          onChange={handleChange}
          className={fieldClasses}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          name="designation"
          value={data.designation}
          onChange={handleChange}
          className={fieldClasses}
        >
          <option value="">Designation</option>
          {designations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          name="workingDays"
          value={data.workingDays}
          onChange={handleChange}
          className={fieldClasses}
        >
          <option value="">Working Days</option>
          {workingDayOptions.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
        <input
          name="joiningDate"
          type="date"
          value={data.joiningDate}
          onChange={handleChange}
          className={fieldClasses}
        />
        <select
          name="officeLocation"
          value={data.officeLocation}
          onChange={handleChange}
          className={fieldClasses}
        >
          <option value="">Office Location</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={data.status}
          onChange={handleChange}
          className={`${fieldClasses} col-span-2`}
        >
          <option value="">Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Back / Next only when Adding */}
      {!isEditing && (
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="
              px-6 py-2 rounded
              border border-[var(--divider)]
              text-[var(--text-secondary)]
              hover:border-[var(--accent)]
              transition
            "
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="
              px-6 py-2 rounded
              bg-[var(--accent)] hover:bg-[var(--accent-hover)]
              text-white
              transition
            "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
