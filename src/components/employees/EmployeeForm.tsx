// src/components/employees/EmployeeForm.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import StepPersonalInfo from "./StepPersonalInfo";
import StepProfessionalInfo from "./StepProfessionalInfo";
import StepDocuments from "./StepDocuments";
import StepAccountAccess from "./StepAccountAccess";
import { assets } from "@/constants/assets";
import { FormState } from "@/types/types";

const TABS = [
  { id: 1, label: "Personal Information", icon: assets.icons.user },
  { id: 2, label: "Professional Information", icon: assets.icons.briefcase },
  { id: 3, label: "Documents", icon: assets.icons.document },
  { id: 4, label: "Account Access", icon: assets.icons.lock },
];

export default function EmployeeForm({
  initialData,
  onSubmit,
}: {
  initialData?: FormState;
  onSubmit: (payload: FormState) => Promise<void>;
}) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(initialData);

  // ─── Form state ───────────────────────────────────────────
  const [form, setForm] = useState<FormState>({
    employee: {
      name: initialData?.employee?.name ?? "",
      employeeId: initialData?.employee?.employeeId ?? "",
      department: initialData?.employee?.department ?? "",
      designation: initialData?.employee?.designation ?? "",
      type: initialData?.employee?.type ?? "",
      status: initialData?.employee?.status ?? "",
      avatar: initialData?.employee?.avatar ?? "",
    },
    personalInfo: {
      firstName: initialData?.personalInfo?.firstName ?? "",
      lastName: initialData?.personalInfo?.lastName ?? "",
      email: initialData?.personalInfo?.email ?? "",
      phone: initialData?.personalInfo?.phone ?? "",
      dob: initialData?.personalInfo?.dob ?? "",
      gender: initialData?.personalInfo?.gender ?? "",
      nationality: initialData?.personalInfo?.nationality ?? "",
      maritalStatus: initialData?.personalInfo?.maritalStatus ?? "",
      address: initialData?.personalInfo?.address ?? "",
      city: initialData?.personalInfo?.city ?? "",
      state: initialData?.personalInfo?.state ?? "",
      zipCode: initialData?.personalInfo?.zipCode ?? "",
    },
    professionalInfo: {
      username: initialData?.professionalInfo?.username ?? "",
      joiningDate: initialData?.professionalInfo?.joiningDate ?? "",
      workingDays: initialData?.professionalInfo?.workingDays ?? "",
      officeLocation: initialData?.professionalInfo?.officeLocation ?? "",
    },
    documents: {
      appointmentLetter: initialData?.documents?.appointmentLetter ?? null,
      salarySlip: initialData?.documents?.salarySlip ?? null,
      relievingLetter: initialData?.documents?.relievingLetter ?? null,
      experienceLetter: initialData?.documents?.experienceLetter ?? null,
    },
    accountLinks: {
      email: initialData?.accountLinks?.email ?? "",
      slackId: initialData?.accountLinks?.slackId ?? "",
      skypeId: initialData?.accountLinks?.skypeId ?? "",
      githubId: initialData?.accountLinks?.githubId ?? "",
    },
  });

  function updateSection<K extends keyof FormState>(
    section: K,
    data: Partial<FormState[K]>
  ) {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  }

  function handleAvatarChange(url: string) {
    setForm((prev) => ({
      ...prev,
      employee: { ...prev.employee, avatar: url },
    }));
  }

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // ─── Submit all (shared by both Add & Edit) ─────────────
  const submitAll = useCallback(async () => {
    setSubmitting(true);

    // Combine first + last into single name
    const fullName =
      form.personalInfo.firstName.trim() +
      " " +
      form.personalInfo.lastName.trim();

    const { firstName, lastName, ...restPersonalInfo } = form.personalInfo;

    const payload = {
      employee: {
        name: fullName,
        employeeId: form.employee.employeeId,
        department: form.employee.department,
        designation: form.employee.designation,
        type: form.employee.type,
        status: form.employee.status,
        avatar: form.employee.avatar,
      },
      personalInfo: {
        firstName,
        lastName,
        ...restPersonalInfo,
      },
      professionalInfo: {
        username: form.professionalInfo.username,
        joiningDate: form.professionalInfo.joiningDate,
        workingDays: form.professionalInfo.workingDays,
        officeLocation: form.professionalInfo.officeLocation,
      },
      documents: form.documents,
      accountLinks: form.accountLinks,
    };

    await onSubmit(payload);
    setSubmitting(false);
  }, [form, isEditing, onSubmit]);

  // ─── Global “Save” handler in edit-mode ──────────────────
  useEffect(() => {
    if (!isEditing) return;
    const handleGlobalSave = () => submitAll();
    window.addEventListener("save-employee", handleGlobalSave);
    return () => {
      window.removeEventListener("save-employee", handleGlobalSave);
    };
  }, [isEditing, submitAll]);

  useEffect(() => {
    function handleAvatarUpdated(e: Event) {
      const customEvent = e as CustomEvent<string>;
      setForm((prev) => ({
        ...prev,
        employee: { ...prev.employee, avatar: customEvent.detail },
      }));
    }
    window.addEventListener("employee-avatar-updated", handleAvatarUpdated);
    return () =>
      window.removeEventListener(
        "employee-avatar-updated",
        handleAvatarUpdated
      );
  }, []);

  // ─── Render the correct step ─────────────────────────────
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepPersonalInfo
            isEditing={isEditing}
            data={form.personalInfo}
            avatarUrl={form.employee.avatar}
            onChange={(d) => updateSection("personalInfo", d)}
            onAvatarChange={handleAvatarChange}
            onNext={next}
          />
        );
      case 2:
        return (
          <StepProfessionalInfo
            isEditing={isEditing}
            data={{
              employeeId: form.employee.employeeId,
              username: form.professionalInfo.username,
              employeeType: form.employee.type,
              department: form.employee.department,
              designation: form.employee.designation,
              workingDays: form.professionalInfo.workingDays,
              joiningDate: form.professionalInfo.joiningDate,
              officeLocation: form.professionalInfo.officeLocation,
              status: form.employee.status,
            }}
            onChange={(d) => {
              // Split changes between employee and professionalInfo sections
              const employeeFields = [
                "employeeId",
                "employeeType",
                "department",
                "designation",
                "status",
              ];
              const profFields = [
                "username",
                "workingDays",
                "joiningDate",
                "officeLocation",
              ];
              const employeeUpdates: any = {};
              const profUpdates: any = {};
              Object.entries(d).forEach(([key, value]) => {
                if (employeeFields.includes(key)) {
                  if (key === "employeeType") {
                    employeeUpdates["type"] = value;
                  } else {
                    employeeUpdates[key] = value;
                  }
                }
                if (profFields.includes(key)) {
                  profUpdates[key] = value;
                }
              });
              if (Object.keys(employeeUpdates).length > 0) {
                updateSection("employee", employeeUpdates);
              }
              if (Object.keys(profUpdates).length > 0) {
                updateSection("professionalInfo", profUpdates);
              }
            }}
            onBack={back}
            onNext={next}
          />
        );
      case 3:
        return (
          <StepDocuments
            isEditing={isEditing}
            data={form.documents}
            onChange={(d) => updateSection("documents", d)}
            onBack={back}
            onNext={next}
          />
        );
      case 4:
        return (
          <StepAccountAccess
            isEditing={isEditing}
            data={form.accountLinks}
            onChange={(d) => updateSection("accountLinks", d)}
            onBack={back}
            onSubmit={submitAll}
            submitting={submitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[var(--container-bg)] rounded-lg flex flex-col h-full space-y-4">
      {/* Tab strip */}
      <ul className="flex border-b border-[var(--border)] flex-shrink-0 space-x-4">
        {TABS.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setStep(tab.id)}
            className={`cursor-pointer -mb-px flex items-center select-none whitespace-nowrap flex-shrink-0 ${
              step === tab.id
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Image
              src={tab.icon}
              alt=""
              width={16}
              height={16}
              className="mr-2"
            />
            {tab.label}
          </li>
        ))}
      </ul>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto">{renderStep()}</div>
    </div>
  );
}
