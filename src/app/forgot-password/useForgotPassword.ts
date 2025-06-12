"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      setError(data.message);
    } else {
      toast.success("OTP sent to your email");
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    }
    setLoading(false);
  }

  return { email, setEmail, error, loading, handleSubmit };
}
