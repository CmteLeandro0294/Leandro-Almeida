'use client';

import { ThemeType } from '../lib/themeConfig';
import Image from 'next/image';

interface Props {
  onSelect: (theme: ThemeType) => void;
}

export default function ThemeSelector({ onSelect }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4">
      <h1 className="text-4xl md:text-5xl font-black text-white mb-2 text-center">
        Olá, Lorenzo!
      </h1>
      <p className="text-xl text-slate-300 mb-10">Quem você quer ser hoje?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

        {/* MAGO */}
        <button
          onClick={() => onSelect('mago')}
          className="group relative h-96 rounded-3xl bg-purple-900 border-4 border-purple-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(168,85,247,0.5)] overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="flex flex-col items-center justify-center h-full z-10 relative p-4">
            <div className="relative w-40 h-40 mb-4 group-hover:scale-110 transition-transform duration-500">
              <Image
                src="/images/mago-theme.png"
                alt="Mago"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="160px"
              />
            </div>
            <h2 className="text-3xl font-bold text-white">Mago</h2>
            <p className="text-purple-300">Poções e Feitiços</p>
          </div>
        </button>

        {/* PILOTO */}
        <button
          onClick={() => onSelect('piloto')}
          className="group relative h-96 rounded-3xl bg-sky-500 border-4 border-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(14,165,233,0.5)] overflow-hidden"
        >
          <div className="absolute top-10 left-10 text-white opacity-20 text-6xl">☁️</div>
          <div className="absolute bottom-10 right-10 text-white opacity-20 text-6xl">☁️</div>
          <div className="flex flex-col items-center justify-center h-full z-10 relative p-4">
            <div className="relative w-40 h-40 mb-4 group-hover:translate-x-4 transition-transform duration-700">
              <Image
                src="/images/piloto-theme.png"
                alt="Piloto"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="160px"
              />
            </div>
            <h2 className="text-3xl font-bold text-white">Piloto</h2>
            <p className="text-blue-100">Aviões e Rotas</p>
          </div>
        </button>

        {/* CIENTISTA */}
        <button
          onClick={() => onSelect('cientista')}
          className="group relative h-96 rounded-3xl bg-white border-4 border-green-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,197,94,0.5)] overflow-hidden"
        >
          <div className="flex flex-col items-center justify-center h-full z-10 relative p-4">
            <div className="relative w-40 h-40 mb-4 group-hover:rotate-6 transition-transform duration-500">
              <Image
                src="/images/cientista-theme.png"
                alt="Cientista"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="160px"
              />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Cientista</h2>
            <p className="text-slate-500">Experimentos</p>
          </div>
        </button>

      </div>
    </div>
  );
}
