"use client";

export const dynamic = "force-dynamic";

import EmployeeForm from "@/components/employees/EmployeeForm";
import { useAddEmployee } from "./useAddEmployee";
import { Suspense } from "react";

export default function AddEmployeePage() {
  const { handleCreate } = useAddEmployee();

  return (
    <Suspense>
      <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold">Add New Employee</h1>
        <EmployeeForm onSubmit={handleCreate} />
      </div>
    </Suspense>
  );
}
