import { SignInForm } from "@/features/auth/components/sign-in-form";
import { LoginForm } from "@/features/auth/forms/LoginForm";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm></LoginForm>
      </Suspense>
    </div>
  );
}
