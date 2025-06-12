import { useAuth as useAppAuth } from "@/app/AuthProvider";

const useAuth = () => {
  return useAppAuth();
};

export default useAuth;
