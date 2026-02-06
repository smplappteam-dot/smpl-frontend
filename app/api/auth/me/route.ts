import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const res = await fetchWithToken(`/auth/me`);
    console.log(res.status)
  const data = await res.json();
  return NextResponse.json(data);
}
