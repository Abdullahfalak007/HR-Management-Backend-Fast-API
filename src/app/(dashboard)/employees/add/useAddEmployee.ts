import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useStore";
import { createEmployee } from "@/store/slices/employeeSlice";
import { FormState } from "@/types/types";

export function useAddEmployee() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCreate = async (data: FormState) => {
    await dispatch(createEmployee(data));
    router.push("/employees");
  };

  return { handleCreate };
}
