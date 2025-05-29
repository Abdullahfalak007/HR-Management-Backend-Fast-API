import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export function useDashboardLayout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [employeeName, setEmployeeName] = useState<string | null>(null);

  useEffect(() => {
    // Check if path matches /employees/[id]
    const match = pathname.match(/^\/employees\/([^/]+)/);
    if (match) {
      const id = match[1];
      // Fetch employee data
      fetch(`/api/employees/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.name) setEmployeeName(data.name);
        })
        .catch(() => setEmployeeName(null));
    } else {
      setEmployeeName(null);
    }
  }, [pathname]);

  const { title, subtitle } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return { title: "Dashboard", subtitle: "" };

    // If on employee profile page, use name
    if (segments[0] === "employees" && segments.length >= 2 && employeeName) {
      return {
        title: `Employees / ${employeeName}`,
        subtitle: `You are now on the Employees / ${employeeName} page.`,
      };
    }

    // Default: humanize segments
    const human = segments
      .map((seg) =>
        seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      )
      .join(" / ");
    return { title: human, subtitle: `You are now on the ${human} page.` };
  }, [pathname, employeeName]);

  return { loading: status === "loading", session, title, subtitle };
}
