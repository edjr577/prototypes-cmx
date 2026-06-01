import { SettingsSidebar } from "@/components/settings-sidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full bg-background overflow-hidden text-foreground">
      <SettingsSidebar />
      <main className="flex-1 overflow-y-auto relative no-scrollbar bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 mr-4 mb-4 mt-2 ml-1">
        <div className="max-w-3xl mx-auto px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
