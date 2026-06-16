"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDemoFeedback } from "@/components/ui/demo-feedback";
import { useMetas, statusOf } from "../metas-context";
import {
  RefreshCw,
  Download,
  Banknote,
  Wallet,
  HandCoins,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Send,
  Check,
  RotateCcw,
  Target,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

// --- MOCK DATA ---
const kpis = [
  {
    label: "Recebido · Junho",
    value: "R$ 231k",
    sub: "+9% vs mês anterior",
    status: "ok" as const,
    metaId: "",
    icon: Wallet,
    color: "text-emerald-500",
  },
  {
    label: "A receber (em aberto)",
    value: "R$ 410k",
    sub: "Vincendo + vencido",
    status: "atencao" as const,
    metaId: "",
    icon: HandCoins,
    color: "text-blue-500",
  },
  {
    label: "Inadimplência",
    value: "R$ 96k",
    sub: "23 clientes · meta < R$ 70k",
    status: "critico" as const,
    metaId: "inadimplencia",
    icon: AlertTriangle,
    color: "text-rose-500",
  },
  {
    label: "Prazo médio (DSO)",
    value: "38 dias",
    sub: "Meta: < 45 dias",
    status: "ok" as const,
    metaId: "dso",
    icon: Clock,
    color: "text-indigo-500",
  },
];

const sevDot: Record<"ok" | "atencao" | "critico", string> = {
  ok: "bg-emerald-500",
  atencao: "bg-amber-500",
  critico: "bg-rose-500",
};

// Cascata do dinheiro (mês), relativa ao contratado
const cascata = [
  { label: "Contratado", valor: 312000, pct: 100, color: "var(--muted-foreground)" },
  { label: "Faturado", valor: 286000, pct: 92, color: "oklch(0.75 0.08 240)" },
  { label: "Recebido", valor: 231000, pct: 74, color: "oklch(0.78 0.08 145)" },
];

const dataRecebido = [
  { mes: "Jul/25", recebido: 142000, previsto: 160000 },
  { mes: "Ago/25", recebido: 156000, previsto: 168000 },
  { mes: "Set/25", recebido: 171000, previsto: 180000 },
  { mes: "Out/25", recebido: 168000, previsto: 188000 },
  { mes: "Nov/25", recebido: 184000, previsto: 196000 },
  { mes: "Dez/25", recebido: 159000, previsto: 200000 },
  { mes: "Jan/26", recebido: 192000, previsto: 210000 },
  { mes: "Fev/26", recebido: 204000, previsto: 224000 },
  { mes: "Mar/26", recebido: 218000, previsto: 240000 },
  { mes: "Abr/26", recebido: 212000, previsto: 248000 },
  { mes: "Mai/26", recebido: 224000, previsto: 256000 },
  { mes: "Jun/26", recebido: 231000, previsto: 264000 },
];

const aging = [
  { faixa: "A vencer", valor: 314000, color: "oklch(0.78 0.08 145)" },
  { faixa: "1–30 dias", valor: 52000, color: "oklch(0.82 0.09 90)" },
  { faixa: "31–60 dias", valor: 26000, color: "oklch(0.79 0.09 70)" },
  { faixa: "60+ dias", valor: 18000, color: "oklch(0.74 0.09 20)" },
];

const dataInadimplencia = [
  { mes: "Jan", valor: 128000 },
  { mes: "Fev", valor: 116000 },
  { mes: "Mar", valor: 104000 },
  { mes: "Abr", valor: 112000 },
  { mes: "Mai", valor: 99000 },
  { mes: "Jun", valor: 96000 },
];

type Faixa = "Recente" | "Em atraso" | "Crítico";

const devedores: {
  cliente: string;
  valor: number;
  atraso: number;
  faixa: Faixa;
}[] = [
  { cliente: "João Ricardo Almeida de Azevedo", valor: 20000, atraso: 162, faixa: "Crítico" },
  { cliente: "Condomínio Angra Shopping Center", valor: 19300, atraso: 198, faixa: "Crítico" },
  { cliente: "Ancra Hotelaria Sustentável Ltda", valor: 8667, atraso: 6, faixa: "Recente" },
  { cliente: "Benildo da Silva Ramos", valor: 4984, atraso: 11, faixa: "Recente" },
  { cliente: "Vila Galé Brasil Hotelaria Ltda", valor: 4863, atraso: 6, faixa: "Recente" },
  { cliente: "Frade Spot Participações S/A", valor: 4053, atraso: 22, faixa: "Em atraso" },
  { cliente: "Reginaldo Barra", valor: 3996, atraso: 57, faixa: "Em atraso" },
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

const faixaStyle: Record<Faixa, string> = {
  Recente: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "Em atraso": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Crítico: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function FinanceiroPage() {
  const { notify, Toast } = useDemoFeedback();
  const { getMeta } = useMetas();
  const [periodo, setPeriodo] = React.useState<"mes" | "trimestre" | "ano">("mes");

  const periodos = [
    { id: "mes" as const, label: "Mês" },
    { id: "trimestre" as const, label: "Trimestre" },
    { id: "ano" as const, label: "Ano" },
  ];

  const conversao = Math.round((231000 / 312000) * 100);

  // Estado das cobranças (ações reais na lista)
  type Estado = "aberto" | "cobrado" | "pago";
  const [linhas, setLinhas] = React.useState(
    devedores.map((d) => ({ ...d, estado: "aberto" as Estado }))
  );
  const setEstado = (idx: number, estado: Estado) =>
    setLinhas((prev) => prev.map((l, i) => (i === idx ? { ...l, estado } : l)));

  const abertos = linhas.filter((l) => l.estado !== "pago");
  const totalAberto = abertos.reduce((s, d) => s + d.valor, 0);
  const recuperados = linhas.filter((l) => l.estado === "pago");
  const totalRecuperado = recuperados.reduce((s, d) => s + d.valor, 0);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
            Financeiro
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Estou convertendo contratos em caixa?
          </h1>
          <p className="text-muted-foreground">
            Quem pagou · previsão · atraso — do contrato assinado ao caixa recebido
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
              notify(`Filtro: ${e.target.options[e.target.selectedIndex].text}`)
            }
            className="h-9 rounded-lg border border-border bg-background hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Todos os clientes</option>
            <option value="pf">Pessoa física</option>
            <option value="pj">Pessoa jurídica</option>
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

      {/* --- HERO + TIMELINE --- */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Hero metric: conversão + cascata */}
        <Card className="lg:col-span-1 ring-primary/20 bg-primary/[0.03]">
          <CardContent className="px-5 py-1 flex flex-col h-full gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Conversão em caixa · Junho
                </span>
                <div className="rounded-lg p-1.5 bg-primary/10 text-primary">
                  <Banknote className="size-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {conversao}%
                </span>
                <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-500">
                  <ArrowUpRight className="size-4" />
                  4 p.p.
                </span>
              </div>
            </div>

            {/* cascata do dinheiro */}
            <div className="flex flex-col flex-1 justify-center gap-7 pt-3 border-t border-border/40">
              {cascata.map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {formatCompact(item.valor)}
                      </span>{" "}
                      · {item.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.pct}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recebido vs Previsto · 12 meses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Recebido vs previsto · 12 meses
            </CardTitle>
            <CardDescription>
              Entradas de caixa por mês (linha tracejada = previsto)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dataRecebido}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRecebido" x1="0" y1="0" x2="0" y2="1">
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
                  formatter={(v) => formatBRL(Number(v))}
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
                  dataKey="previsto"
                  name="Previsto"
                  stroke="var(--muted-foreground)"
                  strokeOpacity={0.5}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                />
                <Area
                  type="monotone"
                  dataKey="recebido"
                  name="Recebido"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#colorRecebido)"
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
          const status = item.metaId
            ? statusOf(getMeta(item.metaId)!, "mes")
            : item.status;
          return (
            <Card key={item.label} className="overflow-hidden">
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`size-2 rounded-full shrink-0 ${sevDot[status]}`}
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
                <div className="text-xs text-muted-foreground/80">{item.sub}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* --- CHARTS: AGING + INADIMPLÊNCIA --- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Aging de recebíveis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Aging de recebíveis
            </CardTitle>
            <CardDescription>
              Valor em aberto por faixa de vencimento
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={aging}
                margin={{ top: 10, right: 16, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
                <XAxis
                  dataKey="faixa"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1000}k`}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  formatter={(v) => formatBRL(Number(v))}
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="valor" name="Em aberto" radius={[4, 4, 0, 0]} barSize={48}>
                  {aging.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inadimplência · 6 meses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Inadimplência · 6 meses
            </CardTitle>
            <CardDescription>Evolução do valor vencido em aberto</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dataInadimplencia}
                margin={{ top: 10, right: 16, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
                <XAxis
                  dataKey="mes"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1000}k`}
                  domain={[80000, 140000]}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  formatter={(v) => formatBRL(Number(v))}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "oklch(0.74 0.09 20)" }}
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  name="Inadimplência"
                  stroke="oklch(0.74 0.09 20)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- TABELA: INADIMPLENTES EM ABERTO --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Inadimplentes em aberto
          </CardTitle>
          <CardDescription>
            {abertos.length} maiores devedores · {formatBRL(totalAberto)} de R$ 96k
            em aberto (23 clientes)
            {recuperados.length > 0 && (
              <span className="text-emerald-600 dark:text-emerald-400">
                {" "}
                · {formatBRL(totalRecuperado)} recuperado
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-semibold px-4 py-2">Cliente</th>
                  <th className="text-right font-semibold px-4 py-2">Valor em aberto</th>
                  <th className="text-center font-semibold px-4 py-2">Atraso</th>
                  <th className="text-left font-semibold px-4 py-2">Status</th>
                  <th className="text-right font-semibold px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((l, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border/40 last:border-0 transition-colors ${
                      l.estado === "pago" ? "bg-emerald-500/[0.04]" : "hover:bg-muted/30"
                    }`}
                  >
                    <td
                      className={`px-4 py-3 font-medium ${
                        l.estado === "pago"
                          ? "text-muted-foreground/60"
                          : "text-foreground"
                      }`}
                    >
                      {l.cliente}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-semibold tabular-nums ${
                        l.estado === "pago"
                          ? "text-muted-foreground/50 line-through"
                          : "text-foreground"
                      }`}
                    >
                      {formatBRL(l.valor)}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground tabular-nums">
                      {l.atraso}d
                    </td>
                    <td className="px-4 py-3">
                      {l.estado === "pago" ? (
                        <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          Pago
                        </span>
                      ) : l.estado === "cobrado" ? (
                        <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400">
                          Cobrança enviada
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${faixaStyle[l.faixa]}`}
                        >
                          {l.faixa}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {l.estado === "pago" ? (
                          <button
                            onClick={() => setEstado(i, "aberto")}
                            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md px-2 py-1 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="size-3.5 pointer-events-none" />
                            Desfazer
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => setEstado(i, "cobrado")}
                              disabled={l.estado === "cobrado"}
                              className={`inline-flex items-center gap-1 text-xs font-medium rounded-md px-2 py-1 transition-colors ${
                                l.estado === "cobrado"
                                  ? "text-muted-foreground/50 cursor-default"
                                  : "text-primary hover:bg-primary/10 cursor-pointer"
                              }`}
                            >
                              <Send className="size-3.5 pointer-events-none" />
                              {l.estado === "cobrado" ? "Cobrado" : "Cobrar"}
                            </button>
                            <button
                              onClick={() => setEstado(i, "pago")}
                              title="Marcar como pago"
                              className="inline-flex items-center justify-center size-7 rounded-md text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors cursor-pointer"
                            >
                              <Check className="size-4 pointer-events-none" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {Toast}
    </div>
  );
}
