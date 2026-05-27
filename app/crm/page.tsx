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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Building2, Target, TrendingUp } from "lucide-react";

const stats = [
  { label: "Contatos", value: "2.847", change: "+12%", icon: Users },
  { label: "Empresas", value: "438", change: "+8%", icon: Building2 },
  { label: "Oportunidades", value: "156", change: "+23%", icon: Target },
  { label: "Conversao", value: "24.8%", change: "+4.2%", icon: TrendingUp },
];

const recentContacts = [
  { name: "Maria Silva", email: "maria@empresa.com", status: "Ativo" },
  { name: "Joao Santos", email: "joao@corp.com", status: "Novo" },
  { name: "Ana Oliveira", email: "ana@tech.com", status: "Ativo" },
  { name: "Pedro Costa", email: "pedro@startup.com", status: "Pendente" },
];

export default function CRMPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard CRM</h1>
        <p className="text-muted-foreground">
          Visao geral do relacionamento com clientes
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
              <p className="text-xs text-emerald-600">{stat.change} este mes</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contatos Recentes</CardTitle>
          <CardDescription>Ultimos contatos adicionados ao sistema</CardDescription>
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
              {recentContacts.map((contact) => (
                <TableRow key={contact.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src="" alt={contact.name} />
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{contact.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {contact.email}
                  </TableCell>
                  <TableCell>
                    <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                      {contact.status}
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
