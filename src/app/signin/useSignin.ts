"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/app/AuthProvider";

export function useSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.detail || "Invalid email or password");
      setError(data.detail || "Invalid email or password");
    } else {
      toast.success("Signed in successfully");
      login(data.user, data.access_token);
      router.push("/");
    }
    setLoading(false);
  }

  return {
    email,
    password,
    remember,
    error,
    loading,
    setEmail,
    setPassword,
    setRemember,
    handleSubmit,
  };
}
