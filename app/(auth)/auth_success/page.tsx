"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { exchangeToken } from "@/features/auth/actions/auth";

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const exchangeTokenValue = searchParams.get("exchange_token");
  console.log(exchangeTokenValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    if (!exchangeTokenValue) {
      setError("No exchange token provided");
      setLoading(false);
      return;
    }

    processedRef.current = true;

    const performExchange = async () => {
      try {
        const result = await exchangeToken(exchangeTokenValue);
        if ("success" in result && result.success) {
          router.push("/");
        } else if ("error" in result) {
          setError(result.message || "Failed to exchange token");
        } else {
          setError("Unknown response from server");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    performExchange();
  }, [exchangeTokenValue, router]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Authenticating...
      </div>
    );
  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <h1>Hello</h1>
  );
}
