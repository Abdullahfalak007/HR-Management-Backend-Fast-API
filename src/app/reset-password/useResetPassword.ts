"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export function useResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const e = params.get("email");
    if (!e) {
      router.replace("/forgot-password");
    } else {
      setEmail(e);
    }
  }, [params, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      setError(data.message);
    } else {
      toast.success(data.message);
      setMessage(data.message);
      setTimeout(() => router.push("/signin"), 2000);
    }
    setLoading(false);
  }

  return {
    email,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    message,
    error,
    loading,
    handleSubmit,
  };
}
