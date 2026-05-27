import { ModuleSidebar, SidebarItem } from "@/components/module-sidebar";
import {
  LayoutDashboard,
  Users,
  Building2,
  Target,
  Mail,
  CalendarDays,
} from "lucide-react";

const crmItems: SidebarItem[] = [
  { name: "Dashboard", href: "/crm", icon: LayoutDashboard },
  { name: "Contatos", href: "/crm/contatos", icon: Users },
  { name: "Empresas", href: "/crm/empresas", icon: Building2 },
  { name: "Oportunidades", href: "/crm/oportunidades", icon: Target },
  { name: "Campanhas", href: "/crm/campanhas", icon: Mail },
  { name: "Agenda", href: "/crm/agenda", icon: CalendarDays },
];

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <ModuleSidebar items={crmItems} baseHref="/crm" />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
