export default function Loading() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-signal/30 border-t-signal rounded-full animate-spin" />
        <span className="font-mono text-[10px] text-ink/30 uppercase tracking-[0.2em]">Loading</span>
      </div>
    </div>
  );
}
