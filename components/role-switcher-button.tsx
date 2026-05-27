'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, Role } from '@/app/context/UserContext';
import { 
  Fingerprint, 
  ChevronUp, 
  Check, 
  Home, 
  Settings, 
  ShieldAlert,
  HelpCircle,
  Briefcase,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RoleSwitcherButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { role, setRole, enabledApps, setHasChosenProfile } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  // If on the home page (selection screen), don't show the floating switcher
  if (pathname === '/') {
    return null;
  }

  const roles: { name: Role; desc: string; icon: any; color: string }[] = [
    { 
      name: 'Sócio', 
      desc: 'Acesso irrestrito ao ERP, CRM e Controladoria', 
      icon: ShieldAlert, 
      color: 'text-red-500 bg-red-500/10 border-red-500/20' 
    },
    { 
      name: 'Advogado', 
      desc: 'Acesso a Processos do ERP e Leads do CRM', 
      icon: Briefcase, 
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' 
    },
    { 
      name: 'Controller', 
      desc: 'Acesso financeiro total na Controladoria', 
      icon: TrendingUp, 
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' 
    },
    { 
      name: 'Estagiário', 
      desc: 'Acesso básico sob supervisão', 
      icon: HelpCircle, 
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' 
    },
    { 
      name: 'Cliente', 
      desc: 'Acesso externo aos próprios processos', 
      icon: UserCheck, 
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' 
    },
  ];

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setIsOpen(false);
    // Refresh to apply permissions if components are conditionally rendered based on role
    router.refresh();
  };

  const handleGoHome = () => {
    setHasChosenProfile(false);
    setIsOpen(false);
    router.push('/');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      {/* Popover Card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-80 rounded-xl border border-border bg-popover p-4 shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Fingerprint className="size-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Simulador de Perfis</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Protótipo
            </span>
          </div>

          {/* Role List */}
          <div className="mt-3 flex flex-col gap-1.5">
            {roles.map((r) => {
              const Icon = r.icon;
              const isCurrent = role === r.name;
              return (
                <button
                  key={r.name}
                  onClick={() => handleRoleChange(r.name)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-2 text-left transition-all hover:bg-accent/50 ${
                    isCurrent 
                      ? 'border-primary/40 bg-accent/80' 
                      : 'border-transparent bg-transparent'
                  }`}
                >
                  <div className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border ${r.color}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">{r.name}</span>
                      {isCurrent && <Check className="size-3.5 text-primary shrink-0" />}
                    </div>
                    <span className="text-[10px] text-muted-foreground block leading-tight mt-0.5 truncate">
                      {r.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="my-3 h-px bg-border/60" />

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGoHome}
              className="flex-1 gap-1.5 h-8 text-xs font-medium rounded-lg hover:bg-accent"
            >
              <Home className="size-3.5" />
              Início / Apps
            </Button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border border-primary/25"
        title="Alternar Perfil ou Voltar"
      >
        <Fingerprint className={`size-6 transition-transform duration-300 ${isOpen ? 'rotate-180 scale-90' : ''}`} />
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-white border border-background">
          {role[0]}
        </span>
      </button>
    </div>
  );
}
