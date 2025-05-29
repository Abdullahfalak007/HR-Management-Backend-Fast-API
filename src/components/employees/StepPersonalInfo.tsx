"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/constants/assets";

type Props = {
  isEditing: boolean;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    maritalStatus: string;
    gender: string;
    nationality: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  avatarUrl: string;
  onChange: (update: Partial<Props["data"]>) => void;
  onAvatarChange: (url: string) => void;
  onNext: () => void;
};

export default function StepPersonalInfo({
  isEditing,
  data,
  avatarUrl,
  onChange,
  onAvatarChange,
  onNext,
}: Props) {
  const [preview, setPreview] = useState<string>(avatarUrl);

  useEffect(() => {
    setPreview(avatarUrl);
  }, [avatarUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ [e.target.name]: e.target.value });
  };

  const inputCls =
    "h-12 w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 placeholder-[var(--input-placeholder)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]";

  return (
    <div className="space-y-6">
      {/* Avatar Upload only when Adding */}
      {!isEditing && (
        <div className="flex items-center space-x-4">
          <div
            onClick={() => {
              if (!window.cloudinary) return;
              const widget = window.cloudinary.createUploadWidget(
                {
                  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                  uploadPreset:
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
                  folder: "hr-management/avatars",
                  resourceType: "image",
                  cropping: true,
                  croppingAspectRatio: 1,
                  showAdvancedOptions: false,
                  multiple: false,
                  croppingShowDimensions: true,
                  croppingDefaultSelectionRatio: 1,
                },
                (error, result) => {
                  if (error) return;
                  if (
                    result &&
                    typeof result === "object" &&
                    "event" in result &&
                    result.event === "success" &&
                    "info" in result &&
                    result.info &&
                    typeof result.info === "object" &&
                    "secure_url" in result.info &&
                    typeof result.info.secure_url === "string"
                  ) {
                    onAvatarChange(result.info.secure_url);
                  }
                }
              );
              widget.open();
            }}
            title="Upload Avatar"
            role="button"
            className="
              flex items-center justify-center
              w-24 h-24
              bg-[var(--surface)]
              rounded-md
              overflow-hidden
              cursor-pointer
              border border-transparent
              hover:bg-[var(--surface-hover)]
              hover:border-[var(--accent)]
              transition
            "
          >
            {preview ? (
              <Image
                src={preview}
                alt="Avatar preview"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={assets.icons.camera}
                alt="Upload avatar"
                width={32}
                height={32}
                className="m-auto"
              />
            )}
          </div>
        </div>
      )}

      {/* Main Fields */}
      <div className="grid grid-cols-2 gap-6">
        <input
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={data.lastName}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          name="phone"
          placeholder="Mobile Number"
          value={data.phone}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          name="dob"
          type="date"
          value={data.dob}
          onChange={handleChange}
          className={inputCls}
        />
        <select
          name="maritalStatus"
          value={data.maritalStatus}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">Marital Status</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
        </select>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <select
          name="nationality"
          value={data.nationality}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">Nationality</option>
          <option>Pakistan</option>
          <option>Foreign</option>
        </select>
        <input
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={handleChange}
          className={`${inputCls} col-span-2`}
        />
      </div>

      {/* Last row */}
      <div className="grid grid-cols-3 gap-6">
        <select
          name="city"
          value={data.city}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">City</option>
          <option>Karachi</option>
          <option>Lahore</option>
          <option>Islamabad</option>
          <option>Faisalabad</option>
          <option>Peshawar</option>
          <option>Multan</option>
          <option>Quetta</option>
        </select>
        <select
          name="state"
          value={data.state}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">State</option>
          <option>Sindh</option>
          <option>Punjab</option>
          <option>Khyber Pakhtunkhwa</option>
          <option>Balochistan</option>
        </select>
        <input
          name="zipCode"
          placeholder="ZIP Code"
          value={data.zipCode}
          onChange={handleChange}
          className={inputCls}
        />
      </div>

      {/* Next */}
      {!isEditing && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] rounded-lg transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
