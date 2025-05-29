import { Employee } from "@/types/types";
import { useEffect, useState } from "react";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    const data: Employee[] = await res.json();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, refresh: fetchEmployees };
}
