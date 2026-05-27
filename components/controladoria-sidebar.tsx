"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  PiggyBank,
  FileBarChart,
  Calculator,
} from "lucide-react";

const controladoriaItems = [
  { name: "Dashboard", href: "/controladoria", icon: LayoutDashboard, enabled: true },
  { name: "Fluxo de Caixa", href: "/controladoria/fluxo-caixa", icon: Wallet, enabled: false },
  { name: "DRE", href: "/controladoria/dre", icon: TrendingUp, enabled: false },
  { name: "Orcamentos", href: "/controladoria/orcamentos", icon: PiggyBank, enabled: false },
  { name: "Relatorios", href: "/controladoria/relatorios", icon: FileBarChart, enabled: false },
  { name: "Custos", href: "/controladoria/custos", icon: Calculator, enabled: false },
];

export function ControladoriaSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-[calc(100vh-3.5rem)] w-60 flex-col border-r bg-background">
      <nav className="flex-1 p-3">
        <ul className="flex flex-col gap-1">
          {controladoriaItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/controladoria" && pathname.startsWith(item.href));

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
