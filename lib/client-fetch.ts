// lib/apiFetch.ts
import { useAuthStore } from "@/stores/useAuthStore";

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function clientFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (!res.ok) {
    let body: any = null;

    try {
      body = await res.json();
    } catch {}

    const status = res.status;
    const code = body?.code;
    const message =
      body?.message ||
      (status === 401
        ? "Not authenticated"
        : status === 403
        ? "Access denied"
        : status === 404
        ? "Not found"
        : status === 400
        ? "Invalid request"
        : "Server error");

    // 🚨 Auto logout on 401 only
    if (status === 401) {
      useAuthStore.getState().logout();
    }

    throw new ApiError(message, status, code);
  }

  return res.json();
}
