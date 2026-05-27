import { NextResponse } from "next/server";

const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

export async function GET() {
  if (!VERCEL_API_TOKEN || !VERCEL_PROJECT_ID) {
    return NextResponse.json(
      { error: "Missing VERCEL_API_TOKEN or VERCEL_PROJECT_ID" },
      { status: 500 }
    );
  }

  try {
    // Date range: last 30 days
    const now = new Date();
    const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const fromStr = from.toISOString().split("T")[0]; // e.g. 2026-04-26
    const toStr = now.toISOString().split("T")[0];     // e.g. 2026-05-26

    const baseUrl = `https://vercel.com/api/web/insights/stats`;
    const params = new URLSearchParams({
      projectId: VERCEL_PROJECT_ID,
      from: fromStr,
      to: toStr,
      environment: "production",
    });

    const headers = {
      Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      "Content-Type": "application/json",
    };

    // Fetch page views and unique visitors in parallel
    const [viewsRes, visitorsRes] = await Promise.all([
      fetch(`${baseUrl}/pageviews?${params}`, { headers }),
      fetch(`${baseUrl}/visitors?${params}`, { headers }),
    ]);

    const viewsData = await viewsRes.json();
    const visitorsData = await visitorsRes.json();

    console.log(viewsData);

    // Total from the data array
    const totalViews: number = viewsData.data?.reduce(
      (sum: number, d: { total: number }) => sum + (d.total ?? 0),
      0
    ) ?? 0;

    const totalVisitors: number = visitorsData.data?.reduce(
      (sum: number, d: { total: number }) => sum + (d.total ?? 0),
      0
    ) ?? 0;

    return NextResponse.json({
      pageViews: formatNumber(totalViews),
      visitors: formatNumber(totalVisitors),
      raw: {
        pageViews: totalViews,
        visitors: totalVisitors,
      },
      period: { from: fromStr, to: toStr },
    });
  } catch (error) {
    console.error("Vercel analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

// Format numbers like 12500 → "12.5k"
function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
  return num.toString();
}