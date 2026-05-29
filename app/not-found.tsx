import { Sidebar } from "@/components/sidebar";
import { Hammer } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex bg-background h-[calc(100vh-3.5rem)] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 mr-4 mb-4 mt-2 ml-1 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Hammer className="size-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Página em Construção</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            Este módulo ainda não foi implementado no protótipo atual. Continue navegando pelos outros menus disponíveis.
          </p>
          <Link 
            href="/administrativo" 
            className="px-6 py-2.5 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Voltar para Visão Geral
          </Link>
        </div>
      </main>
    </div>
  );
}
