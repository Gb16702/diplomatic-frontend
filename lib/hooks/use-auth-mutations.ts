"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser, registerUser, logoutUser, type LoginRequest, type RegisterRequest } from "@/lib/api/auth";

export function useLoginMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response.success && response.data) {
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", response.data.access_token);
        }

        queryClient.invalidateQueries({ queryKey: ["auth"] });

        router.push("/onboarding");

        toast.success("Connexion réussie !");
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      
      if (error.errors && error.errors.length > 0) {
        error.errors.forEach((err: any) => {
          toast.error(err.message || "Erreur de connexion");
        });
      } else {
        toast.error(error.message || "Erreur de connexion");
      }
    },
  });
}

export function useRegisterMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      if (response.success && response.data) {
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", response.data.access_token);
        }

        queryClient.invalidateQueries({ queryKey: ["auth"] });

        router.push("/onboarding");

        toast.success("Inscription réussie ! Bienvenue !");
      }
    },
    onError: (error: any) => {
      console.error("Register error:", error);
      
      if (error.errors && error.errors.length > 0) {
        error.errors.forEach((err: any) => {
          toast.error(err.message || "Erreur d'inscription");
        });
      } else {
        toast.error(error.message || "Erreur d'inscription");
      }
    },
  });
}

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await logoutUser();
      } catch (error) {
        console.warn("Logout API call failed:", error);
      }
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
      }
    },
    onSuccess: () => {
      queryClient.clear();
      router.push("/auth/signin");
    },
  });
}