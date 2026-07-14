"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation, useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";
import Link from "next/link";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/Toast";

export default function AdminProjects() {
  const token = getSessionToken();
  const convex = useConvex();
  const projects = useQuery(api.projects.list, token ? { token } : "skip");

  const users = useQuery(api.auth.list, token ? { token } : "skip");
  const updateProject = useMutation(api.projects.updateProject);
  const addTimeline = useMutation(api.projects.addTimelineEvent);
  const sendMessage = useMutation(api.messages.send);
  const genUpload = useMutation(api.documents.generateUploadUrl);
  const uploadDoc = useMutation(api.documents.upload);
  const remove = useMutation(api.projects.remove);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState("");
  const [ibanInput, setIbanInput] = useState("");
  const [stageInput, setStageInput] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [timelineInput, setTimelineInput] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const selected = projects?.find((p) => p._id === selectedId) ?? null;

  const filtered = (projects ?? []).filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || (p.description ?? "").toLowerCase().includes(q);
    }
    return true;
  });

  const handleUpload = async () => {
    if (!docFile || !docTitle || !selectedId) return;
    setUploading(true);
    try {
      const uploadUrl = await genUpload({ projectId: selectedId as unknown as import("../../../../convex/_generated/dataModel").Id<"projects">, token });
      await fetch(uploadUrl, { method: "PUT", body: docFile });
      const storageId = new URL(uploadUrl).pathname.split("/").pop()?.split("?")[0];
      if (!storageId) { setUploading(false); return; }
      await uploadDoc({ projectId: selectedId as unknown as import("../../../../convex/_generated/dataModel").Id<"projects">, title: docTitle, storageId, token });
      setDocTitle(""); setDocFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch { toast("Failed to upload document", "error"); }
    setUploading(false);
  };

  const handleSendMessage = async () => {
    if (!msgInput.trim() || !selectedId) return;
    const session = await convex.query(api.auth.validateSession, { token });
    if (!session) return;
    try {
      await sendMessage({ projectId: selectedId as unknown as import("../../../../convex/_generated/dataModel").Id<"projects">, senderId: session.userId as unknown as import("../../../../convex/_generated/dataModel").Id<"users">, senderRole: "admin", content: msgInput.trim(), token });
      setMsgInput("");
    } catch { toast("Failed to send message", "error"); }
  };

  const handleAddTimeline = async () => {
    if (!timelineInput.trim() || !selectedId) return;
    try {
      await addTimeline({ projectId: selectedId as unknown as import("../../../../convex/_generated/dataModel").Id<"projects">, event: timelineInput.trim(), token });
      setTimelineInput("");
    } catch { toast("Failed to add timeline event", "error"); }
  };

  const handleSavePrice = async () => {
    if (!selectedId) return;
    const n = priceInput === "" ? undefined : parseFloat(priceInput);
    if (priceInput !== "" && (isNaN(n as number) || (n as number) < 0)) {
      toast("Enter a valid price", "error");
      return;
    }
    try {
      await updateProject({ projectId: selectedId as unknown as import("../../../../convex/_generated/dataModel").Id<"projects">, token, price: n });
    } catch { toast("Failed to save price", "error"); }
  };

  const handleSaveField = async (field: "iban" | "stage" | "status", value: string) => {
    if (!selectedId) return;
    try {
      await updateProject({ projectId: selectedId as unknown as import("../../../../convex/_generated/dataModel").Id<"projects">, token, [field]: value });
    } catch { toast("Failed to save", "error"); }
  };

  const getClientName = (p: Doc<"projects">) => {
    if (p.clientUserId) {
      const u = users?.find((user) => user._id === p.clientUserId);
      return u?.name ?? "Unknown";
    }
    return "No user";
  };

  const statuses = ["all", "intake", "scope", "design", "build", "qa", "launch", "support"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Projects</h1>
          <p className="text-ink/50 text-sm mt-1">{projects?.length ?? 0} total projects</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..." className="bg-graphite border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal w-64"
        />
        <div className="flex gap-1 bg-graphite rounded-xl p-1 border border-mist overflow-x-auto">
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg whitespace-nowrap transition-colors ${statusFilter === s ? "bg-signal text-ink" : "text-ink/50 hover:text-ink"}`}
            >{s === "all" ? "All" : s}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          {filtered.length === 0 && <p className="text-ink/40 text-sm py-8 text-center">No projects match your filters.</p>}
          {filtered.map((p) => (
            <button key={p._id} onClick={() => { setSelectedId(p._id); setPriceInput(p.price?.toString() || ""); setIbanInput(p.iban || ""); setStageInput(p.stage); }}
              className={`w-full text-left bg-graphite rounded-2xl border p-5 transition-colors ${selectedId === p._id ? "border-signal" : "border-mist hover:border-white/20"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{p.name}</p>
                <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                  p.status === "intake" ? "bg-blue-500/10 text-blue-400" :
                  p.status === "scope" ? "bg-purple-500/10 text-purple-400" :
                  p.status === "design" ? "bg-pink-500/10 text-pink-400" :
                  p.status === "build" ? "bg-yellow-500/10 text-yellow-400" :
                  p.status === "qa" ? "bg-orange-500/10 text-orange-400" :
                  p.status === "launch" ? "bg-green-500/10 text-green-400" :
                  "bg-cyan-500/10 text-cyan-400"
                }`}>{p.stage}</span>
              </div>
              <p className="text-sm text-ink/60 line-clamp-1">{p.description ?? "No description"}</p>
              <div className="flex gap-4 mt-2 text-xs text-ink/40">
                <span>{getClientName(p)}</span>
                <span>{p.teamMemberIds.length} team members</span>
                {p.price && <span>{p.currency}{p.price}</span>}
              </div>
            </button>
          ))}
        </div>

        <div>
          {selected ? (
            <div className="bg-graphite rounded-2xl border border-mist p-6 sticky top-4 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-display text-xl">{selected.name}</h3>
                <button onClick={() => { if (confirm("Delete project?")) remove({ projectId: selected._id, token }); }}
                  className="text-xs text-red-400/60 hover:text-red-400 font-mono"
                >Delete</button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-ink/60">
                <span>Client: {getClientName(selected)}</span>
                <Link href={`/admin/quotes`} className="text-signal hover:underline">View quotes</Link>
                <Link href={`/dashboard/projects/${selected._id}`} className="text-signal hover:underline">Client view</Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-ink/40 uppercase tracking-wider">Price</label>
                  <div className="flex gap-2 mt-1">
                    <input type="number" value={priceInput} onChange={(e) => setPriceInput(e.target.value)}
                      className="flex-1 bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none"
                    />
                    <button onClick={handleSavePrice}
                      className="px-3 py-2 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim"
                    >Save</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-ink/40 uppercase tracking-wider">IBAN</label>
                  <div className="flex gap-2 mt-1">
                    <input type="text" value={ibanInput} onChange={(e) => setIbanInput(e.target.value)}
                      className="flex-1 bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none font-mono"
                    />
                    <button onClick={() => handleSaveField("iban", ibanInput)}
                      className="px-3 py-2 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim"
                    >Save</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-ink/40 uppercase tracking-wider">Stage</label>
                  <div className="flex gap-2 mt-1">
                    <input type="text" value={stageInput} onChange={(e) => setStageInput(e.target.value)}
                      className="flex-1 bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none"
                    />
                    <button onClick={() => handleSaveField("stage", stageInput)}
                      className="px-3 py-2 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim"
                    >Save</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-ink/40 uppercase tracking-wider">Status</label>
                    <select value={selected.status} onChange={(e) => handleSaveField("status", e.target.value)}
                      className="mt-1 w-full bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none"
                    >
                    {statuses.filter((s) => s !== "all").map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-ink/40 uppercase tracking-wider">Timeline Event</label>
                <div className="flex gap-2 mt-1">
                  <input type="text" value={timelineInput} onChange={(e) => setTimelineInput(e.target.value)}
                    placeholder="e.g. Design phase started" className="flex-1 bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none"
                    onKeyDown={(e) => { if (e.key === "Enter") handleAddTimeline(); }}
                  />
                  <button onClick={handleAddTimeline} disabled={!timelineInput.trim()}
                    className="px-3 py-2 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim disabled:opacity-30"
                  >Add</button>
                </div>
                {selected.timeline.length > 0 && (
                  <div className="mt-3 space-y-1 max-h-32 overflow-y-auto">
                    {selected.timeline.slice().reverse().map((t, i) => (
                      <p key={i} className="text-xs text-ink/50">
                        <span className="font-mono text-ink/30">{new Date(t.date).toLocaleDateString("it-IT")}</span>
                        {" "}{t.event}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-mono text-ink/40 uppercase tracking-wider">Upload Document</label>
                <div className="flex gap-2 mt-1">
                  <input type="text" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="Title"
                    className="flex-1 bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none" />
                </div>
                <div className="flex gap-2 mt-2">
                  <input ref={fileRef} type="file" onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                    className="flex-1 text-sm text-ink/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-mist file:bg-paper file:text-xs file:text-ink file:font-mono" />
                  <button onClick={handleUpload} disabled={uploading || !docFile || !docTitle}
                    className="px-4 py-2 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim disabled:opacity-30">{uploading ? "..." : "Upload"}</button>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-ink/40 uppercase tracking-wider">Send Message</label>
                <div className="flex gap-2 mt-1">
                  <input type="text" value={msgInput} onChange={(e) => setMsgInput(e.target.value)}
                    placeholder="Type a message..." className="flex-1 bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none"
                    onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
                  />
                  <button onClick={handleSendMessage} disabled={!msgInput.trim()}
                    className="px-4 py-2 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim disabled:opacity-30">Send</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-graphite rounded-2xl border border-mist p-12 text-center">
              <p className="text-ink/40 text-sm">Select a project to manage</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
