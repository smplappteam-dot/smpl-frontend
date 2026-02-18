"use server";

import { authLoginSchema, authSignupSchema } from "../schemas/auth.schema";
import { z } from "zod";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchWithToken } from "@/lib/fetcher";
export async function logout() {
  console.log("logout");
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("refresh_token");
  redirect(`/login`);
}
export async function login(
  unsafeData: z.infer<typeof authLoginSchema>,
): Promise<{ error: boolean; message: string } | undefined> {
  const { success, data } = authLoginSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true, message: "Invalid input data" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/email/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: result.message || "Invalid email or password",
      };
    }

    const { token, refreshToken } = result.data;

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.error("Login error:", error);
    return { error: true, message: "Something went wrong. Please try again." };
  }

  redirect(`/`);
}

export async function exchangeToken(exchangeToken: string) {
  try {
    const response = await fetchWithToken("/auth/exchange-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exchangeToken }),
    });

    if (!response.ok) {
      console.log("error");
      return { error: true, message: "Token exchange failed" };
    }

    const result = await response.json();
    const { token, refreshToken } = result.data;
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return { success: true };
  } catch (err) {
    console.log(err);
  }
}

export async function confirmEmail(hash: string) {
  const response = await fetchWithToken("/auth/email/confirm-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hash }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return { error: true, message: errorData.message || "Verification failed" };
  }

  const result = await response.json();
  const { token, refreshToken } = result.data;

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { success: true };
}

export async function signup(
  unsafeData: z.infer<typeof authSignupSchema>,
): Promise<
  | { error?: boolean; message?: string; success?: boolean; data?: any }
  | undefined
> {
  const { success, data } = authSignupSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true, message: "Validation Error" };
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/email/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return { error: true, message: errorData.message || "Registration failed" };
  }
  return;
}
