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
  FormDescription,
} from "@/components/ui/form";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import { registerUser } from "@/lib/api/auth";
import { toast } from "sonner";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpFormData) {
    setIsLoading(true);
    
    try {
      const response = await registerUser(data);
      
      if (response.error) {
        // Handle API errors
        const errorMessage = response.error.detail?.[0]?.msg || "Account creation failed. Please try again.";
        toast.error(errorMessage);
        return;
      }

      if (response.data) {
        toast.success(response.data.message || "Account created successfully!");
        
        // If verification is required, show a message
        if (response.data.verification_required) {
          toast.info("Please check your email for verification instructions.");
        }

        // Redirect to sign-in page
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Start learning today"
      subtitle="Join the masters and start your journey"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>User Name</FormLabel>
                <FormControl>
                  <div className="input-wrapper">
                    <Input
                      type="text"
                      placeholder="hector"
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
                <FormDescription className="text-xs text-gray-dark">
                  Must be at least 8 characters
                </FormDescription>
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
            Create account
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-dark">
          Already have an account? {" "}
          <Link
            href="/sign-in"
            className="font-medium text-orange hover:text-orange-dark transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}