"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────
type MediaAsset = {
  id: string;
  title: string;
  imageUrl: string;
  publicId: string;
  resourceType: string;
};

type HeroSlide = {
  id: string;
  order: number;
  active: boolean;
  assetId: string;
  asset: MediaAsset;
};

type HeroText = {
  id: string;
  heading: string;
  subtext: string;
};

type S1Image = {
  id: string;
  order: number;
  assetId: string;
  asset: MediaAsset;
};

type SectionOneData = {
  id: string;
  label: string;
  heading: string;
  quote: string;
  images: S1Image[];
};

type SectionTwoData = {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  expLabel: string;
  expHeading: string;
};

// ── Design tokens ─────────────────────────────────────────────────
const T = {
  bg:         "#0b120b",
  surface:    "#101a10",
  surfaceHi:  "#152015",
  border:     "#1e2e1e",
  borderHi:   "#2e442e",
  accent:     "#7ec850",
  accentDim:  "rgba(126,200,80,0.12)",
  accentGlow: "rgba(126,200,80,0.25)",
  heading:    "#d8f0b8",
  body:       "#8aaa6a",
  muted:      "#4a6a4a",
  danger:     "#e05050",
  dangerDim:  "rgba(224,80,80,0.12)",
};

// ── Helpers ───────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
      textTransform: "uppercase" as const, color: T.accent }}>
      {children}
    </span>
  );
}

function SectionShell({ title, badge, children }: {
  title: string; badge?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
      <div style={{ padding: "18px 24px", borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 3, height: 18, background: T.accent,
            borderRadius: 4, display: "block" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: T.heading,
            letterSpacing: "0.04em" }}>{title}</span>
        </div>
        {badge && (
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase" as const, color: T.accent, background: T.accentDim,
            padding: "4px 10px", borderRadius: 20, border: `1px solid ${T.accentGlow}` }}>
            {badge}
          </span>
        )}
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; hint?: string;
}) {
  const base: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
    borderRadius: 10, padding: "10px 14px",
    color: T.heading, fontSize: 13, fontFamily: "inherit",
    outline: "none", resize: multiline ? "vertical" : "none",
    transition: "border-color 0.2s",
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 6 }}><Label>{label}</Label></div>
      {hint && <p style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>{hint}</p>}
      {multiline
        ? <textarea rows={3} value={value}
            onChange={e => onChange(e.target.value)}
            style={{ ...base, minHeight: 80 }} />
        : <input value={value}
            onChange={e => onChange(e.target.value)}
            style={base} />
      }
    </div>
  );
}

function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button onClick={onClick} disabled={saving}
      style={{ marginTop: 8, padding: "10px 28px", background: T.accent,
        color: "#0b120b", border: "none", borderRadius: 10, fontSize: 12,
        fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const,
        cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}>
      {saving ? "Saving…" : "Save Changes"}
    </button>
  );
}

function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 999,
      background: T.accent, color: "#0b120b", borderRadius: 12,
      padding: "12px 24px", fontSize: 13, fontWeight: 700,
      boxShadow: `0 8px 32px ${T.accentGlow}`, letterSpacing: "0.04em" }}>
      ✓ {msg}
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 999,
      background: T.danger, color: "#fff", borderRadius: 12,
      padding: "12px 24px", fontSize: 13, fontWeight: 700 }}>
      ✗ {msg}
    </div>
  );
}

// ── Slide row ─────────────────────────────────────────────────────
function SlideRow({ slide, onToggle, onRemove, onMoveUp, onMoveDown, isFirst, isLast }: {
  slide: HeroSlide;
  onToggle: () => void; onRemove: () => void;
  onMoveUp: () => void; onMoveDown: () => void;
  isFirst: boolean; isLast: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12,
      padding: "10px 14px", background: T.surfaceHi,
      border: `1px solid ${slide.active ? T.borderHi : T.border}`,
      borderRadius: 10, marginBottom: 8, opacity: slide.active ? 1 : 0.5,
      transition: "opacity 0.2s, border-color 0.2s" }}>
      <div style={{ width: 52, height: 36, borderRadius: 7, overflow: "hidden",
        flexShrink: 0, border: `1px solid ${T.border}` }}>
        <img src={slide.asset.imageUrl} alt={slide.asset.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <span style={{ flex: 1, fontSize: 13, color: T.heading, fontWeight: 500 }}>
        {slide.asset.title}
      </span>
      <span style={{ fontSize: 11, color: T.muted, background: T.surface,
        border: `1px solid ${T.border}`, borderRadius: 6, padding: "2px 8px" }}>
        #{slide.order}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <button onClick={onMoveUp} disabled={isFirst}
          style={{ background: "none", border: "none",
            color: isFirst ? T.muted : T.body,
            cursor: isFirst ? "default" : "pointer", fontSize: 12, padding: "0 4px" }}>▲</button>
        <button onClick={onMoveDown} disabled={isLast}
          style={{ background: "none", border: "none",
            color: isLast ? T.muted : T.body,
            cursor: isLast ? "default" : "pointer", fontSize: 12, padding: "0 4px" }}>▼</button>
      </div>
      <button onClick={onToggle}
        style={{ padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: "pointer",
          border: `1px solid ${slide.active ? T.accentGlow : T.border}`,
          background: slide.active ? T.accentDim : T.surface,
          color: slide.active ? T.accent : T.muted, transition: "all 0.2s" }}>
        {slide.active ? "On" : "Off"}
      </button>
      <button onClick={onRemove}
        style={{ background: T.dangerDim, border: `1px solid rgba(224,80,80,0.2)`,
          color: T.danger, borderRadius: 8, padding: "4px 10px", fontSize: 18,
          cursor: "pointer", lineHeight: 1, fontWeight: 300 }}>×</button>
    </div>
  );
}

// ── Image row ─────────────────────────────────────────────────────
function ImageRow({ img, onRemove, onMoveUp, onMoveDown, isFirst, isLast }: {
  img: S1Image;
  onRemove: () => void; onMoveUp: () => void; onMoveDown: () => void;
  isFirst: boolean; isLast: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12,
      padding: "10px 14px", background: T.surfaceHi,
      border: `1px solid ${T.borderHi}`, borderRadius: 10, marginBottom: 8 }}>
      <div style={{ width: 60, height: 40, borderRadius: 7, overflow: "hidden",
        flexShrink: 0, border: `1px solid ${T.border}` }}>
        <img src={img.asset.imageUrl} alt={img.asset.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <span style={{ flex: 1, fontSize: 13, color: T.heading }}>{img.asset.title}</span>
      <span style={{ fontSize: 11, color: T.muted, background: T.surface,
        border: `1px solid ${T.border}`, borderRadius: 6, padding: "2px 8px" }}>
        Slot {img.order}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <button onClick={onMoveUp} disabled={isFirst}
          style={{ background: "none", border: "none",
            color: isFirst ? T.muted : T.body,
            cursor: isFirst ? "default" : "pointer", fontSize: 12, padding: "0 4px" }}>▲</button>
        <button onClick={onMoveDown} disabled={isLast}
          style={{ background: "none", border: "none",
            color: isLast ? T.muted : T.body,
            cursor: isLast ? "default" : "pointer", fontSize: 12, padding: "0 4px" }}>▼</button>
      </div>
      <button onClick={onRemove}
        style={{ background: T.dangerDim, border: `1px solid rgba(224,80,80,0.2)`,
          color: T.danger, borderRadius: 8, padding: "4px 10px", fontSize: 18,
          cursor: "pointer", lineHeight: 1, fontWeight: 300 }}>×</button>
    </div>
  );
}

// ── Media picker modal ────────────────────────────────────────────
function MediaPicker({ onPick, onClose }: {
  onPick: (asset: MediaAsset) => void;
  onClose: () => void;
}) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/media")
      .then(r => r.json())
      .then(data => { setAssets(data); setLoading(false); });
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.75)", display: "flex",
      alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: T.surface, border: `1px solid ${T.borderHi}`,
        borderRadius: 18, width: "min(680px, 95vw)", maxHeight: "80vh",
        display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.heading }}>
            Pick from Media Library
          </span>
          <button onClick={onClose}
            style={{ background: "none", border: "none", color: T.muted,
              fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        {/* Grid */}
        <div style={{ overflowY: "auto", padding: 20 }}>
          {loading && (
            <p style={{ color: T.muted, fontSize: 13, textAlign: "center",
              padding: "40px 0" }}>Loading media…</p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12 }}>
            {assets
              .filter(a => a.resourceType === "image")
              .map(asset => (
                <button key={asset.id} onClick={() => onPick(asset)}
                  style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                    borderRadius: 10, overflow: "hidden", cursor: "pointer",
                    padding: 0, textAlign: "left" as const }}>
                  <img src={asset.imageUrl} alt={asset.title}
                    style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "8px 10px", fontSize: 11,
                    color: T.body, whiteSpace: "nowrap",
                    overflow: "hidden", textOverflow: "ellipsis" }}>
                    {asset.title}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function HomepageEditor() {
  const [tab, setTab]           = useState<"hero" | "s1" | "s2">("hero");
  const [toast, setToast]       = useState("");
  const [error, setError]       = useState("");
  const [saving, setSaving]     = useState(false);
  const [loading, setLoading]   = useState(true);
  const [picker, setPicker]     = useState<null | "slide" | "s1image">(null);

  // Data
  const [heroText, setHeroText] = useState<HeroText>({ id: "", heading: "", subtext: "" });
  const [slides, setSlides]     = useState<HeroSlide[]>([]);
  const [s1, setS1]             = useState<SectionOneData>({ id: "", label: "", heading: "", quote: "", images: [] });
  const [s2, setS2]             = useState<SectionTwoData>({ id: "", label: "", heading: "", subheading: "", expLabel: "", expHeading: "" });

  // ── Fetch all data on mount ───────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [htRes, slidesRes, s1Res, s2Res] = await Promise.all([
        fetch("/api/home/hero-text"),
        fetch("/api/home/hero-slides"),
        fetch("/api/home/section-one"),
        fetch("/api/home/section-two"),
      ]);
      const [ht, sl, s1d, s2d] = await Promise.all([
        htRes.json(), slidesRes.json(), s1Res.json(), s2Res.json(),
      ]);
      if (ht)  setHeroText(ht);
      if (sl)  setSlides(sl);
      if (s1d) setS1(s1d);
      if (s2d) setS2(s2d);
    } catch {
      showError("Failed to load page data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Toast helpers ─────────────────────────────────────────────
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }
  function showError(msg: string) {
    setError(msg);
    setTimeout(() => setError(""), 3500);
  }

  async function apiCall(url: string, body: unknown) {
    setSaving(true);
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      return true;
    } catch (e: any) {
      showError(e.message ?? "Save failed");
      return false;
    } finally {
      setSaving(false);
    }
  }

  // ── Save handlers ─────────────────────────────────────────────
  async function saveHeroText() {
    const ok = await apiCall("/api/home/hero-text", heroText);
    if (ok) showToast("Hero text saved");
  }

  async function saveSlides() {
    const ok = await apiCall("/api/home/hero-slides",
      slides.map(({ id, order, active, assetId }) => ({ id, order, active, assetId })));
    if (ok) showToast("Carousel slides saved");
  }

  async function saveSectionOne() {
    const ok = await apiCall("/api/home/section-one", {
      ...s1,
      images: s1.images.map(({ id, order, assetId }) => ({ id, order, assetId })),
    });
    if (ok) showToast("Section One saved");
  }

  async function saveSectionTwo() {
    const ok = await apiCall("/api/home/section-two", s2);
    if (ok) showToast("Section Two saved");
  }

  // ── Slide helpers ─────────────────────────────────────────────
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
    const newSlide: HeroSlide = {
      id:      `new-${Date.now()}`,
      order:   slides.length + 1,
      active:  true,
      assetId: asset.id,
      asset,
    };
    setSlides(s => [...s, newSlide]);
    setPicker(null);
  }

  // ── Section one image helpers ─────────────────────────────────
  function removeS1Image(id: string) {
    setS1(s => ({
      ...s,
      images: s.images.filter(i => i.id !== id).map((im, idx) => ({ ...im, order: idx + 1 })),
    }));
  }
  function moveS1Image(id: string, dir: -1 | 1) {
    setS1(prev => {
      const arr = [...prev.images].sort((a, b) => a.order - b.order);
      const idx = arr.findIndex(i => i.id === id);
      const swap = idx + dir;
      if (swap < 0 || swap >= arr.length) return prev;
      const tmp = arr[idx].order;
      arr[idx] = { ...arr[idx], order: arr[swap].order };
      arr[swap] = { ...arr[swap], order: tmp };
      return { ...prev, images: arr.sort((a, b) => a.order - b.order) };
    });
  }
  function addS1Image(asset: MediaAsset) {
    if (s1.images.length >= 2) return;
    const newImg: S1Image = {
      id:      `new-${Date.now()}`,
      order:   s1.images.length + 1,
      assetId: asset.id,
      asset,
    };
    setS1(s => ({ ...s, images: [...s.images, newImg] }));
    setPicker(null);
  }

  const sortedSlides   = [...slides].sort((a, b) => a.order - b.order);
  const sortedS1Images = [...s1.images].sort((a, b) => a.order - b.order);

  const tabs = [
    { key: "hero", label: "Hero" },
    { key: "s1",   label: "Section One" },
    { key: "s2",   label: "Section Two" },
  ] as const;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ width: 32, height: 32, border: `3px solid ${T.border}`,
            borderTop: `3px solid ${T.accent}`, borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: T.muted, fontSize: 13 }}>Loading homepage data…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.body,
      fontFamily: "'DM Sans', 'Inter', sans-serif", padding: "32px 24px" }}>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        input:focus, textarea:focus {
          border-color: ${T.accent} !important;
          box-shadow: 0 0 0 3px ${T.accentDim};
        }
        button:hover { opacity: 0.85; }
      `}</style>

      <Toast msg={toast} />
      <ErrorMsg msg={error} />
      {picker && (
        <MediaPicker
          onPick={picker === "slide" ? addSlide : addS1Image}
          onClose={() => setPicker(null)}
        />
      )}

      {/* Header */}
      <div style={{ maxWidth: 860, margin: "0 auto 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <Label>Admin Dashboard</Label>
            <h1 style={{ margin: "6px 0 0", fontSize: 26, fontWeight: 800,
              color: T.heading, letterSpacing: "-0.02em" }}>
              Homepage Editor
            </h1>
          </div>
          <a href="/" target="_blank"
            style={{ fontSize: 12, color: T.accent, textDecoration: "none",
              background: T.accentDim, border: `1px solid ${T.accentGlow}`,
              borderRadius: 8, padding: "8px 16px", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            ↗ Preview Site
          </a>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 4, marginTop: 28,
          borderBottom: `1px solid ${T.border}` }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ padding: "10px 20px", background: "none", border: "none",
                borderBottom: tab === t.key
                  ? `2px solid ${T.accent}` : "2px solid transparent",
                color: tab === t.key ? T.accent : T.muted,
                fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase" as const, cursor: "pointer",
                transition: "color 0.2s, border-color 0.2s", marginBottom: -1 }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* ── HERO TAB ─────────────────────────────────────────── */}
        {tab === "hero" && (
          <>
            <SectionShell title="Hero Text" badge="Single Row">
              <Field label="Heading"
                value={heroText.heading}
                onChange={v => setHeroText(h => ({ ...h, heading: v }))} />
              <Field label="Subtext / Quote"
                value={heroText.subtext}
                onChange={v => setHeroText(h => ({ ...h, subtext: v }))} />
              <SaveBtn onClick={saveHeroText} saving={saving} />
            </SectionShell>

            <SectionShell title="Carousel Slides"
              badge={`${slides.filter(s => s.active).length} Active`}>
              <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
                Use arrows to reorder. Toggle to show/hide without deleting.
                Images are pulled from your Media Library.
              </p>
              {sortedSlides.map((sl, i) => (
                <SlideRow key={sl.id} slide={sl}
                  isFirst={i === 0} isLast={i === sortedSlides.length - 1}
                  onToggle={() => toggleSlide(sl.id)}
                  onRemove={() => removeSlide(sl.id)}
                  onMoveUp={() => moveSlide(sl.id, -1)}
                  onMoveDown={() => moveSlide(sl.id, 1)} />
              ))}
              <div style={{ marginTop: 12, padding: "12px 16px",
                border: `1px dashed ${T.borderHi}`, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: T.muted }}>
                  Pick from Media Library to add a slide
                </span>
                <button onClick={() => setPicker("slide")}
                  style={{ padding: "6px 16px", background: T.accentDim,
                    border: `1px solid ${T.accentGlow}`, borderRadius: 8,
                    color: T.accent, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  + Add Slide
                </button>
              </div>
              <SaveBtn onClick={saveSlides} saving={saving} />
            </SectionShell>
          </>
        )}

        {/* ── SECTION ONE TAB ──────────────────────────────────── */}
        {tab === "s1" && (
          <SectionShell title="Section One — Welcome">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 16, marginBottom: 8 }}>
              <Field label="Label / Eyebrow"
                value={s1.label}
                onChange={v => setS1(s => ({ ...s, label: v }))} />
              <Field label="Heading"
                value={s1.heading}
                onChange={v => setS1(s => ({ ...s, heading: v }))} />
            </div>
            <Field label="Quote"
              value={s1.quote}
              onChange={v => setS1(s => ({ ...s, quote: v }))} />

            <div style={{ marginTop: 8, marginBottom: 8 }}>
              <Label>Section Images</Label>
              <p style={{ fontSize: 11, color: T.muted, margin: "6px 0 12px" }}>
                Exactly 2 images displayed side by side. Use arrows to swap positions.
              </p>
              {sortedS1Images.map((img, i) => (
                <ImageRow key={img.id} img={img}
                  isFirst={i === 0} isLast={i === sortedS1Images.length - 1}
                  onRemove={() => removeS1Image(img.id)}
                  onMoveUp={() => moveS1Image(img.id, -1)}
                  onMoveDown={() => moveS1Image(img.id, 1)} />
              ))}
              {sortedS1Images.length < 2 && (
                <div style={{ marginTop: 8, padding: "12px 16px",
                  border: `1px dashed ${T.borderHi}`, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: T.muted }}>
                    {2 - sortedS1Images.length} image slot
                    {2 - sortedS1Images.length > 1 ? "s" : ""} empty
                  </span>
                  <button onClick={() => setPicker("s1image")}
                    style={{ padding: "6px 16px", background: T.accentDim,
                      border: `1px solid ${T.accentGlow}`, borderRadius: 8,
                      color: T.accent, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    + Add Image
                  </button>
                </div>
              )}
            </div>
            <SaveBtn onClick={saveSectionOne} saving={saving} />
          </SectionShell>
        )}

        {/* ── SECTION TWO TAB ──────────────────────────────────── */}
        {tab === "s2" && (
          <SectionShell title="Section Two — Rooms Header">
            <p style={{ fontSize: 12, color: T.muted, marginBottom: 20 }}>
              Edit the section headings. Room cards are managed separately.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Label / Eyebrow"
                value={s2.label}
                onChange={v => setS2(s => ({ ...s, label: v }))} />
              <Field label="Heading"
                value={s2.heading}
                onChange={v => setS2(s => ({ ...s, heading: v }))} />
            </div>
            <Field label="Subheading" multiline
              value={s2.subheading}
              onChange={v => setS2(s => ({ ...s, subheading: v }))} />
            <div style={{ margin: "20px 0", borderTop: `1px solid ${T.border}` }} />
            <Label>Experiences Sub-section</Label>
            <div style={{ marginTop: 12, display: "grid",
              gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Experiences Label"
                value={s2.expLabel}
                onChange={v => setS2(s => ({ ...s, expLabel: v }))} />
              <Field label="Experiences Heading"
                value={s2.expHeading}
                onChange={v => setS2(s => ({ ...s, expHeading: v }))} />
            </div>
            <SaveBtn onClick={saveSectionTwo} saving={saving} />
          </SectionShell>
        )}

      </div>
    </div>
  );
}