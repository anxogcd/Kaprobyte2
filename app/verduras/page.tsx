"use client";
import { useEffect, useState } from "react";

const VEGETABLES_BY_MONTH = {
  0: {
    name: "Xaneiro",
    items: [
      "Jrelo",
      "Nabisa",
      "Repolo",
      "Porro",
      "Senoria",
      "Brócoli",
      "Coliflor",
    ],
  },
  1: {
    name: "Febreiro",
    items: ["Jrelo", "Nabisa", "Repolo", "Coliflor", "Espinaca", "Allo"],
  },
  2: {
    name: "Marso",
    items: ["Jrelo", "Espinaca", "Leituja", "Nabisa", "Porro"],
  },
  3: {
    name: "Abril",
    items: [
      "Chícharo",
      "Sebola nova",
      "Leituja",
      "Espinaca",
      "Espárrajo",
      "Remolacha",
    ],
  },
  4: {
    name: "Maio",
    items: [
      "Chícharo",
      "Xudía",
      "Leituja",
      "Senoria",
      "Repolo de verán",
      "Sebola nova",
    ],
  },
  5: {
    name: "Xuño",
    items: [
      "Pemento de Padrón",
      "Xudía",
      "Cabasiña",
      "Cojombro",
      "Senoria",
      "Leituja",
    ],
  },
  6: {
    name: "Xullo",
    items: [
      "Pemento de Padrón",
      "Tomate",
      "Xudía",
      "Cabasiña",
      "Cojombro",
      "Pemento vermello",
    ],
  },
  7: {
    name: "Ajosto",
    items: [
      "Tomate",
      "Pemento de Padrón",
      "Berenxena",
      "Sebola",
      "Cabasa",
      "Xudía",
    ],
  },
  8: {
    name: "Setembro",
    items: [
      "Tomate",
      "Pemento de Padrón",
      "Cabasa",
      "Pemento de Mouján",
      "Cabasiña",
      "Sebola",
    ],
  },
  9: {
    name: "Outubro",
    items: ["Cabasa", "Nabisa", "Senoria", "Porro", "Repolo", "Berenxena"],
  },
  10: {
    name: "Novembro",
    items: ["Nabisa", "Repolo", "Coliflor", "Porro", "Castaña", "Cabasa"],
  },
  11: {
    name: "Decembro",
    items: [
      "Nabisa",
      "Jrelo temperán",
      "Repolo",
      "Brócoli",
      "Porro",
      "Coliflor",
    ],
  },
};

export default function SeasonalFruit() {
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);

  useEffect(() => {
    setCurrentMonth(new Date().getMonth());
  }, []);

  if (currentMonth === null) return null;

  const { name, items } =
    VEGETABLES_BY_MONTH[currentMonth as keyof typeof VEGETABLES_BY_MONTH];

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
              Verduras de <span className="text-green-700">{name}</span> 🥬
            </h3>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Arrós con chícharos, patacas novas...
            </p>
          </div>

          {/* Lista de Froitas Neumórfica */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3 max-w-md">
            {items.map((vegetable) => (
              <div
                key={vegetable}
                className="nm-inset px-5 py-3 rounded-2xl text-slate-700 font-bold text-sm flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                {vegetable}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
