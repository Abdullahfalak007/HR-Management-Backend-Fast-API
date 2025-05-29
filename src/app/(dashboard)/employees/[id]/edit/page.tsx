"use client";
export const dynamic = "force-dynamic";

import EmployeeForm from "@/components/employees/EmployeeForm";
import { useEditEmployee } from "./useEditEmployee";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export default function EditEmployeePage() {
  const { editable, handleUpdate } = useEditEmployee();

  if (!editable) {
    return <Loader />;
  }

  return (
    <Suspense>
      <div className="p-6">
        <EmployeeForm
          initialData={{
            employee: {
              name: editable.name ?? "",
              employeeId: editable.employeeId ?? "",
              department: editable.department ?? "",
              designation: editable.designation ?? "",
              type: editable.type ?? "",
              status: editable.status ?? "",
              avatar: editable.avatar ?? "",
            },
            personalInfo: editable.personalInfo,
            professionalInfo: {
              username: editable.professionalInfo.username ?? "",
              joiningDate: editable.professionalInfo.joiningDate ?? "",
              workingDays: editable.professionalInfo.workingDays ?? "",
              officeLocation: editable.professionalInfo.officeLocation ?? "",
            },
            documents: {
              appointmentLetter: editable.documents?.appointmentLetter ?? null,
              salarySlip: editable.documents?.salarySlip ?? null,
              relievingLetter: editable.documents?.relievingLetter ?? null,
              experienceLetter: editable.documents?.experienceLetter ?? null,
            },
            accountLinks: editable.accountLinks,
          }}
          onSubmit={handleUpdate}
        />
      </div>
    </Suspense>
  );
}
