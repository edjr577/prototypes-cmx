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
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

const financialStats = [
  { label: "Receita Total", value: "R$ 0,00", icon: DollarSign, trend: "up" },
  { label: "Despesas", value: "R$ 0,00", icon: TrendingDown, trend: "down" },
  { label: "Lucro Liquido", value: "R$ 0,00", icon: TrendingUp, trend: "up" },
  { label: "Reservas", value: "R$ 0,00", icon: PiggyBank, trend: "neutral" },
];

const balanceSheetItems = [
  { category: "Ativos", subcategory: "Circulante", value: "R$ 0,00" },
  { category: "Ativos", subcategory: "Nao Circulante", value: "R$ 0,00" },
  { category: "Passivos", subcategory: "Circulante", value: "R$ 0,00" },
  { category: "Passivos", subcategory: "Nao Circulante", value: "R$ 0,00" },
  { category: "Patrimonio", subcategory: "Liquido", value: "R$ 0,00" },
];

export function ControladoriaView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Controladoria e Financas
        </h1>
        <p className="text-muted-foreground">
          Visao geral financeira e balanco patrimonial
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {financialStats.map((stat) => {
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
                <p className="text-xs text-muted-foreground">
                  {stat.trend === "up"
                    ? "Comparado ao mes anterior"
                    : stat.trend === "down"
                      ? "Total acumulado"
                      : "Saldo disponivel"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visao Geral Financeira</CardTitle>
            <CardDescription>
              Resumo das movimentacoes financeiras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Receitas</span>
                  <span className="font-medium text-foreground">R$ 0,00</span>
                </div>
                <Skeleton className="h-4 w-full rounded-full" />
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Despesas</span>
                  <span className="font-medium text-foreground">R$ 0,00</span>
                </div>
                <Skeleton className="h-4 w-full rounded-full" />
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Resultado</span>
                  <span className="font-medium text-foreground">R$ 0,00</span>
                </div>
                <Skeleton className="h-4 w-full rounded-full" />
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center py-4">
              <p className="text-sm text-muted-foreground">
                Sem dados financeiros
              </p>
              <p className="text-xs text-muted-foreground">
                Registre movimentacoes para visualizar
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balanco Patrimonial</CardTitle>
            <CardDescription>
              Demonstrativo de ativos e passivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Subcategoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {balanceSheetItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.subcategory}
                    </TableCell>
                    <TableCell className="text-right">{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-medium text-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">R$ 0,00</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
