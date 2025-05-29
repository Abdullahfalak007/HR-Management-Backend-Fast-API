"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { useSignup } from "./useSignup";
import { Suspense } from "react";

export default function SignupPage() {
  const {
    name,
    email,
    password,
    remember,
    error,
    loading,
    setName,
    setEmail,
    setPassword,
    setRemember,
    handleSubmit,
  } = useSignup();

  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center bg-[var(--container-bg)] px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[var(--container-bg)] text-[var(--text-primary)] space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">Create Account</h2>

          {error && <p className="text-[var(--error)] text-center">{error}</p>}

          <div className="space-y-1">
            <label className="text-sm text-[var(--text-secondary)]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

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

          <div className="space-y-1">
            <label className="text-sm text-[var(--text-secondary)]">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 pr-10 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
              />
              <Image
                src="/assets/icons/eyeIcon.svg"
                alt="Show password"
                width={20}
                height={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="h-5 w-5 rounded border-[var(--accent)] bg-transparent text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <span>Remember Me</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] py-3 rounded-lg text-lg font-medium text-[var(--button-text)] hover:bg-[var(--accent-hover)] transition"
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm text-center text-[var(--text-secondary)]">
            Already have an account?{" "}
            <a href="/signin" className="text-[var(--accent)] hover:underline">
              {loading ? "Singing in..." : "Sign In"}
            </a>
          </p>
        </form>
      </div>
    </Suspense>
  );
}
