// components/admin/MediaManager.tsx
"use client"

import { useState, useEffect } from "react"

type MediaAsset = {
  id: string
  title: string
  imageUrl: string
  publicId: string
  resourceType: string
  createdAt: string
}

export default function page() {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchAssets() {
    const res = await fetch("/api/media")
    const data = await res.json()
    setAssets(data)
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  async function handleUpload() {
    if (!file || !title) return
    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)

    await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    })

    setTitle("")
    setFile(null)
    setLoading(false)
    fetchAssets()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/media/${id}`, { method: "DELETE" })
    fetchAssets()
  }

  return (
    <div>
      {/* Upload Form */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Accept both images and videos */}
        <input
          type="file"
          accept="image/*,video/*"  // 👈
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Asset Grid */}
      <div>
        {assets.map((asset) => (
          <div key={asset.id}>
            {/* Render video or image based on resourceType */}
            {asset.resourceType === "video" ? (
              <video
                src={asset.imageUrl}
                width={200}
                controls
              />
            ) : (
              <img src={asset.imageUrl} alt={asset.title} width={200} />
            )}
            <p>{asset.title}</p>
            <button onClick={() => handleDelete(asset.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}