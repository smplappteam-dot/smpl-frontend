import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const paramsData = await params;
  const projectId = paramsData.id;
  const body = await req.json();
  const res = await fetchWithToken(`/projects/${projectId}/edit-name`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return NextResponse.json(json);
}
