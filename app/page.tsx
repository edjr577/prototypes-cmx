'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import { Plan, Role, AppKey, resolvePermissions } from '@/lib/permissions';
import { 
  ShieldAlert, 
  Briefcase, 
  TrendingUp, 
  HelpCircle, 
  UserCheck, 
  Check, 
  Activity, 
  ArrowRight,
  Fingerprint,
  Sparkles,
  Users,
  Package,
  PieChart,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function ProfileSelectionPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { 
    role, 
    setRole, 
    enabledApps, 
    plan,
    setPlan, 
    hasChosenProfile, 
    setHasChosenProfile,
    isInitialized,
    hasPermission
  } = useUser();

  const [localRole, setLocalRole] = useState<Role>('Sócio');
  const [localPlan, setLocalPlan] = useState<Plan>('Advanced');

  // Sync state once initialized
  useEffect(() => {
    if (isInitialized) {
      setLocalRole(role);
      setLocalPlan(plan);
      
      // Auto-redirect if they already chose and have active modules
      if (hasChosenProfile && enabledApps.length > 0) {
        if (hasPermission('admin:view')) router.push('/administrativo');
        else if (hasPermission('crm:view')) router.push('/crm');
        else if (hasPermission('erp:view')) router.push('/erp');
        else if (hasPermission('controladoria:view')) router.push('/controladoria');
      }
    }
  }, [isInitialized, hasChosenProfile, enabledApps, role, router, hasPermission]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse">Carregando ambiente seguro...</p>
        </div>
      </div>
    );
  }

  const rolesConfig: { name: Role; desc: string; icon: any; color: string; access: string }[] = [
    { 
      name: 'Sócio', 
      desc: 'Sócio-Diretor / Administrador', 
      icon: ShieldAlert, 
      color: 'border-red-500/20 text-red-500 bg-red-500/5 hover:border-red-500/40',
      access: 'Acesso total aos módulos do plano (admin:full_access no Advanced).'
    },
    { 
      name: 'Líder CRM', 
      desc: 'Gestor de Vendas / Líder CRM', 
      icon: Users, 
      color: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5 hover:border-indigo-500/40',
      access: 'Acesso total de gestão (admin) apenas no módulo de CRM.'
    },
    { 
      name: 'Advogado', 
      desc: 'Advogado Associado / Parceiro', 
      icon: Briefcase, 
      color: 'border-blue-500/20 text-blue-500 bg-blue-500/5 hover:border-blue-500/40',
      access: 'Visualização de processos (erp) e edição. Acesso básico de visualização no CRM.'
    },
    { 
      name: 'Controller', 
      desc: 'Controlador Financeiro / Administrativo', 
      icon: TrendingUp, 
      color: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5 hover:border-emerald-500/40',
      access: 'Gestão total de relatórios de produtividade e módulo de Controladoria.'
    },
    { 
      name: 'Estagiário', 
      desc: 'Assistente / Estagiário', 
      icon: HelpCircle, 
      color: 'border-amber-500/20 text-amber-500 bg-amber-500/5 hover:border-amber-500/40',
      access: 'Visualização básica no ERP e CRM, com restrições severas em relatórios.'
    },
    { 
      name: 'Cliente', 
      desc: 'Cliente do Escritório (Portal Externo)', 
      icon: UserCheck, 
      color: 'border-purple-500/20 text-purple-500 bg-purple-500/5 hover:border-purple-500/40',
      access: 'Visualização simplificada de andamentos processuais (erp).'
    },
  ];

  const plansConfig: { key: Plan; name: string; desc: string; icon: any; color: string }[] = [
    {
      key: 'Starter',
      name: 'Plano Starter',
      desc: 'Gestão Básica (CRM + Administrativo Bloqueado)',
      icon: Users,
      color: 'peer-checked:border-slate-500 peer-checked:bg-slate-500/5 border-border hover:border-slate-500/30'
    },
    {
      key: 'Growth',
      name: 'Plano Growth',
      desc: 'Gestão Financeira (+ Controladoria)',
      icon: PieChart,
      color: 'peer-checked:border-blue-500 peer-checked:bg-blue-500/5 border-border hover:border-blue-500/30'
    },
    {
      key: 'Growth+',
      name: 'Plano Growth+',
      desc: 'Gestão Jurídica Total (+ ERP/Processos)',
      icon: Package,
      color: 'peer-checked:border-indigo-500 peer-checked:bg-indigo-500/5 border-border hover:border-indigo-500/30'
    },
    {
      key: 'Advanced',
      name: 'Plano Advanced',
      desc: 'Gestão Completa (Administrativo Desbloqueado)',
      icon: Sparkles,
      color: 'peer-checked:border-amber-500 peer-checked:bg-amber-500/5 border-border hover:border-amber-500/30'
    }
  ];

  const handleConfirm = () => {
    setRole(localRole);
    setPlan(localPlan);
    setHasChosenProfile(true);
    
    // Route to the first allowed dashboard
    const tempPerms = resolvePermissions(localRole, localPlan);
    if (tempPerms.includes('admin:view')) router.push('/administrativo');
    else if (tempPerms.includes('crm:view')) router.push('/crm');
    else if (tempPerms.includes('erp:view')) router.push('/erp');
    else if (tempPerms.includes('controladoria:view')) router.push('/controladoria');
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between font-sans selection:bg-primary/20">
      
      {/* Decorative gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] h-[80%] w-[60%] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/2" />
        <div className="absolute -bottom-[40%] -right-[20%] h-[80%] w-[60%] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/2" />
      </div>

      {/* Header section */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://legaltechhub.com.br/assets/logo-BQhEdYxV.png" 
            className="h-7 w-auto object-contain dark:brightness-0 dark:invert" 
            alt="LegalTech Logo" 
          />
          <span className="text-[10px] tracking-widest font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded border border-border uppercase">
            Protótipo Shell
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="size-9 rounded-lg border border-border/40 hover:bg-muted"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Sparkles className="size-3.5" />
            <span>Simulador de Identidades & Licenciamento</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Bem-vindo à plataforma LegalTech
          </h1>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Personalize seu protótipo. Escolha os aplicativos ativos do escritório e selecione um perfil de usuário para simular a experiência ideal de permissões.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* 1. APP LICENSE SELECTOR */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/55">
                <Activity className="size-4.5 text-primary" />
                <h2 className="text-sm font-bold text-foreground">1. Módulos do Escritório</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Ative ou desative as licenças do escritório para ver o menu do Shell se adaptar dinamicamente.
              </p>

              <div className="flex flex-col gap-3">
                {plansConfig.map((p) => {
                  const PlanIcon = p.icon;
                  const isChecked = localPlan === p.key;
                  return (
                    <label 
                      key={p.key}
                      onClick={() => setLocalPlan(p.key)}
                      className={`relative flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition-all select-none ${p.color} ${isChecked ? 'border-primary/40 bg-accent/30' : 'border-border/60 bg-background/50 hover:bg-accent/10'}`}
                    >
                      <div className={`mt-0.5 flex size-8 items-center justify-center rounded-lg border ${isChecked ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'}`}>
                        <PlanIcon className="size-4.5" />
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <span className="text-xs font-bold text-foreground block">{p.name}</span>
                        <span className="text-[10px] text-muted-foreground leading-tight mt-0.5 block">
                          {p.desc}
                        </span>
                      </div>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        <div className={`flex size-4.5 items-center justify-center rounded-full border transition-all ${isChecked ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 bg-transparent'}`}>
                          {isChecked && <Check className="size-3" />}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Hint Card */}
            <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground flex gap-3">
              <Fingerprint className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-foreground mb-0.5">Dica de Navegação</span>
                Você poderá alterar estes dados e os níveis de permissão a qualquer momento usando o botão flutuante no canto inferior direito do portal.
              </div>
            </div>
          </div>

          {/* 2. USER ROLE SELECTOR */}
          <div className="md:col-span-7 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/55">
              <Fingerprint className="size-4.5 text-primary" />
              <h2 className="text-sm font-bold text-foreground">2. Perfil de Usuário</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Cada perfil altera dinamicamente as permissões operacionais e a visualização de painéis.
            </p>

            <div className="flex flex-col gap-3">
              {rolesConfig.map((roleOpt) => {
                const RoleIcon = roleOpt.icon;
                const isSelected = localRole === roleOpt.name;
                return (
                  <button
                    key={roleOpt.name}
                    type="button"
                    onClick={() => setLocalRole(roleOpt.name)}
                    className={`flex items-start gap-4 rounded-xl border p-3 text-left transition-all ${isSelected ? 'border-primary bg-primary/[0.03] ring-1 ring-primary' : 'border-border/60 bg-background/50 hover:bg-accent/40'}`}
                  >
                    <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border ${roleOpt.color}`}>
                      <RoleIcon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">{roleOpt.name}</span>
                        <div className={`flex size-4.5 items-center justify-center rounded-full border transition-all ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 bg-transparent'}`}>
                          {isSelected && <Check className="size-3" />}
                        </div>
                      </div>
                      <span className="text-[10px] text-primary/80 font-medium block mt-0.5">{roleOpt.desc}</span>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-1.5">
                        {roleOpt.access}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA Confirm Button */}
            <div className="mt-6 pt-4 border-t border-border/55">
              <Button 
                onClick={handleConfirm}
                className="w-full gap-2 h-10 font-medium rounded-lg text-xs"
              >
                Confirmar e Entrar no Painel
                <ArrowRight className="size-4.5" />
              </Button>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 text-center border-t border-border/40 text-[10px] text-muted-foreground">
        © 2026 LegalTech Hub Sistemas de Advocacia S.A. Todos os direitos reservados.
      </footer>

    </div>
  );
}
