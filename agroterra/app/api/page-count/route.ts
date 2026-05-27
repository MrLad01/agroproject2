import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

interface PageInfo {
  route: string;
  filePath: string;
  routeGroup: string;
}

function getRouteGroup(filePath: string): string {
  const match = filePath.match(/\(([^)]+)\)/);
  return match ? `(${match[1]})` : "root";
}

function buildRoute(filePath: string, appDir: string): string {
  const route = filePath
    .replace(appDir, "")
    .replace(/\\/g, "/")
    .replace(/\/page\.tsx$/, "")
    .replace(/\/page\.ts$/, "")
    .replace(/\([^)]+\)\//g, "")
    .replace(/^\//, "/");
  return route === "" ? "/" : route;
}

function findPages(dir: string, appDir: string): PageInfo[] {
  const pages: PageInfo[] = [];
  if (!fs.existsSync(dir)) return pages;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (
      entry.isDirectory() &&
      entry.name !== "node_modules" &&
      entry.name !== ".next" &&
      entry.name !== "api"
    ) {
      pages.push(...findPages(fullPath, appDir));
    } else if (entry.name === "page.tsx" || entry.name === "page.ts") {
      pages.push({
        route: buildRoute(fullPath, appDir),
        filePath: fullPath.replace(process.cwd(), ""),
        routeGroup: getRouteGroup(fullPath),
      });
    }
  }
  return pages;
}

export async function GET() {
  const appDir = path.join(process.cwd(), "app");
  const pages = findPages(appDir, appDir);

  return NextResponse.json({
    total: pages.length,
    pages,
  });
}