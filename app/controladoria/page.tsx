"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Scale,
  Award,
  CheckSquare,
  FileCheck,
  Clock,
  FileText,
  AlertTriangle,
  DollarSign,
  Activity,
  Calendar as CalendarIcon,
  Play
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
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// --- MOCK DATA ---
const stats = [
  { label: "Varreduras (Ciclos CRON)", value: "842.100", change: "+12.4% vs mês anterior", icon: RefreshCw, color: "text-blue-500" },
  { label: "Processos Monitorados", value: "14.850", change: "Em 92 diários oficiais", icon: Scale, color: "text-indigo-500" },
  { label: "Confiança Média da IA", value: "92.4%", change: "Meta da operação: >90%", icon: Award, color: "text-emerald-500" },
  { label: "Tarefas Automáticas Criadas", value: "124.030", change: "100% de alta confiança", icon: CheckSquare, color: "text-teal-500" },
  { label: "Fila de Revisão Humana", value: "142", change: "-18% vs ontem (baixa confiança)", icon: FileCheck, color: "text-amber-500" },
  { label: "Tempo Médio por Ciclo", value: "1m 15s", change: "Meta de SLA: < 2m 00s", icon: Clock, color: "text-sky-500" },
  { label: "Diários Oficiais Ativos", value: "92", change: "+4 homologados esta semana", icon: FileText, color: "text-purple-500" },
  { label: "Erros de OCR / Captura", value: "0.14%", change: "-0.05% de melhora residual", icon: AlertTriangle, color: "text-rose-500" },
  { label: "Custo Médio por Consulta", value: "R$ 0,08", change: "Meta de economia: < R$ 0,10", icon: DollarSign, color: "text-cyan-500" },
  { label: "Varreduras Hoje", value: "24/24", change: "Todos os ciclos executados OK", icon: Activity, color: "text-yellow-500" },
];

const dataVolumeVarreduras = [
  { hora: "00:00", volume: 12000 },
  { hora: "04:00", volume: 18000 },
  { hora: "08:00", volume: 68000 },
  { hora: "12:00", volume: 95000 },
  { hora: "16:00", volume: 112000 },
  { hora: "20:00", volume: 45000 },
];

const dataConfiancaStatus = [
  { date: "Seg", Automático: 15400, Revisao: 1200 },
  { date: "Ter", Automático: 18200, Revisao: 980 },
  { date: "Qua", Automático: 17100, Revisao: 1150 },
  { date: "Qui", Automático: 19800, Revisao: 850 },
  { date: "Sex", Automático: 22400, Revisao: 740 },
  { date: "Sáb", Automático: 8900, Revisao: 450 },
  { date: "Dom", Automático: 4500, Revisao: 210 },
];

const dataVolumeCrawlers = [
  { name: "Crawler-TJSP", total: 420000 },
  { name: "Crawler-TRT2", total: 240000 },
  { name: "Crawler-TRF3", total: 110000 },
  { name: "Crawler-TJRJ", total: 95000 },
  { name: "Crawler-STJ", total: 32000 },
];

const dataAcuraciaTribunal = [
  { tribunal: "TJSP", acuracia: 94.2 },
  { tribunal: "TRT2", acuracia: 95.8 },
  { tribunal: "TRF3", acuracia: 89.4 },
  { tribunal: "TJRJ", acuracia: 91.2 },
  { tribunal: "STJ", acuracia: 98.5 },
];

const dataRevisaoSetor = [
  { name: "Cível", value: 65, color: "oklch(0.75 0.08 240)" }, // Soft Blue
  { name: "Trabalhista", value: 42, color: "oklch(0.78 0.08 145)" }, // Soft Emerald
  { name: "Previdenciário", value: 20, color: "oklch(0.79 0.09 70)" }, // Soft Amber
  { name: "Tributário", value: 15, color: "oklch(0.74 0.09 20)" }, // Soft Red/Rose
];

export default function ControladoriaPage() {
  const [startDate, setStartDate] = React.useState<Date>(new Date(2026, 4, 21)); // May 21, 2026
  const [endDate, setEndDate] = React.useState<Date>(new Date(2026, 4, 27));   // May 27, 2026
  const [showStartCalendar, setShowStartCalendar] = React.useState<boolean>(false);
  const [showEndCalendar, setShowEndCalendar] = React.useState<boolean>(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard da Controladoria Operacional</h1>
        <p className="text-muted-foreground">
          Logs de execução de robôs coletores (CRONs), confiança da IA e filas de revisão de prazos
        </p>
      </div>

      {/* --- FILTERS & ACTIONS SECTION --- */}
      <div className="flex flex-col lg:flex-row items-center gap-4 w-full !overflow-visible">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-1 w-full">
          {/* Dt Inicio */}
          <div className="relative">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => {
                  setShowStartCalendar(!showStartCalendar);
                  setShowEndCalendar(false);
                }}
                className="w-full justify-start text-left font-normal h-9 bg-background/50 border-input/60 px-3 cursor-pointer"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground/60" />
                <span>Início: {formatDate(startDate)}</span>
              </Button>
              
              {showStartCalendar && (
                <div className="absolute top-11 left-0 z-50 p-3 rounded-lg border border-border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-50 slide-in-from-top-1 w-64">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                    <span className="text-xs font-semibold">Maio de 2026</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground mb-1">
                    <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const day = i + 1;
                      const isSelected = startDate.getDate() === day && startDate.getMonth() === 4;
                      return (
                        <button
                          key={`day-${day}`}
                          type="button"
                          onClick={() => {
                            setStartDate(new Date(2026, 4, day));
                            setShowStartCalendar(false);
                          }}
                          className={`size-7 text-xs rounded-md flex items-center justify-center transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                            isSelected ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground" : ""
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dt Fim */}
          <div className="relative">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEndCalendar(!showEndCalendar);
                  setShowStartCalendar(false);
                }}
                className="w-full justify-start text-left font-normal h-9 bg-background/50 border-input/60 px-3 cursor-pointer"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground/60" />
                <span>Fim: {formatDate(endDate)}</span>
              </Button>
              
              {showEndCalendar && (
                <div className="absolute top-11 left-0 z-50 p-3 rounded-lg border border-border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-50 slide-in-from-top-1 w-64">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                    <span className="text-xs font-semibold">Maio de 2026</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground mb-1">
                    <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const day = i + 1;
                      const isSelected = endDate.getDate() === day && endDate.getMonth() === 4;
                      return (
                        <button
                          key={`day-${day}`}
                          type="button"
                          onClick={() => {
                            setEndDate(new Date(2026, 4, day));
                            setShowEndCalendar(false);
                          }}
                          className={`size-7 text-xs rounded-md flex items-center justify-center transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                            isSelected ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground" : ""
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Robô Coletor */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Todos os Crawlers</option>
              <option value="tjsp" className="bg-popover text-popover-foreground">Crawler-TJSP</option>
              <option value="trt2" className="bg-popover text-popover-foreground">Crawler-TRT2</option>
              <option value="trf3" className="bg-popover text-popover-foreground">Crawler-TRF3</option>
              <option value="stj" className="bg-popover text-popover-foreground">Crawler-STJ</option>
            </select>
          </div>

          {/* Status do Ciclo */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Qualquer Status</option>
              <option value="sucesso" className="bg-popover text-popover-foreground">Sucesso (Automático)</option>
              <option value="revisao" className="bg-popover text-popover-foreground">Aviso / Baixa Confiança</option>
              <option value="falha" className="bg-popover text-popover-foreground">Falha Crítica (OCR)</option>
            </select>
          </div>

          {/* Tipo de Execução */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Todos os Ciclos</option>
              <option value="cron" className="bg-popover text-popover-foreground">Agendados (CRON)</option>
              <option value="manual" className="bg-popover text-popover-foreground">Trigger Manual</option>
            </select>
          </div>
        </div>

        {/* Action Trigger Buttons */}
        <div className="flex gap-2 w-full lg:w-auto">
          <Button className="h-9 gap-2 flex-1 lg:flex-none px-4 bg-primary/90 text-primary-foreground hover:bg-primary shadow-sm active:scale-95 transition-all">
            <RefreshCw className="size-4 pointer-events-none" />
            Atualizar Logs
          </Button>
          <Button variant="outline" className="h-9 gap-2 px-3 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 active:scale-95 transition-all">
            <Play className="size-4 pointer-events-none" />
            Rodar CRON
          </Button>
        </div>
      </div>

      {/* --- BIG NUMBERS SECTION --- */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </CardTitle>
                <div className={`rounded-lg p-1.5 bg-muted ${item.color}`}>
                  <Icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight text-foreground">{item.value}</div>
                <p className="mt-1 text-2xs text-muted-foreground/80">{item.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Fila de Revisão por Setor */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Fila de Revisão por Setor</CardTitle>
            <CardDescription>Extrações sob auditoria manual de baixa confiança</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataRevisaoSetor}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {dataRevisaoSetor.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Volume de Varreduras dos Robôs */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Volume por Robô (Crawler)</CardTitle>
            <CardDescription>Total de páginas e processos varridos no mês</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataVolumeCrawlers} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "var(--primary)" }}
                />
                <Bar dataKey="total" fill="oklch(0.78 0.08 145)" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Acurácia de OCR / IA por Tribunal */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Acurácia de OCR por Diário</CardTitle>
            <CardDescription>Percentual de leitura correta sem falha crítica</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataAcuraciaTribunal} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <XAxis
                  dataKey="tribunal"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[80, 100]}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "oklch(0.74 0.09 20)" }}
                />
                <Line
                  type="monotone"
                  dataKey="acuracia"
                  stroke="oklch(0.74 0.09 20)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Volume de Varreduras (Ciclos CRON por Hora) */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Volume de Execuções por Hora (CRON)</CardTitle>
            <CardDescription>Tráfego e vazão de dados dos robôs em tempo real</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataVolumeVarreduras} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="hora"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "var(--primary)" }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  name="Requisições/Hora"
                  stroke="var(--primary)"
                  strokeOpacity={0.7}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Confiança de Extração: Automático vs Revisão Humana */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Decisões: Auto (Confiança) vs Revisão</CardTitle>
            <CardDescription>Relação de validação por ciclos diários</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataConfiancaStatus} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "11px", fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Legend />
                <Bar dataKey="Automático" name="Alta Confiança" fill="oklch(0.75 0.08 240)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Revisao" name="Revisão Humana" fill="oklch(0.74 0.09 20)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
