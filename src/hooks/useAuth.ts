// File: src/hooks/useAuth.ts
import { useSession, signIn, signOut } from "next-auth/react";

const useAuth = () => {
  const { data: session, status } = useSession();

  const login = (provider: string) => signIn(provider);
  const logout = () => signOut();

  return { session, status, login, logout };
};

export default useAuth;
