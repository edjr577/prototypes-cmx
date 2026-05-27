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
  { name: "Dashboard", href: "/controladoria", icon: LayoutDashboard },
  { name: "Fluxo de Caixa", href: "/controladoria/fluxo-caixa", icon: Wallet },
  { name: "DRE", href: "/controladoria/dre", icon: TrendingUp },
  { name: "Orcamentos", href: "/controladoria/orcamentos", icon: PiggyBank },
  { name: "Relatorios", href: "/controladoria/relatorios", icon: FileBarChart },
  { name: "Custos", href: "/controladoria/custos", icon: Calculator },
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
