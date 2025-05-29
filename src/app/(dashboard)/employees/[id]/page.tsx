"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployeeById } from "@/store/slices/employeeSlice";
import { format } from "date-fns";

export default function EmployeeProfilePage() {
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId!;
  const dispatch = useAppDispatch();
  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );
  const status = useAppSelector((s) => s.employees.status);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployeeById(id));
    }
  }, [status, dispatch, id]);

  if (!employee) {
    return <p className="p-6">Loading employee…</p>;
  }

  // split out first + last name
  const [firstName, ...rest] = employee.name.split(" ");
  const lastName = rest.join(" ");

  // safe defaults for each embedded—but check both TS‐known and Prisma‐returned keys:
  const personal = employee.personalInfo || {};

  const prof = employee.professionalInfo ?? employee.professionalInfo ?? {};

  const docs = (employee.documents || {}) as Record<string, string>;

  const acc = employee.accountLinks ?? employee.accountLinks ?? {};

  return (
    <Suspense>
      {/* ─── Tab Strip ─────────────────────────────────────────── */}
      <ul className="flex border-b border-[var(--border)] mb-4">
        {[
          { id: 1, label: "Personal Info", icon: assets.icons.user },
          { id: 2, label: "Professional Info", icon: assets.icons.briefcase },
          { id: 3, label: "Documents Info", icon: assets.icons.document },
          { id: 4, label: "Account Access", icon: assets.icons.lock },
        ].map((t) => (
          <li
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`cursor-pointer px-5 py-2 flex items-center space-x-2 select-none ${
              tab === t.id
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--link-color)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Image src={t.icon} alt="" width={16} height={16} />
            <span>{t.label}</span>
          </li>
        ))}
      </ul>

      {/* ─── Content Panel ──────────────────────────────────────── */}
      <div className="bg-[var(--container-bg)] rounded-lg p-6">
        {tab === 1 && (
          <div className="grid grid-cols-2 gap-6">
            {[
              ["First Name", firstName],
              ["Last Name", lastName],
              ["Mobile Number", personal.phone || "–"],
              ["Email Address", personal.email || "–"],
              ["Date of Birth", personal.dob || "–"],
              ["Marital Status", personal.maritalStatus || "–"],
              ["Gender", personal.gender || "–"],
              ["Nationality", personal.nationality || "–"],
              ["Address", personal.address || "–"],
              ["City", personal.city || "–"],
              ["State", personal.state || "–"],
              ["Zip Code", personal.zipCode || "–"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-sm text-[var(--text-secondary)]">{label}</p>
                <p className="text-[var(--text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 2 && (
          <div className="grid grid-cols-2 gap-6">
            {[
              ["Username", prof.username || "–"],
              [
                "Joining Date",
                prof.joiningDate
                  ? format(new Date(prof.joiningDate), "yyyy-MM-dd")
                  : "–",
              ],
              ["Working Days", prof.workingDays || "–"],
              ["Office Location", prof.officeLocation || "–"],
              ["Department", employee.department],
              ["Designation", employee.designation],
              ["Type", employee.type],
              ["Status", employee.status],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-sm text-[var(--text-secondary)]">{label}</p>
                <p className="text-[var(--text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 3 && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(docs).map(
              ([key, url]) =>
                url && (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-[var(--surface)] rounded-lg px-4 py-3"
                  >
                    <span className="text-[var(--text-secondary)]">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div className="flex space-x-3">
                      <button title="View">
                        <Image
                          src={assets.icons.view}
                          alt="View"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button title="Download">
                        <Image
                          src={assets.icons.download}
                          alt="Download"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        {tab === 4 && (
          <div className="grid grid-cols-2 gap-6">
            {[
              ["Email", acc.email || "–"],
              ["Slack ID", acc.slackId || "–"],
              ["Skype ID", acc.skypeId || "–"],
              ["GitHub ID", acc.githubId || "–"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-sm text-[var(--text-secondary)]">{label}</p>
                <p className="text-[var(--text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  );
}
