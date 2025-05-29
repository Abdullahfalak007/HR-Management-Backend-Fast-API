//src/app/reset-password/page.tsx
"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useResetPassword } from "./useResetPassword";

function ResetPasswordForm() {
  const {
    email,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    message,
    error,
    loading,
    handleSubmit,
  } = useResetPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--container-bg)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[var(--container-bg)] text-[var(--text-primary)] space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>

        {error && <p className="text-[var(--error)] text-center">{error}</p>}
        {message && (
          <p className="text-[var(--success)] text-center">{message}</p>
        )}

        <div className="space-y-1">
          <label className="text-sm text-[var(--text-secondary)]">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full bg-[var(--surface)] border border-[var(--accent)] rounded-lg p-3 text-[var(--text-secondary)] outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-[var(--text-secondary)]">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-[var(--text-secondary)]">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--accent)] py-3 rounded-lg text-lg font-medium text-[var(--button-text)] hover:bg-[var(--accent-hover)] transition"
        >
          {loading ? "Reseting Password..." : "Reset Password"}
        </button>

        <p className="mt-4 text-sm text-center text-[var(--text-secondary)]">
          Remembered your password?{" "}
          <a href="/signin" className="text-[var(--accent)] hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
