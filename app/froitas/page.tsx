"use client";
import { useEffect, useState } from "react";

const FRUITS_BY_MONTH = {
  0: {
    name: "Xaneiro",
    items: [
      "Laranxa",
      "Mandarina",
      "Kiwi",
      "Masá",
      "Limón",
      "Pomelo",
      "Ajuacate",
    ],
  },
  1: {
    name: "Febreiro",
    items: ["Kiwi", "Laranxa", "Mandarina", "Pera", "Masá", "Ajuacate"],
  },
  2: {
    name: "Marzo",
    items: ["Amorodo", "Kiwi", "Laranxa", "Limón", "Níspero"],
  },
  3: {
    name: "Abril",
    items: ["Amorodo", "Níspero", "Pera", "Plátano", "Laranxa"],
  },
  4: {
    name: "Maio",
    items: [
      "Amorodo",
      "Sereixa",
      "Albaricoque",
      "Nectarina",
      "Ameixa",
      "Níspero",
    ],
  },
  5: {
    name: "Xuño",
    items: [
      "Sereixa",
      "Pexejo",
      "Sandía",
      "Melón",
      "Framboesa",
      "Arando",
      "Amora",
    ],
  },
  6: {
    name: "Xullo",
    items: [
      "Pexejo",
      "Nectarina",
      "Ameixa",
      "Melón",
      "Sandía",
      "Arando",
      "Pera de verán",
    ],
  },
  7: {
    name: "Agosto",
    items: [
      "Fijo",
      "Uva",
      "Pexejo",
      "Pera",
      "Melón",
      "Sandía",
      "Arando",
      "Ameixa",
    ],
  },
  8: {
    name: "Setembro",
    items: ["Uva", "Masá", "Pera", "Fijo", "Marmelo", "Kiwi", "Jranada"],
  },
  9: {
    name: "Outubro",
    items: [
      "Castaña",
      "Masá",
      "Uva",
      "Marmelo",
      "Caqui",
      "Jranada",
      "Mandarina",
    ],
  },
  10: {
    name: "Novembro",
    items: [
      "Castaña",
      "Mandarina",
      "Laranxa",
      "Caqui",
      "Kiwi",
      "Chirimoya",
      "Ajuacate",
    ],
  },
  11: {
    name: "Decembro",
    items: ["Laranxa", "Mandarina", "Kiwi", "Masá", "Uva", "Piña", "Ajuacate"],
  },
};
export default function SeasonalFruit() {
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);

  useEffect(() => {
    setCurrentMonth(new Date().getMonth());
  }, []);

  if (currentMonth === null) return null;

  const { name, items } =
    FRUITS_BY_MONTH[currentMonth as keyof typeof FRUITS_BY_MONTH];

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <div className="nm-flat rounded-[2.5rem] p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Título e Mes */}
          <div className="text-center md:text-left">
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.2em] mb-2 block">
              Tempada Local
            </span>
            <h3 className="text-2xl font-black text-slate-800">
              Froitas de <span className="text-green-700">{name}</span> 🍎
            </h3>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Teño o mal da sereixa, eu quero pero o corpo non me deixa.
            </p>
          </div>

          {/* Lista de Froitas Neumórfica */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3 max-w-md">
            {items.map((fruit) => (
              <div
                key={fruit}
                className="nm-inset px-5 py-3 rounded-xl text-slate-700 font-bold text-sm flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                {fruit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
