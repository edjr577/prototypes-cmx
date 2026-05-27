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
  MessageSquare,
  User,
  Building2,
  Clock,
  Users,
  Contact,
  UserPlus,
  Activity,
  Hourglass,
  Zap,
  Phone,
  Mail,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Calendar,
  RefreshCw
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
  { label: "Total de Atendimentos", value: "2.040", change: "+14.2% vs mês anterior", icon: MessageSquare, color: "text-blue-500" },
  { label: "Iniciados pelo Cliente", value: "1.428", change: "70% do total", icon: User, color: "text-indigo-500" },
  { label: "Iniciados pela Empresa", value: "612", change: "30% do total", icon: Building2, color: "text-purple-500" },
  { label: "Pendentes", value: "128", change: "+5 novos nos últimos 15 min", icon: Clock, color: "text-amber-500" },
  { label: "Atendentes Ativos", value: "15", change: "12 online agora", icon: Users, color: "text-emerald-500" },
  { label: "Total Contatos", value: "5.847", change: "+240 novos este mês", icon: Contact, color: "text-teal-500" },
  { label: "Novos Contatos", value: "482", change: "+12% vs mês anterior", icon: UserPlus, color: "text-cyan-500" },
  { label: "Em Atendimento", value: "42", change: "Fila média: 2 min", icon: Activity, color: "text-rose-500" },
  { label: "TMA (Tempo Médio)", value: "8m 45s", change: "-1m 15s de melhoria", icon: Hourglass, color: "text-sky-500" },
  { label: "1ª Resposta Média", value: "1m 30s", change: "Meta: < 2m", icon: Zap, color: "text-yellow-500" },
];

const dataCanal = [
  { name: "WhatsApp", value: 1240, color: "oklch(0.78 0.08 145)" }, // Soft Emerald
  { name: "E-mail", value: 340, color: "oklch(0.75 0.08 240)" },    // Soft Blue
  { name: "Web Chat", value: 280, color: "oklch(0.74 0.09 20)" },     // Soft Red/Rose
  { name: "Telefone", value: 180, color: "oklch(0.79 0.09 70)" },    // Soft Amber
];

const dataMotivoFechamento = [
  { name: "Dúvida Sanada", value: 850 },
  { name: "Venda Concluída", value: 620 },
  { name: "Suporte Técnico", value: 410 },
  { name: "Reclamação", value: 120 },
  { name: "Cancelamento", value: 40 },
];

const dataDepartamento = [
  { name: "Suporte", value: 1100 },
  { name: "Comercial", value: 580 },
  { name: "Financeiro", value: 240 },
  { name: "Logística", value: 120 },
];

const dataEvolucao = [
  { date: "Seg", atendimentos: 240 },
  { date: "Ter", atendimentos: 310 },
  { date: "Qua", atendimentos: 290 },
  { date: "Qui", atendimentos: 350 },
  { date: "Sex", atendimentos: 380 },
  { date: "Sáb", atendimentos: 150 },
  { date: "Dom", atendimentos: 90 },
];

const dataHorariosPico = [
  { hora: "08h-10h", volume: 185 },
  { hora: "10h-12h", volume: 340 },
  { hora: "12h-14h", volume: 220 },
  { hora: "14h-16h", volume: 410 },
  { hora: "16h-18h", volume: 395 },
  { hora: "18h-20h", volume: 190 },
];

const dataAtendente = [
  { name: "Ana Souza", total: 420 },
  { name: "Carlos Lima", total: 380 },
  { name: "Julia Silva", total: 350 },
  { name: "Pedro Rocha", total: 290 },
  { name: "Lucas Costa", total: 210 },
];

const dataAbertoConcluido = [
  { name: "Suporte", Aberto: 45, Concluido: 1055 },
  { name: "Comercial", Aberto: 60, Concluido: 520 },
  { name: "Financeiro", Aberto: 15, Concluido: 225 },
  { name: "Logística", Aberto: 8, Concluido: 112 },
];

export default function CRMPage() {
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard de Atendimento</h1>
        <p className="text-muted-foreground">
          Acompanhamento em tempo real das métricas de atendimento ao cliente
        </p>
      </div>

      {/* --- FILTERS SECTION (LINEAR/SHADCN MODERN STYLE) --- */}
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
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground/60" />
                <span>Início: {formatDate(startDate)} 00:00</span>
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
                    {/* Empty spaces before Friday May 1st 2026 */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={`empty-${i}`} />
                    ))}
                    {/* Days 1 to 31 */}
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
                          className={`size-7 text-xs rounded-md flex items-center justify-center transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer ${isSelected ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground" : ""
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
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground/60" />
                <span>Fim: {formatDate(endDate)} 23:59</span>
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
                    {/* Empty spaces before Friday May 1st 2026 */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={`empty-${i}`} />
                    ))}
                    {/* Days 1 to 31 */}
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
                          className={`size-7 text-xs rounded-md flex items-center justify-center transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer ${isSelected ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground" : ""
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

          {/* Usuário */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Selecione o Usuário</option>
              <option value="1" className="bg-popover text-popover-foreground">Ana Souza</option>
              <option value="2" className="bg-popover text-popover-foreground">Carlos Lima</option>
              <option value="3" className="bg-popover text-popover-foreground">Julia Silva</option>
              <option value="4" className="bg-popover text-popover-foreground">Pedro Rocha</option>
            </select>
          </div>

          {/* Departamento */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Selecione o Departamento</option>
              <option value="suporte" className="bg-popover text-popover-foreground">Suporte</option>
              <option value="comercial" className="bg-popover text-popover-foreground">Comercial</option>
              <option value="financeiro" className="bg-popover text-popover-foreground">Financeiro</option>
              <option value="logistica" className="bg-popover text-popover-foreground">Logística</option>
            </select>
          </div>

          {/* Canal */}
          <div className="relative">
            <select className="h-9 w-full rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 px-3 text-sm text-foreground/80 cursor-pointer transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <option value="" className="bg-popover text-popover-foreground">Selecione o Canal</option>
              <option value="whatsapp" className="bg-popover text-popover-foreground">WhatsApp</option>
              <option value="email" className="bg-popover text-popover-foreground">E-mail</option>
              <option value="webchat" className="bg-popover text-popover-foreground">Web Chat</option>
              <option value="telefone" className="bg-popover text-popover-foreground">Telefone</option>
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
        {/* Atendimento por Canal */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Atendimento por Canal</CardTitle>
            <CardDescription>Distribuição dos atendimentos pelos canais integrados</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataCanal}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {dataCanal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(var(--card))",
                    borderColor: "oklch(var(--border))",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "oklch(var(--foreground))" }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Motivo de Fechamento */}
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Motivo de Fechamento</CardTitle>
            <CardDescription>Principais causas de encerramento do ticket</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataMotivoFechamento}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.15} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  scale="band"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  style={{ fontSize: "11px", fill: "oklch(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--foreground)", fontWeight: "bold" }}
                  itemStyle={{ color: "var(--primary)" }}
                />
                <Bar dataKey="value" fill="var(--primary)" fillOpacity={0.65} radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Atendimento por Departamento */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Atendimento por Departamento</CardTitle>
            <CardDescription>Distribuição de demandas por área da empresa</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataDepartamento} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
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
                <Bar dataKey="value" fill="oklch(0.78 0.08 145)" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Evolução de Atendimentos */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Evolução dos Atendimentos</CardTitle>
            <CardDescription>Acompanhamento de volume diário na última semana</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataEvolucao} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAtendimentos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(var(--primary))" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="oklch(var(--primary))" stopOpacity={0.0} />
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
                  itemStyle={{ color: "var(--primary)" }}
                />
                <Area
                  type="monotone"
                  dataKey="atendimentos"
                  stroke="var(--primary)"
                  strokeOpacity={0.7}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAtendimentos)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Horários de Pico */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Horários de Pico</CardTitle>
            <CardDescription>Períodos de maior tráfego e abertura de chamados</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataHorariosPico} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
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
                  itemStyle={{ color: "oklch(0.74 0.09 20)" }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="oklch(0.74 0.09 20)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Volume Total por Atendente */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Volume por Atendente</CardTitle>
            <CardDescription>Total de chamados concluídos por agente</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAtendente} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
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
                <Bar dataKey="total" fill="oklch(0.75 0.08 240)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Atendimentos em Aberto vs Atendimentos Concluídos */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Atendimentos em Aberto vs Concluídos</CardTitle>
            <CardDescription>Relação de resoluções de chamados por setor</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAbertoConcluido} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
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
                <Bar dataKey="Concluido" name="Concluídos" fill="oklch(0.78 0.08 145)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Aberto" name="Em Aberto" fill="oklch(0.74 0.09 20)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
