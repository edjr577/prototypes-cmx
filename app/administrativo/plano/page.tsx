'use client';

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Check, X, Sparkles, Users, PieChart, Package } from "lucide-react";
import { useUser } from "@/app/context/UserContext";
import { Plan } from "@/lib/permissions";
import { cn } from "@/lib/utils";

// Componentes estritos para driblar o tema global quebrado
const StrictCard = ({ className, ...props }: any) => (
  <div className={cn("rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-50 relative flex flex-col transition-all duration-300", className)} {...props} />
);
const StrictCardHeader = ({ className, ...props }: any) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);
const StrictCardTitle = ({ className, ...props }: any) => (
  <h3 className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
);
const StrictCardDescription = ({ className, ...props }: any) => (
  <p className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)} {...props} />
);
const StrictCardContent = ({ className, ...props }: any) => (
  <div className={cn("p-6 pt-0 flex-1", className)} {...props} />
);
const StrictCardFooter = ({ className, ...props }: any) => (
  <div className={cn("flex items-center p-6 pt-0 mt-auto", className)} {...props} />
);

const StrictButton = React.forwardRef<HTMLButtonElement, any>(({ className, variant = "default", ...props }, ref) => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full";
  const variants = {
    default: "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 shadow dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200",
    outline: "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 shadow-sm dark:!border-white/20 dark:bg-neutral-900 dark:hover:bg-white/10 dark:hover:text-neutral-50",
  };
  return <button ref={ref} className={cn(base, variants[variant as keyof typeof variants], className)} {...props} />
});
StrictButton.displayName = "StrictButton";

const PLAN_DETAILS = [
  {
    id: "Starter" as Plan,
    name: "Starter",
    icon: Users,
    description: "Organização de processos.",
    price: "R$ 499",
    features: [
      { name: "Gestão de Processos (CRM)", included: true },
      { name: "Controladoria Jurídica", included: false },
      { name: "Gestão Financeira (ERP)", included: false },
      { name: "Visão Executiva (BI)", included: false },
    ]
  },
  {
    id: "Growth" as Plan,
    name: "Growth",
    icon: PieChart,
    description: "CRM + Controladoria.",
    price: "R$ 999",
    features: [
      { name: "Gestão de Processos (CRM)", included: true },
      { name: "Controladoria Jurídica", included: true },
      { name: "Gestão Financeira (ERP)", included: false },
      { name: "Visão Executiva (BI)", included: false },
    ]
  },
  {
    id: "Growth+" as Plan,
    name: "Growth+",
    icon: Package,
    description: "Operação e financeiro.",
    price: "R$ 1.499",
    features: [
      { name: "Gestão de Processos (CRM)", included: true },
      { name: "Controladoria Jurídica", included: true },
      { name: "Gestão Financeira (ERP)", included: true },
      { name: "Visão Executiva (BI)", included: false },
    ]
  },
  {
    id: "Advanced" as Plan,
    name: "Advanced",
    icon: Sparkles,
    description: "Tecnologia de ponta e IA.",
    price: "R$ 3.999",
    features: [
      { name: "Gestão de Processos (CRM)", included: true },
      { name: "Controladoria Jurídica", included: true },
      { name: "Gestão Financeira (ERP)", included: true },
      { name: "Visão Executiva (BI) e IA", included: true },
    ]
  }
];

export default function PlanoPage() {
  const { plan, setPlan, activeTenant } = useUser();

  const handlePlanChange = (newPlan: Plan) => {
    setPlan(newPlan);
  };

  const getPlanLevel = (p: Plan) => {
    if (p === 'Starter') return 1;
    if (p === 'Growth') return 2;
    if (p === 'Growth+') return 3;
    return 4;
  };

  const currentLevel = getPlanLevel(plan);

  return (
    <div className="flex flex-col space-y-4 p-6 h-full max-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* HEADER ALIGNED LEFT LIKED ADMINISTRATIVO */}
      <div className="flex flex-col space-y-1.5 shrink-0">
        <p className="text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">Gestão da Conta</p>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Planos e Assinatura</h1>
          <Badge variant="secondary" className="bg-neutral-100 text-neutral-900 hover:bg-neutral-100 dark:bg-white/10 dark:text-neutral-100 font-bold tracking-widest text-[10px] uppercase">
            {activeTenant.name}
          </Badge>
        </div>
      </div>

      {/* PLAN GRID (4 columns, compacted) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 min-h-0 pt-2">
        {PLAN_DETAILS.map((p) => {
          const isCurrent = plan === p.id;
          const isAdvanced = p.id === "Advanced";
          const level = getPlanLevel(p.id);
          const isUpgrade = level > currentLevel;

          return (
            <StrictCard 
              key={p.id} 
              className={cn(
                "overflow-visible mt-3",
                isCurrent ? "border-neutral-900 dark:border-white shadow-md" : "hover:border-neutral-300 dark:hover:border-white/30 hover:shadow-sm",
                isAdvanced && !isCurrent ? "border-amber-500/50" : ""
              )}
            >
              {/* Highlight Badge */}
              {isAdvanced && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-2 py-0.5 text-[10px] tracking-widest uppercase">
                    <Sparkles className="size-3 mr-1 inline" /> Recomendado
                  </Badge>
                </div>
              )}
              {isCurrent && !isAdvanced && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-neutral-900 hover:bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:hover:bg-neutral-50 dark:text-neutral-900 font-bold px-2 py-0.5 text-[10px] tracking-widest uppercase">
                    Plano Atual
                  </Badge>
                </div>
              )}

              <StrictCardHeader className="text-center pb-2 pt-6 px-4">
                <div className="flex justify-center mb-3">
                  <div className="size-10 rounded-xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center">
                    <p.icon className="size-5 text-neutral-500 dark:text-neutral-400" />
                  </div>
                </div>
                <StrictCardTitle className="text-xl">{p.name}</StrictCardTitle>
                <StrictCardDescription className="h-8 mt-1 text-xs">{p.description}</StrictCardDescription>
                <div className="mt-2 flex justify-center items-baseline gap-1">
                  <span className="text-2xl font-extrabold">{p.price}</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium">/mês</span>
                </div>
              </StrictCardHeader>

              <StrictCardContent className="mt-4 px-4 pb-2">
                <ul className="space-y-2.5">
                  {p.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {feature.included ? (
                        <div className="size-4 rounded-full bg-neutral-900/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                          <Check className="size-3 text-neutral-900 dark:text-neutral-50" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="size-4 flex items-center justify-center shrink-0 opacity-30">
                          <X className="size-3 text-neutral-500 dark:text-neutral-400" strokeWidth={2} />
                        </div>
                      )}
                      <span className={cn(
                        "text-xs leading-snug", 
                        feature.included ? "text-neutral-950 dark:text-neutral-50 font-medium" : "text-neutral-500 dark:text-neutral-400 opacity-70"
                      )}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </StrictCardContent>

              <StrictCardFooter className="pt-2 pb-4 px-4 border-t border-neutral-200 dark:border-white/10">
                {isCurrent ? (
                  <StrictButton disabled variant="outline">
                    Plano Atual
                  </StrictButton>
                ) : isUpgrade ? (
                  <StrictButton variant="default" onClick={() => handlePlanChange(p.id)}>
                    Fazer Upgrade
                  </StrictButton>
                ) : (
                  <StrictButton variant="outline" onClick={() => handlePlanChange(p.id)}>
                    Fazer Downgrade
                  </StrictButton>
                )}
              </StrictCardFooter>
            </StrictCard>
          );
        })}
      </div>
      
      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 pt-2 shrink-0">
        <p>Os valores apresentados são ilustrativos.</p>
      </div>
    </div>
  );
}
