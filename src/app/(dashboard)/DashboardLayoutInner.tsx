"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/common/Loader";
import { useDashboardLayout } from "./useDashboardLayout";
import { useRouter } from "next/navigation";

export default function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, session, title, subtitle } = useDashboardLayout();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/signin");
    }
  }, [loading, session, router]);

  if (!session) return null; // Don't render anything while redirecting

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen((o) => !o)}
        />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
