import { ClientLayout } from "./client-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LegalTech - Administrativo",
};

export default function CEOLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
