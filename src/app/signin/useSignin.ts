"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error("Invalid email or password");
      setError("Invalid email or password");
    } else {
      toast.success("Signed in successfully");
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
