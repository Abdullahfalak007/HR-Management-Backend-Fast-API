"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useVerifyOtp } from "./useVerifyOtp";

function VerifyOtpForm() {
  const { otp, setOtp, error, loading, handleSubmit } = useVerifyOtp();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--container-bg)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[var(--container-bg)] text-[var(--text-primary)] space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Enter OTP</h2>

        {error && <p className="text-[var(--error)] text-center">{error}</p>}

        <div className="space-y-1">
          <label className="text-sm text-[var(--text-secondary)]">
            One-Time Code
          </label>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--accent)] py-3 rounded-lg text-lg font-medium text-[var(--button-text)] hover:bg-[var(--accent-hover)] transition"
        >
          {loading ? "Verifying OTP..." : "Verify OTP"}
        </button>

        <p className="mt-4 text-sm text-center text-[var(--text-secondary)]">
          Didn’t receive a code?{" "}
          <a
            href="/forgot-password"
            className="text-[var(--accent)] hover:underline"
          >
            Send again
          </a>
        </p>
      </form>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <VerifyOtpForm />
    </Suspense>
  );
}
