import { ERPSidebar } from "@/components/erp-sidebar";

export default function ERPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background min-h-[calc(100vh-3.5rem)]">
      <ERPSidebar />
      <main className="flex-1 overflow-auto p-6 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-tl-xl border-l border-t border-border/30 shadow-sm">
        {children}
      </main>
    </div>
  );
}
