// src/components/employees/EmployeeTable.tsx
import { Employee } from "@/types/types";
import EmployeeRow from "./EmployeeRow";

export default function EmployeeTable({
  employees,
  onDeleteSuccess,
  isAdmin,
}: {
  employees: Employee[];
  onDeleteSuccess?: () => void;
  isAdmin: boolean;
}) {
  return (
    <div className="overflow-auto border border-[var(--border)] rounded-lg mt-4">
      <table className="min-w-full text-[var(--text-primary)] text-sm">
        <thead className="bg-[var(--container-bg)] border-b border-[var(--border)]">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Employee ID</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Designation</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Status</th>
            {isAdmin && <th className="px-4 py-3 text-left">Action</th>}
          </tr>
        </thead>
        <tbody className="bg-[var(--surface)] divide-y divide-[var(--border)]">
          {employees.map((emp) => (
            <EmployeeRow
              key={emp.id}
              employee={emp}
              onDeleteSuccess={onDeleteSuccess}
              isAdmin={isAdmin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
