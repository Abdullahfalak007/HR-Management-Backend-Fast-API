// src/components/employees/EmployeeHeader.tsx
"use client";

import { assets } from "@/constants/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EmployeeHeader({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          All Employees
        </h2>
        <p className="text-[var(--text-secondary)] text-sm">
          All Employee Information
        </p>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <button
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            onClick={() => router.push("/employees/add")}
          >
            <span className="text-[var(--text-primary)]">Add New</span>
            <Image src={assets.icons.plus} alt="Add" width={16} height={16} />
          </button>
        )}
        <button className="border border-[var(--border)] px-4 py-2 rounded-lg text-sm hover:bg-[var(--surface)] transition">
          <Image
            src={assets.icons.filter}
            alt="Filter"
            width={16}
            height={16}
          />
        </button>
      </div>
    </>
  );
}
