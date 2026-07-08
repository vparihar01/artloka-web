import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const deployHook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!deployHook) return NextResponse.json({ message: "Catalogue redeploy skipped because no deploy hook is configured." }, { status: 200 });

  const response = await fetch(deployHook, { method: "POST", cache: "no-store" });
  if (!response.ok) return NextResponse.json({ message: "Unable to trigger catalogue deployment." }, { status: 502 });
  return NextResponse.json({ message: "Catalogue deployment triggered." });
}
