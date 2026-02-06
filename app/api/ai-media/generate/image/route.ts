import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const res = await fetchWithToken(`/ai-media/generate/image`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return NextResponse.json(data);
}
