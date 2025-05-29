// src/app/(dashboard)/employees/[id]/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  fetchEmployeeById,
  updateEmployee,
} from "@/store/slices/employeeSlice";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";

export default function EmployeeDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId!;
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const isEdit = pathname.endsWith("/edit");
  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );
  const status = useAppSelector((s) => s.employees.status);

  // Fetch employee if needed
  useEffect(() => {
    if (status === "idle") dispatch(fetchEmployeeById(id));
  }, [status, dispatch, id]);

  // Keep a local preview of the avatar
  const [preview, setPreview] = useState<string | undefined>(employee?.avatar);
  useEffect(() => {
    setPreview(employee?.avatar);
  }, [employee?.avatar]);

  // Set up Cloudinary widget once
  useEffect(() => {
    if (!isEdit || !window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: "hr-management/avatars",
        cropping: true,
        croppingAspectRatio: 1,
        showCompletedButton: true,
        singleUploadAutoClose: false,
        uploadOnSelect: false, // ← do not auto-upload on file select
        showUploadMoreButton: false,
        multiple: false,
      },
      (error, result) => {
        if (error) {
          toast.error("Cloudinary Widget Error:", error);
          return;
        }
        if (
          typeof result === "object" &&
          result !== null &&
          "event" in result &&
          result.event === "success" &&
          "info" in result &&
          typeof result.info === "object" &&
          result.info !== null &&
          "secure_url" in result.info
        ) {
          // user clicked "Upload" then "Done"
          setPreview(result.info.secure_url as string);
        }
      }
    );

    const open = () => widget.open();
    window.addEventListener("avatar-edit", open);
    return () => window.removeEventListener("avatar-edit", open);
  }, [isEdit]);

  if (!employee) return <Loader />;

  const base = `/employees/${id}`;
  const navItems = [
    { label: "Profile", href: base, icon: assets.icons.user },
    {
      label: "Attendance",
      href: `${base}/attendance`,
      icon: assets.icons.calendar,
    },
    { label: "Projects", href: `${base}/projects`, icon: assets.icons.project },
    { label: "Leave", href: `${base}/leave`, icon: assets.icons.leaves },
  ];

  return (
    <div className="border border-[var(--border)] rounded-lg">
      {/* Top */}
      <div className="flex items-center justify-between bg-[var(--container-bg)] p-4 border-b border-[var(--border)]">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              key={preview}
              src={preview || "/assets/icons/default-avatar.png"}
              alt="Avatar"
              width={96}
              height={96}
              unoptimized
              className="rounded-lg object-cover w-24 h-24"
            />
            {isEdit && (
              <button
                onClick={() => window.dispatchEvent(new Event("avatar-edit"))}
                className="absolute bottom-0 right-0 p-1 rounded-full hover:bg-[var(--accent-hover)] transition"
                title="Change avatar"
              >
                <Image
                  src={assets.icons.editAvatar}
                  alt="Edit Avatar"
                  width={16}
                  height={16}
                />
              </button>
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {employee.name}
            </h1>
            <p className="flex items-center text-[var(--text-secondary)] space-x-2">
              <Image
                src={assets.icons.briefcase}
                alt=""
                width={16}
                height={16}
              />
              <span>{employee.designation}</span>
            </p>
            <p className="flex items-center text-[var(--text-secondary)] space-x-2">
              <Image src={assets.icons.mail} alt="" width={16} height={16} />
              <span>{employee.personalInfo.email}</span>
            </p>
          </div>
        </div>

        {isEdit ? (
          <button
            onClick={async () => {
              // Persist avatar change if any
              if (preview !== employee.avatar) {
                await dispatch(
                  updateEmployee({
                    id,
                    data: { employee: { avatar: preview } },
                  })
                );
                // Notify form to update its avatar state
                window.dispatchEvent(
                  new CustomEvent("employee-avatar-updated", {
                    detail: preview,
                  })
                );
                // Wait a tick for the form to update its state
                setTimeout(() => {
                  window.dispatchEvent(new Event("save-employee"));
                }, 100); // 100ms is usually enough
              } else {
                window.dispatchEvent(new Event("save-employee"));
              }
            }}
            className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
          >
            <Image src={assets.icons.save} alt="Save" width={16} height={16} />
            <span className="text-[var(--button-text)]">Save</span>
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = `/employees/${id}/edit`)}
            className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
          >
            <Image src={assets.icons.edit} alt="Edit" width={16} height={16} />
            <span className="text-[var(--button-text)]">Edit Profile</span>
          </button>
        )}
      </div>

      {/* Sidebar + Content */}
      <div className="flex">
        <nav className="w-1/4 bg-[var(--sidebar-bg)] p-4 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
          flex items-center px-4 py-2 space-x-2 rounded-lg transition
          ${
            active
              ? "bg-[var(--accent)] text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
          }
        `}
              >
                <Image src={item.icon} alt="" width={16} height={16} />
                <span className="text-[var(--text-primary)]">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
