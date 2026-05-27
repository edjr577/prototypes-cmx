"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Warehouse,
  FileText,
} from "lucide-react";

const erpItems = [
  { name: "Dashboard", href: "/erp", icon: LayoutDashboard, enabled: true },
  { name: "Produtos", href: "/erp/produtos", icon: Package, enabled: false },
  { name: "Pedidos", href: "/erp/pedidos", icon: ShoppingCart, enabled: false },
  { name: "Fornecedores", href: "/erp/fornecedores", icon: Truck, enabled: false },
  { name: "Estoque", href: "/erp/estoque", icon: Warehouse, enabled: false },
  { name: "Notas Fiscais", href: "/erp/notas-fiscais", icon: FileText, enabled: false },
];

export function ERPSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-[calc(100vh-3.5rem)] w-60 flex-col border-r bg-background">
      <nav className="flex-1 p-3">
        <ul className="flex flex-col gap-1">
          {erpItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/erp" && pathname.startsWith(item.href));

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
