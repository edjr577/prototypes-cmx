"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@/app/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModelosProntosModal } from "@/components/modelos-prontos-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  // CEOs
  LayoutDashboard, TrendingUp, Sparkles, CreditCard, Settings, ChevronRight, ChevronDown, Check,
  // CRM
  MessageSquare, BarChart3, Send, Briefcase, Layers, MessageCircle, Activity, History, Users, DollarSign, Target, UserCheck, Clock, Phone, Star, Calendar, Shield, Brain, Megaphone, Filter, Smartphone, BookOpen, Users2, KanbanSquare, CheckSquare, Plug, Cpu, Tag, LogOut, FileCode, Package, SlidersHorizontal, Code2, PhoneCall, Lock,
  // ERP
  Scale, Bell, Gavel, FileText, FileSignature, Award, Wallet, Receipt, UserPlus, Clock3, KeyRound, ShieldCheck,
  // Controladoria
  ShieldAlert, Plus, FileCheck, Map, Coins,
  // Collapse and User
  ChevronsUpDown, PanelLeftClose, PanelLeftOpen, PanelLeft
} from "lucide-react";

interface SubItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  badge?: string;
  isHeader?: boolean;
  action?: string;
}

interface MenuSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  href?: string;
  badgeText?: string;
  badgeColor?: string;
  items: SubItem[];
}

const ceoMenuData: MenuSection[] = [
  {
    id: "visao_geral",
    title: "Visão Geral",
    href: "/administrativo",
    icon: TrendingUp,
    items: []
  },
  {
    id: "assistencia_ia",
    title: "Assistência com IA",
    icon: Sparkles,
    items: [
      { name: "Nova conversa", href: "/administrativo/ia", icon: Plus },
      { name: "Conversas", href: "/administrativo/ia/conversas", icon: MessageSquare },
      { name: "Modelos Prontos", href: "#", icon: FileText, action: "open_modelos" }
    ]
  },
  {
    id: "gerenciar_plano",
    title: "Gerenciar Plano",
    href: "/administrativo/plano",
    icon: CreditCard,
    items: []
  },
  {
    id: "configuracoes",
    title: "Configurações",
    href: "/administrativo/configuracoes",
    icon: Settings,
    items: []
  }
];

const crmMenuData: MenuSection[] = [
  {
    id: "atendimento",
    title: "Atendimento",
    icon: MessageSquare,
    badgeText: "Operacional",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    items: [
      { name: "Chat ao vivo", href: "/crm/chat", icon: MessageCircle, description: "Tela operacional do agente" },
      { name: "Monitoramento ao vivo", href: "/crm/monitoramento", icon: Activity, description: "Supervisão em tempo real" },
      { name: "Consulta", href: "/crm/consulta", icon: History, description: "Histórico e busca" },
    ]
  },
  {
    id: "relatorios",
    title: "Relatórios & Analytics",
    icon: BarChart3,
    badgeText: "Relatórios",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    items: [
      { name: "Dashboard de atendimento", href: "/crm", icon: LayoutDashboard, description: "Gráficos gerais e operadores" },
      { name: "Dashboard de contatos", href: "/crm/relatorios/contatos", icon: Users },
      { name: "Dashboard de vendas", href: "/crm/relatorios/vendas", icon: DollarSign },
      { name: "Dashboard de oportunidades", href: "/crm/relatorios/oportunidades", icon: Target },
      { name: "Resumo por usuário", href: "/crm/relatorios/resumo-usuario", icon: UserCheck },
      { name: "SLA", href: "/crm/relatorios/sla", icon: Clock },
      { name: "Relatórios de chamadas", href: "/crm/relatorios/chamadas", icon: Phone },
      { name: "Pesquisa de satisfação", href: "/crm/relatorios/csat", icon: Star },
      { name: "Mensagens agendadas", href: "/crm/relatorios/agendadas", icon: Calendar },
      { name: "Auditoria", href: "/crm/relatorios/auditoria", icon: Shield },
      { name: "Créditos IA", href: "/crm/relatorios/creditos-ia", icon: Brain },
    ]
  },
  {
    id: "campanhas",
    title: "Envios & Campanhas",
    icon: Send,
    badgeText: "Marketing",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    items: [
      { name: "Campanhas", href: "/crm/campanhas", icon: Megaphone, badge: "BETA" },
      { name: "Funil de mensagens", href: "/crm/funil", icon: Filter },
      { name: "Envio de push", href: "/crm/push", icon: Smartphone },
    ]
  },
  {
    id: "vendas",
    title: "CRM & Vendas",
    icon: Briefcase,
    badgeText: "Vendas",
    badgeColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    items: [
      { name: "Contatos", href: "/crm/contatos", icon: BookOpen },
      { name: "Gestão de clientes", href: "/crm/clientes", icon: Users2 },
      { name: "Pipeline", href: "/crm/pipeline", icon: KanbanSquare },
      { name: "Tarefas", href: "/crm/tarefas", icon: CheckSquare },
    ]
  },
  {
    id: "automacoes",
    title: "Canais & Automações",
    icon: Layers,
    badgeText: "Operacional",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    items: [
      { name: "Canais", href: "/crm/canais", icon: Plug, description: "WhatsApp, Instagram, etc." },
      { name: "Chatbot", href: "/crm/chatbot", icon: Cpu },
    ]
  },
  {
    id: "configuracoes",
    title: "Configurações",
    icon: Settings,
    badgeText: "Sistema",
    badgeColor: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    items: [
      { name: "ATENDIMENTO", href: "#", icon: Sparkles, isHeader: true },
      { name: "Plug-in", href: "/crm/configuracoes/plugin", icon: Plug },
      { name: "Mensagens rápidas", href: "/crm/configuracoes/mensagens-rapidas", icon: MessageSquare },
      { name: "Etiquetas", href: "/crm/configuracoes/etiquetas", icon: Tag },
      { name: "Motivos de fechamento", href: "/crm/configuracoes/fechamento", icon: LogOut },
      { name: "Templates", href: "/crm/configuracoes/templates", icon: FileCode },
      
      { name: "VENDAS", href: "#", icon: Sparkles, isHeader: true },
      { name: "Status cliente / Origens", href: "/crm/configuracoes/status", icon: Tag },
      { name: "Gerenciar pipelines", href: "/crm/configuracoes/pipelines", icon: KanbanSquare },
      { name: "Produtos", href: "/crm/configuracoes/produtos", icon: Package },
      { name: "Metas & Perdas", href: "/crm/configuracoes/metas", icon: DollarSign },
      
      { name: "CADASTROS", href: "#", icon: Sparkles, isHeader: true },
      { name: "Usuários & Setores", href: "/crm/configuracoes/usuarios", icon: Users },
      { name: "Campos customizados", href: "/crm/configuracoes/campos", icon: SlidersHorizontal },
      { name: "Perfil & Avaliação", href: "/crm/configuracoes/perfil", icon: UserCheck },
      
      { name: "AVANÇADO", href: "#", icon: Sparkles, isHeader: true },
      { name: "Horário & Feriados", href: "/crm/configuracoes/horario", icon: Clock },
      { name: "API / Webhook", href: "/crm/configuracoes/api", icon: Code2 },
      { name: "Configurações & Prompts", href: "/crm/configuracoes/prompts", icon: Cpu },
      { name: "VoIP", href: "/crm/configuracoes/voip", icon: PhoneCall },
      { name: "Controle de IP", href: "/crm/configuracoes/ip", icon: Lock },
    ]
  }
];

const erpMenuData: MenuSection[] = [
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

const controladoriaMenuData: MenuSection[] = [
  {
    id: "inicio",
    title: "Geral",
    icon: LayoutDashboard,
    items: [
      { name: "Hoje", href: "/controladoria", icon: LayoutDashboard, description: "O que precisa de você hoje · cockpit" },
      { name: "Comercial", href: "/controladoria/comercial", icon: TrendingUp, description: "Estou vendendo bem? Captação e conversão" },
      { name: "Saída", href: "/controladoria/saida", icon: Coins, description: "O que vai virar honorário? Benefícios, RPVs e acordos" },
      { name: "Financeiro", href: "/controladoria/financeiro", icon: Wallet, description: "Estou convertendo contratos em caixa? Quem pagou e atraso" },
      { name: "Equipe", href: "/controladoria/equipe", icon: Users, description: "Entrego com qualidade e prazo? Produtividade, Taskscore e prazos" },
    ]
  },
  {
    id: "planejamento",
    title: "Planejamento",
    icon: Target,
    items: [
      { name: "Metas", href: "/controladoria/metas", icon: Target, description: "Defina as metas que calibram os semáforos" },
    ]
  },
  {
    id: "trabalho",
    title: "Trabalho & Fluxos",
    icon: Briefcase,
    items: [
      { name: "Petições (IA)", href: "/controladoria/peticoes", icon: Sparkles, description: "Petições assistidas por IA" },
      { name: "Tarefas", href: "/controladoria/tarefas", icon: CheckSquare, description: "Tarefas geradas automaticamente" },
      { name: "Revisão humana", href: "/controladoria/revisao", icon: FileCheck, description: "Itens que precisam de conferência" },
      { name: "Publicações", href: "/controladoria/publicacoes", icon: FileText, description: "Publicações dos diários oficiais" },
    ]
  },
  {
    id: "clientes",
    title: "Clientes",
    icon: Users,
    items: [
      { name: "Gestão de Clientes", href: "/controladoria/clientes", icon: Users, description: "Base de clientes monitorados" },
    ]
  },
  {
    id: "financeiro",
    title: "Custos & Faturamento",
    icon: DollarSign,
    items: [
      { name: "Custos de operação", href: "/controladoria/financeiro/visao", icon: Activity, description: "Consumo de processamento e integrações" },
      { name: "Recibos", href: "/controladoria/financeiro/recibos", icon: Receipt, description: "Recibos de reembolsos de custas" },
    ]
  },
  {
    id: "compliance",
    title: "Controle & Compliance",
    icon: ShieldAlert,
    items: [
      { name: "Auditoria", href: "/controladoria/compliance/auditoria", icon: ShieldAlert, description: "Trilha de auditoria e conformidade" },
    ]
  },
  {
    id: "sistema",
    title: "Sistema",
    icon: Cpu,
    items: [
      { name: "Plataforma", href: "/controladoria/plataforma", icon: Activity, description: "Saúde dos robôs, CRONs e varreduras" },
    ]
  },
  {
    id: "configuracoes",
    title: "Configurações",
    icon: Settings,
    items: [
      { name: "CONFIGURAÇÕES", href: "#", icon: Sparkles, isHeader: true },
      { name: "Escritório", href: "/controladoria/configuracoes/escritorio", icon: Settings },
      { name: "Notificações", href: "/controladoria/configuracoes/notificacoes", icon: Bell },
      { name: "Mapeamento", href: "/controladoria/configuracoes/mapeamento", icon: Map },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { tenants, activeTenant, setActiveTenantById, setIsLoading, setLoadingModuleName, hasPermission } = useUser();
  const [isModelosOpen, setModelosOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  // Determine which menu data to use based on pathname and permissions
  let menuData = ceoMenuData;
  let defaultOpenSections: Record<string, boolean> = { assistencia_ia: true };

  if (pathname.startsWith("/crm")) {
    menuData = crmMenuData.filter(section => {
      if (['campanhas', 'vendas'].includes(section.id)) return hasPermission('crm:edit') || hasPermission('crm:admin');
      if (['automacoes', 'configuracoes'].includes(section.id)) return hasPermission('crm:admin');
      return true;
    });
    defaultOpenSections = { atendimento: true, relatorios: true };
  } else if (pathname.startsWith("/erp")) {
    menuData = erpMenuData.filter(section => {
      if (['financeiro', 'crm', 'produtividade'].includes(section.id)) return hasPermission('erp:edit') || hasPermission('erp:admin');
      if (['configuracoes'].includes(section.id)) return hasPermission('erp:admin');
      return true;
    });
    defaultOpenSections = { dashboard: true, contencioso: true };
  } else if (pathname.startsWith("/controladoria")) {
    menuData = controladoriaMenuData.filter(section => {
      if (['trabalho'].includes(section.id)) return hasPermission('controladoria:edit') || hasPermission('controladoria:admin');
      if (['financeiro', 'compliance', 'configuracoes'].includes(section.id)) return hasPermission('controladoria:admin');
      return true;
    });
    defaultOpenSections = { inicio: true, planejamento: true, trabalho: true };
  } else {
    menuData = ceoMenuData.filter(section => {
      if (section.id === 'configuracoes') return hasPermission('admin:office_edit') || hasPermission('admin:full_access');
      return true;
    });
  }
  
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(defaultOpenSections);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className={cn("relative flex h-full flex-col bg-background select-none shrink-0 transition-all duration-300", isCollapsed ? "w-[72px]" : "w-64")}>
      


      {/* Navegação Principal com Scroll */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <nav className="p-3 space-y-1 pb-8">
          {menuData.map((section) => {
            const SectionIcon = section.icon;
            const isOpen = openSections[section.id] ?? false;

            const hasSubItems = section.items && section.items.length > 0;

            return (
              <div key={section.id} className="flex flex-col">
                {hasSubItems ? (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={cn("flex items-center justify-between rounded-lg px-2.5 py-2 text-left hover:bg-muted/40 transition-colors cursor-pointer group", isCollapsed ? "justify-center w-10" : "w-full")}
                  >
                    <div className="flex items-center gap-2.5">
                      <SectionIcon className="size-4.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                      {!isCollapsed && (
                        <span className="text-xs font-semibold text-foreground/90 group-hover:text-foreground tracking-wide">
                          {section.title}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronRight className={cn(
                        "size-3.5 text-muted-foreground/60 transition-transform duration-200 pointer-events-none shrink-0",
                        isOpen && "rotate-90"
                      )} />
                    )}
                  </button>
                ) : (
                  <Link
                    href={section.href || "#"}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors cursor-pointer group mb-1",
                      pathname === section.href || pathname.startsWith((section.href || "") + "/") && section.href !== "/administrativo"
                        ? "bg-accent text-accent-foreground font-medium" 
                        : "hover:bg-muted/40 text-muted-foreground hover:text-foreground",
                      isCollapsed ? "justify-center w-10" : "w-full"
                    )}
                  >
                    <SectionIcon className={cn(
                      "size-4.5 transition-colors shrink-0", 
                      pathname === section.href || pathname.startsWith((section.href || "") + "/") && section.href !== "/administrativo"
                        ? "text-primary" 
                        : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    {!isCollapsed && (
                      <span className={cn(
                        "text-xs tracking-wide",
                        pathname === section.href || pathname.startsWith((section.href || "") + "/") && section.href !== "/administrativo"
                          ? "font-semibold text-foreground"
                          : "font-semibold text-foreground/90 group-hover:text-foreground"
                      )}>
                        {section.title}
                      </span>
                    )}
                  </Link>
                )}

                {/* Sub-items list with anim trigger */}
                {hasSubItems && (
                  <div className={cn(
                    "flex flex-col gap-0.5 transition-all duration-200 overflow-hidden mb-1",
                    isCollapsed ? "pl-0 ml-0 items-center mt-1" : "pl-3.5 border-l border-border/10 ml-4.5 mt-0.5",
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

                    // For prototype, we allow the main dashboards and IA. Others are marked disabled.
                    // Main ones: /administrativo, /crm, /erp, /controladoria, /administrativo/ia
                    const isAllowed = ["/administrativo", "/administrativo/ia", "/administrativo/ia/conversas", "/crm", "/erp", "/controladoria", "/controladoria/comercial", "/controladoria/saida", "/controladoria/financeiro", "/controladoria/equipe", "/controladoria/metas", "/controladoria/plataforma", "/controladoria/configuracoes/notificacoes", "/controladoria/peticoes", "/controladoria/peticoes/inicial"].includes(item.href) || item.action === "open_modelos";
                    const isTarefas = item.name === "Tarefas" && pathname.startsWith("/controladoria");

                    if (item.action === "open_modelos") {
                      return (
                        <button
                          key={idx}
                          onClick={() => setModelosOpen(true)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-2.5 py-1.5 transition-colors group cursor-pointer text-left",
                            "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                            isCollapsed ? "justify-center w-10" : "w-full"
                          )}
                        >
                          <ItemIcon className="size-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                          {!isCollapsed && (
                            <span className="text-xs font-semibold tracking-wide flex-1">
                              {item.name}
                            </span>
                          )}
                        </button>
                      );
                    }

                    return (
                      <div key={item.name} className="flex flex-col">
                        {isAllowed ? (
                          <Link
                            href={item.href}
                            className={cn(
                              "flex gap-2.5 rounded-md px-2.5 py-1.5 text-left transition-colors cursor-pointer",
                              item.description ? "items-start" : "items-center",
                              isActive
                                ? "bg-accent text-accent-foreground font-medium"
                                : "text-muted-foreground/80 hover:bg-muted/30 hover:text-foreground",
                              isCollapsed ? "justify-center w-10" : "w-full"
                            )}
                          >
                            <ItemIcon className={cn("size-3.5 shrink-0", item.description ? "mt-[2px]" : "")} />
                            {!isCollapsed && (
                              <div className="flex flex-col justify-center min-w-0">
                                <span className="text-xs font-medium truncate">{item.name}</span>
                                {item.description && (
                                  <span className="text-[10px] text-muted-foreground/60 mt-0.5 font-normal leading-tight truncate">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                            )}
                          </Link>
                        ) : (
                          <div
                            className={cn(
                              "flex justify-between rounded-md px-2.5 py-1.5 text-left text-muted-foreground/40 cursor-not-allowed hover:bg-muted/10 transition-colors group/item",
                              item.description ? "items-start" : "items-center",
                              isCollapsed ? "justify-center w-10" : "w-full"
                            )}
                            title="Opção desativada neste protótipo"
                          >
                            <div className={cn("flex gap-2.5 min-w-0", item.description ? "items-start" : "items-center", isCollapsed ? "" : "flex-1")}>
                              <ItemIcon className={cn("size-3.5 shrink-0", item.description ? "mt-[2px]" : "")} />
                              {!isCollapsed && (
                                <div className="flex flex-col justify-center">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-medium">{item.name}</span>
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
                              )}
                            </div>
                            
                            {/* Inline Action Button for "Tarefas" */}
                            {isTarefas && !isCollapsed && (
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
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer: Office Switcher */}
      <div className="p-3 shrink-0 z-10 flex items-center justify-between mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className={cn("flex items-center justify-between hover:bg-muted/40 p-2 rounded-lg transition-colors cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-ring/40", isCollapsed ? "w-10 justify-center" : "w-full")}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className={`size-3 rounded-full ${activeTenant.color}`} />
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-foreground truncate max-w-[130px]">{activeTenant.name}</span>
                      <span className="text-xs text-muted-foreground truncate">Escritório</span>
                    </div>
                  )}
                </div>
                {!isCollapsed && <ChevronsUpDown className="size-4 text-muted-foreground/60 shrink-0 ml-1.5" />}
              </button>
            }
          />
          <DropdownMenuContent align="start" className="w-58 p-1.5 border border-border shadow-md rounded-xl">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground/65 font-medium px-2 pb-1.5">
                Trocar de escritório
              </DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                {tenants.map((tenant) => {
                  const isSelected = tenant.id === activeTenant.id;
                  return (
                    <DropdownMenuItem
                      key={tenant.id}
                      onClick={() => {
                        if (!isSelected) {
                          setIsLoading(true);
                          setLoadingModuleName(tenant.name);
                          setTimeout(() => {
                            setActiveTenantById(tenant.id);
                            setIsLoading(false);
                            router.refresh();
                          }, 1000);
                        }
                      }}
                      className={cn("flex items-start gap-2.5 p-2 rounded-lg cursor-pointer", isSelected && "bg-accent/85")}
                    >
                      <span className={`size-2.5 rounded-full shrink-0 mt-1 ${tenant.color}`} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-foreground truncate">{tenant.name}</span>
                        <span className="text-[9px] text-muted-foreground truncate">{tenant.description}</span>
                      </div>
                      {isSelected && <Check className="size-3.5 text-primary shrink-0 ml-auto mt-0.5" />}
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuGroup>
            <div className="h-px bg-border my-1 -mx-1.5" />
            <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-muted-foreground hover:text-foreground">
              <div className="flex size-6 items-center justify-center rounded-md border border-border/40 bg-background/50">
                <Plus className="size-4" />
              </div>
              <span className="text-xs font-medium">Criar novo escritório</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Floating Collapse Button at bottom right */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 bottom-5 p-1.5 rounded-lg border border-border/40 bg-background shadow-sm hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground z-50 flex items-center justify-center translate-x-full"
        title={isCollapsed ? "Expandir menu" : "Recolher menu"}
      >
        <PanelLeft className="size-4.5" />
      </button>

      {/* Modelos Prontos Modal */}
      <ModelosProntosModal isOpen={isModelosOpen} onClose={() => setModelosOpen(false)} />
    </aside>
  );
}
