"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  // Main Category Icons
  Scale,
  Briefcase,
  DollarSign,
  Users,
  Clock,
  Settings,
  ChevronRight,
  
  // Sub-items Icons
  LayoutDashboard,
  Calendar,
  Bell,
  Gavel,
  FileText,
  FileSignature,
  BookOpen,
  Award,
  Wallet,
  Receipt,
  UserCheck,
  UserPlus,
  Clock3,
  KanbanSquare,
  Activity,
  KeyRound,
  ShieldCheck,
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
    id: "dashboard",
    title: "Painel de Controle",
    icon: LayoutDashboard,
    items: [
      { name: "Dashboard Geral", href: "/erp", icon: Activity, description: "Visão consolidada do escritório" },
    ]
  },
  {
    id: "contencioso",
    title: "Processos & Contencioso",
    icon: Scale,
    items: [
      { name: "Painel de Processos", href: "/erp/processos", icon: Scale, description: "Acompanhamento de ações" },
      { name: "Distribuições & Prazos", href: "/erp/prazos", icon: Calendar, description: "Gestão estrita de prazos" },
      { name: "Diários & Intimações", href: "/erp/intimacoes", icon: Bell, description: "Leitura automática de publicações" },
      { name: "Audiências & Atos", href: "/erp/audiencias", icon: Gavel, description: "Controle de pautas e prepostos" },
    ]
  },
  {
    id: "consultivo",
    title: "Consultivo & Contratos",
    icon: Briefcase,
    items: [
      { name: "Gestão de Contratos", href: "/erp/contratos", icon: FileSignature, description: "Ciclo de vida de minutas" },
      { name: "Biblioteca de Modelos", href: "/erp/modelos", icon: BookOpen, description: "Modelos de petições e peças" },
      { name: "Pareceres & Legal Opinion", href: "/erp/pareceres", icon: FileText, description: "Consultas de clientes internos" },
    ]
  },
  {
    id: "financeiro",
    title: "Financeiro & Honorários",
    icon: DollarSign,
    items: [
      { name: "Honorários Contratuais", href: "/erp/honorarios-contratuais", icon: Wallet, description: "Parcelas e êxitos" },
      { name: "Honorários Sucumbenciais", href: "/erp/honorarios-sucumbenciais", icon: Award, description: "Processos ganhos" },
      { name: "Custas & Reembolsos", href: "/erp/custas", icon: Receipt, description: "Despesas antecipadas" },
      { name: "Faturamento & Notas", href: "/erp/faturamento", icon: DollarSign, description: "Emissão automática de NFS-e" },
    ]
  },
  {
    id: "crm",
    title: "Legal Intake & CRM",
    icon: Users,
    items: [
      { name: "Ficha de Clientes", href: "/erp/clientes", icon: UserCheck, description: "Base unificada de contatos" },
      { name: "Novas Consultas", href: "/erp/consultas", icon: UserPlus, description: "Triagem e qualificação inicial" },
    ]
  },
  {
    id: "produtividade",
    title: "Produtividade & Tempos",
    icon: Clock,
    items: [
      { name: "Timesheet", href: "/erp/timesheet", icon: Clock3, description: "Lançamento de horas trabalhadas" },
      { name: "Kanban de Tarefas", href: "/erp/tarefas", icon: KanbanSquare, description: "Metodologia ágil por caso" },
    ]
  },
  {
    id: "configuracoes",
    title: "Configurações",
    icon: Settings,
    items: [
      { name: "ESCRITÓRIO", href: "#", icon: Sparkles, isHeader: true },
      { name: "Parâmetros Gerais", href: "/erp/configuracoes/geral", icon: Settings },
      { name: "Tabelas de Honorários", href: "/erp/configuracoes/tabelas", icon: Wallet },
      
      { name: "SEGURANÇA", href: "#", icon: Sparkles, isHeader: true },
      { name: "Certificados Digitais", href: "/erp/configuracoes/certificados", icon: KeyRound },
      { name: "Permissões de Usuários", href: "/erp/configuracoes/permissoes", icon: ShieldCheck },
    ]
  }
];

export function ERPSidebar() {
  const pathname = usePathname();
  
  // Section toggle state (Dashboard and Contencioso open by default)
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    dashboard: true,
    contencioso: true,
    consultivo: false,
    financeiro: false,
    crm: false,
    produtividade: false,
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

                  // Only ERP Dashboard "/erp" is active
                  const isDashboard = item.href === "/erp";

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
                          className="flex items-start gap-2.5 rounded-md px-2.5 py-1.5 text-left text-muted-foreground/40 cursor-not-allowed hover:bg-muted/10 transition-colors"
                          title="Opção desativada neste protótipo"
                        >
                          <ItemIcon className="size-3.5 mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs leading-none font-medium">{item.name}</span>
                              {item.badge && (
                                <span className="text-[8px] font-bold tracking-widest bg-amber-500/10 text-amber-500 px-1 py-0.2 rounded">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <span className="text-[10px] text-muted-foreground/30 mt-0.5 font-normal leading-tight">
                                {item.description}
                              </span>
                            )}
                          </div>
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

