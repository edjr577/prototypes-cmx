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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDemoFeedback } from "@/components/ui/demo-feedback";
import { useMetas, statusOf } from "../metas-context";
import { ProdutividadeTab, PontualidadeTab } from "./taskscore-views";
import {
  RefreshCw,
  Download,
  Award,
  CheckCheck,
  AlertTriangle,
  Users,
  RotateCcw,
  ArrowUpRight,
  Target,
  Trophy,
  Clock,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

// --- MOCK DATA ---
const kpis = [
  {
    label: "Tarefas concluídas · mês",
    value: "358",
    sub: "+12% vs mês anterior",
    status: "ok" as const,
    metaId: "",
    icon: CheckCheck,
    color: "text-emerald-500",
  },
  {
    label: "Prazos vencidos",
    value: "12",
    sub: "8 em risco · meta 0",
    status: "critico" as const,
    metaId: "prazos_vencidos",
    icon: AlertTriangle,
    color: "text-rose-500",
  },
  {
    label: "Carga média / advogado",
    value: "23",
    sub: "Processos + tarefas abertas",
    status: "ok" as const,
    metaId: "",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Retrabalho",
    value: "4%",
    sub: "Meta: < 5%",
    status: "ok" as const,
    metaId: "retrabalho",
    icon: RotateCcw,
    color: "text-indigo-500",
  },
];

const sevDot: Record<"ok" | "atencao" | "critico", string> = {
  ok: "bg-emerald-500",
  atencao: "bg-amber-500",
  critico: "bg-rose-500",
};

// Scorecard de qualidade (hero body) — todos em %
const qualidade = [
  { label: "Decisões favoráveis", pct: 88, color: "oklch(0.78 0.08 145)" },
  { label: "Prazos no prazo (SLA)", pct: 92, color: "oklch(0.75 0.08 240)" },
  { label: "Entregas sem retrabalho", pct: 96, color: "oklch(0.72 0.07 300)" },
];

const dataProducao = [
  { sem: "23/abr", criadas: 78, concluidas: 72 },
  { sem: "30/abr", criadas: 84, concluidas: 80 },
  { sem: "07/mai", criadas: 88, concluidas: 85 },
  { sem: "14/mai", criadas: 95, concluidas: 90 },
  { sem: "21/mai", criadas: 102, concluidas: 96 },
  { sem: "28/mai", criadas: 98, concluidas: 94 },
  { sem: "04/jun", criadas: 105, concluidas: 99 },
  { sem: "11/jun", criadas: 92, concluidas: 101 },
];

const cargaAdvogado = [
  { adv: "Flávio M. Nogueira", carga: 47, color: "oklch(0.74 0.09 20)" },
  { adv: "Érica Nunes", carga: 38, color: "oklch(0.79 0.09 70)" },
  { adv: "Camila Borges", carga: 18, color: "oklch(0.78 0.08 145)" },
  { adv: "Isabelly Sarmento", carga: 14, color: "oklch(0.78 0.08 145)" },
  { adv: "Rebecca Brandão", carga: 12, color: "oklch(0.78 0.08 145)" },
  { adv: "Paula C. França", carga: 9, color: "oklch(0.78 0.08 145)" },
];

const exitoArea = [
  { area: "Cível", exito: 92 },
  { area: "Trabalhista", exito: 91 },
  { area: "Previdenciário", exito: 90 },
  { area: "Família", exito: 88 },
];

type Status = "OK" | "Atenção" | "Sobrecarga";

const time: {
  nome: string;
  iniciais: string;
  cor: string;
  area: string;
  processos: number;
  concluidas: number;
  exito: number;
  carga: number;
  status: Status;
}[] = [
  { nome: "Camila Borges", iniciais: "CB", cor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400", area: "Cível", processos: 25, concluidas: 142, exito: 94, carga: 18, status: "OK" },
  { nome: "Flávio M. A. Nogueira", iniciais: "FN", cor: "bg-rose-500/15 text-rose-600 dark:text-rose-400", area: "Previdenciário", processos: 108, concluidas: 96, exito: 91, carga: 47, status: "Sobrecarga" },
  { nome: "Érica Nunes", iniciais: "EN", cor: "bg-amber-500/15 text-amber-600 dark:text-amber-400", area: "Previdenciário", processos: 29, concluidas: 124, exito: 89, carga: 38, status: "Atenção" },
  { nome: "Rebecca Brandão", iniciais: "RB", cor: "bg-blue-500/15 text-blue-600 dark:text-blue-400", area: "Trabalhista", processos: 13, concluidas: 78, exito: 92, carga: 12, status: "OK" },
  { nome: "Paula Caravieri França", iniciais: "PF", cor: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400", area: "Trabalhista", processos: 8, concluidas: 64, exito: 90, carga: 9, status: "OK" },
  { nome: "Isabelly Sarmento", iniciais: "IS", cor: "bg-sky-500/15 text-sky-600 dark:text-sky-400", area: "Cível", processos: 8, concluidas: 51, exito: 87, carga: 14, status: "OK" },
];

const statusStyle: Record<Status, string> = {
  OK: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Atenção: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Sobrecarga: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function EquipePage() {
  const { notify, Toast } = useDemoFeedback();
  const { getMeta } = useMetas();
  const [periodo, setPeriodo] = React.useState<"mes" | "trimestre" | "ano">("trimestre");

  const periodos = [
    { id: "mes" as const, label: "Mês" },
    { id: "trimestre" as const, label: "Trimestre" },
    { id: "ano" as const, label: "Ano" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
            Equipe
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Estou entregando com qualidade e prazo?
          </h1>
          <p className="text-muted-foreground">
            Quem produziu · quem acumulou — entrega com qualidade, não só prazo
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

      {/* --- TABS: QUALIDADE · PRODUTIVIDADE · PONTUALIDADE --- */}
      <Tabs defaultValue="qualidade" className="gap-6">
        <TabsList variant="line">
          <TabsTrigger value="qualidade" className="gap-1.5">
            <Award className="size-4" /> Qualidade
          </TabsTrigger>
          <TabsTrigger value="produtividade" className="gap-1.5">
            <Trophy className="size-4" /> Produtividade
          </TabsTrigger>
          <TabsTrigger value="pontualidade" className="gap-1.5">
            <Clock className="size-4" /> Pontualidade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="qualidade" className="flex flex-col gap-6">
      {/* --- HERO + PRODUÇÃO --- */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Hero metric: taxa de êxito + scorecard de qualidade */}
        <Card className="lg:col-span-1 ring-primary/20 bg-primary/[0.03]">
          <CardContent className="px-5 py-1 flex flex-col h-full gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Taxa de êxito · trimestre
                </span>
                <div className="rounded-lg p-1.5 bg-primary/10 text-primary">
                  <Award className="size-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  88%
                </span>
                <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-500">
                  <ArrowUpRight className="size-4" />
                  3 p.p.
                </span>
              </div>
            </div>

            {/* scorecard de qualidade */}
            <div className="flex flex-col flex-1 justify-center gap-7 pt-3 border-t border-border/40">
              {qualidade.map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Produção da equipe · 8 semanas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Produção da equipe · 8 semanas
            </CardTitle>
            <CardDescription>
              Tarefas criadas vs concluídas (vazão semanal)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataProducao}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
                <XAxis
                  dataKey="sem"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "10px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "10px", fill: "var(--muted-foreground)" }}
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
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar
                  dataKey="criadas"
                  name="Criadas"
                  fill="var(--primary)"
                  fillOpacity={0.3}
                  radius={[4, 4, 0, 0]}
                  barSize={14}
                />
                <Bar
                  dataKey="concluidas"
                  name="Concluídas"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  barSize={14}
                />
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

      {/* --- CHARTS: CARGA + ÊXITO --- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Carga por advogado */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Carga por advogado · quem acumulou
            </CardTitle>
            <CardDescription>
              Processos + tarefas em aberto (vermelho = sobrecarga)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cargaAdvogado}
                layout="vertical"
                margin={{ top: 5, right: 16, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.12} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  type="category"
                  dataKey="adv"
                  axisLine={false}
                  tickLine={false}
                  width={120}
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
                <Bar dataKey="carga" name="Em aberto" radius={[0, 4, 4, 0]} barSize={22}>
                  {cargaAdvogado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Taxa de êxito por área */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Taxa de êxito por área
            </CardTitle>
            <CardDescription>Qualidade da entrega por área de atuação</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={exitoArea}
                margin={{ top: 10, right: 16, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
                <XAxis
                  dataKey="area"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[80, 100]}
                  tickFormatter={(v) => `${v}%`}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  formatter={(v) => `${Number(v)}%`}
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
                  dataKey="exito"
                  name="Êxito"
                  fill="oklch(0.78 0.08 145)"
                  radius={[4, 4, 0, 0]}
                  barSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- TABELA: TIME --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Time · produção e qualidade
          </CardTitle>
          <CardDescription>
            {time.length} advogados · concluídas no trimestre · carga em aberto
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-semibold px-4 py-2">Advogado</th>
                  <th className="text-left font-semibold px-4 py-2">Área</th>
                  <th className="text-right font-semibold px-4 py-2">Processos</th>
                  <th className="text-right font-semibold px-4 py-2">Concluídas</th>
                  <th className="text-right font-semibold px-4 py-2">Êxito</th>
                  <th className="text-right font-semibold px-4 py-2">Carga</th>
                  <th className="text-left font-semibold px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {time.map((m, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${m.cor}`}
                        >
                          {m.iniciais}
                        </span>
                        <span className="font-medium text-foreground">{m.nome}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{m.area}</td>
                    <td className="px-4 py-3 text-right text-foreground tabular-nums">
                      {m.processos}
                    </td>
                    <td className="px-4 py-3 text-right text-foreground tabular-nums">
                      {m.concluidas}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">
                      {m.exito}%
                    </td>
                    <td className="px-4 py-3 text-right text-foreground tabular-nums">
                      {m.carga}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${statusStyle[m.status]}`}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="produtividade" className="flex flex-col gap-6">
          <ProdutividadeTab />
        </TabsContent>

        <TabsContent value="pontualidade" className="flex flex-col gap-6">
          <PontualidadeTab />
        </TabsContent>
      </Tabs>

      {Toast}
    </div>
  );
}
