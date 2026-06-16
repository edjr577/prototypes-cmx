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
  Coins,
  Award,
  Landmark,
  Handshake,
  CalendarClock,
  ArrowUpRight,
  Target,
} from "lucide-react";
import {
  ResponsiveContainer,
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
    label: "Benefícios concedidos",
    value: "23",
    sub: "+6 vs mês anterior",
    status: "ok" as const,
    metaId: "beneficios_concedidos",
    icon: Award,
    color: "text-emerald-500",
  },
  {
    label: "RPVs a expedir",
    value: "R$ 412k",
    sub: "18 ofícios aguardando expedição",
    status: "atencao" as const,
    metaId: "",
    icon: Landmark,
    color: "text-blue-500",
  },
  {
    label: "Acordos firmados",
    value: "9",
    sub: "R$ 96k em honorário",
    status: "ok" as const,
    metaId: "",
    icon: Handshake,
    color: "text-amber-500",
  },
  {
    label: "Honorário previsto · 30d",
    value: "R$ 540k",
    sub: "Pipeline de realização",
    status: "ok" as const,
    metaId: "honorario_realizado",
    icon: CalendarClock,
    color: "text-indigo-500",
  },
];

const sevDot: Record<"ok" | "atencao" | "critico", string> = {
  ok: "bg-emerald-500",
  atencao: "bg-amber-500",
  critico: "bg-rose-500",
};

const dataSemanas = [
  { semana: "16/jun", valor: 184000, atual: true },
  { semana: "23/jun", valor: 142000, atual: false },
  { semana: "30/jun", valor: 98000, atual: false },
  { semana: "07/jul", valor: 116000, atual: false },
  { semana: "14/jul", valor: 88000, atual: false },
  { semana: "21/jul", valor: 132000, atual: false },
  { semana: "28/jul", valor: 76000, atual: false },
  { semana: "04/ago", valor: 104000, atual: false },
];

const dataTipo = [
  { name: "Benefícios", value: 48, color: "oklch(0.78 0.08 145)" },
  { name: "RPVs", value: 34, color: "oklch(0.75 0.08 240)" },
  { name: "Acordos", value: 18, color: "oklch(0.79 0.09 70)" },
];

const breakdownSemana = [
  { label: "Benefícios", eventos: 6, valor: 88000, pct: 48, color: "oklch(0.78 0.08 145)" },
  { label: "RPVs", eventos: 4, valor: 62000, pct: 34, color: "oklch(0.75 0.08 240)" },
  { label: "Acordos", eventos: 2, valor: 34000, pct: 18, color: "oklch(0.79 0.09 70)" },
];

const dataArea = [
  { area: "Previdenciário", valor: 320000 },
  { area: "Trabalhista", valor: 124000 },
  { area: "Cível", valor: 68000 },
  { area: "Família", valor: 28000 },
];

type Status =
  | "Concedido"
  | "Homologado"
  | "Aguardando expedição"
  | "Aguardando homologação"
  | "Em cálculo";

const realizacoesSemana: {
  cliente: string;
  tipo: "Benefício" | "RPV" | "Acordo";
  detalhe: string;
  honorario: number;
  data: string;
  status: Status;
}[] = [
  { cliente: "Maria S. dos Santos", tipo: "Benefício", detalhe: "Aposentadoria por idade", honorario: 18400, data: "17/jun", status: "Concedido" },
  { cliente: "João R. de Azevedo", tipo: "RPV", detalhe: "Ofício requisitório", honorario: 24100, data: "18/jun", status: "Aguardando expedição" },
  { cliente: "Condomínio Angra Shopping", tipo: "Acordo", detalhe: "Ação cível", honorario: 12800, data: "18/jun", status: "Homologado" },
  { cliente: "Benildo da Silva Ramos", tipo: "Benefício", detalhe: "Auxílio por incapacidade", honorario: 9600, data: "19/jun", status: "Concedido" },
  { cliente: "Ancra Hotelaria Ltda", tipo: "Acordo", detalhe: "Reclamatória trabalhista", honorario: 15200, data: "20/jun", status: "Aguardando homologação" },
  { cliente: "Eliana P. dos Santos", tipo: "RPV", detalhe: "Ofício requisitório", honorario: 11300, data: "20/jun", status: "Em cálculo" },
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

const statusStyle: Record<Status, string> = {
  Concedido: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Homologado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Aguardando expedição": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Aguardando homologação": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Em cálculo": "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

const tipoStyle: Record<string, string> = {
  Benefício: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  RPV: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Acordo: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export default function SaidaPage() {
  const { notify, Toast } = useDemoFeedback();
  const { getMeta } = useMetas();
  const [periodo, setPeriodo] = React.useState<"semana" | "mes" | "trimestre">("semana");

  const periodos = [
    { id: "semana" as const, label: "Semana" },
    { id: "mes" as const, label: "Mês" },
    { id: "trimestre" as const, label: "Trimestre" },
  ];

  const honorarioSemana = 184000;
  const totalSemana = realizacoesSemana.reduce((s, r) => s + r.honorario, 0);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
            Saída
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            O que vai virar honorário?
          </h1>
          <p className="text-muted-foreground">
            Benefícios, RPVs e acordos — resultados que se convertem em honorário
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
            <option value="">Todos os tipos</option>
            <option value="beneficio">Benefícios</option>
            <option value="rpv">RPVs</option>
            <option value="acordo">Acordos</option>
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
        {/* Hero metric */}
        <Card className="lg:col-span-1 ring-primary/20 bg-primary/[0.03]">
          <CardContent className="px-5 py-1 flex flex-col h-full gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Honorário previsto · próx. 7 dias
                </span>
                <div className="rounded-lg p-1.5 bg-primary/10 text-primary">
                  <Coins className="size-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {formatCompact(honorarioSemana)}
                </span>
                <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-500">
                  <ArrowUpRight className="size-4" />
                  12%
                </span>
              </div>
            </div>

            {/* breakdown da semana — composição */}
            <div className="flex flex-col flex-1 justify-center gap-7 pt-3 border-t border-border/40">
              {breakdownSemana.map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {item.eventos}
                      </span>{" "}
                      · {formatCompact(item.valor)}
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

        {/* Honorário a realizar · próximas 8 semanas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Honorário a realizar · próximas 8 semanas
            </CardTitle>
            <CardDescription>
              Pipeline de realização por semana (destaque = semana atual)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataSemanas}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
                <XAxis
                  dataKey="semana"
                  axisLine={false}
                  tickLine={false}
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
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "var(--primary)" }}
                />
                <Bar dataKey="valor" name="Honorário" radius={[4, 4, 0, 0]} barSize={34}>
                  {dataSemanas.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.atual ? "var(--primary)" : "var(--primary)"}
                      fillOpacity={entry.atual ? 1 : 0.35}
                    />
                  ))}
                </Bar>
              </BarChart>
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

      {/* --- CHARTS: TIPO + ÁREA --- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Composição por tipo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Composição por tipo de saída
            </CardTitle>
            <CardDescription>
              Participação no honorário previsto (% do total)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataTipo}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {dataTipo.map((entry, index) => (
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

        {/* Saídas por área */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Honorário por área de atuação
            </CardTitle>
            <CardDescription>Valor previsto a realizar por área</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataArea}
                layout="vertical"
                margin={{ top: 5, right: 16, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.12} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1000}k`}
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
                  formatter={(v: number) => formatBRL(v)}
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
                  dataKey="valor"
                  name="Honorário"
                  fill="oklch(0.78 0.08 145)"
                  radius={[0, 4, 4, 0]}
                  barSize={26}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- TABELA: REALIZAÇÕES DA SEMANA --- */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Realizações previstas · esta semana
              </CardTitle>
              <CardDescription>
                {realizacoesSemana.length} eventos · {formatBRL(totalSemana)} em
                honorário estimado
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-semibold px-4 py-2">Cliente</th>
                  <th className="text-left font-semibold px-4 py-2">Tipo</th>
                  <th className="text-right font-semibold px-4 py-2">Honorário</th>
                  <th className="text-center font-semibold px-4 py-2">Data</th>
                  <th className="text-left font-semibold px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {realizacoesSemana.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{r.cliente}</div>
                      <div className="text-xs text-muted-foreground">{r.detalhe}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tipoStyle[r.tipo]}`}
                      >
                        {r.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">
                      {formatBRL(r.honorario)}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground tabular-nums">
                      {r.data}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${statusStyle[r.status]}`}
                      >
                        {r.status}
                      </span>
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
