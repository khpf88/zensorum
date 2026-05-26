export function TopBar() {
  return (
    <header className="h-12 border-b border-[#1E293B] bg-[#070A0F] flex items-center px-4 justify-between">
      <div className="text-cyan-400 font-bold tracking-tighter text-lg">ZENSORUM <span className="text-slate-500 font-light ml-2">DISCHARGE COMMAND CENTER</span></div>
      <div className="flex gap-4 text-xs font-mono">
        <span className="text-emerald-500">SYSTEM: OPERATIONAL</span>
        <span className="text-blue-400">VERSION: 1.0.0</span>
      </div>
    </header>
  );
}
