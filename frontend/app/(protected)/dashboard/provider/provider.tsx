"use client";

import { useAuth } from "@/hooks/user-auth";
import { useUserStore } from "@/store/useStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const {setIsLoading}=useAuth();

  useEffect(() => {
    if (status === "loading") return;
    console.log("Session status:", session);
    if (session?.user) {
      setUser(session.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      setUser(undefined);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [session, status]);

  return null;
}
