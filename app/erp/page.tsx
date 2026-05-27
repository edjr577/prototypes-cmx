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
  Scale,
  Clock,
  Bell,
  Gavel,
  DollarSign,
  Users,
  FileSignature,
  FileText,
  Award,
  Calendar as CalendarIcon,
  RefreshCw,
  TrendingUp,
  Activity
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
const bigNumbers = [
  { label: "Processos Ativos", value: "1.240", change: "+8.2% vs mês anterior", icon: Scale, color: "text-blue-500" },
  { label: "Prazos (Próximos 7 Dias)", value: "84", change: "12 de alta prioridade", icon: Clock, color: "text-amber-500" },
  { label: "Intimações & Diários", value: "26 hoje", change: "+6 novas na última hora", icon: Bell, color: "text-rose-500" },
  { label: "Audiências da Semana", value: "14", change: "3 de conciliação / 1 instrução", icon: Gavel, color: "text-indigo-500" },
  { label: "Honorários a Receber", value: "R$ 184K", change: "R$ 42K vencidos (cobrança ativa)", icon: DollarSign, color: "text-emerald-500" },
  { label: "Total de Clientes", value: "854", change: "+23 novos este mês", icon: Users, color: "text-teal-500" },
  { label: "Contratos em Análise", value: "18", change: "2 pendentes assinatura", icon: FileSignature, color: "text-purple-500" },
  { label: "Pareceres Pendentes", value: "9", change: "Prazo médio de entrega: 4 dias", icon: FileText, color: "text-cyan-500" },
  { label: "Timesheet Cobrado", value: "142h", change: "Meta mensal: 180h", icon: Clock, color: "text-sky-500" },
  { label: "Taxa de Êxito", value: "78.4%", change: "Meta do escritório: 75%", icon: Award, color: "text-yellow-500" },
];

const dataAreaJuridica = [
  { name: "Trabalhista", value: 450, color: "oklch(0.78 0.08 145)" }, // Soft Emerald
  { name: "Cível & Contratos", value: 380, color: "oklch(0.75 0.08 240)" }, // Soft Blue
  { name: "Tributário", value: 210, color: "oklch(0.74 0.09 20)" }, // Soft Red/Rose
  { name: "Previdenciário", value: 200, color: "oklch(0.79 0.09 70)" }, // Soft Amber
];

const dataFaturamento = [
  { date: "Jan", recorrencia: 45000, exito: 12000, consultivo: 15000 },
  { date: "Fev", recorrencia: 47000, exito: 25000, consultivo: 18000 },
  { date: "Mar", recorrencia: 46000, exito: 8000, consultivo: 22000 },
  { date: "Abr", recorrencia: 49000, exito: 32000, consultivo: 20000 },
  { date: "Mai", recorrencia: 52000, exito: 45000, consultivo: 25000 },
];

const dataPrazosStatus = [
  { name: "Dr. André", Cumpridos: 45, Abertos: 8 },
  { name: "Dra. Beatriz", Cumpridos: 52, Abertos: 12 },
  { name: "Dra. Carla", Cumpridos: 38, Abertos: 5 },
  { name: "Dr. Diego", Cumpridos: 29, Abertos: 11 },
];

const dataPublicacoesTribunal = [
  { name: "TJSP", total: 120 },
  { name: "TRT2", total: 85 },
  { name: "TRF3", total: 40 },
  { name: "STJ", total: 15 },
  { name: "Outros", total: 30 },
];

const dataEvolucaoCasos = [
  { semana: "Semana 1", novos: 18 },
  { semana: "Semana 2", novos: 24 },
  { semana: "Semana 3", novos: 15 },
  { semana: "Semana 4", novos: 29 },
  { semana: "Semana 5", novos: 32 },
];

export default function ERPPage() {
  const [startDate, setStartDate] = React.useState<Date>(new Date(2026, 4, 1)); // May 1, 2026
  const [endDate, setEndDate] = React.useState<Date>(new Date(2026, 4, 31));   // May 31, 2026
  const [showStartCalendar, setShowStartCalendar] = React.useState<boolean>(false);
  const [showEndCalendar, setShowEndCalendar] = React.useState<boolean>(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard ERP Legal</h1>
        <p className="text-muted-foreground">
          Gestão integrada de contencioso, prazos jurídicos e faturamento do escritório
        </p>
      </div>

      {/* --- FILTERS SECTION --- */}
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

          {/* Responsável */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Todos os Advogados</option>
              <option value="1" className="bg-popover text-popover-foreground">Dr. André</option>
              <option value="2" className="bg-popover text-popover-foreground">Dra. Beatriz</option>
              <option value="3" className="bg-popover text-popover-foreground">Dra. Carla</option>
              <option value="4" className="bg-popover text-popover-foreground">Dr. Diego</option>
            </select>
          </div>

          {/* Área Jurídica */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Todas as Áreas</option>
              <option value="trabalhista" className="bg-popover text-popover-foreground">Trabalhista</option>
              <option value="civel" className="bg-popover text-popover-foreground">Cível</option>
              <option value="tributario" className="bg-popover text-popover-foreground">Tributário</option>
              <option value="previdenciario" className="bg-popover text-popover-foreground">Previdenciário</option>
            </select>
          </div>

          {/* Fase Processual */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Todas as Fases</option>
              <option value="conhecimento" className="bg-popover text-popover-foreground">Conhecimento</option>
              <option value="execucao" className="bg-popover text-popover-foreground">Execução</option>
              <option value="recurso" className="bg-popover text-popover-foreground">Recursos</option>
              <option value="arquivado" className="bg-popover text-popover-foreground">Arquivado / Baixado</option>
            </select>
          </div>
        </div>

        {/* Atualizar Button */}
        <Button className="h-9 gap-2 w-full lg:w-auto px-5 bg-primary/90 text-primary-foreground hover:bg-primary shadow-sm active:scale-95 transition-all">
          <RefreshCw className="size-4 pointer-events-none" />
          Atualizar
        </Button>
      </div>

      {/* --- BIG NUMBERS SECTION --- */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {bigNumbers.map((item) => {
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
        {/* Processos por Área Jurídica */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Processos por Área</CardTitle>
            <CardDescription>Distribuição da carteira por área jurídica</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataAreaJuridica}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {dataAreaJuridica.map((entry, index) => (
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

        {/* Publicações por Tribunal */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Intimações por Tribunal</CardTitle>
            <CardDescription>Volume de novos diários lidos na semana</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPublicacoesTribunal} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
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

        {/* Evolução de Novos Casos */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Novos Casos Distribuídos</CardTitle>
            <CardDescription>Crescimento de novas ações nas últimas semanas</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataEvolucaoCasos} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <XAxis
                  dataKey="semana"
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
                  itemStyle={{ color: "oklch(0.74 0.09 20)" }}
                />
                <Line
                  type="monotone"
                  dataKey="novos"
                  stroke="oklch(0.74 0.09 20)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Evolução do Faturamento Mensal */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Honorários Faturados</CardTitle>
            <CardDescription>Divisão por tipo de cobrança contratual</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataFaturamento} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRecorrencia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="recorrencia"
                  name="Mensalidades"
                  stroke="var(--primary)"
                  strokeOpacity={0.7}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRecorrencia)"
                />
                <Area
                  type="monotone"
                  dataKey="exito"
                  name="Êxito/Sucumbência"
                  stroke="oklch(0.78 0.08 145)"
                  strokeOpacity={0.7}
                  strokeWidth={2}
                  fillOpacity={0.05}
                  fill="oklch(0.78 0.08 145)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Prazos por Advogado */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Prazos por Advogado</CardTitle>
            <CardDescription>Resoluções de tarefas e prazos da banca</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPrazosStatus} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
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
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Legend />
                <Bar dataKey="Cumpridos" name="Cumpridos" fill="oklch(0.75 0.08 240)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Abertos" name="Em Aberto" fill="oklch(0.74 0.09 20)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
