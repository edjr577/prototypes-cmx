"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@/app/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  // Main Category Icons
  MessageSquare,
  BarChart3,
  Send,
  Briefcase,
  Layers,
  Settings,
  
  // Sub-items Icons
  MessageCircle,
  Activity,
  History,
  LayoutDashboard,
  Users,
  DollarSign,
  Target,
  UserCheck,
  Clock,
  Phone,
  Star,
  Calendar,
  Shield,
  Brain,
  Megaphone,
  Filter,
  Smartphone,
  BookOpen,
  Users2,
  KanbanSquare,
  CheckSquare,
  Plug,
  Cpu,
  ChevronRight,
  ChevronDown,
  Check,
  Sparkles,
  Tag,
  LogOut,
  FileCode,
  Package,
  SlidersHorizontal,
  Code2,
  PhoneCall,
  Lock
} from "lucide-react";

// Sitemap interfaces
interface SubItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  badge?: string;
  isHeader?: boolean; // For group divider labels in settings
}

interface MenuSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  badgeText: string;
  badgeColor: string;
  items: SubItem[];
}

const menuData: MenuSection[] = [
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

export function CRMSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { tenants, activeTenant, setActiveTenantById, setIsLoading, setLoadingModuleName } = useUser();
  
  // Section toggle state (Atendimento & Relatórios open by default)
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    atendimento: true,
    relatorios: true,
    campanhas: false,
    vendas: false,
    automacoes: false,
    configuracoes: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="flex h-[calc(100vh-3.5rem)] w-64 flex-col bg-background select-none border-r border-border/40 shrink-0">
      {/* Office Switcher - Fixo no topo da Sidebar */}
      <div className="p-3 border-b border-border/30 shrink-0 bg-background/95 backdrop-blur-sm z-10">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex w-full items-center justify-between hover:bg-muted/40 p-2 rounded-lg transition-colors cursor-pointer text-left border border-border/30 focus:outline-none focus:ring-1 focus:ring-ring/40 bg-card">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`size-2.5 rounded-full shrink-0 ${activeTenant.color}`} />
                  <span className="text-xs font-bold text-foreground truncate max-w-[150px]">
                    {activeTenant.name}
                  </span>
                </div>
                <ChevronDown className="size-3 text-muted-foreground/60 shrink-0 ml-1.5" />
              </button>
            }
          />
          <DropdownMenuContent align="start" className="w-58 p-1.5 border border-border shadow-md rounded-xl">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-[10px] text-muted-foreground/65 tracking-wider uppercase font-semibold px-2 pb-1.5">
                Trocar de Escritório
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
                      className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer ${isSelected ? 'bg-accent/85' : ''}`}
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navegação Principal com Scroll */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <nav className="p-3 space-y-3 pb-8">
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

                  // Simulated links for prototype simplicity (only CRM dashboard is enabled)
                  const isDashboard = item.href === "/crm";

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
      </div>
    </aside>
  );
}
