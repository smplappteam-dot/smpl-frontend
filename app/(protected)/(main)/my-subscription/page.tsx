"use client";

import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MySubscriptionPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 md:p-10 max-w-4xl ">
      <div className="space-y-8">
        <div className="border-b border-border/40 pb-6">
          <h1 className="text-3xl font-bold text-primary-foreground">
            My Subscription
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your current plan and billing details
          </p>
        </div>

        <div className="grid gap-8">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-secondary-foreground">
              Current Plan
            </h2>
            <div className="bg-background-light border border-white/5 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-3xl font-bold text-primary-foreground capitalize mb-1">
                  {user.plan}
                </div>
                <p className="text-muted-foreground text-sm">
                  You are currently subscribed to the {user.plan} plan.
                </p>
              </div>
              <Button
                variant="destructive"
                className="shrink-0"
                onClick={() => router.push("/")}
              >
                Cancel My Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
