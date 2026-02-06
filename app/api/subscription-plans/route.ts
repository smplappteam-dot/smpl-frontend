import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const billingPeriod = searchParams.get("billingPeriod"); // "MONTHLY"
  const res = await fetchWithToken(
    `/subscription-plans?billingPeriod=${billingPeriod}`,
  );
  const data = await res.json();
  return NextResponse.json(data);
}
