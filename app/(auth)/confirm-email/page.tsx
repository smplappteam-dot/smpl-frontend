"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { confirmEmail } from "@/features/auth/actions/auth";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hash = searchParams?.get("hash");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  useEffect(() => {
    if (!hash) {
      setError("No hash provided");
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await confirmEmail(hash);

        // Check for error in response
        if (res?.error) {
          setError(res.message || "Invalid response from server");
          setStatus("error");
          return;
        }

        // If verification is successful (which now sets cookies internally)
        if (res?.success) {
          setStatus("success");
          // Small delay to show success message before redirect
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          // Fallback for unexpected response structure
          setError("Verification failed");
          setStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("An error occurred during verification");
        setStatus("error");
      }
    };

    verifyEmail();
  }, [hash, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-background">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          {status === "verifying" && "Verifying your email..."}
          {status === "success" && "Email verified!"}
          {status === "error" && "Verification Failed"}
        </h2>

        {status === "verifying" && (
          <p className="mt-4 text-muted-foreground">
            Please wait while we confirm your email address.
          </p>
        )}

        {status === "success" && (
          <p className="mt-4 text-green-600">Redirecting you to the app...</p>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-md bg-destructive/10 text-destructive">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-foreground">Loading...</div>
        </div>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}
