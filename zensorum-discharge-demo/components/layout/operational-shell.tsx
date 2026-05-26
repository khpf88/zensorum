import { TopBar } from "./top-bar";
import { LeftPanel } from "./left-panel";
import { BottomStream } from "./bottom-stream";
import { OperationsMesh } from "../mesh/operations-mesh";

export function OperationalShell() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#070A0F]">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel />
        <main className="flex-1 relative overflow-hidden bg-[#0F172A]/50 border-r border-[#1E293B]">
          <OperationsMesh />
        </main>
      </div>
      <BottomStream />
    </div>
  );
}
