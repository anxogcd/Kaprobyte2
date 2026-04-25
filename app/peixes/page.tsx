"use client";
import { useEffect, useState } from "react";

const SEAFOOD_BY_MONTH = {
  0: {
    name: "Xaneiro",
    blue: ["Xurelo", "Xarda", "Lirio", "Salmón"],
    white: ["Raia", "Pescada", "Abadexo", "Congro", "Faneca", "Bacallau"],
  },
  1: {
    name: "Febreiro",
    blue: ["Xarda", "Xurelo", "Lirio", "Palometa"],
    white: ["Bacallau", "Pescada", "Raia", "Faneca", "Rapante"],
  },
  2: {
    name: "Marso",
    blue: ["Xarda", "Xurelo", "Lirio", "Boga"],
    white: [
      "Bacallau",
      "Pescada",
      "Peixe sapo",
      "Linguado",
      "Raia",
      "Faneca",
      "Rapante",
    ],
  },
  3: {
    name: "Abril",
    blue: ["Xarda", "Bocarte", "Atún vermello", "Salmón"],
    white: [
      "Peixe sapo",
      "Pescada",
      "Jalo",
      "Rapante",
      "Raia",
      "Choco",
      "Faneca",
    ],
  },
  4: {
    name: "Maio",
    blue: ["Sardiña", "Bocarte", "Xarda", "Salmón"],
    white: [
      "Pescada",
      "Jalo",
      "Robalisa",
      "Bexugo",
      "Choco",
      "Faneca",
      "Rapante",
    ],
  },
  5: {
    name: "Xuño",
    blue: ["Sardiña", "Xouba", "Xurelo", "Bonito"],
    white: ["Robalisa", "San Martiño", "Pescada", "Mero", "Raia", "Faneca"],
  },
  6: {
    name: "Xullo",
    blue: ["Sardiña", "Xouba", "Bonito", "Xurelo"],
    white: ["Dourada", "Robalisa", "Mero", "Sarjo", "Jalo", "Rapante"],
  },
  7: {
    name: "Ajosto",
    blue: ["Sardiña", "Xouba", "Bonito", "Xurelo", "Xarda"],
    white: ["Dourada", "Robalisa", "Sarjo", "San Martiño", "Palmeta", "Faneca"],
  },
  8: {
    name: "Setembro",
    blue: ["Sardiña", "Xouba", "Bonito", "Xurelo"],
    white: [
      "Dourada",
      "Bexugo",
      "Pescada",
      "Sarjo",
      "Choco",
      "Faneca",
      "Rapante",
    ],
  },
  9: {
    name: "Outubro",
    blue: ["Xurelo", "Lirio", "Palometa", "Sardiña"],
    white: ["Dourada", "Bexugo", "Pescada", "Choco", "Lura", "Faneca"],
  },
  10: {
    name: "Novembro",
    blue: ["Xurelo", "Lirio", "Boga", "Palometa"],
    white: [
      "Bexugo",
      "Bacallau",
      "Pescada",
      "Lura",
      "Congro",
      "Faneca",
      "Rapante",
    ],
  },
  11: {
    name: "Desembro",
    blue: ["Xurelo", "Xarda", "Lirio", "Salmón"],
    white: ["Bexugo", "Bacallau", "Robalisa", "Peixe sapo", "Raia", "Faneca"],
  },
};

export default function SeasonalFish() {
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);

  useEffect(() => {
    setCurrentMonth(new Date().getMonth());
  }, []);

  if (currentMonth === null) return null;

  const { name, blue, white } =
    SEAFOOD_BY_MONTH[currentMonth as keyof typeof SEAFOOD_BY_MONTH];

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <div className="nm-flat rounded-[2.5rem] p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Título e Mes */}
          <div className="text-center md:text-left">
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.2em] mb-2 block">
              Tempada Local
            </span>
            <h3 className="text-3xl font-black text-slate-800">
              Peixes de <span className="text-green-700">{name}</span>
            </h3>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Consumir o que toca é máis san e sostible.
            </p>
          </div>
          <div className="flex flex-col gap-8 max-w-md ml-auto">
            {/* SECCIÓN PEIXE AZUL */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-blue-500/70 text-right pr-2">
                Peixe Azul
              </span>
              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                {blue.map((item) => (
                  <div
                    key={item}
                    className="nm-inset px-5 py-3 rounded-2xl text-slate-700 font-bold text-sm flex items-center gap-2"
                  >
                    {/* Punto azul eléctrico para o peixe azul */}
                    <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN PEIXE BRANCO */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 text-right pr-2">
                Peixe Branco
              </span>
              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                {white.map((item) => (
                  <div
                    key={item}
                    className="nm-inset px-5 py-3 rounded-2xl text-slate-600 font-bold text-sm flex items-center gap-2"
                  >
                    {/* Punto branco/prata con brillo suave para o peixe branco */}
                    <span className="w-2 h-2 bg-slate-200 rounded-full shadow-[0_0_8px_rgba(226,232,240,1)] border border-slate-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
