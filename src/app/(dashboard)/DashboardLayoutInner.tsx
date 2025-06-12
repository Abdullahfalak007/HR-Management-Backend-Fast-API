"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";

export default function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Protect route
  if (!isAuthenticated) {
    if (typeof window !== "undefined") router.replace("/signin");
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          title={""}
          subtitle={""}
          onMenuClick={() => setSidebarOpen((o) => !o)}
        />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
