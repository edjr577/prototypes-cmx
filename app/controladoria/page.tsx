"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useMetas, statusOf } from "./metas-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  Coins,
  Banknote,
  Award,
  AlertTriangle,
  Users,
  Wallet,
  Target,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

// --- MOCK DATA ---
type Sev = "ok" | "atencao" | "critico";

const pulso: {
  lens: string;
  href: string;
  valor: string;
  label: string;
  sub: string;
  metaId: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    lens: "Comercial",
    href: "/controladoria/comercial",
    valor: "R$ 312k",
    label: "Receita contratada",
    sub: "89% da meta · faltam R$ 38k",
    metaId: "receita_contratada",
    icon: TrendingUp,
  },
  {
    lens: "Saída",
    href: "/controladoria/saida",
    valor: "R$ 184k",
    label: "Honorário · 7 dias",
    sub: "12 realizações previstas",
    metaId: "honorario_realizado",
    icon: Coins,
  },
  {
    lens: "Financeiro",
    href: "/controladoria/financeiro",
    valor: "74%",
    label: "Conversão em caixa",
    sub: "abaixo da meta de 80%",
    metaId: "conversao_caixa",
    icon: Banknote,
  },
  {
    lens: "Equipe",
    href: "/controladoria/equipe",
    valor: "88%",
    label: "Taxa de êxito",
    sub: "1 advogado sobrecarregado",
    metaId: "taxa_exito",
    icon: Award,
  },
];

const acoes: {
  id: string;
  sev: Sev;
  titulo: string;
  contexto: string;
  cta: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "prazos",
    sev: "critico",
    titulo: "12 prazos vencidos",
    contexto: "Érica Nunes concentra 8 dos atrasos · 8 em risco (≤ 3 dias)",
    cta: "Ver equipe",
    href: "/controladoria/equipe",
    icon: AlertTriangle,
  },
  {
    id: "inadimplencia",
    sev: "critico",
    titulo: "R$ 96k em inadimplência",
    contexto: "João R. de Azevedo — R$ 20k, 162 dias em atraso",
    cta: "Ver financeiro",
    href: "/controladoria/financeiro",
    icon: Wallet,
  },
  {
    id: "sobrecarga",
    sev: "critico",
    titulo: "Flávio M. Nogueira sobrecarregado",
    contexto: "47 itens em aberto · acima do limite saudável (40)",
    cta: "Ver equipe",
    href: "/controladoria/equipe",
    icon: Users,
  },
  {
    id: "conversao",
    sev: "atencao",
    titulo: "Conversão em caixa abaixo da meta",
    contexto: "74% vs meta de 80% · R$ 286k faturado, R$ 231k recebido",
    cta: "Ver financeiro",
    href: "/controladoria/financeiro",
    icon: Banknote,
  },
  {
    id: "meta",
    sev: "atencao",
    titulo: "Meta comercial em risco",
    contexto: "89% da meta · faltam R$ 38k e restam 14 dias no mês",
    cta: "Ver comercial",
    href: "/controladoria/comercial",
    icon: Target,
  },
  {
    id: "saida",
    sev: "ok",
    titulo: "R$ 184k em honorário a realizar esta semana",
    contexto: "6 benefícios, 4 RPVs e 2 acordos previstos",
    cta: "Ver saída",
    href: "/controladoria/saida",
    icon: Coins,
  },
];

const agenda: { data: string; tipo: string; cliente: string; valor: string }[] = [
  { data: "17/jun", tipo: "Benefício concedido", cliente: "Maria S. dos Santos", valor: "R$ 18,4k" },
  { data: "18/jun", tipo: "RPV · aguardando", cliente: "João R. de Azevedo", valor: "R$ 24,1k" },
  { data: "18/jun", tipo: "Acordo homologado", cliente: "Condomínio Angra", valor: "R$ 12,8k" },
  { data: "19/jun", tipo: "Benefício concedido", cliente: "Benildo da Silva", valor: "R$ 9,6k" },
  { data: "20/jun", tipo: "Acordo trabalhista", cliente: "Ancra Hotelaria", valor: "R$ 15,2k" },
];

const sevDot: Record<Sev, string> = {
  ok: "bg-emerald-500",
  atencao: "bg-amber-500",
  critico: "bg-rose-500",
};

const sevIconWrap: Record<Sev, string> = {
  ok: "bg-emerald-500/10 text-emerald-500",
  atencao: "bg-amber-500/10 text-amber-500",
  critico: "bg-rose-500/10 text-rose-500",
};

const sevLabel: Record<Sev, string> = {
  ok: "No alvo",
  atencao: "Atenção",
  critico: "Crítico",
};

const sevOrder: Record<Sev, number> = { critico: 0, atencao: 1, ok: 2 };

export default function CockpitPage() {
  const { activeTenant } = useUser();
  const { getMeta } = useMetas();
  const [resolvidos, setResolvidos] = React.useState<string[]>([]);

  // Data de referência do protótipo (dados de junho/2026) — derivada, não digitada
  const hoje = new Date(2026, 5, 16);
  const dataFmt = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const dataLabel = dataFmt.charAt(0).toUpperCase() + dataFmt.slice(1);

  const visiveis = [...acoes]
    .filter((a) => !resolvidos.includes(a.id))
    .sort((a, b) => sevOrder[a.sev] - sevOrder[b.sev]);
  const criticos = visiveis.filter((a) => a.sev === "critico").length;
  const atencoes = visiveis.filter((a) => a.sev === "atencao").length;

  const resolver = (id: string) => setResolvidos((prev) => [...prev, id]);
  const reabrir = () => setResolvidos([]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
            Visão do dia
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            O que precisa de você hoje
          </h1>
          <p className="text-muted-foreground">
            {dataLabel} · {activeTenant.name}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 text-rose-500">
            <span className="size-2 rounded-full bg-rose-500" />
            <span className="font-semibold text-foreground">{criticos}</span> críticos
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-500">
            <span className="size-2 rounded-full bg-amber-500" />
            <span className="font-semibold text-foreground">{atencoes}</span> em atenção
          </span>
        </div>
      </div>

      {/* --- PULSO DO ESCRITÓRIO (4 lentes) --- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pulso.map((p) => {
          const Icon = p.icon;
          const status = statusOf(getMeta(p.metaId)!, "mes");
          return (
            <Link key={p.lens} href={p.href} className="group">
              <Card className="h-full transition-all hover:ring-foreground/20 hover:bg-muted/20">
                <CardContent className="px-4 py-0 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${sevDot[status]}`} />
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {p.lens}
                      </span>
                    </div>
                    <div className={`rounded-lg p-1.5 ${sevIconWrap[status]}`}>
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-foreground">
                    {p.valor}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground/80">
                      {p.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground/80">{p.sub}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Abrir lente
                    <ArrowRight className="size-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* --- PRECISA DE VOCÊ + AGENDA --- */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Feed de ações priorizado */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Precisa de você</CardTitle>
            <CardDescription>
              Exceções das 4 lentes, priorizadas por severidade
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-1">
            {visiveis.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                <div className="rounded-full p-3 bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="size-6" />
                </div>
                <span className="font-medium text-foreground">Tudo em dia</span>
                <span className="text-sm text-muted-foreground">
                  Nenhuma pendência aberta. Bom trabalho!
                </span>
                {resolvidos.length > 0 && (
                  <button
                    onClick={reabrir}
                    className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-md px-2.5 py-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="size-3.5" />
                    Reabrir lista
                  </button>
                )}
              </div>
            ) : (
              <>
                {visiveis.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-3 hover:bg-muted/30 transition-colors"
                    >
                      <div className={`rounded-lg p-2 shrink-0 ${sevIconWrap[a.sev]}`}>
                        <Icon className="size-4" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground truncate">
                            {a.titulo}
                          </span>
                          <span
                            className={`hidden sm:inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${sevIconWrap[a.sev]}`}
                          >
                            {sevLabel[a.sev]}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                          {a.contexto}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Link
                          href={a.href}
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:bg-primary/10 rounded-md px-2.5 py-1.5 transition-colors"
                        >
                          {a.cta}
                          <ArrowRight className="size-3.5" />
                        </Link>
                        <button
                          onClick={() => resolver(a.id)}
                          title="Marcar como resolvido"
                          className="inline-flex items-center justify-center size-8 rounded-md text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors cursor-pointer"
                        >
                          <Check className="size-4 pointer-events-none" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {resolvidos.length > 0 && (
                  <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                    <span>{resolvidos.length} resolvida(s) nesta sessão</span>
                    <button
                      onClick={reabrir}
                      className="inline-flex items-center gap-1.5 font-medium text-primary hover:bg-primary/10 rounded-md px-2 py-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="size-3.5" />
                      Desfazer
                    </button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Agenda da semana */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Acontece esta semana
            </CardTitle>
            <CardDescription>Realizações que viram honorário</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 pt-1">
            {agenda.map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col items-center justify-center rounded-md bg-muted/60 px-2 py-1 shrink-0 w-12">
                  <CalendarClock className="size-3 text-muted-foreground mb-0.5" />
                  <span className="text-[10px] font-semibold text-foreground tabular-nums">
                    {ev.data}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-medium text-foreground truncate">
                    {ev.tipo}
                  </span>
                  <span className="text-[11px] text-muted-foreground truncate">
                    {ev.cliente}
                  </span>
                </div>
                <span className="text-xs font-semibold text-foreground tabular-nums shrink-0">
                  {ev.valor}
                </span>
              </div>
            ))}
            <Link
              href="/controladoria/saida"
              className="mt-2 inline-flex items-center justify-center gap-1 text-xs font-medium text-primary hover:bg-primary/10 rounded-md px-2 py-2 transition-colors"
            >
              Ver todas as saídas
              <ArrowUpRight className="size-3.5" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
