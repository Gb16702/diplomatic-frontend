"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/ui/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";
import { loginUser } from "@/lib/api/auth";
import { toast } from "sonner";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true);
    
    try {
      const response = await loginUser(data);
      
      if (response.error) {
        // Handle API errors
        const errorMessage = response.error.detail?.[0]?.msg || "Sign in failed. Please try again.";
        toast.error(errorMessage);
        return;
      }

      if (response.data) {
        toast.success(response.data.message || "Successfully signed in!");
        
        // Store session info if needed
        if (response.data.session_id) {
          localStorage.setItem("session_id", response.data.session_id);
        }

        // Redirect to dashboard or home
        router.push("/");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Continue learning"
      subtitle="Reconnect with the wisdom of the masters"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Enter your email</FormLabel>
                <FormControl>
                  <div className="input-wrapper">
                    <Input
                      type="email"
                      placeholder="hector@gmail.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Enter your pasword</FormLabel>
                <FormControl>
                  <div className="input-wrapper">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            size="default"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Sign in
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-dark">
          No account yet ?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-orange hover:text-orange-dark transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}