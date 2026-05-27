"use client";

import { getFirstName } from "@/components/AdminSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiFile, FiImage, FiEye, FiUsers } from "react-icons/fi";

interface PageInfo {
  route: string;
  filePath: string;
  routeGroup: string;
}

interface AnalyticsData {
  pageViews: string;
  visitors: string;
}

type MediaAsset = {
  id: string
  title: string
  imageUrl: string
  publicId: string
  resourceType: string
  createdAt: string
}

export default function DashboardPage() {
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [totalMedia, setTotalMedia] = useState<number | null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession();
  const router = useRouter();
  
  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  const { name } = session!.user

  async function fetchAssets() {
    const res = await fetch("/api/media")
    const data = await res.json()
    setAssets(data)
    setTotalMedia(data.length)
  }

  useEffect(() => {
    fetchAssets()
  }, [])
  

  useEffect(() => {
    fetch("/api/page-count")
      .then((res) => res.json())
      .then((data) => {
        setTotalPages(data.total);
        setPages(data.pages);
      });

    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setAnalytics(data);
      });
  }, []);

  const stats = [
    {
      label: "TOTAL PAGES",
      value: totalPages ?? "...",
      icon: <FiFile size={22} />,
      color: "bg-blue-500",
    },
    {
      label: "MEDIA FILES",
      value: totalMedia ?? "...",
      icon: <FiImage size={22} />,
      color: "bg-purple-500",
    },
    {
      label: "PAGE VIEWS",
      value: analytics?.pageViews ?? "...",
      icon: <FiEye size={22} />,
      color: "bg-green-500",
    },
    {
      label: "VISITORS",
      value: analytics?.visitors ?? "...",
      icon: <FiUsers size={22} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome back {getFirstName(name)} ! Here&apos;s what&apos;s happening with your content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`${stat.color} text-white rounded-xl p-3`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          All Pages {totalPages !== null && `(${totalPages})`}
        </h2>
        <div className="divide-y divide-gray-50">
          {pages.map((page) => (
            <div key={page.filePath} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-800 capitalize">
                  {page.route === "/" ? "Home" : page.route.replace("/", "").replace(/-/g, " ")}
                </p>
                <p className="text-xs text-gray-400">{page.filePath}</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-3 py-1">
                {page.routeGroup}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}