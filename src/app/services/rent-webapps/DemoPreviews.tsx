"use client";

import { useState } from "react";

export function DemoBookingSystem() {
  const [selected, setSelected] = useState<string | null>(null);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["09:00", "11:00", "14:00", "16:00"];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-1 mb-1.5">
        {days.map((d) => (
          <div key={d} className="flex-1 text-center">
            <span className="text-[8px] font-mono text-ink/40">{d}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1 flex-1">
        {days.map((d) =>
          slots.slice(0, 3).map((t) => {
            const id = `${d}-${t}`;
            const isBooked = (d === "Mon" && t === "09:00") || (d === "Wed" && t === "14:00");
            const isSelected = selected === id;
            return (
              <button
                key={id}
                onClick={() => !isBooked && setSelected(isSelected ? null : id)}
                disabled={isBooked}
                className={`text-[7px] font-mono rounded transition-all leading-none ${
                  isBooked
                    ? "bg-signal/20 text-signal/40 line-through cursor-not-allowed"
                    : isSelected
                      ? "bg-signal text-ink shadow-[0_0_8px_rgba(225,6,0,0.4)]"
                      : "bg-white/5 text-ink/50 hover:bg-white/10 hover:text-ink/80"
                }`}
              >
                {t}
              </button>
            );
          })
        )}
      </div>
      <div className="mt-auto pt-1 text-center">
        <span className="text-[7px] font-mono text-ink/30">
          {selected ? `Slot selected` : `Tap a time slot →`}
        </span>
      </div>
    </div>
  );
}

export function DemoInventoryTracker() {
  const [items, setItems] = useState([
    { name: "Steel rods", qty: 42, min: 20 },
    { name: "Paint cans", qty: 8, min: 15 },
    { name: "Timber", qty: 120, min: 30 },
    { name: "Screws", qty: 3, min: 50 },
  ]);

  const adjust = (i: number, delta: number) => {
    setItems((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.max(0, next[i].qty + delta) };
      return next;
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-1">
      {items.map((item, i) => {
        const status = item.qty <= 5 ? "critical" : item.qty < item.min ? "low" : "ok";
        return (
          <div key={item.name} className="flex items-center gap-1.5">
            <span className="text-[8px] font-mono text-ink/60 flex-1 truncate">{item.name}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => adjust(i, -1)} className="w-3.5 h-3.5 flex items-center justify-center rounded bg-white/5 hover:bg-white/20 text-[8px] text-ink/60">−</button>
              <span className={`text-[9px] font-mono tabular-nums w-5 text-right ${
                status === "critical" ? "text-signal" : status === "low" ? "text-yellow-400" : "text-green-400"
              }`}>
                {item.qty}
              </span>
              <button onClick={() => adjust(i, 1)} className="w-3.5 h-3.5 flex items-center justify-center rounded bg-white/5 hover:bg-white/20 text-[8px] text-ink/60">+</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DemoInvoiceTool() {
  const [lines, setLines] = useState([
    { desc: "Consulting", qty: 10, rate: 150 },
    { desc: "Design", qty: 5, rate: 200 },
    { desc: "Hosting", qty: 1, rate: 49 },
  ]);
  const [paid, setPaid] = useState(false);

  const total = lines.reduce((s, l) => s + l.qty * l.rate, 0);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[7px] font-mono text-ink/30 uppercase tracking-wider">Invoice #829</span>
        <span className={`text-[7px] font-mono uppercase ${paid ? "text-green-400" : "text-yellow-400"}`}>{paid ? "Paid ✓" : "Pending"}</span>
      </div>
      <div className="flex-1 space-y-1">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="text-[7px] text-ink/50 flex-1 truncate">{l.desc}</span>
            <span className="text-[7px] font-mono text-ink/30">{l.qty}×</span>
            <span className="text-[7px] font-mono text-ink/50">€{l.rate}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-mist/50 mt-1">
        <span className="text-[8px] font-mono text-ink/80">Total</span>
        <span className="text-[9px] font-mono text-signal">€{total}</span>
      </div>
      <button
        onClick={() => setPaid(true)}
        disabled={paid}
        className="mt-1 w-full py-1 rounded bg-signal/80 hover:bg-signal text-ink text-[7px] font-mono uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {paid ? "Received ✓" : "Mark as paid"}
      </button>
    </div>
  );
}

export function DemoReviewAggregator() {
  const platforms = [
    { name: "Google", rating: 4.5, icon: "G" },
    { name: "Facebook", rating: 4.2, icon: "F" },
    { name: "Trustpilot", rating: 4.7, icon: "T" },
  ];
  const [selected, setSelected] = useState<number | null>(null);
  const [votes, setVotes] = useState([42, 28, 36]);

  return (
    <div className="w-full h-full flex flex-col gap-1.5">
      {platforms.map((p, i) => {
        const isActive = selected === i;
        return (
          <button
            key={p.name}
            onClick={() => {
              setSelected(isActive ? null : i);
              if (!isActive) setVotes((v) => { const n = [...v]; n[i] = v[i] + 1; return n; });
            }}
            className={`flex items-center gap-2 px-2 py-1 rounded transition-all ${
              isActive ? "bg-signal/15 border border-signal/30" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-signal/20 text-signal text-[7px] font-mono flex items-center justify-center">{p.icon}</span>
            <span className="text-[8px] font-mono text-ink/60 flex-1 text-left">{p.name}</span>
            <span className="text-[8px] text-yellow-400">{'★'.repeat(Math.floor(p.rating))}</span>
            <span className="text-[7px] font-mono text-ink/40 tabular-nums">{votes[i]}</span>
          </button>
        );
      })}
    </div>
  );
}

export function DemoLeadCaptureKit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-signal text-lg mb-1">✓</div>
          <div className="text-[9px] font-mono text-green-400">Lead captured!</div>
          <div className="text-[7px] font-mono text-ink/40 mt-0.5">Auto-responder sequence started</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-1.5">
      <input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-white/5 border border-mist rounded px-2 py-1 text-[9px] text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
      />
      <input
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white/5 border border-mist rounded px-2 py-1 text-[9px] text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
      />
      <button
        onClick={() => name && email && setSent(true)}
        disabled={!name || !email}
        className="mt-auto w-full py-1.5 rounded bg-signal/80 hover:bg-signal text-ink text-[7px] font-mono uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Capture lead
      </button>
    </div>
  );
}

export function DemoCrmLite() {
  const stages = [
    { id: "new", label: "New", deals: [{ name: "Acme Corp", value: 12000 }, { name: "Beta Ltd", value: 5000 }] },
    { id: "qualified", label: "Qualified", deals: [{ name: "Gamma Inc", value: 25000 }] },
    { id: "won", label: "Won", deals: [{ name: "Delta Co", value: 40000 }] },
  ];
  const [pipeline, setPipeline] = useState(stages);
  const [dragging, setDragging] = useState<string | null>(null);

  const totalValue = pipeline.reduce((s, st) => s + st.deals.reduce((sd, d) => sd + d.value, 0), 0);

  const moveDeal = (dealName: string, fromStage: string, toStage: string) => {
    setPipeline((prev) => {
      const from = prev.find((s) => s.id === fromStage);
      const to = prev.find((s) => s.id === toStage);
      if (!from || !to) return prev;
      const deal = from.deals.find((d) => d.name === dealName);
      if (!deal) return prev;
      return prev.map((s) => {
        if (s.id === fromStage) return { ...s, deals: s.deals.filter((d) => d.name !== dealName) };
        if (s.id === toStage) return { ...s, deals: [...s.deals, deal] };
        return s;
      });
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[7px] font-mono text-ink/30 uppercase tracking-wider">Pipeline</span>
        <span className="text-[8px] font-mono text-signal tabular-nums">€{totalValue.toLocaleString()}</span>
      </div>
      <div className="flex gap-1 flex-1">
        {pipeline.map((stage) => (
          <div key={stage.id} className="flex-1 bg-white/[0.03] rounded px-1 py-1 flex flex-col">
            <span className="text-[6px] font-mono text-ink/30 uppercase tracking-wider text-center mb-1">{stage.label}</span>
            {stage.deals.map((deal) => (
              <button
                key={deal.name}
                onClick={() => {
                  if (dragging === deal.name) { setDragging(null); return; }
                  setDragging(deal.name);
                  const stageIdx = pipeline.findIndex((s) => s.deals.find((d) => d.name === deal.name));
                  const nextStage = pipeline[Math.min(stageIdx + 1, pipeline.length - 1)];
                  if (nextStage && nextStage.id !== stage.id) {
                    moveDeal(deal.name, stage.id, nextStage.id);
                  }
                  setDragging(null);
                }}
                className={`w-full text-left px-1 py-0.5 mb-0.5 rounded transition-all text-[7px] ${
                  dragging === deal.name ? "bg-signal/30" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <span className="text-ink/80 block truncate">{deal.name}</span>
                <span className="text-signal font-mono tabular-nums">€{deal.value.toLocaleString()}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-1 text-center">
        <span className="text-[6px] font-mono text-ink/20">Click deal to advance →</span>
      </div>
    </div>
  );
}

export function DemoLandingPageKit() {
  const layouts = [
    { id: "hero", label: "Hero", icon: "◆" },
    { id: "grid", label: "Grid", icon: "▦" },
    { id: "split", label: "Split", icon: "▬" },
  ];
  const [active, setActive] = useState("hero");

  return (
    <div className="w-full h-full flex flex-col gap-1.5">
      <div className="flex gap-1">
        {layouts.map((l) => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`flex-1 py-1.5 rounded text-center transition-all text-[8px] font-mono ${
              active === l.id
                ? "bg-signal text-ink shadow-[0_0_6px_rgba(225,6,0,0.3)]"
                : "bg-white/5 text-ink/50 hover:bg-white/10"
            }`}
          >
            {l.icon} {l.label}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-white/[0.03] rounded overflow-hidden relative">
        {active === "hero" && (
          <div className="p-2 h-full flex flex-col justify-center items-center text-center">
            <div className="w-8 h-1.5 bg-signal/40 rounded mb-1.5" />
            <div className="w-16 h-1 bg-white/20 rounded mb-0.5" />
            <div className="w-12 h-1 bg-white/10 rounded" />
            <div className="mt-2 w-6 h-1.5 bg-signal/50 rounded" />
          </div>
        )}
        {active === "grid" && (
          <div className="p-2 h-full grid grid-cols-3 grid-rows-2 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/10 rounded" />
            ))}
          </div>
        )}
        {active === "split" && (
          <div className="p-2 h-full flex gap-1 items-center">
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-10 h-1 bg-white/20 rounded" />
              <div className="w-8 h-1 bg-white/10 rounded" />
              <div className="w-5 h-1.5 bg-signal/40 rounded mt-2" />
            </div>
            <div className="w-12 h-full bg-white/[0.06] rounded" />
          </div>
        )}
      </div>
    </div>
  );
}

export const DEMO_MAP: Record<string, React.ComponentType> = {
  "booking-system": DemoBookingSystem,
  "inventory-tracker": DemoInventoryTracker,
  "invoice-tool": DemoInvoiceTool,
  "review-aggregator": DemoReviewAggregator,
  "lead-capture-kit": DemoLeadCaptureKit,
  "crm-lite": DemoCrmLite,
  "landing-page-kit": DemoLandingPageKit,
};
