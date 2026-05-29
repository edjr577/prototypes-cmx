import { CRMSidebar } from "@/components/crm-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LegalTech - CRM",
};

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background h-[calc(100vh-3.5rem)] overflow-hidden">
      <CRMSidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 mr-4 mb-4 mt-2 ml-1">
        {children}
      </main>
    </div>
  );
}
