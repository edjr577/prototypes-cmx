import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Prototypes CMX
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Bem-vindo ao projeto de protótipos. Vamos construir algo incrível!
        </p>
      </div>
      <div className="flex gap-3">
        <Button>Primario</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secundario</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </main>
  );
}
