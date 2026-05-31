"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────
type MediaAsset = { id: string; title: string; imageUrl: string; resourceType: string };

type MenuItem     = { id: string; name: string; desc: string; cat: string; order: number };
type MenuSection  = { id: string; title: string; order: number; items: MenuItem[] };

type Recipe = {
  id: string; label: string; title: string; desc: string; time: string; cat: string;
  gradientFrom: string; gradientTo: string; order: number;
  isFeatured: boolean; assetId?: string; asset?: MediaAsset;
};

type DiningCategory = { id: string; label: string; title: string; order: number; assetId?: string; asset?: MediaAsset };
type TopCategory    = { id: string; label: string; order: number; assetId?: string; asset?: MediaAsset };
type WeeklyFeatured = { id: string; label: string; title: string; assetId?: string; asset?: MediaAsset };
type WeeklySide     = { id: string; label: string; title: string; order: number; assetId?: string; asset?: MediaAsset };

type WellnessArticle = {
  id: string; cat: string; title: string; excerpt: string; readTime: string;
  isHero: boolean; order: number; assetId?: string; asset?: MediaAsset;
};

// ── Design tokens ─────────────────────────────────────────────────
const T = {
  bg:         "#0a0e0a",
  surface:    "#101410",
  surfaceHi:  "#161c16",
  border:     "#1e281e",
  borderHi:   "#283828",
  accent:     "#c8a050",
  accentDim:  "rgba(200,160,80,0.10)",
  accentGlow: "rgba(200,160,80,0.22)",
  accent2:    "#7ec850",
  heading:    "#f0e8d0",
  body:       "#8a9a7a",
  muted:      "#3a4a3a",
  danger:     "#e05252",
  dangerDim:  "rgba(224,82,82,0.10)",
};

const CAT_COLORS: Record<string, string> = {
  "Main course":   "#c8603a",
  "Soups & stews": "#c87830",
  "Breakfast":     "#c8a050",
  "Small chops":   "#50a878",
  "Sides":         "#5088c8",
  "Desserts":      "#c850a0",
  "Drinks":        "#5088c8",
  "Nutrition":     "#7ec850",
  "Wellness":      "#50c8a8",
  "Detox":         "#50c8c8",
  "Immunity":      "#50a8c8",
  "Energy":        "#c8c850",
  "Lifestyle":     "#a850c8",
};

const RECIPE_CATS  = ["Main course","Soups & stews","Breakfast","Small chops","Sides","Desserts","Drinks"];
const WELLNESS_CATS = ["Nutrition","Wellness","Detox","Immunity","Energy","Lifestyle"];

// ── Primitives ────────────────────────────────────────────────────
function Lbl({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
    textTransform: "uppercase" as const, color: T.accent }}>{children}</span>;
}

function Badge({ label, color }: { label: string; color?: string }) {
  const c = color ?? CAT_COLORS[label] ?? T.accent;
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase" as const, color: c, background: `${c}18`,
    border: `1px solid ${c}33`, padding: "2px 8px", borderRadius: 20 }}>{label}</span>;
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: 14, overflow: "hidden", ...style }}>{children}</div>;
}

function CardHead({ title, sub, action }: { title: string; sub?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ padding: "15px 20px", borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 3, height: 15, background: T.accent, borderRadius: 3, display: "block" }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: T.heading, letterSpacing: "0.03em" }}>{title}</span>
        {sub}
      </div>
      {action}
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, type = "text", hint }: {
  label: string; value: string | number; onChange: (v: string) => void;
  multiline?: boolean; type?: string; hint?: string;
}) {
  const base: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
    borderRadius: 8, padding: "8px 11px", color: T.heading,
    fontSize: 12, fontFamily: "inherit", outline: "none",
    resize: multiline ? "vertical" : "none",
  };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 4 }}><Lbl>{label}</Lbl></div>
      {hint && <p style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>{hint}</p>}
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} style={{ ...base, minHeight: 66 }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} style={base} />}
    </div>
  );
}

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 4 }}><Lbl>{label}</Lbl></div>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
          borderRadius: 8, padding: "8px 11px", color: T.heading,
          fontSize: 12, fontFamily: "inherit", outline: "none" }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SaveBtn({ onClick, saving, label = "Save" }: { onClick: () => void; saving: boolean; label?: string }) {
  return (
    <button onClick={onClick} disabled={saving}
      style={{ padding: "8px 20px", background: T.accent, color: "#0a0e0a",
        border: "none", borderRadius: 8, fontSize: 11, fontWeight: 800,
        letterSpacing: "0.12em", textTransform: "uppercase" as const,
        cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}>
      {saving ? "Saving…" : label}
    </button>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick}
      style={{ padding: "6px 14px", background: T.accentDim,
        border: `1px solid ${T.accentGlow}`, borderRadius: 7,
        color: T.accent, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
      {label}
    </button>
  );
}

function DelBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ background: T.dangerDim, border: `1px solid rgba(224,82,82,0.2)`,
        color: T.danger, borderRadius: 7, padding: "4px 9px",
        fontSize: 16, cursor: "pointer", lineHeight: 1 }}>×</button>
  );
}

function Toast({ msg, err }: { msg: string; err: string }) {
  if (!msg && !err) return null;
  return (
    <div style={{ position: "fixed", bottom: 26, right: 26, zIndex: 999,
      background: err ? T.danger : T.accent, color: err ? "#fff" : "#0a0e0a",
      borderRadius: 10, padding: "10px 20px", fontSize: 12, fontWeight: 700,
      boxShadow: `0 8px 28px ${err ? "rgba(224,82,82,0.3)" : T.accentGlow}` }}>
      {err ? `✗ ${err}` : `✓ ${msg}`}
    </div>
  );
}

// ── Media picker ──────────────────────────────────────────────────
function MediaPicker({ onPick, onClose }: { onPick: (a: MediaAsset) => void; onClose: () => void }) {
  const [assets, setAssets]   = useState<MediaAsset[]>([]);
  const [q, setQ]             = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/media").then(r => r.json()).then(d => { setAssets(d); setLoading(false); });
  }, []);

  const list = assets
    .filter(a => a.resourceType === "image")
    .filter(a => a.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300,
      background: "rgba(0,0,0,0.82)", display: "flex",
      alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: T.surface, border: `1px solid ${T.borderHi}`,
        borderRadius: 16, width: "min(700px,95vw)", maxHeight: "80vh",
        display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.heading }}>Pick from Media Library</span>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…"
            style={{ flex: 1, maxWidth: 240, background: T.surfaceHi,
              border: `1px solid ${T.borderHi}`, borderRadius: 7,
              padding: "6px 11px", color: T.heading, fontSize: 12,
              outline: "none", fontFamily: "inherit" }} />
          <button onClick={onClose}
            style={{ background: "none", border: "none", color: T.muted, fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ overflowY: "auto", padding: 16 }}>
          {loading
            ? <p style={{ color: T.muted, textAlign: "center", padding: "40px 0", fontSize: 12 }}>Loading…</p>
            : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 9 }}>
                {list.map(a => (
                  <button key={a.id} onClick={() => onPick(a)}
                    style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                      borderRadius: 8, overflow: "hidden", cursor: "pointer", padding: 0, textAlign: "left" as const }}>
                    <img src={a.imageUrl} alt={a.title}
                      style={{ width: "100%", height: 76, objectFit: "cover", display: "block" }} />
                    <div style={{ padding: "5px 8px", fontSize: 10, color: T.body,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</div>
                  </button>
                ))}
                {list.length === 0 && (
                  <p style={{ color: T.muted, fontSize: 11, gridColumn: "1/-1",
                    textAlign: "center", padding: "20px 0" }}>No images found</p>
                )}
              </div>
          }
        </div>
      </div>
    </div>
  );
}

// ── Image pick row ────────────────────────────────────────────────
function ImgPick({ asset, onPick, onClear }: { asset?: MediaAsset; onPick: () => void; onClear: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <Lbl>Image</Lbl>
      {asset
        ? <>
            <img src={asset.imageUrl} alt={asset.title}
              style={{ width: 56, height: 38, objectFit: "cover", borderRadius: 6, border: `1px solid ${T.border}` }} />
            <button onClick={onPick}
              style={{ padding: "5px 11px", background: T.accentDim, border: `1px solid ${T.accentGlow}`,
                borderRadius: 7, color: T.accent, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Change</button>
            <button onClick={onClear}
              style={{ padding: "5px 11px", background: T.dangerDim,
                border: `1px solid rgba(224,82,82,0.2)`, borderRadius: 7,
                color: T.danger, fontSize: 11, cursor: "pointer" }}>Remove</button>
          </>
        : <button onClick={onPick}
            style={{ padding: "5px 11px", background: T.accentDim, border: `1px solid ${T.accentGlow}`,
              borderRadius: 7, color: T.accent, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Pick Image</button>
      }
    </div>
  );
}

// ── Gradient picker ───────────────────────────────────────────────
function GradientPicker({ from, to, onFrom, onTo }: {
  from: string; to: string; onFrom: (v: string) => void; onTo: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 6 }}><Lbl>Card Gradient</Lbl></div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input type="color" value={from} onChange={e => onFrom(e.target.value)}
            style={{ width: 36, height: 28, border: "none", borderRadius: 6, background: "none", cursor: "pointer", padding: 0 }} />
          <input value={from} onChange={e => onFrom(e.target.value)}
            style={{ width: 80, background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
              borderRadius: 7, padding: "6px 9px", color: T.heading, fontSize: 11, fontFamily: "monospace", outline: "none" }} />
        </div>
        <span style={{ color: T.muted, fontSize: 12 }}>→</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input type="color" value={to} onChange={e => onTo(e.target.value)}
            style={{ width: 36, height: 28, border: "none", borderRadius: 6, background: "none", cursor: "pointer", padding: 0 }} />
          <input value={to} onChange={e => onTo(e.target.value)}
            style={{ width: 80, background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
              borderRadius: 7, padding: "6px 9px", color: T.heading, fontSize: 11, fontFamily: "monospace", outline: "none" }} />
        </div>
        <div style={{ flex: 1, height: 28, borderRadius: 7,
          background: `linear-gradient(135deg, ${from}, ${to})`, border: `1px solid ${T.border}` }} />
      </div>
    </div>
  );
}

// ── Menu editor ───────────────────────────────────────────────────
function MenuEditor({ sections, onChange, onSave, saving }: {
  sections: MenuSection[]; onChange: (s: MenuSection[]) => void;
  onSave: () => void; saving: boolean;
}) {
  function addSection() {
    onChange([...sections, { id: `new-${Date.now()}`, title: "New Section", order: sections.length, items: [] }]);
  }
  function removeSection(id: string) {
    onChange(sections.filter(s => s.id !== id).map((s, i) => ({ ...s, order: i })));
  }
  function updateSection(id: string, patch: Partial<MenuSection>) {
    onChange(sections.map(s => s.id === id ? { ...s, ...patch } : s));
  }
  function addItem(sectionId: string) {
    onChange(sections.map(s => s.id === sectionId
      ? { ...s, items: [...s.items, { id: `new-${Date.now()}`, name: "", desc: "", cat: s.title, order: s.items.length }] }
      : s));
  }
  function removeItem(sectionId: string, itemId: string) {
    onChange(sections.map(s => s.id === sectionId
      ? { ...s, items: s.items.filter(i => i.id !== itemId).map((i, idx) => ({ ...i, order: idx })) }
      : s));
  }
  function updateItem(sectionId: string, itemId: string, patch: Partial<MenuItem>) {
    onChange(sections.map(s => s.id === sectionId
      ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, ...patch } : i) }
      : s));
  }

  return (
    <div>
      {sections.map(sec => (
        <div key={sec.id} style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
          borderRadius: 10, padding: 16, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <input value={sec.title} onChange={e => updateSection(sec.id, { title: e.target.value })}
              style={{ flex: 1, background: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 7, padding: "7px 11px", color: T.heading,
                fontSize: 13, fontWeight: 700, fontFamily: "inherit", outline: "none" }} />
            <DelBtn onClick={() => removeSection(sec.id)} />
          </div>
          {sec.items.map(item => (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px 36px",
              gap: 8, marginBottom: 8, alignItems: "start" }}>
              <input value={item.name} placeholder="Dish name"
                onChange={e => updateItem(sec.id, item.id, { name: e.target.value })}
                style={{ background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 7, padding: "7px 10px", color: T.heading, fontSize: 12, fontFamily: "inherit", outline: "none" }} />
              <input value={item.desc} placeholder="Description"
                onChange={e => updateItem(sec.id, item.id, { desc: e.target.value })}
                style={{ background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 7, padding: "7px 10px", color: T.heading, fontSize: 12, fontFamily: "inherit", outline: "none" }} />
              <input value={item.cat} placeholder="Category"
                onChange={e => updateItem(sec.id, item.id, { cat: e.target.value })}
                style={{ background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 7, padding: "7px 10px", color: T.heading, fontSize: 12, fontFamily: "inherit", outline: "none" }} />
              <DelBtn onClick={() => removeItem(sec.id, item.id)} />
            </div>
          ))}
          <AddBtn onClick={() => addItem(sec.id)} label="+ Add Item" />
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <AddBtn onClick={addSection} label="+ Add Section" />
        <SaveBtn onClick={onSave} saving={saving} label="Save Menu" />
      </div>
    </div>
  );
}

// ── Recipe card ───────────────────────────────────────────────────
function RecipeCard({ recipe, onEdit, onDelete, onFeature }: {
  recipe: Recipe; onEdit: () => void; onDelete: () => void; onFeature: () => void;
}) {
  return (
    <div style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
      borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 80,
        background: `linear-gradient(135deg, ${recipe.gradientFrom}, ${recipe.gradientTo})` }}>
        {recipe.asset && (
          <img src={recipe.asset.imageUrl} alt={recipe.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, position: "absolute", inset: 0 }} />
        )}
        <div style={{ position: "absolute", inset: 0, padding: "8px 10px",
          display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <Badge label={recipe.cat} />
        </div>
        {recipe.isFeatured && (
          <div style={{ position: "absolute", top: 6, right: 8, background: T.accent,
            color: "#0a0e0a", fontSize: 9, fontWeight: 800, letterSpacing: "0.14em",
            padding: "2px 7px", borderRadius: 10, textTransform: "uppercase" as const }}>★ Featured</div>
        )}
      </div>
      <div style={{ padding: "10px 12px", flex: 1 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: T.heading, marginBottom: 3, lineHeight: 1.3 }}>{recipe.title}</p>
        <p style={{ fontSize: 11, color: T.body, lineHeight: 1.5 }}>{recipe.time}</p>
      </div>
      <div style={{ padding: "8px 12px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 6 }}>
        <button onClick={onEdit}
          style={{ flex: 1, padding: "5px 0", background: T.accentDim, border: `1px solid ${T.accentGlow}`,
            borderRadius: 6, color: T.accent, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Edit</button>
        {!recipe.isFeatured && (
          <button onClick={onFeature}
            style={{ flex: 1, padding: "5px 0", background: "rgba(200,160,80,0.06)",
              border: `1px solid rgba(200,160,80,0.15)`, borderRadius: 6,
              color: T.accent, fontSize: 10, cursor: "pointer" }}>★ Feature</button>
        )}
        <button onClick={onDelete}
          style={{ padding: "5px 10px", background: T.dangerDim,
            border: `1px solid rgba(224,82,82,0.2)`, borderRadius: 6,
            color: T.danger, fontSize: 14, cursor: "pointer", lineHeight: 1 }}>×</button>
      </div>
    </div>
  );
}

// ── Recipe form ───────────────────────────────────────────────────
// NOTE: `recipe` prop is the source of truth for asset — the parent
// updates it after the media picker resolves, so we sync via useEffect.
function RecipeForm({ recipe, onSave, onCancel, saving, setPicker }: {
  recipe: Partial<Recipe>; onSave: (r: Partial<Recipe>) => void;
  onCancel: () => void; saving: boolean; setPicker: (v: string | null) => void;
}) {
  const [form, setForm] = useState<Partial<Recipe>>({
    label: "", title: "", desc: "", time: "", cat: "Main course",
    gradientFrom: "#1a3a1a", gradientTo: "#2d5a1a",
    order: 0, isFeatured: false, ...recipe,
  });

  // ── Sync asset from parent when media picker resolves ─────────────
  useEffect(() => {
    setForm(f => ({ ...f, assetId: recipe.assetId, asset: recipe.asset }));
  }, [recipe.assetId, recipe.asset]);

  const set = (k: keyof Recipe) => (v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
      borderRadius: 12, padding: 18, marginBottom: 16 }}>
      <div style={{ marginBottom: 12 }}><Lbl>{form.id ? "Edit Recipe" : "New Recipe"}</Lbl></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Title" value={form.title ?? ""} onChange={set("title")} />
        <Field label="Time (e.g. 90 min)" value={form.time ?? ""} onChange={set("time")} />
        <Select label="Category" value={form.cat ?? "Main course"} onChange={set("cat")} options={RECIPE_CATS} />
        <Field label="Label (e.g. MAIN COURSE)" value={form.label ?? ""} onChange={set("label")} />
      </div>
      <Field label="Description" multiline value={form.desc ?? ""} onChange={set("desc")} />
      <GradientPicker
        from={form.gradientFrom ?? "#1a3a1a"} to={form.gradientTo ?? "#2d5a1a"}
        onFrom={set("gradientFrom")} onTo={set("gradientTo")} />
      <ImgPick
        asset={form.asset}
        onPick={() => setPicker(`recipe-${form.id ?? "new"}`)}
        onClear={() => setForm(f => ({ ...f, assetId: undefined, asset: undefined }))}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <input type="checkbox" id="featured-cb" checked={form.isFeatured ?? false}
          onChange={e => set("isFeatured")(e.target.checked)} style={{ accentColor: T.accent }} />
        <label htmlFor="featured-cb" style={{ fontSize: 12, color: T.body, cursor: "pointer" }}>
          Mark as featured hero recipe
        </label>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <SaveBtn onClick={() => onSave(form)} saving={saving} label="Save Recipe" />
        <button onClick={onCancel}
          style={{ padding: "8px 16px", background: "none", border: `1px solid ${T.border}`,
            borderRadius: 8, color: T.muted, fontSize: 11, cursor: "pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

// ── Wellness form ─────────────────────────────────────────────────
// Same fix: sync asset from parent via useEffect.
function WellnessForm({ article, onSave, onCancel, saving, setPicker }: {
  article: Partial<WellnessArticle>; onSave: (a: Partial<WellnessArticle>) => void;
  onCancel: () => void; saving: boolean; setPicker: (v: string | null) => void;
}) {
  const [form, setForm] = useState<Partial<WellnessArticle>>({
    cat: "Nutrition", title: "", excerpt: "", readTime: "3 min read",
    isHero: false, order: 0, ...article,
  });

  // ── Sync asset from parent when media picker resolves ─────────────
  useEffect(() => {
    setForm(f => ({ ...f, assetId: article.assetId, asset: article.asset }));
  }, [article.assetId, article.asset]);

  const set = (k: keyof WellnessArticle) => (v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
      borderRadius: 12, padding: 18, marginBottom: 16 }}>
      <div style={{ marginBottom: 12 }}><Lbl>{form.id ? "Edit Article" : "New Article"}</Lbl></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Select label="Category" value={form.cat ?? "Nutrition"} onChange={set("cat")} options={WELLNESS_CATS} />
        <Field label="Read Time" value={form.readTime ?? "3 min read"} onChange={set("readTime")} />
      </div>
      <Field label="Title" value={form.title ?? ""} onChange={set("title")} />
      <Field label="Excerpt" multiline value={form.excerpt ?? ""} onChange={set("excerpt")} />
      <ImgPick
        asset={form.asset}
        onPick={() => setPicker(`wellness-${form.id ?? "new"}`)}
        onClear={() => setForm(f => ({ ...f, assetId: undefined, asset: undefined }))}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <input type="checkbox" id="hero-cb" checked={form.isHero ?? false}
          onChange={e => set("isHero")(e.target.checked)} style={{ accentColor: T.accent2 }} />
        <label htmlFor="hero-cb" style={{ fontSize: 12, color: T.body, cursor: "pointer" }}>
          Mark as hero article (large featured card)
        </label>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <SaveBtn onClick={() => onSave(form)} saving={saving} label="Save Article" />
        <button onClick={onCancel}
          style={{ padding: "8px 16px", background: "none", border: `1px solid ${T.border}`,
            borderRadius: 8, color: T.muted, fontSize: 11, cursor: "pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// ── MAIN PAGE ─────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════
export default function DiningEditor() {
  const [tab, setTab]         = useState<"menu"|"recipes"|"cats"|"weekly"|"wellness">("menu");
  const [toast, setToast]     = useState("");
  const [errMsg, setErrMsg]   = useState("");
  const [saving, setSaving]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [picker, setPicker]   = useState<string | null>(null);

  const [menuSections, setMenuSections]     = useState<MenuSection[]>([]);
  const [recipes, setRecipes]               = useState<Recipe[]>([]);
  const [editingRecipe, setEditingRecipe]   = useState<Partial<Recipe> | null>(null);
  const [diningCats, setDiningCats]         = useState<DiningCategory[]>([]);
  const [topCats, setTopCats]               = useState<TopCategory[]>([]);
  const [weekly, setWeekly]                 = useState<WeeklyFeatured>({ id: "main", label: "", title: "" });
  const [weeklySides, setWeeklySides]       = useState<WeeklySide[]>([]);
  const [articles, setArticles]             = useState<WellnessArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<WellnessArticle> | null>(null);

  // ── Fetch all ─────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [menuRes, recRes, catRes, weekRes, wellRes] = await Promise.all([
        fetch("/api/dining/menu"),
        fetch("/api/dining/recipes"),
        fetch("/api/dining/categories"),
        fetch("/api/dining/weekly"),
        fetch("/api/dining/wellness"),
      ]);
      const [menu, rec, cat, week, well] = await Promise.all([
        menuRes.json(), recRes.json(), catRes.json(), weekRes.json(), wellRes.json(),
      ]);
      if (Array.isArray(menu))        setMenuSections(menu);
      if (Array.isArray(rec))         setRecipes(rec);
      if (cat?.diningCategories)      setDiningCats(cat.diningCategories);
      if (cat?.topCategories)         setTopCats(cat.topCategories);
      if (week?.featured)             setWeekly(week.featured);
      if (week?.sides)                setWeeklySides(week.sides);
      if (Array.isArray(well))        setArticles(well);
    } catch { showError("Failed to load data"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  function showToast(m: string) { setToast(m);  setTimeout(() => setToast(""),  2800); }
  function showError(m: string) { setErrMsg(m); setTimeout(() => setErrMsg(""), 3500); }

  async function apiCall(url: string, body: unknown, method = "PUT") {
    setSaving(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "DELETE" ? undefined : JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (e: any) { showError(e.message ?? "Save failed"); return null; }
    finally { setSaving(false); }
  }

  // ── Menu ──────────────────────────────────────────────────────────
  async function saveMenu() {
    const ok = await apiCall("/api/dining/menu", menuSections);
    if (ok) { setMenuSections(ok); showToast("Menu saved"); }
  }

  // ── Recipes ───────────────────────────────────────────────────────
  async function saveRecipe(form: Partial<Recipe>) {
    if (form.id) {
      const ok = await apiCall(`/api/dining/recipes/${form.id}`, form);
      if (ok) { setRecipes(rs => rs.map(r => r.id === ok.id ? ok : r)); showToast("Recipe saved"); }
    } else {
      const ok = await apiCall("/api/dining/recipes", form, "POST");
      if (ok) { setRecipes(rs => [...rs, ok]); showToast("Recipe created"); }
    }
    setEditingRecipe(null);
  }

  async function deleteRecipe(id: string) {
    if (!confirm("Delete this recipe?")) return;
    const ok = await apiCall(`/api/dining/recipes/${id}`, null, "DELETE");
    if (ok !== null) { setRecipes(rs => rs.filter(r => r.id !== id)); showToast("Deleted"); }
  }

  async function featureRecipe(id: string) {
    const ok = await apiCall(`/api/dining/recipes/${id}`,
      { ...recipes.find(r => r.id === id), isFeatured: true });
    if (ok) { setRecipes(rs => rs.map(r => ({ ...r, isFeatured: r.id === id }))); showToast("Featured updated"); }
  }

  // ── Categories ────────────────────────────────────────────────────
  async function saveCats() {
    const ok = await apiCall("/api/dining/categories",
      { diningCategories: diningCats, topCategories: topCats });
    if (ok) { setDiningCats(ok.diningCategories); setTopCats(ok.topCategories); showToast("Categories saved"); }
  }

  // ── Weekly ────────────────────────────────────────────────────────
  async function saveWeekly() {
    const ok = await apiCall("/api/dining/weekly", { featured: weekly, sides: weeklySides });
    if (ok) { setWeekly(ok.featured); setWeeklySides(ok.sides); showToast("Weekly saved"); }
  }

  // ── Wellness ──────────────────────────────────────────────────────
  async function saveArticle(form: Partial<WellnessArticle>) {
    if (form.id) {
      const ok = await apiCall(`/api/dining/wellness/${form.id}`, form);
      if (ok) { setArticles(as => as.map(a => a.id === ok.id ? ok : a)); showToast("Article saved"); }
    } else {
      const ok = await apiCall("/api/dining/wellness", form, "POST");
      if (ok) { setArticles(as => [...as, ok]); showToast("Article created"); }
    }
    setEditingArticle(null);
  }

  async function deleteArticle(id: string) {
    if (!confirm("Delete this article?")) return;
    const ok = await apiCall(`/api/dining/wellness/${id}`, null, "DELETE");
    if (ok !== null) { setArticles(as => as.filter(a => a.id !== id)); showToast("Deleted"); }
  }

  // ── Media picker resolution ───────────────────────────────────────
  // We update the PARENT state here. The child forms sync via useEffect.
  function handlePick(asset: MediaAsset) {
    if (!picker) return;

    if (picker.startsWith("recipe-")) {
      setEditingRecipe(r => r ? { ...r, assetId: asset.id, asset } : r);

    } else if (picker.startsWith("wellness-")) {
      setEditingArticle(a => a ? { ...a, assetId: asset.id, asset } : a);

    } else if (picker === "weekly-featured") {
      setWeekly(w => ({ ...w, assetId: asset.id, asset }));

    } else if (picker.startsWith("weekly-side-")) {
      const idx = parseInt(picker.replace("weekly-side-", ""));
      setWeeklySides(s => s.map((ws, i) => i === idx ? { ...ws, assetId: asset.id, asset } : ws));

    } else if (picker.startsWith("dcat-")) {
      const idx = parseInt(picker.replace("dcat-", ""));
      setDiningCats(c => c.map((dc, i) => i === idx ? { ...dc, assetId: asset.id, asset } : dc));

    } else if (picker.startsWith("tcat-")) {
      const idx = parseInt(picker.replace("tcat-", ""));
      setTopCats(c => c.map((tc, i) => i === idx ? { ...tc, assetId: asset.id, asset } : tc));
    }

    setPicker(null);
  }

  const mainTabs = [
    { key: "menu",     label: "Menu"      },
    { key: "recipes",  label: "Recipes"   },
    { key: "cats",     label: "Categories"},
    { key: "weekly",   label: "Weekly"    },
    { key: "wellness", label: "Wellness"  },
  ] as const;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ width: 28, height: 28, border: `3px solid ${T.border}`,
            borderTop: `3px solid ${T.accent}`, borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ color: T.muted, fontSize: 12 }}>Loading dining data…</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.body,
      fontFamily: "'DM Sans','Inter',sans-serif", padding: "26px 18px" }}>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        input:focus, textarea:focus, select:focus {
          border-color: ${T.accent} !important;
          box-shadow: 0 0 0 3px ${T.accentDim};
        }
      `}</style>

      <Toast msg={toast} err={errMsg} />
      {picker && <MediaPicker onPick={handlePick} onClose={() => setPicker(null)} />}

      {/* Header */}
      <div style={{ maxWidth: 1080, margin: "0 auto 26px" }}>
        <div style={{ display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <Lbl>Admin Dashboard</Lbl>
            <h1 style={{ margin: "5px 0 0", fontSize: 24, fontWeight: 800,
              color: T.heading, letterSpacing: "-0.02em" }}>Dining & Wellness Editor</h1>
          </div>
          <a href="/dining" target="_blank"
            style={{ fontSize: 11, color: T.accent, textDecoration: "none",
              background: T.accentDim, border: `1px solid ${T.accentGlow}`,
              borderRadius: 7, padding: "6px 14px", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase" as const }}>↗ Preview Dining</a>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, marginTop: 22, borderBottom: `1px solid ${T.border}` }}>
          {mainTabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ padding: "9px 16px", background: "none", border: "none",
                borderBottom: tab === t.key ? `2px solid ${T.accent}` : "2px solid transparent",
                color: tab === t.key ? T.accent : T.muted,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase" as const, cursor: "pointer", marginBottom: -1 }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* ══ MENU ══════════════════════════════════════════════════ */}
        {tab === "menu" && (
          <Card>
            <CardHead title="Menu Sections"
              sub={<Badge label={`${menuSections.length} sections`} color={T.accent} />} />
            <div style={{ padding: 22 }}>
              <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
                Edit menu sections and items shown on the dining page.
              </p>
              <MenuEditor sections={menuSections} onChange={setMenuSections}
                onSave={saveMenu} saving={saving} />
            </div>
          </Card>
        )}

        {/* ══ RECIPES ═══════════════════════════════════════════════ */}
        {tab === "recipes" && (
          <Card>
            <CardHead title="Recipes"
              sub={<Badge label={`${recipes.length} recipes`} color={T.accent} />}
              action={<AddBtn onClick={() => setEditingRecipe({})} label="+ New Recipe" />}
            />
            <div style={{ padding: 22 }}>
              {editingRecipe && (
                <RecipeForm
                  recipe={editingRecipe}
                  onSave={saveRecipe}
                  onCancel={() => setEditingRecipe(null)}
                  saving={saving}
                  setPicker={setPicker}
                />
              )}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                {recipes.map(r => (
                  <RecipeCard key={r.id} recipe={r}
                    onEdit={() => setEditingRecipe(r)}
                    onDelete={() => deleteRecipe(r.id)}
                    onFeature={() => featureRecipe(r.id)} />
                ))}
              </div>
              {recipes.length === 0 && !editingRecipe && (
                <p style={{ color: T.muted, fontSize: 12, textAlign: "center", padding: "30px 0" }}>
                  No recipes yet. Create one above.
                </p>
              )}
            </div>
          </Card>
        )}

        {/* ══ CATEGORIES ════════════════════════════════════════════ */}
        {tab === "cats" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card>
              <CardHead title="Dining Categories"
                sub={<Badge label={`${diningCats.length} cards`} color={T.accent} />}
                action={
                  <AddBtn onClick={() => setDiningCats(c => [...c, {
                    id: `new-${Date.now()}`, label: "", title: "", order: c.length,
                  }])} label="+ Add" />
                }
              />
              <div style={{ padding: 18 }}>
                {diningCats.map((dc, i) => (
                  <div key={dc.id} style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                    borderRadius: 9, padding: 12, marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                      <DelBtn onClick={() => setDiningCats(c =>
                        c.filter((_, j) => j !== i).map((x, j) => ({ ...x, order: j })))} />
                    </div>
                    <Field label="Label (e.g. DINNER)" value={dc.label}
                      onChange={v => setDiningCats(c => c.map((x, j) => j === i ? { ...x, label: v } : x))} />
                    <Field label="Title" value={dc.title}
                      onChange={v => setDiningCats(c => c.map((x, j) => j === i ? { ...x, title: v } : x))} />
                    <ImgPick asset={dc.asset}
                      onPick={() => setPicker(`dcat-${i}`)}
                      onClear={() => setDiningCats(c => c.map((x, j) =>
                        j === i ? { ...x, assetId: undefined, asset: undefined } : x))} />
                  </div>
                ))}
                <SaveBtn onClick={saveCats} saving={saving} label="Save Categories" />
              </div>
            </Card>

            <Card>
              <CardHead title="Top Category Chips"
                sub={<Badge label={`${topCats.length} chips`} color={T.accent} />}
                action={
                  <AddBtn onClick={() => setTopCats(c => [...c, {
                    id: `new-${Date.now()}`, label: "", order: c.length,
                  }])} label="+ Add" />
                }
              />
              <div style={{ padding: 18 }}>
                {topCats.map((tc, i) => (
                  <div key={tc.id} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ flex: 1, background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                      borderRadius: 9, padding: 10 }}>
                      <Field label="Label (e.g. BREAKFAST)" value={tc.label}
                        onChange={v => setTopCats(c => c.map((x, j) => j === i ? { ...x, label: v } : x))} />
                      <ImgPick asset={tc.asset}
                        onPick={() => setPicker(`tcat-${i}`)}
                        onClear={() => setTopCats(c => c.map((x, j) =>
                          j === i ? { ...x, assetId: undefined, asset: undefined } : x))} />
                    </div>
                    <DelBtn onClick={() => setTopCats(c =>
                      c.filter((_, j) => j !== i).map((x, j) => ({ ...x, order: j })))} />
                  </div>
                ))}
                <SaveBtn onClick={saveCats} saving={saving} label="Save Chips" />
              </div>
            </Card>
          </div>
        )}

        {/* ══ WEEKLY ════════════════════════════════════════════════ */}
        {tab === "weekly" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card>
              <CardHead title="Weekly Featured Hero" sub={<Badge label="Single row" color={T.accent} />} />
              <div style={{ padding: 20 }}>
                <Field label="Label" value={weekly.label}
                  onChange={v => setWeekly(w => ({ ...w, label: v }))} />
                <Field label="Title" value={weekly.title} multiline
                  onChange={v => setWeekly(w => ({ ...w, title: v }))} />
                <ImgPick asset={weekly.asset}
                  onPick={() => setPicker("weekly-featured")}
                  onClear={() => setWeekly(w => ({ ...w, assetId: undefined, asset: undefined }))} />
                <SaveBtn onClick={saveWeekly} saving={saving} label="Save Weekly" />
              </div>
            </Card>

            <Card>
              <CardHead title="Weekly Side Cards"
                sub={<Badge label={`${weeklySides.length} cards`} color={T.accent} />}
                action={
                  <AddBtn onClick={() => setWeeklySides(s => [...s, {
                    id: `new-${Date.now()}`, label: "", title: "", order: s.length,
                  }])} label="+ Add" />
                }
              />
              <div style={{ padding: 18 }}>
                {weeklySides.map((ws, i) => (
                  <div key={ws.id} style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}`,
                    borderRadius: 9, padding: 12, marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
                      <DelBtn onClick={() => setWeeklySides(s =>
                        s.filter((_, j) => j !== i).map((x, j) => ({ ...x, order: j })))} />
                    </div>
                    <Field label="Label" value={ws.label}
                      onChange={v => setWeeklySides(s => s.map((x, j) => j === i ? { ...x, label: v } : x))} />
                    <Field label="Title" multiline value={ws.title}
                      onChange={v => setWeeklySides(s => s.map((x, j) => j === i ? { ...x, title: v } : x))} />
                    <ImgPick asset={ws.asset}
                      onPick={() => setPicker(`weekly-side-${i}`)}
                      onClear={() => setWeeklySides(s => s.map((x, j) =>
                        j === i ? { ...x, assetId: undefined, asset: undefined } : x))} />
                  </div>
                ))}
                <SaveBtn onClick={saveWeekly} saving={saving} label="Save Sides" />
              </div>
            </Card>
          </div>
        )}

        {/* ══ WELLNESS ══════════════════════════════════════════════ */}
        {tab === "wellness" && (
          <Card>
            <CardHead title="Wellness Articles"
              sub={<Badge label={`${articles.length} articles`} color={T.accent2} />}
              action={<AddBtn onClick={() => setEditingArticle({})} label="+ New Article" />}
            />
            <div style={{ padding: 22 }}>
              {editingArticle && (
                <WellnessForm
                  article={editingArticle}
                  onSave={saveArticle}
                  onCancel={() => setEditingArticle(null)}
                  saving={saving}
                  setPicker={setPicker}
                />
              )}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
                {articles.map(a => (
                  <div key={a.id} style={{ background: T.surfaceHi,
                    border: `1px solid ${a.isHero ? T.accent2 : T.borderHi}`,
                    borderRadius: 10, overflow: "hidden" }}>
                    {a.asset && (
                      <img src={a.asset.imageUrl} alt={a.title}
                        style={{ width: "100%", height: 72, objectFit: "cover", display: "block" }} />
                    )}
                    <div style={{ padding: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <Badge label={a.cat} />
                        {a.isHero && <Badge label="Hero" color={T.accent2} />}
                        <span style={{ fontSize: 10, color: T.muted, marginLeft: "auto" }}>{a.readTime}</span>
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: T.heading,
                        marginBottom: 4, lineHeight: 1.3 }}>{a.title}</p>
                      <p style={{ fontSize: 11, color: T.body, lineHeight: 1.5,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{a.excerpt}</p>
                    </div>
                    <div style={{ padding: "8px 12px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 6 }}>
                      <button onClick={() => setEditingArticle(a)}
                        style={{ flex: 1, padding: "5px 0", background: T.accentDim,
                          border: `1px solid ${T.accentGlow}`, borderRadius: 6,
                          color: T.accent, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Edit</button>
                      <button onClick={() => deleteArticle(a.id)}
                        style={{ padding: "5px 10px", background: T.dangerDim,
                          border: `1px solid rgba(224,82,82,0.2)`, borderRadius: 6,
                          color: T.danger, fontSize: 14, cursor: "pointer", lineHeight: 1 }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
              {articles.length === 0 && !editingArticle && (
                <p style={{ color: T.muted, fontSize: 12, textAlign: "center", padding: "30px 0" }}>
                  No articles yet. Create one above.
                </p>
              )}
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}