import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, TrendingUp, Target, UserPlus } from "lucide-react";

const funnelStages = [
  { name: "Leads", count: 0, color: "bg-primary/20" },
  { name: "Qualificados", count: 0, color: "bg-primary/40" },
  { name: "Proposta", count: 0, color: "bg-primary/60" },
  { name: "Negociacao", count: 0, color: "bg-primary/80" },
  { name: "Fechados", count: 0, color: "bg-primary" },
];

const stats = [
  { label: "Total de Clientes", value: "0", icon: Users },
  { label: "Novos este mes", value: "0", icon: UserPlus },
  { label: "Taxa de Conversao", value: "0%", icon: Target },
  { label: "Receita Potencial", value: "R$ 0", icon: TrendingUp },
];

export function CRMView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Gestao de Clientes (CRM)
        </h1>
        <p className="text-muted-foreground">
          Gerencie seu funil de vendas e relacionamento com clientes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <Icon className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Funil de Vendas</CardTitle>
            <CardDescription>
              Visualize o progresso dos seus leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {funnelStages.map((stage, index) => (
                <div key={stage.name} className="flex items-center gap-3">
                  <div className="w-24 text-sm text-muted-foreground">
                    {stage.name}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`h-8 rounded-md ${stage.color}`}
                      style={{
                        width: `${100 - index * 15}%`,
                        minWidth: "40px",
                      }}
                    />
                  </div>
                  <div className="w-12 text-right text-sm font-medium text-foreground">
                    {stage.count}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col items-center justify-center py-8">
              <Skeleton className="mb-2 size-12 rounded-full" />
              <p className="text-sm text-muted-foreground">
                Nenhum lead cadastrado
              </p>
              <p className="text-xs text-muted-foreground">
                Adicione leads para visualizar o funil
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
            <CardDescription>
              Seus clientes mais recentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Skeleton className="size-10 rounded-full" />
                      <p className="text-sm text-muted-foreground">
                        Nenhum cliente encontrado
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
