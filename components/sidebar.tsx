"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Package,
  Calculator,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";

export type ViewType = "crm" | "erp" | "controladoria";

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const menuItems = [
  {
    id: "crm" as ViewType,
    label: "CRM",
    description: "Gestao de Clientes",
    icon: Users,
  },
  {
    id: "erp" as ViewType,
    label: "ERP",
    description: "Recursos e Operacoes",
    icon: Package,
  },
  {
    id: "controladoria" as ViewType,
    label: "Controladoria",
    description: "Financas",
    icon: Calculator,
  },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
          <LayoutDashboard className="text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-heading text-base font-semibold text-sidebar-foreground">
            CMX Platform
          </h1>
          <p className="text-xs text-muted-foreground">Gestao Empresarial</p>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Modulos
        </p>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator />

      <div className="px-3 py-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Sistema
        </p>
        <ul className="flex flex-col gap-1">
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Settings className="text-muted-foreground" />
              <span className="text-sm">Configuracoes</span>
            </button>
          </li>
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="text-muted-foreground" />
              <span className="text-sm">Sair</span>
            </button>
          </li>
        </ul>
      </div>

      <Separator />

      <div className="flex items-center gap-3 px-4 py-4">
        <Avatar className="size-9">
          <AvatarImage src="/avatar.png" alt="Usuario" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            EJ
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium text-sidebar-foreground">
            Edmilson Junior
          </p>
          <p className="truncate text-xs text-muted-foreground">
            admin@cmx.com.br
          </p>
        </div>
      </div>
    </aside>
  );
}
