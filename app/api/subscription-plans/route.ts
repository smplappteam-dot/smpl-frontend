import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const billingPeriod = searchParams.get("billingPeriod");

  const endpoint = billingPeriod
    ? `/subscription-plans?billingPeriod=${billingPeriod}`
    : "/subscription-plans";

  const res = await fetchWithToken(endpoint);
  const data = await res.json();
  return NextResponse.json(data);
}
