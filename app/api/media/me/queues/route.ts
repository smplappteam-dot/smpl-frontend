import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetchWithToken(`/media/me/queues`);
  const data = await res.json();
  return NextResponse.json(data);
}
