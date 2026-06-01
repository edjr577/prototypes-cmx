"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, User, Users, CreditCard, Puzzle, ShieldCheck, Building2, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const menuGroups = [
  {
    label: "Geral",
    items: [
      { name: "Perfil do Escritório", href: "/administrativo/configuracoes", icon: Building2 },
    ]
  },
  {
    label: "Gestão",
    items: [
      { name: "Usuários & Acessos", href: "/administrativo/configuracoes/usuarios", icon: Users },
      { name: "Faturamento", href: "/administrativo/configuracoes/faturamento", icon: CreditCard },
    ]
  },
  {
    label: "Sistema",
    items: [
      { name: "Integrações", href: "/administrativo/configuracoes/integracoes", icon: Puzzle },
      { name: "Segurança", href: "/administrativo/configuracoes/seguranca", icon: ShieldCheck },
    ]
  }
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 flex flex-col h-full bg-transparent text-muted-foreground pt-2">
      {/* Header com botão de voltar */}
      <div className="p-4 mb-2">
        <Link 
          href="/administrativo" 
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-3.5" />
          Voltar ao painel
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-6 no-scrollbar pb-6">
        {menuGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            <h3 className="px-2 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1">
              {group.label}
            </h3>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <Icon className={cn("size-4", isActive ? "text-accent-foreground" : "text-muted-foreground")} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
