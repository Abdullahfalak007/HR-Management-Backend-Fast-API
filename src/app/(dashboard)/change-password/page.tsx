"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useChangePassword } from "./useChangePassword";

export default function ChangePasswordPage() {
  const {
    status,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    success,
    handleSubmit,
  } = useChangePassword();

  if (status === "loading") return null;

  return (
    <Suspense>
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Change Password</h1>

        {error && <p className="mb-4 text-[var(--error)]">{error}</p>}
        {success && <p className="mb-4 text-[var(--success)]">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] py-2 rounded transition"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </div>
    </Suspense>
  );
}
