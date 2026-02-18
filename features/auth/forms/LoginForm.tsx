"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authLoginSchema } from "@/features/auth/schemas/auth.schema";
import { login } from "@/features/auth/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon";
import { GoogleLoginButton } from "../components/google-login-button";
import { useSearchParams } from "next/navigation";
import { SocialAuthErrorText } from "../components/SocialAuthErrorText";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const queryError = searchParams?.get("error");
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof authLoginSchema>>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof authLoginSchema>) {
    setServerError(null);
    const data = await login(values);

    if (data?.message) {
      if (data.error) {
        setServerError(data.message);
      } else {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-background-light backdrop-blur-xl p-8 rounded-2xl shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground-primary">
            Welcome Back
          </h1>
          <p className="text-foreground-secondary mt-2">
            Sign in to continue to your workspace
          </p>
        </div>
        {(serverError || queryError) && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium animate-fade-in-up">
            <SocialAuthErrorText error={serverError || queryError || ""} />
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex  flex-col  gap-6 "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground-secondary block mb-1.5">
                      Email
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`w-full px-4 py-3 rounded-xl border ${
                          form.formState.errors.email
                            ? "border-destructive"
                            : "border-border"
                        } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-background text-foreground-primary`}
                        {...field}
                      />
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
                    <FormLabel className="text-foreground-secondary block mb-1.5 ">
                      Password
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`w-full px-4 py-3 rounded-xl border ${
                          form.formState.errors.password
                            ? "border-destructive"
                            : "border-border"
                        } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-background text-foreground-primary`}
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button
                  className="w-full bg-gradient-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="mt-8 text-center flex flex-row justify-center items-center gap-2">
          <p className="text-muted-foreground">Don't have an account? </p>
          <Link
            href="/signup"
            className="font-semibold text-primary-foreground cursor-pointer hover:text-primary-foreground/90 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
