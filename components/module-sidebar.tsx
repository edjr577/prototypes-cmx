"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface SidebarItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface ModuleSidebarProps {
  items: SidebarItem[];
  baseHref: string;
}

export function ModuleSidebar({ items, baseHref }: ModuleSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-[calc(100vh-3.5rem)] w-60 flex-col border-r bg-background">
      <nav className="flex-1 p-3">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== baseHref && pathname.startsWith(item.href));

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
