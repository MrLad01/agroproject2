"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────
type MediaAsset = {
  id: string;
  title: string;
  imageUrl: string;
  resourceType: string;
};

type RoomSlide = {
  id: string;
  order: number;
  active: boolean;
  assetId: string;
  asset: MediaAsset;
};

type RoomHeroText = {
  id: string;
  heading: string;
  subtext: string;
};

type RoomTabParagraph = {
  id: string;
  text: string;
  order: number;
};

type RoomTab = {
  id: string;
  key: string;
  eyebrow: string;
  title: string;
  tagline: string;
  size?: string;
  beds?: string;
  bath?: string;
  guests?: string;
  videoSrc?: string;
  order: number;
  imageId?: string;
  image?: MediaAsset;
  paragraphs: RoomTabParagraph[];
};

type RoomImage = {
  id: string;
  order: number;
  assetId: string;
  asset: MediaAsset;
};

type Room = {
  id: string;
  roomNumber: string;
  floor?: string;
  view?: string;
  isActive: boolean;
  notes?: string;
};

type RoomType = {
  id: string;
  name: string;
  slug: string;
  label?: string;
  description?: string;
  tagline?: string;
  basePrice: string;
  sizeSqm?: number;
  maxGuests: number;
  beds: string;
  bathrooms: number;
  order: number;
  heroImageId?: string;
  heroImage?: MediaAsset;
  images: RoomImage[];
  tabs: RoomTab[];
  rooms: Room[];
};

// ── Tokens ────────────────────────────────────────────────────────
const T = {
  bg:         "#09120a",
  surface:    "#0f1a0f",
  surfaceHi:  "#142014",
  border:     "#1c2e1c",
  borderHi:   "#2a422a",
  accent:     "#7ec850",
  accentDim:  "rgba(126,200,80,0.10)",
  accentGlow: "rgba(126,200,80,0.22)",
  heading:    "#d4efb0",
  body:       "#85a865",
  muted:      "#3e5e3e",
  danger:     "#e05252",
  dangerDim:  "rgba(224,82,82,0.10)",
  warn:       "#e0a830",
  warnDim:    "rgba(224,168,48,0.10)",
};

// ── Small reusables ───────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
      textTransform: "uppercase" as const, color: T.accent }}>
      {children}
    </span>
  );
}

function Badge({ children, color = T.accent }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
      textTransform: "uppercase" as const, color,
      background: `${color}18`, border: `1px solid ${color}33`,
      padding: "3px 9px", borderRadius: 20 }}>
      {children}
    </span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 14, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ title, badge, action }: {
  title: string; badge?: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div style={{ padding: "16px 22px", borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 3, height: 16, background: T.accent,
          borderRadius: 3, display: "block" }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: T.heading,
          letterSpacing: "0.03em" }}>{title}</span>
        {badge}
      </div>
      {action}
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, hint, type = "text" }: {
  label: string; value: string | number; onChange: (v: string) => void;
  multiline?: boolean; hint?: string; type?: string;
}) {
  const base: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
    borderRadius: 8, padding: "9px 12px",
    color: T.heading, fontSize: 13, fontFamily: "inherit",
    outline: "none", resize: multiline ? "vertical" : "none",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ marginBottom: 5 }}><Label>{label}</Label></div>
      {hint && <p style={{ fontSize: 11, color: T.muted, marginBottom: 5 }}>{hint}</p>}
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)}
            style={{ ...base, minHeight: 72 }} />
        : <input type={type} value={value}
            onChange={e => onChange(e.target.value)} style={base} />
      }
    </div>
  );
}

function SaveBtn({ onClick, saving, label = "Save Changes" }: {
  onClick: () => void; saving: boolean; label?: string;
}) {
  return (
    <button onClick={onClick} disabled={saving}
      style={{ marginTop: 6, padding: "9px 24px", background: T.accent,
        color: "#09120a", border: "none", borderRadius: 8, fontSize: 11,
        fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const,
        cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}>
      {saving ? "Saving…" : label}
    </button>
  );
}

function IconBtn({ onClick, children, danger = false, title }: {
  onClick: () => void; children: React.ReactNode; danger?: boolean; title?: string;
}) {
  return (
    <button onClick={onClick} title={title}
      style={{ background: danger ? T.dangerDim : T.surfaceHi,
        border: `1px solid ${danger ? "rgba(224,82,82,0.2)" : T.borderHi}`,
        color: danger ? T.danger : T.body,
        borderRadius: 7, padding: "4px 9px", fontSize: 13,
        cursor: "pointer", lineHeight: 1 }}>
      {children}
    </button>
  );
}

function Toast({ msg, error }: { msg: string; error: string }) {
  const show = msg || error;
  if (!show) return null;
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999,
      background: error ? T.danger : T.accent,
      color: error ? "#fff" : "#09120a",
      borderRadius: 10, padding: "11px 22px", fontSize: 13, fontWeight: 700,
      boxShadow: `0 8px 28px ${error ? "rgba(224,82,82,0.3)" : T.accentGlow}` }}>
      {error ? `✗ ${error}` : `✓ ${msg}`}
    </div>
  );
}

// ── Media picker ──────────────────────────────────────────────────
function MediaPicker({ onPick, onClose, imageOnly = true }: {
  onPick: (asset: MediaAsset) => void;
  onClose: () => void;
  imageOnly?: boolean;
}) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/media")
      .then(r => r.json())
      .then(d => { setAssets(d); setLoading(false); });
  }, []);

  const filtered = assets
    .filter(a => !imageOnly || a.resourceType === "image")
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.78)", display: "flex",
      alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: T.surface, border: `1px solid ${T.borderHi}`,
        borderRadius: 16, width: "min(720px,95vw)", maxHeight: "82vh",
        display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.heading }}>
            Media Library
          </span>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, maxWidth: 280 }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              style={{ flex: 1, background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                borderRadius: 7, padding: "7px 12px", color: T.heading,
                fontSize: 12, outline: "none", fontFamily: "inherit" }} />
          </div>
          <button onClick={onClose}
            style={{ background: "none", border: "none", color: T.muted,
              fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ overflowY: "auto", padding: 18 }}>
          {loading
            ? <p style={{ color: T.muted, textAlign: "center", padding: "40px 0", fontSize: 13 }}>
                Loading…
              </p>
            : <div style={{ display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
                {filtered.map(asset => (
                  <button key={asset.id} onClick={() => onPick(asset)}
                    style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                      borderRadius: 9, overflow: "hidden", cursor: "pointer",
                      padding: 0, textAlign: "left" as const, transition: "border-color 0.15s" }}>
                    <img src={asset.imageUrl} alt={asset.title}
                      style={{ width: "100%", height: 82, objectFit: "cover", display: "block" }} />
                    <div style={{ padding: "6px 9px", fontSize: 11, color: T.body,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {asset.title}
                    </div>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p style={{ color: T.muted, fontSize: 12, gridColumn: "1/-1",
                    textAlign: "center", padding: "24px 0" }}>No assets found</p>
                )}
              </div>
          }
        </div>
      </div>
    </div>
  );
}

// ── Slide row ─────────────────────────────────────────────────────
function SlideRow({ slide, onToggle, onRemove, onMoveUp, onMoveDown, isFirst, isLast }: {
  slide: RoomSlide; onToggle: () => void; onRemove: () => void;
  onMoveUp: () => void; onMoveDown: () => void; isFirst: boolean; isLast: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10,
      padding: "9px 12px", background: T.surfaceHi,
      border: `1px solid ${slide.active ? T.borderHi : T.border}`,
      borderRadius: 9, marginBottom: 7, opacity: slide.active ? 1 : 0.45 }}>
      <div style={{ width: 50, height: 34, borderRadius: 6, overflow: "hidden",
        flexShrink: 0, border: `1px solid ${T.border}` }}>
        <img src={slide.asset.imageUrl} alt={slide.asset.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <span style={{ flex: 1, fontSize: 12, color: T.heading }}>{slide.asset.title}</span>
      <span style={{ fontSize: 10, color: T.muted, background: T.surface,
        border: `1px solid ${T.border}`, borderRadius: 5, padding: "2px 7px" }}>
        #{slide.order}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <button onClick={onMoveUp} disabled={isFirst}
          style={{ background: "none", border: "none", color: isFirst ? T.muted : T.body,
            cursor: isFirst ? "default" : "pointer", fontSize: 11, padding: "0 3px" }}>▲</button>
        <button onClick={onMoveDown} disabled={isLast}
          style={{ background: "none", border: "none", color: isLast ? T.muted : T.body,
            cursor: isLast ? "default" : "pointer", fontSize: 11, padding: "0 3px" }}>▼</button>
      </div>
      <button onClick={onToggle}
        style={{ padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: "pointer",
          border: `1px solid ${slide.active ? T.accentGlow : T.border}`,
          background: slide.active ? T.accentDim : T.surface,
          color: slide.active ? T.accent : T.muted }}>
        {slide.active ? "On" : "Off"}
      </button>
      <IconBtn onClick={onRemove} danger>×</IconBtn>
    </div>
  );
}

// ── Room type card in list ────────────────────────────────────────
function RoomTypeCard({ rt, onSelect, selected }: {
  rt: RoomType; onSelect: () => void; selected: boolean;
}) {
  return (
    <button onClick={onSelect}
      style={{ width: "100%", textAlign: "left" as const, background: selected ? T.surfaceHi : T.surface,
        border: `1px solid ${selected ? T.accent : T.border}`,
        borderRadius: 10, padding: "12px 16px", cursor: "pointer",
        marginBottom: 8, transition: "border-color 0.15s, background 0.15s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {rt.heroImage
          ? <img src={rt.heroImage.imageUrl} alt={rt.name}
              style={{ width: 44, height: 32, objectFit: "cover",
                borderRadius: 6, flexShrink: 0 }} />
          : <div style={{ width: 44, height: 32, borderRadius: 6,
              background: T.border, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16 }}>🏠</span>
            </div>
        }
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.heading,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {rt.name}
          </div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
            {rt.rooms.length} rooms · ₦{Number(rt.basePrice).toLocaleString()}/night
          </div>
        </div>
        <Badge>{rt.slug}</Badge>
      </div>
    </button>
  );
}

// ── Paragraph editor ──────────────────────────────────────────────
function ParagraphEditor({ paragraphs, onChange }: {
  paragraphs: RoomTabParagraph[];
  onChange: (p: RoomTabParagraph[]) => void;
}) {
  function update(id: string, text: string) {
    onChange(paragraphs.map(p => p.id === id ? { ...p, text } : p));
  }
  function remove(id: string) {
    onChange(paragraphs.filter(p => p.id !== id).map((p, i) => ({ ...p, order: i + 1 })));
  }
  function add() {
    onChange([...paragraphs, {
      id:    `new-${Date.now()}`,
      text:  "",
      order: paragraphs.length + 1,
    }]);
  }
  function move(id: string, dir: -1 | 1) {
    const arr = [...paragraphs].sort((a, b) => a.order - b.order);
    const idx = arr.findIndex(p => p.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    const tmp = arr[idx].order;
    arr[idx] = { ...arr[idx], order: arr[swap].order };
    arr[swap] = { ...arr[swap], order: tmp };
    onChange(arr.sort((a, b) => a.order - b.order));
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}><Label>Paragraphs</Label></div>
      {paragraphs.map((p, i) => (
        <div key={p.id} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 10 }}>
            <button onClick={() => move(p.id, -1)} disabled={i === 0}
              style={{ background: "none", border: "none",
                color: i === 0 ? T.muted : T.body, cursor: i === 0 ? "default" : "pointer",
                fontSize: 11, padding: "0 2px" }}>▲</button>
            <button onClick={() => move(p.id, 1)} disabled={i === paragraphs.length - 1}
              style={{ background: "none", border: "none",
                color: i === paragraphs.length - 1 ? T.muted : T.body,
                cursor: i === paragraphs.length - 1 ? "default" : "pointer",
                fontSize: 11, padding: "0 2px" }}>▼</button>
          </div>
          <textarea value={p.text} onChange={e => update(p.id, e.target.value)} rows={3}
            placeholder={`Paragraph ${i + 1}…`}
            style={{ flex: 1, background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
              borderRadius: 8, padding: "8px 11px", color: T.heading, fontSize: 12,
              fontFamily: "inherit", outline: "none", resize: "vertical" }} />
          <button onClick={() => remove(p.id)}
            style={{ background: T.dangerDim, border: `1px solid rgba(224,82,82,0.2)`,
              color: T.danger, borderRadius: 7, padding: "4px 9px", fontSize: 16,
              cursor: "pointer", lineHeight: 1, marginTop: 4 }}>×</button>
        </div>
      ))}
      <button onClick={add}
        style={{ padding: "7px 16px", background: T.accentDim,
          border: `1px solid ${T.accentGlow}`, borderRadius: 7,
          color: T.accent, fontSize: 11, fontWeight: 700, cursor: "pointer",
          letterSpacing: "0.08em", marginTop: 4 }}>
        + Add Paragraph
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function RoomsEditor() {
  const [tab, setTab]           = useState<"hero" | "types">("hero");
  const [toast, setToast]       = useState("");
  const [errMsg, setErrMsg]     = useState("");
  const [saving, setSaving]     = useState(false);
  const [loading, setLoading]   = useState(true);
  const [picker, setPicker]     = useState<null | string>(null); // what we're picking for

  // Hero data
  const [heroText, setHeroText] = useState<RoomHeroText>({ id: "", heading: "", subtext: "" });
  const [slides, setSlides]     = useState<RoomSlide[]>([]);

  // Room types
  const [roomTypes, setRoomTypes]         = useState<RoomType[]>([]);
  const [selectedRTId, setSelectedRTId]   = useState<string | null>(null);
  const [rtTab, setRtTab]                 = useState<"info" | "images" | "tabs" | "rooms">("info");

  // New room type form
  const [showNewRT, setShowNewRT] = useState(false);
  const [newRT, setNewRT] = useState({
    name: "", slug: "", label: "", description: "", tagline: "",
    basePrice: "", sizeSqm: "", maxGuests: "2", beds: "", bathrooms: "1", order: "0",
  });

  // New physical room form
  const [showNewRoom, setShowNewRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "", floor: "", view: "", notes: "",
  });

  const selectedRT = roomTypes.find(rt => rt.id === selectedRTId) ?? null;

  // ── Fetch ────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [htRes, slRes, rtRes] = await Promise.all([
        fetch("/api/rooms/room-hero-text"),
        fetch("/api/rooms/room-hero-slides"),
        fetch("/api/rooms/room-types"),
      ]);
      const [ht, sl, rt] = await Promise.all([htRes.json(), slRes.json(), rtRes.json()]);
      if (ht) setHeroText(ht);
      if (sl) setSlides(sl);
      if (rt) setRoomTypes(rt);
    } catch { showError("Failed to load data"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  function showToast(m: string) { setToast(m); setTimeout(() => setToast(""), 2800); }
  function showError(m: string) { setErrMsg(m); setTimeout(() => setErrMsg(""), 3500); }

  async function apiCall(url: string, body: unknown, method = "PUT") {
    setSaving(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (e: any) {
      showError(e.message ?? "Save failed");
      return null;
    } finally { setSaving(false); }
  }

  // ── Hero saves ───────────────────────────────────────────────────
  async function saveHeroText() {
    const ok = await apiCall("/api/rooms/room-hero-text", heroText);
    if (ok) showToast("Hero text saved");
  }

  async function saveSlides() {
    const ok = await apiCall("/api/rooms/room-hero-slides",
      slides.map(({ id, order, active, assetId }) => ({ id, order, active, assetId })));
    if (ok) showToast("Slides saved");
  }

  // ── Slide helpers ────────────────────────────────────────────────
  function toggleSlide(id: string) {
    setSlides(s => s.map(sl => sl.id === id ? { ...sl, active: !sl.active } : sl));
  }
  function removeSlide(id: string) {
    setSlides(s => s.filter(sl => sl.id !== id).map((sl, i) => ({ ...sl, order: i + 1 })));
  }
  function moveSlide(id: string, dir: -1 | 1) {
    setSlides(prev => {
      const arr = [...prev].sort((a, b) => a.order - b.order);
      const idx = arr.findIndex(s => s.id === id);
      const swap = idx + dir;
      if (swap < 0 || swap >= arr.length) return prev;
      const tmp = arr[idx].order;
      arr[idx] = { ...arr[idx], order: arr[swap].order };
      arr[swap] = { ...arr[swap], order: tmp };
      return arr.sort((a, b) => a.order - b.order);
    });
  }
  function addSlide(asset: MediaAsset) {
    setSlides(s => [...s, {
      id: `new-${Date.now()}`, order: s.length + 1,
      active: true, assetId: asset.id, asset,
    }]);
    setPicker(null);
  }

  // ── Room type helpers ────────────────────────────────────────────
  function updateSelectedRT(patch: Partial<RoomType>) {
    setRoomTypes(rts => rts.map(rt =>
      rt.id === selectedRTId ? { ...rt, ...patch } : rt
    ));
  }

  async function saveRTInfo() {
    if (!selectedRT) return;
    const ok = await apiCall(`/api/rooms/room-types/${selectedRT.id}`, {
      name: selectedRT.name, slug: selectedRT.slug, label: selectedRT.label,
      description: selectedRT.description, tagline: selectedRT.tagline,
      basePrice: selectedRT.basePrice, sizeSqm: selectedRT.sizeSqm,
      maxGuests: selectedRT.maxGuests, beds: selectedRT.beds,
      bathrooms: selectedRT.bathrooms, order: selectedRT.order,
      heroImageId: selectedRT.heroImageId,
    });
    if (ok) showToast("Room type saved");
  }

  async function deleteRT(id: string) {
    if (!confirm("Delete this room type and all its data?")) return;
    const res = await apiCall(`/api/rooms/types/${id}`, null, "DELETE");
    if (res) {
      setRoomTypes(rts => rts.filter(rt => rt.id !== id));
      setSelectedRTId(null);
      showToast("Room type deleted");
    }
  }

  async function createRT() {
    const res = await apiCall("/api/rooms/room-types", {
      ...newRT,
      basePrice:  parseFloat(newRT.basePrice) || 0,
      sizeSqm:    newRT.sizeSqm ? parseInt(newRT.sizeSqm) : null,
      maxGuests:  parseInt(newRT.maxGuests),
      bathrooms:  parseInt(newRT.bathrooms),
      order:      parseInt(newRT.order),
    }, "POST");
    if (res) {
      setRoomTypes(rts => [...rts, { ...res, images: [], tabs: [], rooms: [] }]);
      setShowNewRT(false);
      setNewRT({ name: "", slug: "", label: "", description: "", tagline: "",
        basePrice: "", sizeSqm: "", maxGuests: "2", beds: "", bathrooms: "1", order: "0" });
      showToast("Room type created");
    }
  }

  // ── Gallery image helpers ────────────────────────────────────────
  function addRTImage(asset: MediaAsset) {
    if (!selectedRT) return;
    const newImg: RoomImage = {
      id: `new-${Date.now()}`, order: selectedRT.images.length + 1,
      assetId: asset.id, asset,
    };
    updateSelectedRT({ images: [...selectedRT.images, newImg] });
    setPicker(null);
  }
  function removeRTImage(imgId: string) {
    if (!selectedRT) return;
    updateSelectedRT({
      images: selectedRT.images.filter(i => i.id !== imgId)
        .map((i, idx) => ({ ...i, order: idx + 1 })),
    });
  }
  function moveRTImage(imgId: string, dir: -1 | 1) {
    if (!selectedRT) return;
    const arr = [...selectedRT.images].sort((a, b) => a.order - b.order);
    const idx = arr.findIndex(i => i.id === imgId);
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    const tmp = arr[idx].order;
    arr[idx] = { ...arr[idx], order: arr[swap].order };
    arr[swap] = { ...arr[swap], order: tmp };
    updateSelectedRT({ images: arr.sort((a, b) => a.order - b.order) });
  }
  async function saveRTImages() {
    if (!selectedRT) return;
    const ok = await apiCall(`/api/rooms/room-types/${selectedRT.id}/images`,
      selectedRT.images.map(({ id, order, assetId }) => ({ id, order, assetId })));
    if (ok) showToast("Gallery saved");
  }

  // ── Tab helpers ──────────────────────────────────────────────────
  function updateTab(tabId: string, patch: Partial<RoomTab>) {
    if (!selectedRT) return;
    updateSelectedRT({
      tabs: selectedRT.tabs.map(t => t.id === tabId ? { ...t, ...patch } : t),
    });
  }
  async function saveRTTabs() {
    if (!selectedRT) return;
    const ok = await apiCall(`/api/rooms/room-types/${selectedRT.id}/tabs`,
      selectedRT.tabs.map(t => ({
        id: t.id, key: t.key, eyebrow: t.eyebrow, title: t.title,
        tagline: t.tagline, size: t.size, beds: t.beds, bath: t.bath,
        guests: t.guests, videoSrc: t.videoSrc, order: t.order, imageId: t.imageId,
        paragraphs: t.paragraphs,
      })));
    if (ok) showToast("Tabs saved");
  }
  function addTab() {
    if (!selectedRT) return;
    updateSelectedRT({
      tabs: [...selectedRT.tabs, {
        id: `new-${Date.now()}`, key: "bedroom", eyebrow: "Suite 01",
        title: "", tagline: "", size: "", beds: "", bath: "", guests: "",
        videoSrc: "", order: selectedRT.tabs.length + 1,
        paragraphs: [],
      }],
    });
  }
  function removeTab(tabId: string) {
    if (!selectedRT) return;
    updateSelectedRT({ tabs: selectedRT.tabs.filter(t => t.id !== tabId) });
  }

  // ── Physical room helpers ────────────────────────────────────────
  async function createRoom() {
    if (!selectedRT || !newRoom.roomNumber) return;
    const res = await apiCall(
      `/api/rooms/room-types/${selectedRT.id}/rooms`,
      { ...newRoom, isActive: true }, "POST"
    );
    if (res) {
      updateSelectedRT({ rooms: [...selectedRT.rooms, res] });
      setShowNewRoom(false);
      setNewRoom({ roomNumber: "", floor: "", view: "", notes: "" });
      showToast("Room added");
    }
  }
  async function deleteRoom(roomId: string) {
    if (!confirm("Delete this room?")) return;
    const res = await apiCall(`/api/rooms/${roomId}`, null, "DELETE");
    if (res && selectedRT) {
      updateSelectedRT({ rooms: selectedRT.rooms.filter(r => r.id !== roomId) });
      showToast("Room deleted");
    }
  }
  async function toggleRoomActive(room: Room) {
    if (!selectedRT) return;
    const res = await apiCall(`/api/rooms/${room.id}`,
      { ...room, isActive: !room.isActive });
    if (res) {
      updateSelectedRT({
        rooms: selectedRT.rooms.map(r => r.id === room.id ? res : r),
      });
    }
  }

  const sortedSlides = [...slides].sort((a, b) => a.order - b.order);

  const tabs = [
    { key: "hero",  label: "Hero & Slides" },
    { key: "types", label: "Room Types" },
  ] as const;

  const rtTabs = [
    { key: "info",   label: "Info" },
    { key: "images", label: "Gallery" },
    { key: "tabs",   label: "Detail Tabs" },
    { key: "rooms",  label: "Physical Rooms" },
  ] as const;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ width: 30, height: 30, border: `3px solid ${T.border}`,
            borderTop: `3px solid ${T.accent}`, borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 14px" }} />
          <p style={{ color: T.muted, fontSize: 13 }}>Loading rooms data…</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.body,
      fontFamily: "'DM Sans','Inter',sans-serif", padding: "28px 20px" }}>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        input:focus,textarea:focus,select:focus{
          border-color:${T.accent}!important;
          box-shadow:0 0 0 3px ${T.accentDim};
        }
      `}</style>

      <Toast msg={toast} error={errMsg} />
      {picker === "slide" && (
        <MediaPicker onPick={addSlide} onClose={() => setPicker(null)} />
      )}
      {picker === "rt-hero" && selectedRT && (
        <MediaPicker onPick={asset => {
          updateSelectedRT({ heroImageId: asset.id, heroImage: asset });
          setPicker(null);
        }} onClose={() => setPicker(null)} />
      )}
      {picker === "rt-image" && (
        <MediaPicker onPick={addRTImage} onClose={() => setPicker(null)} />
      )}
      {picker?.startsWith("tab-image-") && (
        <MediaPicker onPick={asset => {
          const tabId = picker.replace("tab-image-", "");
          updateTab(tabId, { imageId: asset.id, image: asset });
          setPicker(null);
        }} onClose={() => setPicker(null)} />
      )}

      {/* ── Header ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <Label>Admin Dashboard</Label>
            <h1 style={{ margin: "5px 0 0", fontSize: 24, fontWeight: 800,
              color: T.heading, letterSpacing: "-0.02em" }}>
              Rooms Editor
            </h1>
          </div>
          <a href="/room" target="_blank"
            style={{ fontSize: 11, color: T.accent, textDecoration: "none",
              background: T.accentDim, border: `1px solid ${T.accentGlow}`,
              borderRadius: 7, padding: "7px 14px", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            ↗ Preview Rooms
          </a>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 2, marginTop: 24,
          borderBottom: `1px solid ${T.border}` }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ padding: "9px 18px", background: "none", border: "none",
                borderBottom: tab === t.key ? `2px solid ${T.accent}` : "2px solid transparent",
                color: tab === t.key ? T.accent : T.muted,
                fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase" as const, cursor: "pointer",
                marginBottom: -1 }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ══ HERO & SLIDES TAB ══════════════════════════════════ */}
        {tab === "hero" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* Hero text */}
            <Card>
              <CardHeader title="Hero Text" badge={<Badge>Single row</Badge>} />
              <div style={{ padding: 22 }}>
                <Field label="Heading" value={heroText.heading}
                  onChange={v => setHeroText(h => ({ ...h, heading: v }))} />
                <Field label="Subtext" value={heroText.subtext}
                  onChange={v => setHeroText(h => ({ ...h, subtext: v }))} />
                <SaveBtn onClick={saveHeroText} saving={saving} />
              </div>
            </Card>

            {/* Carousel slides */}
            <Card>
              <CardHeader title="Carousel Slides"
                badge={<Badge>{slides.filter(s => s.active).length} active</Badge>}
                action={
                  <button onClick={() => setPicker("slide")}
                    style={{ padding: "5px 14px", background: T.accentDim,
                      border: `1px solid ${T.accentGlow}`, borderRadius: 7,
                      color: T.accent, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    + Add
                  </button>
                }
              />
              <div style={{ padding: 22 }}>
                {sortedSlides.length === 0 && (
                  <p style={{ color: T.muted, fontSize: 12, textAlign: "center",
                    padding: "20px 0" }}>No slides yet. Add from media library.</p>
                )}
                {sortedSlides.map((sl, i) => (
                  <SlideRow key={sl.id} slide={sl}
                    isFirst={i === 0} isLast={i === sortedSlides.length - 1}
                    onToggle={() => toggleSlide(sl.id)}
                    onRemove={() => removeSlide(sl.id)}
                    onMoveUp={() => moveSlide(sl.id, -1)}
                    onMoveDown={() => moveSlide(sl.id, 1)} />
                ))}
                <SaveBtn onClick={saveSlides} saving={saving} />
              </div>
            </Card>
          </div>
        )}

        {/* ══ ROOM TYPES TAB ══════════════════════════════════════ */}
        {tab === "types" && (
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20,
            alignItems: "start" }}>

            {/* Left: room type list */}
            <div>
              <Card>
                <CardHeader title="Room Types"
                  badge={<Badge>{roomTypes.length}</Badge>}
                  action={
                    <button onClick={() => setShowNewRT(v => !v)}
                      style={{ padding: "5px 12px", background: T.accentDim,
                        border: `1px solid ${T.accentGlow}`, borderRadius: 7,
                        color: T.accent, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                      + New
                    </button>
                  }
                />
                <div style={{ padding: 14 }}>

                  {/* New RT form */}
                  {showNewRT && (
                    <div style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                      borderRadius: 10, padding: 14, marginBottom: 12 }}>
                      <div style={{ marginBottom: 10 }}><Label>New Room Type</Label></div>
                      {(["name","slug","beds","basePrice"] as const).map(k => (
                        <Field key={k} label={k}
                          value={newRT[k as keyof typeof newRT]}
                          onChange={v => setNewRT(n => ({ ...n, [k]: v }))} />
                      ))}
                      <div style={{ display: "flex", gap: 8 }}>
                        <SaveBtn onClick={createRT} saving={saving} label="Create" />
                        <button onClick={() => setShowNewRT(false)}
                          style={{ padding: "9px 16px", background: "none",
                            border: `1px solid ${T.border}`, borderRadius: 8,
                            color: T.muted, fontSize: 11, cursor: "pointer" }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {roomTypes.length === 0 && !showNewRT && (
                    <p style={{ color: T.muted, fontSize: 12, textAlign: "center",
                      padding: "20px 0" }}>No room types yet.</p>
                  )}
                  {[...roomTypes].sort((a, b) => a.order - b.order).map(rt => (
                    <RoomTypeCard key={rt.id} rt={rt}
                      selected={selectedRTId === rt.id}
                      onSelect={() => { setSelectedRTId(rt.id); setRtTab("info"); }} />
                  ))}
                </div>
              </Card>
            </div>

            {/* Right: selected RT editor */}
            {selectedRT ? (
              <Card>
                {/* RT header */}
                <div style={{ padding: "16px 22px", borderBottom: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {selectedRT.heroImage
                      ? <img src={selectedRT.heroImage.imageUrl} alt=""
                          style={{ width: 36, height: 26, objectFit: "cover",
                            borderRadius: 5 }} />
                      : <div style={{ width: 36, height: 26, background: T.border,
                          borderRadius: 5 }} />
                    }
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.heading }}>
                      {selectedRT.name}
                    </span>
                    <Badge>{selectedRT.slug}</Badge>
                  </div>
                  <IconBtn onClick={() => deleteRT(selectedRT.id)} danger title="Delete room type">
                    🗑
                  </IconBtn>
                </div>

                {/* RT sub-tabs */}
                <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`,
                  padding: "0 22px" }}>
                  {rtTabs.map(t => (
                    <button key={t.key} onClick={() => setRtTab(t.key)}
                      style={{ padding: "10px 14px", background: "none", border: "none",
                        borderBottom: rtTab === t.key
                          ? `2px solid ${T.accent}` : "2px solid transparent",
                        color: rtTab === t.key ? T.accent : T.muted,
                        fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                        textTransform: "uppercase" as const, cursor: "pointer",
                        marginBottom: -1 }}>
                      {t.label}
                      {t.key === "rooms" && (
                        <span style={{ marginLeft: 5, fontSize: 10,
                          color: T.muted }}>({selectedRT.rooms.length})</span>
                      )}
                    </button>
                  ))}
                </div>

                <div style={{ padding: 22 }}>

                  {/* ── INFO ──────────────────────────────────── */}
                  {rtTab === "info" && (
                    <>
                      {/* Hero image */}
                      <div style={{ marginBottom: 18 }}>
                        <Label>Hero Image</Label>
                        <div style={{ marginTop: 8, display: "flex",
                          alignItems: "center", gap: 12 }}>
                          {selectedRT.heroImage
                            ? <img src={selectedRT.heroImage.imageUrl} alt=""
                                style={{ width: 100, height: 68, objectFit: "cover",
                                  borderRadius: 8, border: `1px solid ${T.border}` }} />
                            : <div style={{ width: 100, height: 68, background: T.surfaceHi,
                                borderRadius: 8, border: `1px dashed ${T.borderHi}`,
                                display: "flex", alignItems: "center",
                                justifyContent: "center" }}>
                                <span style={{ fontSize: 22 }}>🖼</span>
                              </div>
                          }
                          <button onClick={() => setPicker("rt-hero")}
                            style={{ padding: "7px 14px", background: T.accentDim,
                              border: `1px solid ${T.accentGlow}`, borderRadius: 7,
                              color: T.accent, fontSize: 11, fontWeight: 700,
                              cursor: "pointer" }}>
                            {selectedRT.heroImage ? "Change" : "Pick Image"}
                          </button>
                          {selectedRT.heroImage && (
                            <button onClick={() => updateSelectedRT({ heroImageId: undefined, heroImage: undefined })}
                              style={{ padding: "7px 12px", background: T.dangerDim,
                                border: `1px solid rgba(224,82,82,0.2)`, borderRadius: 7,
                                color: T.danger, fontSize: 11, cursor: "pointer" }}>
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <Field label="Name" value={selectedRT.name}
                          onChange={v => updateSelectedRT({ name: v })} />
                        <Field label="Slug" value={selectedRT.slug}
                          onChange={v => updateSelectedRT({ slug: v })} />
                        <Field label="Label" value={selectedRT.label ?? ""}
                          onChange={v => updateSelectedRT({ label: v })} />
                        <Field label="Tagline" value={selectedRT.tagline ?? ""}
                          onChange={v => updateSelectedRT({ tagline: v })} />
                        <Field label="Base Price (₦)" type="number"
                          value={selectedRT.basePrice}
                          onChange={v => updateSelectedRT({ basePrice: v })} />
                        <Field label="Size (sqm)" type="number"
                          value={selectedRT.sizeSqm ?? ""}
                          onChange={v => updateSelectedRT({ sizeSqm: Number(v) })} />
                        <Field label="Max Guests" type="number"
                          value={selectedRT.maxGuests}
                          onChange={v => updateSelectedRT({ maxGuests: Number(v) })} />
                        <Field label="Beds" value={selectedRT.beds}
                          onChange={v => updateSelectedRT({ beds: v })} />
                        <Field label="Bathrooms" type="number"
                          value={selectedRT.bathrooms}
                          onChange={v => updateSelectedRT({ bathrooms: Number(v) })} />
                        <Field label="Sort Order" type="number"
                          value={selectedRT.order}
                          onChange={v => updateSelectedRT({ order: Number(v) })} />
                      </div>
                      <Field label="Description" multiline
                        value={selectedRT.description ?? ""}
                        onChange={v => updateSelectedRT({ description: v })} />
                      <SaveBtn onClick={saveRTInfo} saving={saving} />
                    </>
                  )}

                  {/* ── GALLERY ───────────────────────────────── */}
                  {rtTab === "images" && (
                    <>
                      <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
                        Gallery images shown on the room detail page.
                      </p>
                      {[...selectedRT.images].sort((a, b) => a.order - b.order).map((img, i) => (
                        <div key={img.id} style={{ display: "flex", alignItems: "center",
                          gap: 10, padding: "9px 12px", background: T.surfaceHi,
                          border: `1px solid ${T.borderHi}`, borderRadius: 9, marginBottom: 7 }}>
                          <img src={img.asset.imageUrl} alt={img.asset.title}
                            style={{ width: 56, height: 38, objectFit: "cover",
                              borderRadius: 6 }} />
                          <span style={{ flex: 1, fontSize: 12, color: T.heading }}>
                            {img.asset.title}
                          </span>
                          <span style={{ fontSize: 10, color: T.muted, background: T.surface,
                            border: `1px solid ${T.border}`, borderRadius: 5,
                            padding: "2px 7px" }}>#{img.order}</span>
                          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <button onClick={() => moveRTImage(img.id, -1)} disabled={i === 0}
                              style={{ background: "none", border: "none",
                                color: i === 0 ? T.muted : T.body,
                                cursor: i === 0 ? "default" : "pointer",
                                fontSize: 11, padding: "0 3px" }}>▲</button>
                            <button onClick={() => moveRTImage(img.id, 1)}
                              disabled={i === selectedRT.images.length - 1}
                              style={{ background: "none", border: "none",
                                color: i === selectedRT.images.length - 1 ? T.muted : T.body,
                                cursor: i === selectedRT.images.length - 1 ? "default" : "pointer",
                                fontSize: 11, padding: "0 3px" }}>▼</button>
                          </div>
                          <IconBtn onClick={() => removeRTImage(img.id)} danger>×</IconBtn>
                        </div>
                      ))}
                      <div style={{ marginTop: 12, padding: "10px 14px",
                        border: `1px dashed ${T.borderHi}`, borderRadius: 9,
                        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 11, color: T.muted }}>
                          Add from Media Library
                        </span>
                        <button onClick={() => setPicker("rt-image")}
                          style={{ padding: "5px 14px", background: T.accentDim,
                            border: `1px solid ${T.accentGlow}`, borderRadius: 7,
                            color: T.accent, fontSize: 11, fontWeight: 700,
                            cursor: "pointer" }}>
                          + Add Image
                        </button>
                      </div>
                      <SaveBtn onClick={saveRTImages} saving={saving} />
                    </>
                  )}

                  {/* ── DETAIL TABS ───────────────────────────── */}
                  {rtTab === "tabs" && (
                    <>
                      <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
                        Each tab appears on the room detail page (e.g. Bedroom, Bathroom).
                      </p>
                      {selectedRT.tabs.map((t, ti) => (
                        <div key={t.id} style={{ background: T.surfaceHi,
                          border: `1px solid ${T.borderHi}`, borderRadius: 10,
                          padding: 16, marginBottom: 14 }}>
                          <div style={{ display: "flex", justifyContent: "space-between",
                            alignItems: "center", marginBottom: 14 }}>
                            <Badge>{t.key || "tab"}</Badge>
                            <IconBtn onClick={() => removeTab(t.id)} danger>× Remove Tab</IconBtn>
                          </div>

                          <div style={{ display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                            <Field label="Key (e.g. bedroom)"
                              value={t.key}
                              onChange={v => updateTab(t.id, { key: v })} />
                            <Field label="Eyebrow (e.g. Suite 01)"
                              value={t.eyebrow}
                              onChange={v => updateTab(t.id, { eyebrow: v })} />
                            <Field label="Order" type="number"
                              value={t.order}
                              onChange={v => updateTab(t.id, { order: Number(v) })} />
                          </div>
                          <div style={{ display: "grid",
                            gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <Field label="Title"
                              value={t.title}
                              onChange={v => updateTab(t.id, { title: v })} />
                            <Field label="Tagline"
                              value={t.tagline}
                              onChange={v => updateTab(t.id, { tagline: v })} />
                            <Field label="Size" value={t.size ?? ""}
                              onChange={v => updateTab(t.id, { size: v })} />
                            <Field label="Beds" value={t.beds ?? ""}
                              onChange={v => updateTab(t.id, { beds: v })} />
                            <Field label="Bath" value={t.bath ?? ""}
                              onChange={v => updateTab(t.id, { bath: v })} />
                            <Field label="Guests" value={t.guests ?? ""}
                              onChange={v => updateTab(t.id, { guests: v })} />
                          </div>
                          <Field label="Video URL (YouTube embed)"
                            value={t.videoSrc ?? ""}
                            onChange={v => updateTab(t.id, { videoSrc: v })} />

                          {/* Tab image */}
                          <div style={{ marginBottom: 14 }}>
                            <Label>Tab Image</Label>
                            <div style={{ marginTop: 8, display: "flex",
                              alignItems: "center", gap: 10 }}>
                              {t.image
                                ? <img src={t.image.imageUrl} alt=""
                                    style={{ width: 80, height: 54, objectFit: "cover",
                                      borderRadius: 6, border: `1px solid ${T.border}` }} />
                                : <div style={{ width: 80, height: 54,
                                    background: T.surface, borderRadius: 6,
                                    border: `1px dashed ${T.borderHi}`,
                                    display: "flex", alignItems: "center",
                                    justifyContent: "center" }}>
                                    <span style={{ fontSize: 18 }}>🖼</span>
                                  </div>
                              }
                              <button onClick={() => setPicker(`tab-image-${t.id}`)}
                                style={{ padding: "6px 12px", background: T.accentDim,
                                  border: `1px solid ${T.accentGlow}`, borderRadius: 7,
                                  color: T.accent, fontSize: 11, fontWeight: 700,
                                  cursor: "pointer" }}>
                                {t.image ? "Change" : "Pick"}
                              </button>
                            </div>
                          </div>

                          <ParagraphEditor
                            paragraphs={t.paragraphs}
                            onChange={p => updateTab(t.id, { paragraphs: p })}
                          />
                        </div>
                      ))}
                      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                        <button onClick={addTab}
                          style={{ padding: "7px 16px", background: T.accentDim,
                            border: `1px solid ${T.accentGlow}`, borderRadius: 7,
                            color: T.accent, fontSize: 11, fontWeight: 700,
                            cursor: "pointer" }}>
                          + Add Tab
                        </button>
                        <SaveBtn onClick={saveRTTabs} saving={saving} />
                      </div>
                    </>
                  )}

                  {/* ── PHYSICAL ROOMS ────────────────────────── */}
                  {rtTab === "rooms" && (
                    <>
                      <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
                        Individual physical rooms under this type (e.g. FS-101, FS-102).
                      </p>

                      {/* Table */}
                      {selectedRT.rooms.length > 0 && (
                        <div style={{ marginBottom: 16, border: `1px solid ${T.border}`,
                          borderRadius: 9, overflow: "hidden" }}>
                          <div style={{ display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 80px 80px",
                            padding: "8px 14px", background: T.surfaceHi,
                            borderBottom: `1px solid ${T.border}` }}>
                            {["Room No.", "Floor", "View", "Active", ""].map(h => (
                              <span key={h} style={{ fontSize: 10, fontWeight: 700,
                                letterSpacing: "0.14em", textTransform: "uppercase" as const,
                                color: T.muted }}>{h}</span>
                            ))}
                          </div>
                          {selectedRT.rooms.map(room => (
                            <div key={room.id} style={{ display: "grid",
                              gridTemplateColumns: "1fr 1fr 1fr 80px 80px",
                              padding: "10px 14px", alignItems: "center",
                              borderBottom: `1px solid ${T.border}` }}>
                              <span style={{ fontSize: 13, color: T.heading,
                                fontWeight: 600 }}>
                                {room.roomNumber}
                              </span>
                              <span style={{ fontSize: 12, color: T.body }}>
                                {room.floor || "—"}
                              </span>
                              <span style={{ fontSize: 12, color: T.body }}>
                                {room.view || "—"}
                              </span>
                              <button onClick={() => toggleRoomActive(room)}
                                style={{ padding: "3px 10px", borderRadius: 6,
                                  fontSize: 10, fontWeight: 700,
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase" as const,
                                  cursor: "pointer", width: "fit-content",
                                  border: `1px solid ${room.isActive ? T.accentGlow : T.border}`,
                                  background: room.isActive ? T.accentDim : T.surface,
                                  color: room.isActive ? T.accent : T.muted }}>
                                {room.isActive ? "On" : "Off"}
                              </button>
                              <IconBtn onClick={() => deleteRoom(room.id)} danger>×</IconBtn>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add room form */}
                      {showNewRoom ? (
                        <div style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                          borderRadius: 10, padding: 16, marginBottom: 12 }}>
                          <div style={{ marginBottom: 10 }}><Label>Add Physical Room</Label></div>
                          <div style={{ display: "grid",
                            gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <Field label="Room Number *" value={newRoom.roomNumber}
                              onChange={v => setNewRoom(r => ({ ...r, roomNumber: v }))}
                              hint="e.g. FS-101" />
                            <Field label="Floor" value={newRoom.floor}
                              onChange={v => setNewRoom(r => ({ ...r, floor: v }))} />
                            <Field label="View" value={newRoom.view}
                              onChange={v => setNewRoom(r => ({ ...r, view: v }))}
                              hint="e.g. Garden View" />
                            <Field label="Notes" value={newRoom.notes}
                              onChange={v => setNewRoom(r => ({ ...r, notes: v }))} />
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <SaveBtn onClick={createRoom} saving={saving} label="Add Room" />
                            <button onClick={() => setShowNewRoom(false)}
                              style={{ padding: "9px 16px", background: "none",
                                border: `1px solid ${T.border}`, borderRadius: 8,
                                color: T.muted, fontSize: 11, cursor: "pointer" }}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setShowNewRoom(true)}
                          style={{ padding: "8px 18px", background: T.accentDim,
                            border: `1px solid ${T.accentGlow}`, borderRadius: 8,
                            color: T.accent, fontSize: 11, fontWeight: 700,
                            cursor: "pointer", letterSpacing: "0.08em" }}>
                          + Add Room
                        </button>
                      )}
                    </>
                  )}

                </div>
              </Card>
            ) : (
              <div style={{ display: "flex", alignItems: "center",
                justifyContent: "center", minHeight: 300,
                border: `1px dashed ${T.border}`, borderRadius: 14 }}>
                <p style={{ color: T.muted, fontSize: 13 }}>
                  ← Select a room type to edit
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}