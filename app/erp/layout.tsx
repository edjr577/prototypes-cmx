import { ERPSidebar } from "@/components/erp-sidebar";

export default function ERPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <ERPSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
