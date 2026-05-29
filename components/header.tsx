"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";
import {
  LayoutGrid,
  Users,
  Package,
  PieChart,
  Bell,
  Search,
  MessageSquare,
  Phone,
  History,
  ChevronDown,
  ChevronRight,
  User,
  Lock,
  Shield,
  LogOut,
  Pencil,
  Sun,
  Moon,
  Tv,
  Monitor,
  Laptop,
  Home,
  LifeBuoy,
  Fingerprint,
  Check,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, AppKey } from "@/app/context/UserContext";

const allModules = [
  {
    key: "administrativo" as AppKey,
    name: "Administrativo",
    description: "Visão executiva e resultados",
    href: "/administrativo",
    icon: TrendingUp,
    color: "bg-indigo-600",
  },
  {
    key: "crm" as AppKey,
    name: "CRM",
    description: "Gestao de clientes",
    href: "/crm",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    key: "erp" as AppKey,
    name: "ERP",
    description: "Recursos empresariais",
    href: "/erp",
    icon: Package,
    color: "bg-emerald-500",
  },
  {
    key: "controladoria" as AppKey,
    name: "Controladoria",
    description: "Financeiro e controle",
    href: "/controladoria",
    icon: PieChart,
    color: "bg-amber-500",
  },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { 
    role, 
    enabledApps, 
    reset, 
    setHasChosenProfile, 
    tenants, 
    activeTenant, 
    setActiveTenantById,
    isLoading,
    setIsLoading,
    loadingModuleName,
    setLoadingModuleName
  } = useUser();

  // Desativa o loading assim que a rota de destino (pathname) é alterada e montada
  React.useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleModuleClick = (e: React.MouseEvent, href: string, name: string) => {
    e.preventDefault();
    if (pathname === href) return;
    setIsLoading(true);
    setLoadingModuleName(name);
    
    // Pequeno delay de 100ms para iniciar a animação e o blur antes do processo de renderização travar a main thread
    setTimeout(() => {
      router.push(href);
    }, 100);
  };
  
  // Filter active modules
  const activeModules = allModules.filter(m => enabledApps.includes(m.key));
  const currentModule = allModules.find((m) => pathname.startsWith(m.href));
  const isCRM = pathname.startsWith("/crm");

  // Date and Time mock exactly matching the user request
  const [currentDateTime, setCurrentDateTime] = React.useState("27/05/2026 15:13:36");

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR');
      setCurrentDateTime(formatted);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (pathname === '/') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-background px-4 select-none">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" className="size-9" />}
          >
            <LayoutGrid data-icon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <DropdownMenuGroup>
              {/* Início Link */}
              <DropdownMenuItem
                render={<Link href="/" />}
                onClick={() => {
                  setHasChosenProfile(false);
                }}
                className="flex cursor-pointer items-center gap-3 py-2 border-b border-border/30 mb-2 text-primary"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Home className="size-5" />
                </span>
                <span className="flex flex-col">
                  <span className="font-semibold text-xs">Início</span>
                  <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
                    Voltar para a seleção de perfil
                  </span>
                </span>
              </DropdownMenuItem>

              <DropdownMenuLabel>Aplicativos</DropdownMenuLabel>
              {activeModules.length === 0 ? (
                <div className="p-3 text-xs text-muted-foreground text-center">Nenhum aplicativo ativo.</div>
              ) : (
                activeModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <DropdownMenuItem
                       key={module.href}
                       onClick={(e) => handleModuleClick(e, module.href, module.name)}
                       className="flex cursor-pointer items-center gap-3 py-2"
                     >
                       <span
                         className={`flex size-9 items-center justify-center rounded-lg ${module.color} text-white`}
                       >
                         <Icon className="size-5" />
                       </span>
                       <span className="flex flex-col">
                         <span className="font-medium text-xs">{module.name}</span>
                         <span className="text-[10px] text-muted-foreground">
                           {module.description}
                         </span>
                       </span>
                     </DropdownMenuItem>
                  );
                })
              )}

              {/* Spacing & Separator for Support */}
              <DropdownMenuSeparator className="bg-border/30 my-2" />
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-3 py-2 bg-muted/40 hover:bg-accent rounded-lg border border-border/30 mt-2"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-500/10 text-zinc-500 dark:bg-zinc-500/20">
                  <LifeBuoy className="size-5" />
                </span>
                <span className="flex flex-col">
                  <span className="font-medium text-xs">Suporte</span>
                  <span className="text-[10px] text-muted-foreground">
                    Central de ajuda e chamados
                  </span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          {/* Logo - non-clickable wrapper with spacing */}
          <div className="flex items-center shrink-0 mr-3 pointer-events-none">
            <img 
              src="https://legaltechhub.com.br/assets/logo-BQhEdYxV.png" 
              className="h-6 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-200" 
              alt="LegalTech Logo" 
            />
          </div>



          {currentModule && (
            <nav aria-label="Breadcrumb" className="flex items-center">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground select-none">
                {/* First item: non-clickable, no hover state */}
                <li className="flex items-center">
                  <span className="font-bold text-2xs uppercase tracking-wider text-muted-foreground/80">
                    {currentModule.name}
                  </span>
                </li>
                
                <li role="presentation" aria-hidden="true" className="flex items-center text-muted-foreground/30 pointer-events-none">
                  <ChevronRight className="size-3.5" />
                </li>
                
                <li className="flex items-center">
                  <span role="link" aria-disabled="true" aria-current="page" className="font-normal text-foreground">
                    {pathname === "/administrativo" ? "Visão Geral" : 
                     pathname === "/administrativo/ia" ? "Assistência com IA" :
                     pathname === "/administrativo/plano" ? "Gerenciar Plano" :
                     pathname === "/administrativo/configuracoes" ? "Configurações" :
                     pathname === "/crm" || pathname === "/erp" || pathname === "/controladoria" ? "Visão Geral" : 
                     "Dashboard"}
                  </span>
                </li>
              </ol>
            </nav>
          )}
        </div>
      </div>

      {/* --- RIGHT ACTION GROUP --- */}
      <div className="flex items-center gap-3">
        {isCRM && (
          <>
            {/* Atendimentos Pill Button */}
            <Button variant="outline" className="h-9 gap-2 bg-blue-500/10 text-blue-500 border-blue-500/20 rounded-lg hover:bg-blue-500/20 font-medium px-4 cursor-pointer">
              <MessageSquare className="size-4 text-blue-500" />
              <span className="text-xs">Atendimentos</span>
            </Button>

            {/* Separator Line */}
            <div className="h-4 w-px bg-border/80" />
          </>
        )}

        {/* Action Icon Row */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {/* Brazil Flag Icon */}
          <button className="flex size-8 items-center justify-center rounded-md hover:bg-muted/40 text-lg transition-colors cursor-pointer" title="Idioma: Português">
            🇧🇷
          </button>
          
          {isCRM && (
            <>
              <button className="flex size-8 items-center justify-center rounded-md hover:bg-muted/40 transition-colors cursor-pointer" title="Mensagens">
                <MessageSquare className="size-4.5" />
              </button>

              <button className="flex size-8 items-center justify-center rounded-md hover:bg-muted/40 transition-colors cursor-pointer" title="Ligações VoIP">
                <Phone className="size-4.5" />
              </button>
            </>
          )}

          <button className="flex size-8 items-center justify-center rounded-md hover:bg-muted/40 transition-colors cursor-pointer" title="Notificações">
            <Bell className="size-4.5" />
          </button>

          <button className="flex size-8 items-center justify-center rounded-md hover:bg-muted/40 transition-colors cursor-pointer" title="Mensagens Agendadas">
            <History className="size-4.5" />
          </button>

          {isCRM && (
            <button className="flex size-8 items-center justify-center rounded-md hover:bg-muted/40 transition-colors cursor-pointer" title="Tutoriais">
              <Tv className="size-4.5" />
            </button>
          )}
        </div>

        {/* Separator Line */}
        <div className="h-4 w-px bg-border/80" />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 hover:bg-muted/40 p-1 px-2 rounded-lg transition-colors cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-ring/50">
                <div className="relative">
                  <Avatar className="size-8 border border-border">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="Edmilson" />
                    <AvatarFallback>ED</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground leading-none">EDMILSON</span>
                  <span className="text-[10px] text-muted-foreground leading-none mt-0.5">{role}</span>
                </div>
                <ChevronDown className="size-3.5 text-muted-foreground/60" />
              </button>
            }
          />
          
          <DropdownMenuContent align="end" className="w-[310px] p-2 flex flex-col gap-1.5 !overflow-visible border border-border shadow-md rounded-xl">
            {/* Header: Unified Profile Box (Horizontal design, no vertical split, no asymmetrical voids) */}
            <div className="flex items-center gap-3.5 p-2 bg-muted/40 rounded-lg border border-border/20">
              <div className="relative group/avatar cursor-pointer">
                <Avatar className="size-12 border border-border">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" />
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                  <Pencil className="size-3 text-white" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col min-w-0">
                <span className="text-[11px] text-muted-foreground leading-none font-medium">Olá!</span>
                <span className="text-sm font-bold text-foreground leading-none mt-1 truncate">EDMILSON</span>
                <span className="text-[10px] text-muted-foreground/75 leading-none mt-1">{role}</span>
              </div>

              {/* Online Pill Trigger (More compact and aligned) */}
              <div className="flex items-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded-full text-[10px] font-bold select-none cursor-pointer">
                <span className="size-1.5 rounded-full bg-emerald-500 mr-1.5" />
                <span className="uppercase tracking-wider mr-1 text-[9px]">Online</span>
                <ChevronDown className="size-2.5 text-emerald-500" />
              </div>
            </div>

            <DropdownMenuSeparator className="bg-border/30 my-0.5" />

            {/* Menu Items: Full-width list, beautifully integrated */}
            <div className="flex flex-col gap-0.5">
              {/* Profile Link */}
              <div className="flex items-center gap-3 text-xs text-foreground/80 hover:bg-muted/70 px-2.5 py-2 rounded-lg transition-colors cursor-pointer">
                <User className="size-4 text-muted-foreground/70" />
                <span className="font-medium">Meu Perfil</span>
              </div>

              {/* Theme Selector (Integrated cleanly as a full-width settings row!) */}
              <div className="flex items-center justify-between text-xs text-foreground/80 hover:bg-muted/70 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? (
                    <Moon className="size-4 text-muted-foreground/70" />
                  ) : (
                    <Sun className="size-4 text-muted-foreground/70" />
                  )}
                  <span className="font-medium">Aparência</span>
                </div>
                
                {/* Micro-toggle inside select bar */}
                <div className="bg-muted/90 p-0.5 rounded-md flex items-center gap-0.5 border border-border/40 scale-95 origin-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setTheme("dark");
                    }}
                    className={`p-1 rounded-md transition-all cursor-pointer ${theme === "dark" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground/75 hover:text-foreground"}`}
                    title="Modo Escuro"
                  >
                    <Moon className="size-3.5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setTheme("light");
                    }}
                    className={`p-1 rounded-md transition-all cursor-pointer ${theme === "light" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground/75 hover:text-foreground"}`}
                    title="Modo Claro"
                  >
                    <Sun className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Security Section (Clean group layout) */}
            <div className="flex flex-col gap-1 border-t border-border/20 pt-2 mt-1">
              <span className="text-[9px] font-bold text-muted-foreground/45 tracking-widest uppercase px-2.5 pb-1">
                Segurança
              </span>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-3 text-xs text-foreground/80 hover:bg-muted/70 px-2.5 py-2 rounded-lg transition-colors cursor-pointer">
                  <Lock className="size-4 text-muted-foreground/70" />
                  <span className="font-medium">Alterar senha</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground/80 hover:bg-muted/70 px-2.5 py-2 rounded-lg transition-colors cursor-pointer">
                  <Shield className="size-4 text-muted-foreground/70" />
                  <span className="font-medium">Autenticação de dois fatores</span>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="bg-border/30 my-0.5" />

            {/* Logout Action */}
            <div 
              onClick={() => {
                reset();
                router.push('/');
              }}
              className="flex items-center gap-3 text-xs text-destructive hover:bg-destructive/10 px-2.5 py-2 rounded-lg transition-all cursor-pointer font-medium"
            >
              <LogOut className="size-4 text-destructive" />
              <span>Sair da conta</span>
            </div>

            {/* Premium Compact Footer */}
            <div className="bg-muted/30 p-2.5 rounded-lg border border-border/40 flex flex-col gap-2 text-center mt-1">
              <div className="flex justify-center gap-1.5">
                <span className="text-[8px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  APP: v26.05.25.2
                </span>
                <span className="text-[8px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  API: v26.05.25.2.2
                </span>
              </div>
              <div className="text-[10px] text-foreground/90 font-semibold leading-none">
                Servidor disponível!
              </div>
              <div className="text-[9px] text-muted-foreground/60 font-mono leading-none">
                {currentDateTime}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dynamic Module Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-border bg-card/95 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 max-w-xs text-center">
            <div className="relative flex items-center justify-center size-16">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
              <Fingerprint className="size-8 text-primary animate-pulse" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-sm text-foreground">Abrindo {loadingModuleName}</h3>
              <p className="text-[9px] text-muted-foreground tracking-widest uppercase font-semibold">
                Carregando ambiente seguro...
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
