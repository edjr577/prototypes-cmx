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
import { ShoppingCart, Package, Truck, DollarSign } from "lucide-react";

const stats = [
  { label: "Vendas Hoje", value: "R$ 45.231", change: "+18%", icon: ShoppingCart },
  { label: "Itens em Estoque", value: "12.847", change: "-3%", icon: Package },
  { label: "Pedidos Pendentes", value: "89", change: "+5%", icon: Truck },
  { label: "Faturamento Mes", value: "R$ 892K", change: "+12%", icon: DollarSign },
];

const recentOrders = [
  { id: "PED-001", cliente: "Tech Corp", valor: "R$ 12.450", status: "Enviado" },
  { id: "PED-002", cliente: "Startup Inc", valor: "R$ 8.320", status: "Processando" },
  { id: "PED-003", cliente: "Global SA", valor: "R$ 23.100", status: "Pendente" },
  { id: "PED-004", cliente: "Local LTDA", valor: "R$ 5.890", status: "Enviado" },
];

export default function ERPPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard ERP</h1>
        <p className="text-muted-foreground">
          Gestao de recursos empresariais
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
              <p className={`text-xs ${stat.change.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}>
                {stat.change} vs ontem
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Ultimos pedidos registrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.cliente}</TableCell>
                  <TableCell>{order.valor}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
