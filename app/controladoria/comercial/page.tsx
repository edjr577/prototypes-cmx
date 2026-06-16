"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDemoFeedback } from "@/components/ui/demo-feedback";
import { useMetas } from "../metas-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  RefreshCw,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// --- MOCK DATA ---
const kpis = [
  {
    label: "Novos contratos",
    value: "28",
    change: "+5 vs anterior · meta 30",
    trend: "up" as const,
    status: "atencao" as const,
    icon: Briefcase,
    color: "text-blue-500",
  },
  {
    label: "Ticket médio",
    value: "R$ 11,1k",
    change: "+3,2% · meta R$ 10k",
    trend: "up" as const,
    status: "ok" as const,
    icon: DollarSign,
    color: "text-emerald-500",
  },
  {
    label: "Taxa de fechamento",
    value: "37%",
    change: "Proposta → contrato · meta 35%",
    trend: "up" as const,
    status: "ok" as const,
    icon: Target,
    color: "text-indigo-500",
  },
  {
    label: "Pipeline aberto",
    value: "R$ 1,24M",
    change: "76 propostas em aberto",
    trend: "neutral" as const,
    status: "ok" as const,
    icon: Users,
    color: "text-amber-500",
  },
];

const sevDot: Record<"ok" | "atencao" | "critico", string> = {
  ok: "bg-emerald-500",
  atencao: "bg-amber-500",
  critico: "bg-rose-500",
};

const dataReceitaContratada = [
  { mes: "Jul/25", valor: 168000, meta: 200000 },
  { mes: "Ago/25", valor: 184000, meta: 200000 },
  { mes: "Set/25", valor: 205000, meta: 220000 },
  { mes: "Out/25", valor: 221000, meta: 240000 },
  { mes: "Nov/25", valor: 198000, meta: 240000 },
  { mes: "Dez/25", valor: 176000, meta: 240000 },
  { mes: "Jan/26", valor: 232000, meta: 260000 },
  { mes: "Fev/26", valor: 248000, meta: 280000 },
  { mes: "Mar/26", valor: 271000, meta: 300000 },
  { mes: "Abr/26", valor: 264000, meta: 320000 },
  { mes: "Mai/26", valor: 289000, meta: 340000 },
  { mes: "Jun/26", valor: 312000, meta: 350000 },
];

const funil = [
  { etapa: "Leads", valor: 320, color: "oklch(0.75 0.08 240)" },
  { etapa: "Qualificados", valor: 148, color: "oklch(0.74 0.10 200)" },
  { etapa: "Propostas", valor: 76, color: "oklch(0.78 0.08 145)" },
  { etapa: "Contratos", valor: 28, color: "oklch(0.79 0.09 70)" },
];

const dataOrigem = [
  { name: "Indicação", value: 42, color: "oklch(0.75 0.08 240)" },
  { name: "Orgânico (Google)", value: 23, color: "oklch(0.78 0.08 145)" },
  { name: "Tráfego pago", value: 18, color: "oklch(0.79 0.09 70)" },
  { name: "Redes sociais", value: 11, color: "oklch(0.74 0.09 20)" },
  { name: "Parcerias", value: 6, color: "oklch(0.72 0.07 300)" },
];

const dataMixArea = [
  { area: "Previdenciário", contratos: 14 },
  { area: "Cível", contratos: 7 },
  { area: "Trabalhista", contratos: 5 },
  { area: "Família", contratos: 2 },
];

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

// Abreviado (k/M) para heros e cards; tabelas usam formatBRL cheio
const formatCompact = (v: number) =>
  Math.abs(v) >= 1_000_000
    ? `R$ ${(v / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}M`
    : Math.abs(v) >= 1_000
    ? `R$ ${Math.round(v / 1000)}k`
    : formatBRL(v);

export default function ComercialPage() {
  const { notify, Toast } = useDemoFeedback();
  const [periodo, setPeriodo] = React.useState<"mes" | "trimestre" | "ano">("mes");

  const periodos = [
    { id: "mes" as const, label: "Mês" },
    { id: "trimestre" as const, label: "Trimestre" },
    { id: "ano" as const, label: "Ano" },
  ];

  // Metas vêm do contexto central (tela Planejamento › Metas)
  const { getMeta, setMetaValor } = useMetas();
  const receita = getMeta("receita_contratada")!;
  const realizadoMes = receita.realizado.mes;
  const metaMes = receita.meta.mes;
  const pctMeta = Math.round((realizadoMes / metaMes) * 100);
  const funilMax = funil[0].valor;

  // --- Modal "Definir meta" (edição rápida, escreve no mesmo contexto) ---
  const [metaModalOpen, setMetaModalOpen] = React.useState(false);
  const [formTipo, setFormTipo] = React.useState("receita");
  const [formPeriodo, setFormPeriodo] = React.useState("Jun/26");
  const [formValor, setFormValor] = React.useState(String(metaMes));

  const handleSalvarMeta = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number(formValor);
    if (formTipo === "receita" && Number.isFinite(parsed) && parsed > 0) {
      setMetaValor("receita_contratada", "mes", parsed);
    }
    setMetaModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
            Comercial
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Estou vendendo bem?
          </h1>
          <p className="text-muted-foreground">
            O que está entrando de cliente novo — captação, pipeline e conversão
          </p>
        </div>

        {/* --- FILTERS & ACTIONS --- */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
            {periodos.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPeriodo(p.id);
                  notify(`Período alterado para ${p.label}`);
                }}
                className={`px-3 h-8 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  periodo === p.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <select
            onChange={(e) =>
              notify(
                `Filtro: ${e.target.options[e.target.selectedIndex].text}`
              )
            }
            className="h-9 rounded-lg border border-border bg-background hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Todas as áreas</option>
            <option value="prev">Previdenciário</option>
            <option value="civel">Cível</option>
            <option value="trab">Trabalhista</option>
            <option value="familia">Família</option>
          </select>
          <Button
            variant="outline"
            onClick={() => notify("Exportação iniciada — você receberá o arquivo")}
            className="h-9 gap-2 px-3 active:scale-95 transition-all"
          >
            <Download className="size-4 pointer-events-none" />
            Exportar
          </Button>
          <Button
            onClick={() => notify("Dados atualizados agora")}
            className="h-9 gap-2 px-4 bg-primary/90 text-primary-foreground hover:bg-primary shadow-sm active:scale-95 transition-all"
          >
            <RefreshCw className="size-4 pointer-events-none" />
            Atualizar
          </Button>
          <Link
            href="/controladoria/metas"
            className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            <Target className="size-3.5" />
            Ajustar metas
          </Link>
        </div>
      </div>

      {/* --- HERO + KPIs --- */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Hero metric */}
        <Card className="lg:col-span-1 ring-primary/20 bg-primary/[0.03]">
          <CardContent className="px-5 py-1 flex flex-col h-full justify-between gap-5">
            {/* Topo: número-herói */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Receita contratada · Junho
                </span>
                <div className="rounded-lg p-1.5 bg-primary/10 text-primary">
                  <TrendingUp className="size-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {formatCompact(realizadoMes)}
                </span>
                <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-500">
                  <ArrowUpRight className="size-4" />
                  18%
                </span>
              </div>
            </div>

            {/* Base: meta + progresso + ação */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Meta do mês: {formatCompact(metaMes)}
                </span>
                <span className="font-semibold text-foreground">{pctMeta}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min(pctMeta, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between pt-0.5">
                {realizadoMes < metaMes ? (
                  <span className="text-[11px] text-muted-foreground/80">
                    Faltam {formatCompact(metaMes - realizadoMes)} para a meta
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-emerald-500">
                    Meta superada em {formatCompact(realizadoMes - metaMes)}
                  </span>
                )}
                <button
                  onClick={() => {
                    setFormValor(String(metaMes));
                    setMetaModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-md px-2 py-1 -mr-1 transition-colors cursor-pointer"
                >
                  <Target className="size-3.5 pointer-events-none" />
                  Definir meta
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receita contratada · 12 meses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Receita contratada · 12 meses
            </CardTitle>
            <CardDescription>
              Valor de novos contratos fechados por mês (linha tracejada = meta)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dataReceitaContratada}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
                <XAxis
                  dataKey="mes"
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                  style={{ fontSize: "10px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1000}k`}
                  style={{ fontSize: "10px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  formatter={(v: number) => formatBRL(v)}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "var(--primary)" }}
                />
                <Area
                  type="monotone"
                  dataKey="meta"
                  name="Meta"
                  stroke="var(--muted-foreground)"
                  strokeOpacity={0.5}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                />
                <Area
                  type="monotone"
                  dataKey="valor"
                  name="Contratado"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#colorReceita)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- KPI ROW --- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;
          const TrendIcon = item.trend === "down" ? ArrowDownRight : ArrowUpRight;
          return (
            <Card key={item.label} className="overflow-hidden">
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`size-2 rounded-full shrink-0 ${sevDot[item.status]}`}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground truncate">
                      {item.label}
                    </span>
                  </div>
                  <div className={`rounded-lg p-1.5 bg-muted ${item.color}`}>
                    <Icon className="size-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  {item.value}
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    item.trend === "up"
                      ? "text-emerald-500"
                      : item.trend === "down"
                      ? "text-rose-500"
                      : "text-muted-foreground/80"
                  }`}
                >
                  {item.trend !== "neutral" && <TrendIcon className="size-3" />}
                  <span>{item.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Funil de captação */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Funil de captação
            </CardTitle>
            <CardDescription>Do lead ao contrato fechado · junho</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pt-1">
            {funil.map((stage, i) => {
              const widthPct = (stage.valor / funilMax) * 100;
              const convPct =
                i === 0
                  ? null
                  : Math.round((stage.valor / funil[i - 1].valor) * 100);
              return (
                <div key={stage.etapa} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">
                      {stage.etapa}
                    </span>
                    <span className="text-muted-foreground">
                      {stage.valor.toLocaleString("pt-BR")}
                      {convPct !== null && (
                        <span className="ml-1.5 text-muted-foreground/60">
                          ({convPct}%)
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="h-7 w-full rounded-md bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-md transition-all flex items-center"
                      style={{ width: `${widthPct}%`, backgroundColor: stage.color }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="mt-1 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Conversão total</span>
              <span className="font-semibold text-foreground">
                {Math.round((funil[3].valor / funil[0].valor) * 100)}% (lead →
                contrato)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Origem dos contratos */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Origem dos contratos
            </CardTitle>
            <CardDescription>De onde vem o cliente novo (% do total)</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataOrigem}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {dataOrigem.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => `${v}%`}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mix por área */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Novos contratos por área
            </CardTitle>
            <CardDescription>Mix de captação por área de atuação</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataMixArea}
                layout="vertical"
                margin={{ top: 5, right: 16, left: 10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  opacity={0.12}
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  type="category"
                  dataKey="area"
                  axisLine={false}
                  tickLine={false}
                  width={90}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar
                  dataKey="contratos"
                  name="Contratos"
                  fill="oklch(0.75 0.08 240)"
                  radius={[0, 4, 4, 0]}
                  barSize={26}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- MODAL: DEFINIR META --- */}
      <Dialog open={metaModalOpen} onOpenChange={setMetaModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Definir meta</DialogTitle>
            <DialogDescription>
              Configure a meta do período para acompanhar o realizado no painel.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSalvarMeta} className="flex flex-col gap-4">
            {/* Tipo de meta */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground/80">
                Tipo de meta
              </label>
              <select
                value={formTipo}
                onChange={(e) => setFormTipo(e.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="receita">Receita contratada (R$)</option>
                <option value="contratos">Novos contratos (qtd.)</option>
              </select>
            </div>

            {/* Período */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground/80">
                Período
              </label>
              <select
                value={formPeriodo}
                onChange={(e) => setFormPeriodo(e.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {dataReceitaContratada.map((d) => (
                  <option key={d.mes} value={d.mes}>
                    {d.mes}
                  </option>
                ))}
              </select>
            </div>

            {/* Valor */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground/80">
                {formTipo === "receita" ? "Valor da meta" : "Quantidade da meta"}
              </label>
              <div className="relative">
                {formTipo === "receita" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    R$
                  </span>
                )}
                <input
                  type="number"
                  min={0}
                  value={formValor}
                  onChange={(e) => setFormValor(e.target.value)}
                  placeholder={formTipo === "receita" ? "350000" : "30"}
                  className={`h-9 w-full rounded-lg border border-border bg-background dark:border-input dark:bg-input/30 ${
                    formTipo === "receita" ? "pl-9 pr-3" : "px-3"
                  } text-sm text-foreground transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`}
                />
              </div>
              {formTipo === "receita" && (
                <p className="text-[11px] text-muted-foreground/70">
                  Realizado atual em {formPeriodo}: {formatBRL(realizadoMes)}
                </p>
              )}
            </div>

            <DialogFooter>
              <DialogClose
                render={
                  <Button type="button" variant="outline" className="h-9 px-4">
                    Cancelar
                  </Button>
                }
              />
              <Button
                type="submit"
                className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Salvar meta
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {Toast}
    </div>
  );
}
