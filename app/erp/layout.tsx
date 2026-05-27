import { ModuleSidebar, SidebarItem } from "@/components/module-sidebar";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Factory,
  BarChart3,
} from "lucide-react";

const erpItems: SidebarItem[] = [
  { name: "Dashboard", href: "/erp", icon: LayoutDashboard },
  { name: "Vendas", href: "/erp/vendas", icon: ShoppingCart },
  { name: "Estoque", href: "/erp/estoque", icon: Package },
  { name: "Compras", href: "/erp/compras", icon: Truck },
  { name: "Producao", href: "/erp/producao", icon: Factory },
  { name: "Relatorios", href: "/erp/relatorios", icon: BarChart3 },
];

export default function ERPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <ModuleSidebar items={erpItems} baseHref="/erp" />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
