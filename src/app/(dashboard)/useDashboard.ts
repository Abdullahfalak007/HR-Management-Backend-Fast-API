import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { isSameDay, isThisWeek, subDays } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployees } from "@/store/slices/employeeSlice";
import { fetchLeaves } from "@/store/slices/leaveSlice";
import { fetchProjects } from "@/store/slices/projectSlice";
import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

export function useDashboard() {
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const dispatch = useAppDispatch();

  const { employees, status: empStatus } = useAppSelector((s) => s.employees);
  const { items: leaves, loading: leaveLoading } = useAppSelector(
    (s) => s.leaves
  );
  const { records: attendanceItems, status: attendanceStatus } = useAppSelector(
    (s) => s.attendance
  );
  const { items: projects, loading: projectLoading } = useAppSelector(
    (s) => s.projects
  );

  // on‐mount fetch for admins
  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      dispatch(fetchEmployees());
      dispatch(fetchLeaves());
      dispatch(fetchAttendanceRecords());
      dispatch(fetchProjects());
    }
  }, [session?.user.role, dispatch]);

  const unauthorized = authStatus !== "loading" && !session;
  const isAdmin = session?.user.role === "ADMIN";
  const loading =
    authStatus === "loading" ||
    (isAdmin &&
      (empStatus === "loading" ||
        leaveLoading ||
        attendanceStatus === "loading" ||
        projectLoading));

  // non‐admin: nothing else needed here
  if (unauthorized) {
    return { router, session, authStatus, unauthorized, loading, isAdmin };
  }

  // compute metrics for admin
  const totalEmployees = employees.length;
  const totalLeaves = leaves.length;
  const totalProjects = projects.length;

  const todayCount = attendanceItems.filter((a) =>
    isSameDay(new Date(a.date), new Date())
  ).length;
  const yesterdayCount = attendanceItems.filter((a) =>
    isSameDay(new Date(a.date), subDays(new Date(), 1))
  ).length;

  const computeChange = (curr: number, prev: number) =>
    prev > 0 ? Math.round(((curr - prev) / prev) * 100) : 0;

  const employeeChange = computeChange(totalEmployees, totalEmployees - 1);
  const leaveChange = computeChange(totalLeaves, totalLeaves - 1);
  const attendanceChange = computeChange(todayCount, yesterdayCount);
  const projectChange = computeChange(totalProjects, totalProjects - 1);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const attendanceStats = weekDays.map((dayLabel, idx) => {
    const entries = attendanceItems.filter((a) => {
      const d = new Date(a.date);
      return d.getDay() === idx && isThisWeek(d, { weekStartsOn: 0 });
    });
    return {
      dayName: dayLabel,
      ON_TIME: entries.filter((a) => a.status === "ON_TIME").length,
      LATE: entries.filter((a) => a.status === "LATE").length,
      ABSENT: entries.filter((a) => a.status === "ABSENT").length,
    };
  });

  const recentAttendance = attendanceItems
    .slice()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5)
    .map((a) => {
      const emp = employees.find((e) => e.id === a.employeeId);
      if (!emp) return null; // skip if employee not found
      return {
        id: a.id,
        employee: {
          id: emp.id,
          name: emp.name,
          avatar: emp.avatar,
          designation: emp.designation,
          type: emp.type,
        },
        checkIn: a.checkIn,
        checkOut: a.checkOut,
        status: a.status,
      };
    })
    .filter(Boolean); // remove nulls

  return {
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
  };
}
