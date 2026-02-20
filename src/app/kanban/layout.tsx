import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "✈ Hawker / Beechjet 400A — Pipeline Kanban",
  description: "Kanban board para acompanhamento de aeronaves Hawker/Beechjet 400A disponíveis no mercado",
};

export default function KanbanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
