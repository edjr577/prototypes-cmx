"use client";

import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, LabelList
} from "recharts";
import { ArrowUp, ArrowDown, Calendar as CalendarIcon, Filter, CheckCircle2, Lock, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PermissionGate } from "@/components/permission-gate";
import { UpsellBanner } from "@/components/upsell-banner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/UserContext";
import { cn } from "@/lib/utils";

// --- MOCK DATA: VISÃO GERAL ---
const financialData = [
  { month: "JUN", receita: 1200000, despesa: 700000, lucro: 500000, receitaAnoAnterior: 1000000 },
  { month: "JUL", receita: 1250000, despesa: 720000, lucro: 530000, receitaAnoAnterior: 1050000 },
  { month: "AGO", receita: 1220000, despesa: 750000, lucro: 470000, receitaAnoAnterior: 1100000 },
  { month: "SET", receita: 1300000, despesa: 780000, lucro: 520000, receitaAnoAnterior: 1150000 },
  { month: "OUT", receita: 1350000, despesa: 800000, lucro: 550000, receitaAnoAnterior: 1200000 },
  { month: "NOV", receita: 1400000, despesa: 820000, lucro: 580000, receitaAnoAnterior: 1250000 },
  { month: "DEZ", receita: 1550000, despesa: 900000, lucro: 650000, receitaAnoAnterior: 1300000 },
  { month: "JAN", receita: 1600000, despesa: 920000, lucro: 680000, receitaAnoAnterior: 1350000 },
  { month: "FEV", receita: 1650000, despesa: 950000, lucro: 700000, receitaAnoAnterior: 1400000 },
  { month: "MAR", receita: 1700000, despesa: 980000, lucro: 720000, receitaAnoAnterior: 1450000 },
  { month: "ABR", receita: 1750000, despesa: 1000000, lucro: 750000, receitaAnoAnterior: 1500000 },
  { month: "MAI", receita: 1800000, despesa: 1050000, lucro: 750000, receitaAnoAnterior: 1550000 },
];

const mixData = [
  { name: 'Honorário Contratual', value: 51, fill: 'var(--color-chart-1)' },
  { name: 'Sucumbência', value: 23, fill: 'var(--color-chart-2)' },
  { name: 'Êxito', value: 15, fill: 'var(--color-chart-3)' },
  { name: 'Acordo Extrajudicial', value: 7, fill: 'var(--color-chart-4)' },
  { name: 'Consultoria Mensal', value: 4, fill: 'var(--color-chart-5)' },
];

// --- MOCK DATA: OPERAÇÃO ---
const processosPorArea = [
  { name: 'Previdenciário', value: 1250, fill: 'var(--color-chart-1)' },
  { name: 'Trabalhista', value: 820, fill: 'var(--color-chart-2)' },
  { name: 'Cível', value: 500, fill: 'var(--color-chart-3)' },
  { name: 'Empresarial', value: 240, fill: 'var(--color-chart-4)' },
];

const receitaPorAreaYtd = [
  { area: 'PREV', receita: 2400000 },
  { area: 'TRAB', receita: 2100000 },
  { area: 'CIVEL', receita: 1500000 },
  { area: 'TRIB', receita: 1100000 },
  { area: 'FAM', receita: 650000 },
  { area: 'CONS', receita: 500000 },
  { area: 'EMPR', receita: 150000 },
];

const funilData = [
  { stage: 'Leads', value: 180, fill: 'var(--color-chart-1)' },
  { stage: 'Reuniões', value: 105, fill: 'var(--color-chart-2)' },
  { stage: 'Propostas', value: 68, fill: 'var(--color-chart-3)' },
  { stage: 'Contratos', value: 48, fill: 'var(--color-chart-4)' },
];

const crescimentoAreas = [
  { name: 'Empresarial', crescimento: 43.7, ltv: 100, receitaYtd: 500000, processos: 42, color: 'text-emerald-600', bg: 'bg-emerald-600' },
  { name: 'Tributário', crescimento: 31.2, ltv: 88, receitaYtd: 1100000, processos: 248, color: 'text-emerald-600', bg: 'bg-emerald-600' },
  { name: 'Previdenciário', crescimento: 22.4, ltv: 49, receitaYtd: 2400000, processos: 1250, color: 'text-emerald-600', bg: 'bg-emerald-600' },
  { name: 'Trabalhista', crescimento: 14.1, ltv: 31, receitaYtd: 2100000, processos: 820, color: 'text-emerald-600', bg: 'bg-emerald-600' },
  { name: 'Consumidor', crescimento: 12.0, ltv: 20, receitaYtd: 500000, processos: 98, color: 'text-emerald-600', bg: 'bg-emerald-600' },
  { name: 'Cível', crescimento: 8.8, ltv: 15, receitaYtd: 1500000, processos: 500, color: 'text-emerald-600', bg: 'bg-emerald-600' },
  { name: 'Família', crescimento: -5.4, ltv: 13, receitaYtd: 650000, processos: 120, color: 'text-destructive', bg: 'bg-destructive' },
];

// --- MOCK DATA: PESSOAS & RISCO ---
const riscoData = [
  { name: 'Trabalhista', provavel: 1.2, possivel: 0.8, remoto: 3.5 },
  { name: 'Cível', provavel: 0.45, possivel: 1.2, remoto: 2.8 },
  { name: 'Tributário', provavel: 0.2, possivel: 0.5, remoto: 1.5 },
];

const headcountData = [
  { month: "JAN", total: 105 },
  { month: "FEV", total: 108 },
  { month: "MAR", total: 110 },
  { month: "ABR", total: 112 },
  { month: "MAI", total: 118 },
];

const niveisData = [
  { name: 'Sócios', value: 8, fill: 'var(--color-chart-1)' },
  { name: 'Advogados', value: 52, fill: 'var(--color-chart-2)' },
  { name: 'Estagiários', value: 15, fill: 'var(--color-chart-3)' },
  { name: 'Administrativo', value: 43, fill: 'var(--color-chart-4)' },
];

export default function CEODashboard() {
  const { activeTenant } = useUser();

  return (
    <PermissionGate 
      require="admin:full_access"
      fallback={<UpsellBanner />}
      blockMode="overlay"
    >
      <div className="flex flex-col space-y-2 p-6">
        {/* HEADER SECTION */}
      <div className="flex flex-col space-y-1.5 mb-2">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Visão Executiva</p>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight">Administrativo</h1>
          <Badge variant="secondary" className="font-semibold text-xs rounded-sm bg-muted/60 text-muted-foreground uppercase">
            {activeTenant.name}
          </Badge>
        </div>
      </div>

      {/* MAIN TABS & CONTENT */}
      <Tabs defaultValue="overview" className="space-y-6">
        
        {/* TABS & FILTERS BAR */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
          <TabsList variant="line">
            <TabsTrigger value="overview" className="border-none !bg-transparent data-[state=active]:shadow-none">Visão Geral</TabsTrigger>
            <TabsTrigger value="operation" className="border-none !bg-transparent data-[state=active]:shadow-none">Operação</TabsTrigger>
            <TabsTrigger value="people-risk" className="border-none !bg-transparent data-[state=active]:shadow-none">Pessoas & Risco</TabsTrigger>
          </TabsList>

          {/* GLOBAL FILTERS */}
          <div className="flex items-center gap-2 pb-2">
            <Button variant="outline" className="h-8 gap-2 text-xs font-medium">
              <Filter className="w-3.5 h-3.5" />
              Mais Filtros
            </Button>
            <Select defaultValue="ytd">
              <SelectTrigger className="w-[140px] h-8 text-xs font-medium bg-background">
                <CalendarIcon className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ytd">Year-to-Date (YTD)</SelectItem>
                <SelectItem value="last12">Últimos 12 meses</SelectItem>
                <SelectItem value="last30">Últimos 30 dias</SelectItem>
                <SelectItem value="custom">Personalizado...</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* TAB 1: VISÃO GERAL */}
        <TabsContent value="overview" className="space-y-6 focus-visible:outline-none">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Receita YTD</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">R$ 8.4M</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>R$ 8.420.000</span>
                  <span className="text-emerald-600 font-semibold flex items-center"><ArrowUp className="w-3 h-3 mr-0.5" />18,4% YoY</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Lucro Líquido YTD</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">R$ 2.8M</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>R$ 2.840.000</span>
                  <span className="text-emerald-600 font-semibold flex items-center"><ArrowUp className="w-3 h-3 mr-0.5" />22,1% YoY</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Margem Líquida</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">33,7%</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="text-emerald-600 font-semibold flex items-center"><ArrowUp className="w-3 h-3 mr-0.5" />2,4 p.p. vs ano anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Ticket Médio</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">R$ 17k</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>R$ 17.290</span>
                  <span className="text-emerald-600 font-semibold flex items-center"><ArrowUp className="w-3 h-3 mr-0.5" />6,2% YoY</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CHARTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PERFORMANCE CHART */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription className="text-xs font-bold tracking-wider uppercase">Performance Financeira</CardDescription>
                <CardTitle className="text-lg">Receita × Despesa × Lucro · 12m</CardTitle>
                <p className="text-xs text-muted-foreground font-mono mt-1">linha cinza = receita do ano anterior</p>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                <div className="flex gap-4 mb-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-chart-2)]"></div> Receita</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-destructive"></div> Despesa</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-chart-1)]"></div> Lucro</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-muted-foreground"></div> Ano anterior</div>
                </div>
                
                <div className="h-[250px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} tickFormatter={(value) => value >= 1000000 ? `${(value/1000000).toFixed(1)}M` : `${value/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }} 
                        itemStyle={{ color: 'var(--color-popover-foreground)' }}
                        labelStyle={{ color: 'var(--color-muted-foreground)' }}
                      />
                      <Line type="monotone" dataKey="receita" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-background)', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="despesa" stroke="var(--color-destructive)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-background)', strokeWidth: 2 }} />
                      <Line type="monotone" dataKey="lucro" stroke="var(--color-chart-1)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-background)', strokeWidth: 2 }} />
                      <Line type="monotone" dataKey="receitaAnoAnterior" stroke="var(--color-muted-foreground)" strokeDasharray="4 4" strokeWidth={1.5} dot={false} activeDot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* REVENUE MIX DONUT */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription className="text-xs font-bold tracking-wider uppercase">Mix de Receita</CardDescription>
                <CardTitle className="text-lg">Por categoria · YTD</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="w-[200px] h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mixData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {mixData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }} 
                        itemStyle={{ color: 'var(--color-popover-foreground)', fontWeight: 600 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-muted-foreground mb-0.5">YTD</span>
                    <span className="text-xl font-extrabold text-foreground">R$ 8.4M</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2.5 w-full">
                  {mixData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.fill }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-muted-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* GOALS (NORTE DO ANO) */}
          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-bold tracking-wider uppercase">Norte do Ano</CardDescription>
              <CardTitle className="text-lg">Meta vs Realizado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-secondary/50 p-4 rounded-lg border">
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase mb-1.5">Receita Anual</p>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-2xl font-extrabold">R$ 8.4M</span>
                    <span className="text-xs font-semibold text-muted-foreground">/ R$ 20.0M</span>
                  </div>
                  <Progress value={42} className="h-2 mb-2 bg-muted [&>div]:bg-chart-2" />
                  <p className="text-[10px] font-bold text-muted-foreground">42% do alvo</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg border">
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase mb-1.5">Novos Contratos</p>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-2xl font-extrabold">48</span>
                    <span className="text-xs font-semibold text-muted-foreground">/ 600</span>
                  </div>
                  <Progress value={8} className="h-2 mb-2 bg-muted [&>div]:bg-chart-2" />
                  <p className="text-[10px] font-bold text-muted-foreground">8% do alvo</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg border">
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase mb-1.5">NPS</p>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-2xl font-extrabold">72</span>
                    <span className="text-xs font-semibold text-muted-foreground">/ 70</span>
                  </div>
                  <Progress value={100} className="h-2 mb-2 bg-muted [&>div]:bg-emerald-600" />
                  <p className="text-[10px] font-bold text-emerald-600 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> Meta atingida</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg border">
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase mb-1.5">Margem Líquida</p>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-2xl font-extrabold">33,7%</span>
                    <span className="text-xs font-semibold text-muted-foreground">/ 30%</span>
                  </div>
                  <Progress value={100} className="h-2 mb-2 bg-muted [&>div]:bg-emerald-600" />
                  <p className="text-[10px] font-bold text-emerald-600 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> Meta atingida</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: OPERAÇÃO */}
        <TabsContent value="operation" className="space-y-6 focus-visible:outline-none">
          {/* KPI CARDS - OPERATION */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Clientes Ativos</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">487</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="text-emerald-600 font-semibold flex items-center"><ArrowUp className="w-3 h-3 mr-0.5" />42</span> no ano
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Processos Ativos</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">3.142</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="text-emerald-600 font-semibold flex items-center"><ArrowUp className="w-3 h-3 mr-0.5" />361</span> no ano
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Advogados Ativos</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">52</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>118 colaboradores</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">NPS</span>
                  <Badge variant="outline" className="bg-emerald-600/10 text-emerald-600 border-emerald-600/20 uppercase text-[10px]">Ótimo</Badge>
                </div>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">72</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>184 respostas</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CHARTS GRID - OPERATION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* CARTEIRA (PIE) */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription className="text-xs font-bold tracking-wider uppercase">Carteira</CardDescription>
                <CardTitle className="text-lg">Processos por área</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center">
                <div className="w-[200px] h-[200px] mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={processosPorArea}
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        dataKey="value"
                        stroke="var(--color-background)"
                        strokeWidth={2}
                      >
                        {processosPorArea.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }} 
                        itemStyle={{ color: 'var(--color-popover-foreground)', fontWeight: 600 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-full space-y-2">
                  {processosPorArea.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.fill }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ORIGEM DO DINHEIRO (BAR) */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription className="text-xs font-bold tracking-wider uppercase">Origem do Dinheiro</CardDescription>
                <CardTitle className="text-lg">Receita por área · YTD</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={receitaPorAreaYtd} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                      <XAxis dataKey="area" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--color-muted-foreground)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} tickFormatter={(value) => value >= 1000000 ? `${(value/1000000).toFixed(1)}M` : `${value/1000}k`} />
                      <Tooltip 
                        cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                        contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }} 
                      />
                      <Bar dataKey="receita" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} maxBarSize={40}>
                        <LabelList dataKey="receita" position="top" fill="var(--color-foreground)" fontSize={9} fontWeight={600} formatter={(v: any) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : `${v/1000}k`} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CAPTAÇÃO / FUNIL (BAR) */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription className="text-xs font-bold tracking-wider uppercase">Captação</CardDescription>
                <CardTitle className="text-lg">Funil · 30d</CardTitle>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">contagem • taxa de conversão</p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="h-[235px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funilData} margin={{ top: 20, right: 0, left: -30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                      <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} />
                      <Tooltip 
                        cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                        contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }} 
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
                        {funilData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        <LabelList dataKey="value" position="top" fill="var(--color-foreground)" fontSize={10} fontWeight={600} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* GROWTH LIST */}
          <Card>
            <CardHeader className="pb-4">
              <CardDescription className="text-xs font-bold tracking-wider uppercase">Crescimento</CardDescription>
              <CardTitle className="text-lg">Áreas em crescimento · YoY</CardTitle>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5">ordenadas por crescimento • área da barra infere a receita YTD</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {crescimentoAreas.map((area, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-4 bg-card hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-sm">{area.name}</span>
                      <Badge variant="outline" className={cn("text-[9px] font-bold uppercase", area.color, area.bg.replace('bg-', 'border-').replace('600', '600/30'))}>
                        {area.crescimento > 0 ? '+' : ''}{area.crescimento}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground mb-1">
                          <span>CRESCIMENTO</span>
                          <span>{area.ltv}% do líder</span>
                        </div>
                        <Progress value={area.ltv} className={cn("h-1.5 bg-muted", `[&>div]:${area.bg}`)} />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">Receita YTD</span>
                          <span className="font-semibold text-xs mt-0.5">
                            R$ {area.receitaYtd >= 1000000 ? `${(area.receitaYtd/1000000).toFixed(1)}M` : `${area.receitaYtd/1000}k`}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">Processos</span>
                          <span className="font-semibold text-xs mt-0.5">{area.processos}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: PESSOAS & RISCO */}
        <TabsContent value="people-risk" className="space-y-6 focus-visible:outline-none">
          {/* KPI CARDS - PEOPLE & RISK */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Headcount</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">118</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="text-emerald-600 font-semibold flex items-center"><ArrowUp className="w-3 h-3 mr-0.5" />12</span> no ano
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Turnover Anual</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">14,2%</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="text-emerald-600 font-semibold flex items-center"><ArrowDown className="w-3 h-3 mr-0.5" />2,1% YoY</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Folha / Faturamento</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">24,8%</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>Meta Saudável: &lt; 30%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4 py-0 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Contingência Provável</span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-foreground">R$ 1.8M</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="text-destructive font-semibold flex items-center"><ArrowUp className="w-3 h-3 mr-0.5" />R$ 300k</span> vs tri anterior
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CHARTS GRID - PEOPLE & RISK */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* COMPOSIÇÃO DE EQUIPE (PIE) */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription className="text-xs font-bold tracking-wider uppercase">Equipe</CardDescription>
                <CardTitle className="text-lg">Composição por Nível</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center">
                <div className="w-[200px] h-[200px] mb-6 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={niveisData}
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        innerRadius={65}
                        dataKey="value"
                        stroke="var(--color-background)"
                        strokeWidth={2}
                        paddingAngle={2}
                      >
                        {niveisData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }} 
                        itemStyle={{ color: 'var(--color-popover-foreground)', fontWeight: 600 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-0">
                    <span className="text-3xl font-extrabold text-foreground">118</span>
                    <span className="text-[10px] font-bold text-muted-foreground">TOTAL</span>
                  </div>
                </div>
                
                <div className="w-full space-y-2">
                  {niveisData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.fill }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* EVOLUÇÃO DE HEADCOUNT (LINE) */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription className="text-xs font-bold tracking-wider uppercase">Crescimento de Time</CardDescription>
                <CardTitle className="text-lg">Evolução do Headcount</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={headcountData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--color-muted-foreground)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip 
                        cursor={{ stroke: 'var(--color-muted)' }}
                        contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }} 
                      />
                      <Line type="monotone" dataKey="total" stroke="var(--color-chart-2)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-background)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* RISCO (BAR) */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription className="text-xs font-bold tracking-wider uppercase">Risco Financeiro</CardDescription>
                <CardTitle className="text-lg">Contingência Cível e Trabalhista</CardTitle>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">provável • possível • remoto</p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="h-[235px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riscoData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} tickFormatter={(value) => `${value}M`} />
                      <Tooltip 
                        cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                        contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }} 
                      />
                      <Bar dataKey="provavel" name="Provável" stackId="a" fill="var(--color-destructive)" maxBarSize={40} />
                      <Bar dataKey="possivel" name="Possível" stackId="a" fill="var(--color-chart-4)" maxBarSize={40} />
                      <Bar dataKey="remoto" name="Remoto" stackId="a" fill="var(--color-chart-2)" maxBarSize={40} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2 text-[10px] font-semibold text-muted-foreground">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-destructive"></div> Provável</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-chart-4)]"></div> Possível</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-chart-2)]"></div> Remoto</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </PermissionGate>
  );
}
