import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const include = req.nextUrl.searchParams.get("include");
  const res = await fetchWithToken(`/projects/me?include=${include}`);
  const data = await res.json();
  return NextResponse.json(data);
}
