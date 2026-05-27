"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Package,
  PieChart,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const modules = [
  {
    name: "CRM",
    description: "Gestao de clientes",
    href: "/crm",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    name: "ERP",
    description: "Recursos empresariais",
    href: "/erp",
    icon: Package,
    color: "bg-emerald-500",
  },
  {
    name: "Controladoria",
    description: "Financeiro e controle",
    href: "/controladoria",
    icon: PieChart,
    color: "bg-amber-500",
  },
];

export function Header() {
  const pathname = usePathname();

  const currentModule = modules.find((m) => pathname.startsWith(m.href));

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9">
              <LayoutGrid data-icon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Modulos</DropdownMenuLabel>
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <DropdownMenuItem key={module.href} asChild>
                    <Link
                      href={module.href}
                      className="flex cursor-pointer items-center gap-3 py-2"
                    >
                      <span
                        className={`flex size-9 items-center justify-center rounded-lg ${module.color} text-white`}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium">{module.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {module.description}
                        </span>
                      </span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">CMX</span>
          {currentModule && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="text-lg font-medium text-foreground">
                {currentModule.name}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="size-9">
          <Search data-icon />
        </Button>
        <Button variant="ghost" size="icon" className="size-9">
          <Bell data-icon />
        </Button>
        <Avatar className="size-8">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
