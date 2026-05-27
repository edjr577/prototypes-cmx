"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  // Main Category Icons
  LayoutDashboard,
  Calendar,
  Briefcase,
  Users,
  DollarSign,
  ShieldAlert,
  Settings,
  ChevronRight,
  Plus,
  
  // Sub-items Icons
  CheckSquare,
  FileCheck,
  Activity,
  FileText,
  Receipt,
  Map,
  Sparkles
} from "lucide-react";

// Sitemap interfaces
interface SubItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  badge?: string;
  isHeader?: boolean;
}

interface MenuSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  items: SubItem[];
}

const menuData: MenuSection[] = [
  {
    id: "inicio",
    title: "Geral",
    icon: LayoutDashboard,
    items: [
      { name: "Painel", href: "/controladoria", icon: LayoutDashboard, description: "Visão consolidada de execuções e CRONs" },
      { name: "Prazos próximos", href: "/controladoria/prazos", icon: Calendar, description: "Prazos gerados por extrações validadas" },
    ]
  },
  {
    id: "trabalho",
    title: "Trabalho & Fluxos",
    icon: Briefcase,
    items: [
      { name: "Tarefas", href: "/controladoria/tarefas", icon: CheckSquare, description: "Extrações com alta confiança (automáticas)" },
      { name: "Revisão humana", href: "/controladoria/revisao", icon: FileCheck, description: "Extrações com baixa confiança para auditoria" },
      { name: "Execuções", href: "/controladoria/execucoes", icon: Activity, description: "Logs de ciclos e varreduras dos robôs" },
      { name: "Publicações", href: "/controladoria/publicacoes", icon: FileText, description: "Notas de expediente capturadas" },
    ]
  },
  {
    id: "clientes",
    title: "Clientes",
    icon: Users,
    items: [
      { name: "Gestão de Clientes", href: "/controladoria/clientes", icon: Users, description: "Mapeamento de CPFs/CNPJs monitorados" },
    ]
  },
  {
    id: "financeiro",
    title: "Financeiro",
    icon: DollarSign,
    items: [
      { name: "Visão financeira", href: "/controladoria/financeiro/visao", icon: Activity, description: "Custos de APIs e consultas de robôs" },
      { name: "Recibos", href: "/controladoria/financeiro/recibos", icon: Receipt, description: "Recibos de reembolsos de custas" },
    ]
  },
  {
    id: "compliance",
    title: "Controle & Compliance",
    icon: ShieldAlert,
    items: [
      { name: "Auditoria", href: "/controladoria/compliance/auditoria", icon: ShieldAlert, description: "Acurácia de IA e relatórios de discrepância" },
    ]
  },
  {
    id: "configuracoes",
    title: "Configurações",
    icon: Settings,
    items: [
      { name: "CONFIGURAÇÕES", href: "#", icon: Sparkles, isHeader: true },
      { name: "Escritório", href: "/controladoria/configuracoes/escritorio", icon: Settings },
      { name: "Mapeamento", href: "/controladoria/configuracoes/mapeamento", icon: Map },
    ]
  }
];

export function ControladoriaSidebar() {
  const pathname = usePathname();
  
  // Section toggle state (Geral and Trabalho open by default)
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    inicio: true,
    trabalho: true,
    clientes: false,
    financeiro: false,
    compliance: false,
    configuracoes: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="flex h-[calc(100vh-3.5rem)] w-64 flex-col bg-background overflow-y-auto select-none no-scrollbar">
      <nav className="flex-1 p-3 space-y-3 pb-8">
        {menuData.map((section) => {
          const SectionIcon = section.icon;
          const isOpen = openSections[section.id];

          return (
            <div key={section.id} className="flex flex-col">
              {/* Category Header Button */}
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left hover:bg-muted/40 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <SectionIcon className="size-4.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-xs font-semibold text-foreground/90 group-hover:text-foreground tracking-wide">
                    {section.title}
                  </span>
                </div>
                <ChevronRight className={cn(
                  "size-3.5 text-muted-foreground/60 transition-transform duration-200 pointer-events-none",
                  isOpen && "rotate-90"
                )} />
              </button>

              {/* Sub-items list with anim trigger */}
              <div className={cn(
                "mt-0.5 flex flex-col pl-3.5 border-l border-border/10 ml-4.5 gap-0.5 transition-all duration-200 overflow-hidden",
                isOpen ? "max-h-[800px] opacity-100 py-1" : "max-h-0 opacity-0 py-0"
              )}>
                {section.items.map((item, idx) => {
                  const ItemIcon = item.icon;
                  const isActive = pathname === item.href;

                  // Render Settings category labels
                  if (item.isHeader) {
                    return (
                      <div
                        key={`header-${idx}`}
                        className="text-[10px] font-bold text-muted-foreground/50 tracking-widest uppercase pt-2.5 pb-1 px-2.5"
                      >
                        {item.name}
                      </div>
                    );
                  }

                  // Only Controladoria Dashboard "/controladoria" is active
                  const isDashboard = item.href === "/controladoria";
                  const isTarefas = item.name === "Tarefas";

                  return (
                    <div key={item.name} className="flex flex-col">
                      {isDashboard ? (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-start gap-2.5 rounded-md px-2.5 py-1.5 text-left transition-colors cursor-pointer",
                            isActive
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground/80 hover:bg-muted/30 hover:text-foreground"
                          )}
                        >
                          <ItemIcon className="size-3.5 mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs leading-none font-medium">{item.name}</span>
                            {item.description && (
                              <span className="text-[10px] text-muted-foreground/60 mt-0.5 font-normal leading-tight">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      ) : (
                        <div
                          className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-muted-foreground/40 cursor-not-allowed hover:bg-muted/10 transition-colors group/item"
                          title="Opção desativada neste protótipo"
                        >
                          <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <ItemIcon className="size-3.5 mt-0.5 shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-xs leading-none font-medium">{item.name}</span>
                              {item.description && (
                                <span className="text-[10px] text-muted-foreground/30 mt-0.5 font-normal leading-tight">
                                  {item.description}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Inline Action Button for "Tarefas" */}
                          {isTarefas && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                alert("Criar Nova Tarefa!");
                              }}
                              className="opacity-0 group-hover/item:opacity-100 size-4.5 rounded bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all cursor-pointer mr-0.5"
                              title="Nova tarefa"
                            >
                              <Plus className="size-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

