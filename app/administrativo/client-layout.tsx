"use client";

import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSettings = pathname.startsWith("/administrativo/configuracoes");

  if (isSettings) {
    return <div className="flex bg-background h-[calc(100vh-3.5rem)] overflow-hidden w-full">{children}</div>;
  }

  return (
    <div className="flex bg-background h-[calc(100vh-3.5rem)] overflow-hidden w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 mr-4 mb-4 mt-2 ml-1">
        {children}
      </main>
    </div>
  );
}
