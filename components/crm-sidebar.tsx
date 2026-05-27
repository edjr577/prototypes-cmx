"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  Target,
  Mail,
  CalendarDays,
} from "lucide-react";

const crmItems = [
  { name: "Dashboard", href: "/crm", icon: LayoutDashboard, enabled: true },
  { name: "Contatos", href: "/crm/contatos", icon: Users, enabled: false },
  { name: "Empresas", href: "/crm/empresas", icon: Building2, enabled: false },
  { name: "Oportunidades", href: "/crm/oportunidades", icon: Target, enabled: false },
  { name: "Campanhas", href: "/crm/campanhas", icon: Mail, enabled: false },
  { name: "Agenda", href: "/crm/agenda", icon: CalendarDays, enabled: false },
];

export function CRMSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-[calc(100vh-3.5rem)] w-60 flex-col border-r bg-background">
      <nav className="flex-1 p-3">
        <ul className="flex flex-col gap-1">
          {crmItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/crm" && pathname.startsWith(item.href));

            if (!item.enabled) {
              return (
                <li key={item.href}>
                  <span
                    className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground/50"
                  >
                    <item.icon className="size-4" />
                    {item.name}
                  </span>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
