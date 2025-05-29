"use client";
import React from "react";
import { assets } from "@/constants/assets";
import Image from "next/image";

type Props = {
  isEditing: boolean;
  data: Record<string, string | null>;
  onChange: (update: Partial<Props["data"]>) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function StepDocuments({
  isEditing,
  data,
  onChange,
  onBack,
  onNext,
}: Props) {
  const FIELDS = [
    { name: "appointmentLetter", label: "Upload Appointment Letter" },
    { name: "salarySlip", label: "Upload Salary Slips" },
    { name: "relievingLetter", label: "Upload Relieving Letter" },
    { name: "experienceLetter", label: "Upload Experience Letter" },
  ];

  function openUploadWidget(fieldName: string) {
    if (!window.cloudinary) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: "hr-management/docs",
        resourceType: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Upload error:", error);
          return;
        }
        if (
          result &&
          typeof result === "object" &&
          "event" in result &&
          result.event === "success" &&
          "info" in result &&
          result.info &&
          typeof result.info === "object" &&
          "secure_url" in result.info
        ) {
          onChange({ [fieldName]: result.info.secure_url as string });
        }
      }
    );
    widget.open();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {FIELDS.map(({ name, label }) => (
          <div key={name} className="space-y-2">
            <p className="text-[var(--text-primary)] font-medium">{label}</p>
            <div
              onClick={() => openUploadWidget(name)}
              className="h-40 border-2 border-dashed border-[var(--accent)] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[var(--surface-hover)] transition"
            >
              <div className="w-10 h-10 mb-2 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <Image
                  src={assets.icons.upload}
                  alt="Upload"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <p className="text-[var(--text-secondary)]">
                Drag & Drop or{" "}
                <span className="text-[var(--accent)] underline">
                  choose file
                </span>{" "}
                to upload
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Supported formats: <strong>.pdf</strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Prev/Next only when Adding */}
      {!isEditing && (
        <div className="flex justify-end space-x-3">
          <button
            onClick={onBack}
            className="
              px-4 py-2 rounded
              bg-[var(--surface)]
              border border-[var(--border)]
              text-[var(--text-primary)]
              hover:bg-[var(--surface-hover)]
              transition
            "
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="
              px-4 py-2 rounded
              bg-[var(--accent)] hover:bg-[var(--accent-hover)]
              text-[var(--button-text)]
              transition
            "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
