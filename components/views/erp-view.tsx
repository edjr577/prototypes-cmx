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
import { Package, Boxes, ClipboardList, Truck } from "lucide-react";

const inventoryCategories = [
  { name: "Materias-primas", quantity: 0, icon: Boxes },
  { name: "Produtos acabados", quantity: 0, icon: Package },
  { name: "Em producao", quantity: 0, icon: ClipboardList },
  { name: "Em transito", quantity: 0, icon: Truck },
];

export function ERPView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Recursos e Operacoes (ERP)
        </h1>
        <p className="text-muted-foreground">
          Controle de estoque, ordens de servico e operacoes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {inventoryCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription>{category.name}</CardDescription>
                <Icon className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">
                  {category.quantity}
                </p>
                <p className="text-xs text-muted-foreground">itens em estoque</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Controle de Estoque</CardTitle>
            <CardDescription>
              Visao geral dos produtos em estoque
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <Skeleton className="mb-3 h-20 w-full rounded-md" />
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col items-center justify-center py-4">
              <p className="text-sm text-muted-foreground">
                Nenhum produto cadastrado
              </p>
              <p className="text-xs text-muted-foreground">
                Adicione produtos ao estoque
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ordens de Servico</CardTitle>
            <CardDescription>
              Acompanhe suas ordens de servico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numero</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <ClipboardList className="size-10 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        Nenhuma ordem de servico
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Crie uma nova ordem para comecar
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
