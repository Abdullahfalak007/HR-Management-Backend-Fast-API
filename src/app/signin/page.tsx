"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { assets } from "@/constants/assets";
import { useSignin } from "./useSignin";
import { Suspense } from "react";

export default function SigninPage() {
  const {
    email,
    password,
    remember,
    error,
    loading,
    setEmail,
    setPassword,
    setRemember,
    handleSubmit,
  } = useSignin();

  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center bg-[var(--container-bg)] px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[var(--container-bg)] text-[var(--text-primary)] space-y-6"
        >
          <div className="flex items-end justify-center space-x-3">
            <Image
              src={assets.images.logo}
              alt="HR Search Logo"
              width={100}
              height={100}
            />
            <Image
              src={assets.images.hrSearchText}
              alt="HR SEARCH"
              width={200}
              height={50}
              className="-ml-6"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold">Welcome</h3>
            <p className="text-[var(--text-secondary)]">Please login here</p>
          </div>

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
                src={assets.icons.eye}
                alt="Show password"
                width={20}
                height={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-5 w-5 rounded border-[var(--accent)] bg-transparent text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span>Remember Me</span>
            </label>
            <a
              href="/forgot-password"
              className="text-[var(--accent)] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--accent)] py-3 rounded-lg text-lg font-medium text-[var(--button-text)] hover:bg-[var(--accent-hover)] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-sm text-center text-[var(--text-secondary)]">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[var(--accent)] hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </Suspense>
  );
}
