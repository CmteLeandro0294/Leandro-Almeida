import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matemática do Lorenzo",
  description: "Jogo educativo de matemática com múltiplos temas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
