"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import { assets } from "@/constants/assets";
import StatsCard from "@/components/dashboard/StatsCard";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import RecentAttendanceTable from "@/components/dashboard/RecentAttendanceTable";
import { useDashboard } from "./useDashboard";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export default function DashboardPage() {
  const {
    router,
    session,
    authStatus,
    unauthorized,
    loading,
    isAdmin,
    totalEmployees,
    totalLeaves,
    totalProjects,
    todayCount,
    employeeChange,
    leaveChange,
    attendanceChange,
    projectChange,
    attendanceStats,
    recentAttendance,
  } = useDashboard();

  if (authStatus === "loading") return <p className="p-6">Loading…</p>;
  if (unauthorized) return <p className="p-6">Unauthorized</p>;

  // non-admin welcome screen
  if (!isAdmin) {
    return (
      <Suspense>
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
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
              className="logo-text -ml-6 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Welcome, {session?.user.name}!
          </h1>
          <p className="text-[var(--text-secondary)] text-center">
            Enjoy your personalized dashboard. Check your profile for the latest
            updates.
          </p>
          <button
            onClick={() => router.push("/profile")}
            className="bg-[var(--accent)] text-[var(--button-text)] px-6 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition"
          >
            Go to Profile
          </button>
          <p className="text-[var(--text-secondary)] text-sm mt-6">
            This Application is developed by Abdullah.
          </p>
        </div>
      </Suspense>
    );
  }

  if (loading) return <Loader />;

  return (
    <Suspense>
      <div className="space-y-6 p-6">
        {/* Stats Cards */}
        <div className="border border-[var(--border)] rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatsCard
              title="Total Employees"
              value={totalEmployees}
              icon={assets.icons.employees}
              change={employeeChange}
              positive
            />
            <StatsCard
              title="Total Leaves"
              value={totalLeaves}
              icon={assets.icons.leave}
              change={leaveChange}
              positive
            />
            <StatsCard
              title="Today Attendance"
              value={todayCount}
              icon={assets.icons.attendance}
              change={attendanceChange}
              positive={false}
            />
            <StatsCard
              title="Total Projects"
              value={totalProjects}
              icon={assets.icons.projects}
              change={projectChange}
              positive
            />
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="border border-[var(--border)] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Attendance Overview
          </h2>
          <AttendanceChart data={attendanceStats} />
        </div>

        {/* Recent Attendance */}
        <div className="border border-[var(--border)] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Recent Attendance
          </h2>
          <RecentAttendanceTable
            rows={recentAttendance.filter(
              (row): row is NonNullable<typeof row> => row !== null
            )}
          />
        </div>
      </div>
    </Suspense>
  );
}
