import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  fetchEmployeeById,
  updateEmployee,
} from "@/store/slices/employeeSlice";
import { EditableEmployee, FormState } from "@/types/types";

export function useEditEmployee() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId!;

  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );
  const [editable, setEditable] = useState<EditableEmployee | null>(null);

  // fetch on mount
  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  // map into form shape when loaded
  useEffect(() => {
    if (!employee) return;
    const [firstName = "", ...rest] = (employee.name || "").split(" ");
    const lastName = rest.join(" ");
    const pi = employee.personalInfo || {};
    const pr = employee.professionalInfo || {};
    const acc = employee.accountLinks || {};
    setEditable({
      id: employee.id,
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      designation: employee.designation,
      type: employee.type,
      status: employee.status,
      avatar: employee.avatar,
      personalInfo: {
        firstName,
        lastName,
        email: pi.email || "",
        phone: pi.phone || "",
        dob: pi.dob || "",
        gender: pi.gender || "",
        nationality: pi.nationality || "",
        maritalStatus: pi.maritalStatus || "",
        address: pi.address || "",
        city: pi.city || "",
        state: pi.state || "",
        zipCode: pi.zipCode || "",
      },
      professionalInfo: {
        username: pr.username || "",
        joiningDate: pr.joiningDate || "",
        workingDays: pr.workingDays || "",
        officeLocation: pr.officeLocation || "",
      },
      documents: employee.documents || {},
      accountLinks: {
        email: acc.email || "",
        slackId: acc.slackId || "",
        skypeId: acc.skypeId || "",
        githubId: acc.githubId || "",
      },
    });
  }, [employee]);

  const handleUpdate = async (formState: FormState) => {
    const fullName =
      formState.personalInfo.firstName.trim() +
      " " +
      formState.personalInfo.lastName.trim();

    const { firstName, lastName, ...restPersonalInfo } = formState.personalInfo;

    const payload = {
      employee: {
        ...formState.employee,
        name: fullName,
      },
      personalInfo: restPersonalInfo,
      professionalInfo: formState.professionalInfo,
      documents: formState.documents,
      accountLinks: formState.accountLinks,
    };

    await dispatch(updateEmployee({ id, data: payload }));
    router.push("/employees");
  };

  return { editable, handleUpdate };
}
