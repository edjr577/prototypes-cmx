import { ModuleSidebar, SidebarItem } from "@/components/module-sidebar";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  TrendingUp,
  FileText,
  Calculator,
} from "lucide-react";

const controladoriaItems: SidebarItem[] = [
  { name: "Dashboard", href: "/controladoria", icon: LayoutDashboard },
  { name: "Fluxo de Caixa", href: "/controladoria/fluxo-caixa", icon: Wallet },
  { name: "Contas a Pagar", href: "/controladoria/contas-pagar", icon: Receipt },
  { name: "Contas a Receber", href: "/controladoria/contas-receber", icon: TrendingUp },
  { name: "DRE", href: "/controladoria/dre", icon: FileText },
  { name: "Orcamento", href: "/controladoria/orcamento", icon: Calculator },
];

export default function ControladoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <ModuleSidebar items={controladoriaItems} baseHref="/controladoria" />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
