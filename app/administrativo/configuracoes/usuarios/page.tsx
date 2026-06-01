'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Plus, ShieldAlert, Mail, UserPlus, Pencil, Trash2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const users = [
  { id: 1, name: "Edmilson Silva", email: "edmilson@silva.adv.br", role: "Sócio", status: "Ativo", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
  { id: 2, name: "Carla Pereira", email: "carla@silva.adv.br", role: "Líder CRM", status: "Ativo", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
  { id: 3, name: "Roberto Alves", email: "roberto@silva.adv.br", role: "Advogado", status: "Pendente", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" },
];

export default function UsuariosPage() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-10 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Usuários e Acessos</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie os membros da equipe e os níveis de permissão dentro da plataforma.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Membros da Equipe</h2>
          
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger render={<Button size="sm" className="h-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90" />}>
              <Plus className="size-3.5" />
              Convidar Membro
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Convidar Membro</DialogTitle>
                <DialogDescription>
                  Envie um convite para o novo usuário se juntar ao workspace do escritório.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email corporativo</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input 
                      id="email" 
                      type="email" 
                      placeholder="exemplo@silva.adv.br"
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="role" className="text-sm font-medium">Nível de Acesso (Role)</label>
                  <select 
                    id="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="advogado">Advogado</option>
                    <option value="estagiario">Estagiário</option>
                    <option value="lider_crm">Líder CRM</option>
                    <option value="socio">Sócio</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancelar</Button>
                <Button onClick={() => setIsInviteOpen(false)} className="gap-2">
                  <UserPlus className="size-4" />
                  Enviar Convite
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm overflow-hidden">
          
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/20 text-xs font-semibold text-muted-foreground">
            <div className="col-span-5">Usuário</div>
            <div className="col-span-3">Nível de Acesso (Role)</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Ações</div>
          </div>

          {/* List */}
          {users.map((user, index) => (
            <div key={user.id} className={`grid grid-cols-12 gap-4 p-4 items-center ${index !== users.length - 1 ? 'border-b border-border/50' : ''}`}>
              <div className="col-span-5 flex items-center gap-3">
                <Avatar className="size-8 border border-border">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
              
              <div className="col-span-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/40 text-xs font-medium border border-border/50">
                  {user.role === 'Sócio' && <ShieldAlert className="size-3 text-red-500" />}
                  {user.role}
                </span>
              </div>
              
              <div className="col-span-2">
                <div className="flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-xs font-medium">{user.status}</span>
                </div>
              </div>
              
              <div className="col-span-2 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground" />}>
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="gap-2">
                      <Pencil className="size-4" /> Editar Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Key className="size-4" /> Alterar Senha
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" className="gap-2">
                      <Trash2 className="size-4" /> Remover Usuário
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
