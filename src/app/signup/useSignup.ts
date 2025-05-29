"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Signup failed");
      setError(data.message);
    } else {
      toast.success("Account created — please sign in");
      router.push("/signin");
    }
    setLoading(false);
  }

  return {
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
  };
}
