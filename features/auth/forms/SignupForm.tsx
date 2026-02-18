"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GoogleLoginButton } from "../components/google-login-button";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSignupSchema } from "../schemas/auth.schema";
import { signup } from "../actions/auth";
import { z } from "zod";
import { Input } from "@/components/ui/input";

type SignupFormData = z.infer<typeof authSignupSchema>;

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryError = searchParams?.get("error");
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(authSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      console.log(data);
      const result = await signup(data);

      if (result?.error) {
        setServerError(result.message || "An error occurred during signup");
      } else {
        router.push("/signup/success");
      }
    } catch (err) {
      console.error(err);
      setServerError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto ">
      <div className="bg-background-light backdrop-blur-xl p-8 rounded-2xl shadow-xl ">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground-primary">
            Create Account
          </h1>
          <p className="text-foreground-secondary mt-2">
            Get started with your free account today
          </p>
        </div>

        {(serverError || queryError) && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium animate-fade-in-up">
            {serverError || queryError}
          </div>
        )}

        <div className="space-y-4">
          <GoogleLoginButton
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/user`;
            }}
          />

          <div className="relative flex items-center gap-4 my-6">
            <div className="h-px bg-border flex-1" />
            <span className="text-foreground-secondary text-sm font-medium">
              OR
            </span>
            <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-foreground-secondary mb-1.5"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? "border-destructive" : "border-border"} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-background  text-foreground-primary`}
                  placeholder="John"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-foreground-secondary mb-1.5"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.lastName ? "border-destructive" : "border-border"} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-background focus:bg-background text-foreground-primary`}
                  placeholder="Doe"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-foreground-secondary mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-destructive" : "border-border"} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-background focus:bg-background text-foreground-primary`}
                placeholder="name@company.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-foreground-secondary mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? "border-destructive" : "border-border"} focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-background focus:bg-background text-foreground-primary`}
                placeholder="Create a strong password"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] mt-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center flex flex-row justify-center items-center gap-2">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            
          </p>
          <Link
              href="/login"
              className="font-semibold text-primary-foreground cursor-pointer hover:text-primary-foreground/90 transition-colors"
            >
              Log in
            </Link>
        </div>
      </div>
    </div>
  );
}
