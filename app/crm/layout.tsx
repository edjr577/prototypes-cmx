import { CRMSidebar } from "@/components/crm-sidebar";

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <CRMSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
