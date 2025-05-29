"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useForgotPassword } from "./useForgotPassword";

export default function ForgotPasswordPage() {
  const { email, setEmail, error, loading, handleSubmit } = useForgotPassword();

  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center bg-[var(--container-bg)] px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[var(--container-bg)] text-[var(--text-primary)] space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
          <p className="text-center text-[var(--text-secondary)]">
            Enter your registered email address; we’ll send you a code to reset
            your password.
          </p>

          {error && <p className="text-[var(--error)] text-center">{error}</p>}

          <div className="space-y-1">
            <label className="text-sm text-[var(--text-secondary)]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] py-3 rounded-lg text-lg font-medium text-[var(--button-text)] hover:bg-[var(--accent-hover)] transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <p className="mt-4 text-sm text-center text-[var(--text-secondary)]">
            Remembered your password?{" "}
            <a href="/signin" className="text-[var(--accent)] hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </Suspense>
  );
}
