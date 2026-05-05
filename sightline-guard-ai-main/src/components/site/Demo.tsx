import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Video, Radio, CheckCircle2, AlertTriangle, X, Loader2 } from "lucide-react";
import { SectionHeader } from "./Workflow";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const tabs = [
  { id: "image", label: "Upload Image", icon: Upload },
  { id: "video", label: "Upload Video", icon: Video },
  { id: "live",  label: "Live Feed",    icon: Radio },
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

interface Detection {
  bbox:        [number, number, number, number];
  confidence:  number;
  class_name:  string;
  occupants:   number;
  plate:       string;
  violation:   boolean;
  yolo_count:  number;
  face_count:  number;
}

interface DemoResult {
  detections:      Detection[];
  annotated_b64:   string;
  vehicle_count:   number;
  violation_count: number;
  plates_ocrd:     number;
  avg_confidence:  number;
  inference_ms:    number;
}

interface ViolationRow {
  id:        number;
  plate:     string;
  date:      string;
  time:      string;
  occupants: number;
  type:      string;
  count:     number;
  violation: boolean;
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function Demo() {
  const [tab, setTab]             = useState<typeof tabs[number]["id"]>("image");
  const [dragging, setDragging]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState<DemoResult | null>(null);
  const [error, setError]         = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tableRows, setTableRows] = useState<ViolationRow[]>([]);
  const [tableLoading, setTableLoading] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch violations table on mount
  useEffect(() => {
    fetch(`${API_URL}/api/violations?limit=20`)
      .then(r => r.json())
      .then(data => setTableRows(data))
      .catch(() => {/* keep empty */})
      .finally(() => setTableLoading(false));
  }, []);

  // ── File handling ────────────────────────────────────────────────────────────

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const isVideo = file.type.startsWith("video/");
    const endpoint = isVideo ? "/api/demo/video" : "/api/demo/image";

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }
      const data: DemoResult = await res.json();
      setResult(data);

      // Prepend new violations to table
      const newRows: ViolationRow[] = data.detections
        .filter(d => d.violation && d.plate)
        .map((d, i) => ({
          id:        Date.now() + i,
          plate:     d.plate,
          date:      new Date().toISOString().slice(0, 10),
          time:      new Date().toTimeString().slice(0, 8),
          occupants: d.occupants,
          type:      "HOV-2 Solo",
          count:     1,
          violation: true,
        }));

      if (newRows.length > 0) {
        setTableRows(prev => [...newRows, ...prev].slice(0, 20));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clearResult = () => {
    setResult(null);
    setPreviewUrl(null);
    setError(null);
  };

  // ── Stats strip values ───────────────────────────────────────────────────────

  const stats = [
    { l: "Vehicles",    v: result ? String(result.vehicle_count)   : "—",    c: "var(--electric)" },
    { l: "Plates OCR'd", v: result ? String(result.plates_ocrd)    : "—",    c: "var(--neon)" },
    { l: "Violations",  v: result ? String(result.violation_count) : "—",    c: "var(--destructive)" },
    { l: "Avg Conf.",   v: result ? `${(result.avg_confidence * 100).toFixed(1)}%` : "—", c: "var(--neon)" },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <section id="demo" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Live Demo"
          title="Run inference on your own footage"
          sub="Upload an image or video. The pipeline runs end-to-end and returns occupant counts, plate OCR, violations, and confidence — all in under a second."
        />

        <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-5">

          {/* ── Left panel: upload ── */}
          <div className="glass-strong rounded-2xl p-5 shadow-card">

            {/* Tab bar */}
            <div className="flex items-center gap-1 glass rounded-full p-1 w-fit">
              {tabs.map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => { setTab(t.id); clearResult(); }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition ${
                      tab === t.id
                        ? "bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-background font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" /> {t.label}
                  </button>
                );
              })}
            </div>

            {/* Drop zone / preview */}
            <div
              className={`mt-5 relative aspect-[16/10] rounded-xl overflow-hidden bg-[oklch(0.13_0.02_250)] border transition ${
                dragging ? "border-[var(--electric)] shadow-[0_0_24px_var(--electric)/30]" : "border-border"
              }`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={tab !== "live" ? onDrop : undefined}
            >
              <div className="absolute inset-0 grid-bg opacity-40" />

              {/* Annotated result image */}
              {result ? (
                <>
                  <img
                    src={`data:image/jpeg;base64,${result.annotated_b64}`}
                    alt="Annotated inference result"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <button
                    onClick={clearResult}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 grid place-items-center hover:bg-black/80 transition"
                  >
                    <X className="h-3.5 w-3.5 text-white" />
                  </button>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-[10px] font-mono text-white px-2 py-1 rounded">
                    {result.inference_ms}ms · YOLOv8 + MediaPipe + EasyOCR
                  </div>
                </>
              ) : loading ? (
                /* Loading state */
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <Loader2 className="h-10 w-10 text-[var(--electric)] animate-spin mx-auto mb-3" />
                    <div className="text-sm text-muted-foreground font-mono">Running pipeline…</div>
                    <div className="text-xs text-muted-foreground mt-1">Detection → Tracking → OCR</div>
                  </div>
                </div>
              ) : tab === "live" ? (
                /* Live feed placeholder */
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center px-6">
                    <Radio className="h-10 w-10 text-[var(--electric)] mx-auto mb-3" />
                    <div className="text-sm font-medium mb-2">Live Feed</div>
                    <input
                      type="text"
                      placeholder="rtsp://camera-ip:554/stream"
                      className="w-full bg-black/40 border border-border rounded-lg px-3 py-2 text-xs font-mono text-center placeholder:text-muted-foreground focus:outline-none focus:border-[var(--electric)]"
                    />
                    <div className="text-xs text-muted-foreground mt-2">RTSP / H.264 stream (requires backend on same network)</div>
                  </div>
                </div>
              ) : (
                /* Default upload prompt */
                <>
                  {/* Scan line animation */}
                  <div
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent animate-scan"
                    style={{ boxShadow: "0 0 12px var(--neon)" }}
                  />
                  {/* Static mock boxes shown before any upload */}
                  <div className="absolute top-[28%] left-[10%] w-[28%] h-[42%]">
                    <div className="absolute inset-0 border-2 border-[var(--destructive)] rounded" style={{ boxShadow: "0 0 18px oklch(0.65 0.24 25 / 0.55)" }} />
                    <div className="absolute -top-6 left-0 bg-[var(--destructive)] text-white px-1.5 py-0.5 rounded font-mono text-[10px]">VEHICLE · 0.98 · 1 PAX</div>
                  </div>
                  <div className="absolute top-[34%] left-[50%] w-[34%] h-[44%]">
                    <div className="absolute inset-0 border-2 border-[var(--neon)] rounded" style={{ boxShadow: "0 0 18px oklch(0.82 0.20 155 / 0.55)" }} />
                    <div className="absolute -top-6 left-0 bg-[var(--neon)] text-background px-1.5 py-0.5 rounded font-mono text-[10px]">VEHICLE · 0.99 · 3 PAX</div>
                  </div>
                  <div
                    className="absolute inset-0 grid place-items-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      <div className="mx-auto h-14 w-14 rounded-full glass-strong grid place-items-center mb-3">
                        <Upload className="h-6 w-6 text-[var(--electric)]" />
                      </div>
                      <div className="text-sm">
                        Drop {tab} here, or{" "}
                        <span className="text-[var(--electric)] hover:underline">browse</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        JPG · PNG · MP4 · MOV · max 250 MB
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Error banner */}
              {error && (
                <div className="absolute bottom-0 inset-x-0 bg-[var(--destructive)]/90 text-white text-xs font-mono px-3 py-2 flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={tab === "video" ? "video/*" : "image/*"}
              onChange={onFileChange}
            />

            {/* Upload button (visible below drop zone) */}
            {!result && !loading && tab !== "live" && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 w-full rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-white/5 transition"
              >
                Choose {tab === "video" ? "video" : "image"} file
              </button>
            )}

            {/* Stats strip */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {stats.map(s => (
                <div key={s.l} className="glass rounded-lg p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <div className="text-xl font-semibold mt-0.5" style={{ color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel: result ── */}
          <div className="glass-strong rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Inference Result</div>
                <div className="text-base font-medium">
                  {result
                    ? `Frame analysis · ${result.inference_ms}ms`
                    : loading
                    ? "Processing…"
                    : "Awaiting upload"}
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono ${
                result
                  ? "bg-[var(--neon)]/15 text-[var(--neon)]"
                  : loading
                  ? "bg-[var(--electric)]/15 text-[var(--electric)]"
                  : "bg-muted text-muted-foreground"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  result ? "bg-[var(--neon)] animate-pulse" : loading ? "bg-[var(--electric)] animate-pulse" : "bg-muted-foreground"
                }`} />
                {result ? "COMPLETE" : loading ? "RUNNING" : "IDLE"}
              </span>
            </div>

            {/* Detection rows */}
            {result && result.detections.length > 0 ? (
              <>
                {result.detections.map((d, i) => (
                  <ResultRow
                    key={i}
                    label={`Vehicle ${i + 1}`}
                    plate={d.plate || "—"}
                    occ={d.occupants}
                    conf={d.confidence}
                    viol={d.violation}
                  />
                ))}

                {result.violation_count > 0 && (
                  <div className="mt-5 rounded-lg border border-[var(--destructive)]/30 bg-[var(--destructive)]/8 p-3 text-xs flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-[var(--destructive)] shrink-0 mt-0.5" />
                    <span>
                      <span className="text-[var(--destructive)] font-medium">
                        HOV-2 Violation detected.{" "}
                      </span>
                      {result.detections
                        .filter(d => d.violation)
                        .map(d => d.plate || "Unknown plate")
                        .join(", ")}{" "}
                      flagged for solo occupancy. e-Challan auto-generated.
                    </span>
                  </div>
                )}

                {result.violation_count === 0 && (
                  <div className="mt-5 rounded-lg border border-[var(--neon)]/30 bg-[var(--neon)]/8 p-3 text-xs flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--neon)] shrink-0 mt-0.5" />
                    <span>
                      <span className="text-[var(--neon)] font-medium">All vehicles compliant. </span>
                      No HOV violations detected in this frame.
                    </span>
                  </div>
                )}
              </>
            ) : loading ? (
              <div className="space-y-2.5">
                {[1, 2].map(i => (
                  <div key={i} className="rounded-lg glass p-3 animate-pulse">
                    <div className="h-4 w-32 bg-white/10 rounded mb-3" />
                    <div className="grid grid-cols-3 gap-3">
                      {[1,2,3].map(j => <div key={j} className="h-8 bg-white/5 rounded" />)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Placeholder rows before any upload */
              <>
                <ResultRow label="Vehicle 1 · Sedan" plate="KA01·HZ·4521" occ={1} conf={0.98} viol />
                <ResultRow label="Vehicle 2 · SUV"   plate="KA05·MN·2210" occ={3} conf={0.99} viol={false} />
                <div className="mt-5 rounded-lg border border-[var(--destructive)]/30 bg-[var(--destructive)]/8 p-3 text-xs flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-[var(--destructive)] shrink-0 mt-0.5" />
                  <span>
                    <span className="text-[var(--destructive)] font-medium">HOV-2 Violation detected. </span>
                    Vehicle KA01·HZ·4521 (1 occupant) recorded at restricted lane during peak hours. e-Challan auto-generated.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Dashboard table ── */}
        <div className="mt-6 glass-strong rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Compliance Dashboard</div>
              <div className="text-base font-medium">Recent violations · MG Road junction</div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => {
                  const csv = ["plate,date,time,occupants,type,count"]
                    .concat(tableRows.map(r => `${r.plate},${r.date},${r.time},${r.occupants},${r.type},${r.count}`))
                    .join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
                  a.download = "violations.csv"; a.click();
                }}
                className="glass rounded-full px-3 py-1.5 hover:bg-white/5"
              >
                Export CSV
              </button>
              <button className="rounded-full px-3 py-1.5 bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-background font-medium">
                Open full dashboard →
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="text-left text-[11px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="py-2.5 pr-4 font-normal">Vehicle Number</th>
                  <th className="py-2.5 pr-4 font-normal">Date</th>
                  <th className="py-2.5 pr-4 font-normal">Time</th>
                  <th className="py-2.5 pr-4 font-normal">Occupants</th>
                  <th className="py-2.5 pr-4 font-normal">Violation Type</th>
                  <th className="py-2.5 pr-4 font-normal text-right">Count (7d)</th>
                </tr>
              </thead>
              <tbody>
                {tableLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/50">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="py-3 pr-4">
                          <div className="h-4 bg-white/5 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : tableRows.length > 0 ? (
                  tableRows.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 last:border-0 hover:bg-white/[0.02]">
                      <td className="py-3 pr-4 font-mono">{r.plate}</td>
                      <td className="py-3 pr-4 text-muted-foreground font-mono">{r.date}</td>
                      <td className="py-3 pr-4 text-muted-foreground font-mono">{r.time}</td>
                      <td className="py-3 pr-4 font-mono">{r.occupants ?? 1}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-mono ${
                          r.violation
                            ? "bg-[var(--destructive)]/15 text-[var(--destructive)]"
                            : "bg-[var(--neon)]/15 text-[var(--neon)]"
                        }`}>
                          {r.violation
                            ? <AlertTriangle className="h-3 w-3" />
                            : <CheckCircle2 className="h-3 w-3" />}
                          {r.type}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right font-mono">{r.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">
                      No violations yet. Upload footage to see results here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Result Row ─────────────────────────────────────────────────────────────────

function ResultRow({
  label, plate, occ, conf, viol,
}: {
  label: string;
  plate: string;
  occ:   number;
  conf:  number;
  viol:  boolean;
}) {
  return (
    <div className="rounded-lg glass p-3 mb-2.5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{label}</div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
          viol
            ? "bg-[var(--destructive)]/15 text-[var(--destructive)]"
            : "bg-[var(--neon)]/15 text-[var(--neon)]"
        }`}>
          {viol ? "VIOLATION" : "COMPLIANT"}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
        <div>
          <div className="text-muted-foreground font-mono text-[10px] uppercase">Plate</div>
          <div className="font-mono mt-0.5">{plate}</div>
        </div>
        <div>
          <div className="text-muted-foreground font-mono text-[10px] uppercase">Occupants</div>
          <div className="font-mono mt-0.5">{occ}</div>
        </div>
        <div>
          <div className="text-muted-foreground font-mono text-[10px] uppercase">Confidence</div>
          <div className="font-mono mt-0.5">{(conf * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}