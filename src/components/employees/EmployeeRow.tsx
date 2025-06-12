// src/components/employees/EmployeeRow.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { Employee } from "@/types/types";

export default function EmployeeRow({
  employee,
  onDeleteSuccess,
  isAdmin,
}: {
  employee: Employee;
  onDeleteSuccess?: () => void;
  isAdmin: boolean;
}) {
  const router = useRouter();

  const handleView = () => {
    // ← now goes to the public profile page
    router.push(`/employees/${employee.id}`);
  };
  const handleEdit = () => {
    router.push(`/employees/${employee.id}/edit`);
  };
  const handleDelete = async () => {
    if (!confirm("Delete this employee?")) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${employee.id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) onDeleteSuccess?.();
  };

  return (
    <tr className="hover:bg-[var(--surface)] transition">
      <td className="px-4 py-3 flex items-center space-x-2">
        <Image
          src={employee.avatar || "/assets/icons/default-avatar.png"}
          width={30}
          height={30}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <span className="text-[var(--text-primary)]">{employee.name}</span>
      </td>
      <td className="px-4 py-3 text-[var(--text-primary)]">
        {employee.employeeId}
      </td>
      <td className="px-4 py-3 text-[var(--text-primary)]">
        {employee.department}
      </td>
      <td className="px-4 py-3 text-[var(--text-primary)]">
        {employee.designation}
      </td>
      <td className="px-4 py-3 text-[var(--text-primary)]">{employee.type}</td>
      <td className="px-4 py-3">
        <span className="text-xs bg-[var(--accent-dark)] px-2 py-1 rounded text-[var(--text-primary)]">
          {employee.status}
        </span>
      </td>
      {isAdmin && (
        <td className="py-3 flex space-x-3">
          {/* VIEW button now goes to the detailed profile (readonly) */}
          <button onClick={handleView} title="View">
            <Image
              src={assets.icons.view}
              alt="View"
              width={16}
              height={16}
              className="icon-theme"
            />
          </button>
          {/* EDIT button */}
          <button onClick={handleEdit} title="Edit">
            <Image
              src={assets.icons.edit}
              alt="Edit"
              width={16}
              height={16}
              className="icon-theme"
            />
          </button>
          {/* DELETE */}
          <button onClick={handleDelete} title="Delete">
            <Image
              src={assets.icons.delete}
              alt="Delete"
              width={16}
              height={16}
              className="icon-theme"
            />
          </button>
        </td>
      )}
    </tr>
  );
}
