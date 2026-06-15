import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alcance de Voo — Brasília',
};

export default function RangeMapPage() {
  return (
    <div className="relative w-full h-screen bg-[#0d1117]">
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-white/40 transition shadow-lg"
      >
        ← Voltar ao Jogo
      </Link>
      <iframe
        src="/brasilia-range-map.html"
        title="Mapa de alcance de voo desde Brasília"
        className="w-full h-full border-0"
      />
    </div>
  );
}
