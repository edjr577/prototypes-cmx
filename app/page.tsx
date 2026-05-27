"use client";

import { useState } from "react";
import { Sidebar, type ViewType } from "@/components/sidebar";
import { CRMView, ERPView, ControladoriaView } from "@/components/views";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("crm");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="ml-64 flex-1 p-6">
        {activeView === "crm" && <CRMView />}
        {activeView === "erp" && <ERPView />}
        {activeView === "controladoria" && <ControladoriaView />}
      </main>
    </div>
  );
}
