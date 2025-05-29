// src/components/dashboard/RecentAttendanceTable.tsx
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Row } from "@/types/types";

export default function RecentAttendanceTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-auto bg-[var(--container-bg)] rounded-lg">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr>
            {[
              "Employee Name",
              "Designation",
              "Type",
              "Check In Time",
              "Check Out Time",
              "Status",
            ].map((h) => (
              <th key={h} className="px-4 py-3 text-[var(--text-secondary)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-[var(--surface)]">
              <td className="px-4 py-3">
                <Link
                  href={`/employees/${row.employee.id}`}
                  className="flex items-center space-x-2"
                >
                  <Image
                    src={
                      row.employee.avatar || "/assets/icons/default-avatar.png"
                    }
                    alt={row.employee.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-[var(--text-primary)]">
                    {row.employee.name}
                  </span>
                </Link>
              </td>

              <td className="px-4 py-3 text-[var(--text-secondary)]">
                {row.employee.designation}
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)]">
                {row.employee.type}
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)]">
                {format(new Date(row.checkIn), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)]">
                {format(new Date(row.checkOut), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    row.status === "ON_TIME"
                      ? "bg-[var(--success)]"
                      : row.status === "LATE"
                      ? "bg-[var(--danger)]"
                      : "bg-[var(--warning)]"
                  } text-[var(--text-primary)]`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
