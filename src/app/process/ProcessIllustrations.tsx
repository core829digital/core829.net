"use client";

import { useState, useEffect, useRef } from "react";

function usePulse(interval = 2000) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), interval);
    return () => clearInterval(t);
  }, [interval]);
  return pulse;
}


export function IllusIntake() {
  const [phase, setPhase] = useState(0);
  const messages = [
    { text: "What's your goal?", from: "them" },
    { text: "We need a booking system", from: "you" },
    { text: "Got it. Let's map it out.", from: "them" },
  ];

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p >= messages.length ? 0 : p + 1)), 1800);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div className="w-full h-full flex flex-col p-4" onClick={() => setPhase((phase + 1) % (messages.length + 1))}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-signal animate-pulse" />
        <span className="text-[9px] font-mono text-signal tracking-wider uppercase">Live Discovery</span>
      </div>
      <div className="flex-1 space-y-2">
        {messages.slice(0, phase).map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "you" ? "justify-end" : "justify-start"}`}>
            <div className={`rounded-lg px-2.5 py-1.5 max-w-[75%] text-[9px] leading-relaxed ${
              msg.from === "you"
                ? "bg-signal/20 text-ink/90"
                : "bg-white/10 text-ink/70"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {phase <= messages.length && (
          <div className="flex items-center gap-1 text-[8px] text-ink/30 font-mono">
            <span className="animate-bounce">●</span> live
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-[7px] font-mono text-ink/20">Tap to simulate</div>
    </div>
  );
}

export function IllusScope() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const count = checked.filter(Boolean).length;
  const allDone = count === checked.length;

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] font-mono text-signal tracking-wider uppercase">Scope Doc</span>
        <span className={`text-[8px] font-mono tabular-nums ${allDone ? "text-green-400" : "text-ink/40"}`}>
          {count}/{checked.length}
        </span>
      </div>
      <div className="flex-1 space-y-1.5">
        {[
          "Requirements gathered",
          "Technical architecture",
          "Timeline estimated",
          "Fixed-cost quote",
        ].map((item, i) => (
          <button
            key={item}
            onClick={() => toggle(i)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded bg-white/[0.03] hover:bg-white/10 text-left transition-all"
          >
            <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[7px] transition-colors ${
              checked[i] ? "bg-signal border-signal" : "border-mist"
            }`}>
              {checked[i] && "✓"}
            </span>
            <span className={`text-[8px] ${checked[i] ? "text-ink/50 line-through" : "text-ink/70"}`}>{item}</span>
          </button>
        ))}
      </div>
      {allDone && (
        <div className="mt-2 text-center text-[8px] font-mono text-green-400 animate-pulse">Scope approved ✓</div>
      )}
    </div>
  );
}

export function IllusDesign() {
  const [layer, setLayer] = useState(0);
  const layers = [
    { label: "Wireframes", color: "bg-white/10" },
    { label: "Mockups", color: "bg-white/15" },
    { label: "Prototype", color: "bg-signal/20" },
  ];

  useEffect(() => {
    const t = setInterval(() => setLayer((l) => (l >= layers.length - 1 ? 0 : l + 1)), 2200);
    return () => clearInterval(t);
  }, [layers.length]);

  return (
    <div className="w-full h-full flex flex-col p-4" onClick={() => setLayer((l) => (l >= layers.length - 1 ? 0 : l + 1))}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[9px] font-mono text-signal tracking-wider uppercase">Design</span>
        <span className="text-[7px] font-mono text-ink/30">{layers[layer].label}</span>
      </div>
      <div className="flex-1 relative rounded-lg bg-white/[0.02] overflow-hidden">
        {}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[80%] aspect-[4/3]">
            {}
            <div className={`absolute inset-0 rounded border border-white/10 transition-all duration-700 ${layer >= 0 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-2 space-y-1">
                <div className="w-8 h-1 bg-white/20 rounded" />
                <div className="w-12 h-1 bg-white/10 rounded" />
                <div className="mt-2 grid grid-cols-2 gap-1">
                  <div className="aspect-square bg-white/5 rounded" />
                  <div className="space-y-1">
                    <div className="h-2 bg-white/10 rounded" />
                    <div className="h-2 bg-white/5 rounded w-2/3" />
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className={`absolute inset-0 rounded border border-white/20 transition-all duration-700 ${layer >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-2 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-signal/30" />
                  <div className="w-10 h-1 bg-white/30 rounded" />
                </div>
                <div className="mt-1 grid grid-cols-2 gap-1">
                  <div className="aspect-square bg-gradient-to-br from-white/10 to-transparent rounded" />
                  <div className="space-y-1 pt-1">
                    <div className="h-2 bg-white/20 rounded w-3/4" />
                    <div className="h-2 bg-white/10 rounded" />
                    <div className="h-4 bg-signal/15 rounded mt-1" />
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className={`absolute inset-0 rounded border border-signal/30 transition-all duration-700 ${layer >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-2 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-1 bg-signal/40 rounded" />
                  <div className="w-4 h-1 bg-ink/30 rounded" />
                </div>
                <div className="mt-1 grid grid-cols-5 gap-1">
                  <div className="col-span-2 aspect-square bg-gradient-to-br from-signal/20 to-transparent rounded relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-signal/10" />
                  </div>
                  <div className="col-span-3 space-y-1 pt-1">
                    <div className="h-2 bg-white/20 rounded" />
                    <div className="h-2 bg-white/10 rounded w-1/2" />
                    <div className="flex gap-1 mt-1">
                      <div className="h-2.5 bg-signal/30 rounded flex-1" />
                      <div className="h-2.5 bg-white/15 rounded flex-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-center text-[7px] font-mono text-ink/20">Tap to cycle layers</div>
    </div>
  );
}

export function IllusBuild() {
  const [lines, setLines] = useState(0);
  const code = [
    "import { Project } from './types'",
    "",
    "export function Builder() {",
    "  const [status, setStatus] = useState<Status>('active')",
    "  const sprint = useSprint('2-week')",
    "",
    "  useEffect(() => {",
    "    sprint.onComplete(() => {",
    "      deployToStaging()",
    "    })",
    "  }, [])",
    "",
    "  return <ProjectBoard />",
    "}",
  ];

  useEffect(() => {
    const t = setInterval(() => setLines((l) => (l >= code.length ? 0 : l + 1)), 500);
    return () => clearInterval(t);
  }, [code.length]);

  return (
    <div className="w-full h-full flex flex-col p-4" onClick={() => setLines(0)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono text-signal tracking-wider uppercase">Building</span>
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-signal/50" />
        </div>
      </div>
      <div className="flex-1 bg-black/30 rounded-lg p-2 font-mono text-[7px] leading-[1.6] overflow-hidden">
        {code.slice(0, lines).map((line, i) => (
          <div key={i} className={`${line.startsWith("import") ? "text-blue-400/60" : line.startsWith("  const") ? "text-ink/60" : line.startsWith("  return") ? "text-signal/60" : line.includes("export") ? "text-yellow-400/60" : "text-ink/40"} whitespace-pre`}>
            {line}
          </div>
        ))}
        {lines < code.length && (
          <span className="inline-block w-2 h-3 bg-signal/50 animate-pulse ml-0.5" />
        )}
      </div>
    </div>
  );
}

export function IllusQA() {
  type TestStatus = "pending" | "running" | "pass";
  const [tests, setTests] = useState<{ name: string; status: TestStatus }[]>([
    { name: "Unit tests", status: "pass" },
    { name: "Integration", status: "pass" },
    { name: "E2E flows", status: "pass" },
    { name: "Security scan", status: "running" },
    { name: "Accessibility", status: "pending" },
  ]);

  const runTest = (i: number) => {
    setTests((prev) => {
      const next = prev.map((t) => ({ ...t }));
      if (next[i].status === "pending") next[i].status = "running";
      else if (next[i].status === "running") next[i].status = "pass";
      return next;
    });
  };

  const passed = tests.filter((t) => t.status === "pass").length;
  const total = tests.length;

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono text-signal tracking-wider uppercase">QA Pipeline</span>
        <span className={`text-[8px] font-mono tabular-nums ${passed === total ? "text-green-400" : "text-ink/40"}`}>
          {passed}/{total}
        </span>
      </div>
      <div className="flex-1 space-y-1.5">
        {tests.map((test, i) => (
          <button
            key={test.name}
            onClick={() => runTest(i)}
            disabled={test.status === "pass"}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded bg-white/[0.03] hover:bg-white/10 text-left transition-all disabled:cursor-not-allowed"
          >
            <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[6px] ${
              test.status === "pass" ? "bg-green-400/20 text-green-400" :
              test.status === "running" ? "bg-yellow-400/20 text-yellow-400 animate-pulse" :
              "bg-white/10 text-ink/30"
            }`}>
              {test.status === "pass" ? "✓" : test.status === "running" ? "●" : "○"}
            </span>
            <span className={`text-[8px] ${test.status === "pass" ? "text-green-400/60 line-through" : "text-ink/60"}`}>
              {test.name}
            </span>
          </button>
        ))}
      </div>
      {passed === total && (
        <div className="mt-2 text-center">
          <span className="text-[8px] font-mono text-green-400 animate-pulse">All checks passed ✓</span>
        </div>
      )}
    </div>
  );
}

export function IllusLaunch() {
  const [stage, setStage] = useState(0);
  const stages = [
    { label: "DNS configured", icon: "🌐" },
    { label: "SSL active", icon: "🔒" },
    { label: "CDN deployed", icon: "⚡" },
    { label: "Monitoring live", icon: "📊" },
  ];

  return (
    <div className="w-full h-full flex flex-col p-4" onClick={() => setStage((s) => (s >= stages.length ? 0 : s + 1))}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[9px] font-mono text-signal tracking-wider uppercase">Deploying</span>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-2">
          {stages.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-all ${
                i <= stage ? "bg-signal/20 border border-signal/40" : "bg-white/5 border border-mist"
              }`}>
                {i <= stage ? "✓" : s.icon}
              </div>
              <span className={`text-[8px] transition-colors ${i <= stage ? "text-ink/80" : "text-ink/30"}`}>{s.label}</span>
            </div>
          ))}
        </div>
        {stage >= stages.length && (
          <div className="mt-3 text-center text-[9px] font-mono text-green-400 animate-pulse">Production ✓</div>
        )}
      </div>
      <div className="mt-2 text-center text-[7px] font-mono text-ink/20">Tap to deploy</div>
    </div>
  );
}

export function IllusSupport() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Hosting", status: "ok" as const },
    { label: "Updates", status: "ok" as const },
    { label: "Backups", status: "ok" as const },
    { label: "Support", status: "active" as const },
  ];

  const pulse = usePulse(3000);

  return (
    <div className="w-full h-full flex flex-col p-4" onClick={() => setActiveTab((t) => (t + 1) % tabs.length)}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${pulse ? "bg-green-400" : "bg-green-400/60"} transition-colors`} />
        <span className="text-[9px] font-mono text-green-400 tracking-wider uppercase">Running</span>
      </div>
      <div className="flex-1">
        <div className="flex gap-1 mb-2">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={(e) => { e.stopPropagation(); setActiveTab(i); }}
              className={`flex-1 py-1 rounded text-[7px] font-mono transition-all ${
                activeTab === i
                  ? "bg-signal/20 text-ink/80"
                  : "bg-white/5 text-ink/30 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white/[0.03] rounded-lg p-2">
          {activeTab === 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink/60">Uptime</span>
                <span className="text-green-400 font-mono">99.97%</span>
              </div>
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink/60">Response</span>
                <span className="text-ink/60 font-mono">42ms</span>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink/60">Last update</span>
                <span className="text-ink/60 font-mono">3d ago</span>
              </div>
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink/60">Version</span>
                <span className="text-signal font-mono">v2.4.1</span>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink/60">Last backup</span>
                <span className="text-ink/60 font-mono">2h ago</span>
              </div>
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink/60">Status</span>
                <span className="text-green-400 font-mono">Automated</span>
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink/60">Channel</span>
                <span className="text-ink/60 font-mono">Slack</span>
              </div>
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink/60">Response</span>
                <span className="text-green-400 font-mono">&lt; 2h</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 text-center text-[7px] font-mono text-ink/20">Tap to cycle metrics</div>
    </div>
  );
}

export const ILLUS_MAP: Record<string, React.ComponentType> = {
  intake: IllusIntake,
  scope: IllusScope,
  design: IllusDesign,
  build: IllusBuild,
  qa: IllusQA,
  launch: IllusLaunch,
  support: IllusSupport,
};
