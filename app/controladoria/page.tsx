import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

const stats = [
  { label: "Saldo Atual", value: "R$ 1.245.890", change: "+8%", icon: Wallet },
  { label: "Receitas Mes", value: "R$ 892.450", change: "+15%", icon: TrendingUp },
  { label: "Despesas Mes", value: "R$ 654.320", change: "+3%", icon: TrendingDown },
  { label: "Resultado", value: "R$ 238.130", change: "+42%", icon: PiggyBank },
];

const pendingPayments = [
  { descricao: "Fornecedor A", vencimento: "28/05/2026", valor: "R$ 12.450" },
  { descricao: "Aluguel", vencimento: "01/06/2026", valor: "R$ 8.500" },
  { descricao: "Energia", vencimento: "05/06/2026", valor: "R$ 3.200" },
  { descricao: "Fornecedor B", vencimento: "10/06/2026", valor: "R$ 18.900" },
];

export default function ControladoriaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Controladoria</h1>
        <p className="text-muted-foreground">
          Controle financeiro e gestao orcamentaria
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-emerald-600">{stat.change} vs mes anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proximos Pagamentos</CardTitle>
          <CardDescription>Contas a pagar nos proximos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descricao</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayments.map((payment) => (
                <TableRow key={payment.descricao}>
                  <TableCell className="font-medium">{payment.descricao}</TableCell>
                  <TableCell>{payment.vencimento}</TableCell>
                  <TableCell className="text-right">{payment.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
