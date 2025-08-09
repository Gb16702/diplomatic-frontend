"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser as apiGetCurrentUser, type User } from "@/lib/api/auth";

async function getCurrentUser(): Promise<User | null> {
  if (typeof window === "undefined") return null;
  
  const token = localStorage.getItem("auth-token");
  if (!token) return null;

  try {
    const response = await apiGetCurrentUser();
    return response.data || null;
  } catch (error) {
    localStorage.removeItem("auth-token");
    return null;
  }
}

export function useAuthState() {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["auth", "current-user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });

  const isAuthenticated = !!user;
  const isUnauthenticated = !isLoading && !user;

  return {
    user,
    isAuthenticated,
    isUnauthenticated,
    isLoading,
    error,
    refetch,
  };
}

export function useHasToken() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("auth-token");
}