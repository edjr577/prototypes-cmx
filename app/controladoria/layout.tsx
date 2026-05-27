import { ControladoriaSidebar } from "@/components/controladoria-sidebar";

export default function ControladoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <ControladoriaSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
