"use client";

import { useEffect, useState } from "react";

import menuData from "@/app/data/menus.json";

// --- Interfaces para Tipado ---
interface Prato {
  title: string;
  ingredients: string[];
}

interface ResultadoMenu {
  comidas: Prato[];
  cenas: Prato[];
  listaCompra: string[];
}

// --- Función de Lóxica ---
const xerarMenuSemanal = (): ResultadoMenu => {
  const obterAleatorios = (array: Prato[], n: number): Prato[] => {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, n);
  };

  const comidasSeleccionadas = obterAleatorios(menuData.comidas, 5);
  const cenasSeleccionadas = obterAleatorios(menuData.cenas, 5);

  const todosOsIngredientes = new Set<string>();
  [...comidasSeleccionadas, ...cenasSeleccionadas].forEach((prato) => {
    prato.ingredients.forEach((ing) =>
      todosOsIngredientes.add(ing.toLowerCase()),
    );
  });

  return {
    comidas: comidasSeleccionadas,
    cenas: cenasSeleccionadas,
    listaCompra: Array.from(todosOsIngredientes).sort(),
  };
};

export default function RandomMenuSection() {
  const [menu, setMenu] = useState<ResultadoMenu | null>(null);

  const obtenerNuevoMenu = () => {
    setMenu(xerarMenuSemanal());
  };

  useEffect(() => {
    obtenerNuevoMenu();
  }, []);

  if (!menu) return null;

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">
            Planificación Semanal (5 días)
          </h2>
          <p className="text-slate-500 font-medium">
            Suxerensias personalisadas, todo do millor!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Columna de Comidas */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-green-600 uppercase tracking-widest ml-4">
              Xantares
            </h3>
            {menu.comidas.map((item, idx) => (
              <div key={idx} className="nm-flat p-6 rounded-4xl">
                <h4 className="text-lg font-bold text-slate-800 mb-3">
                  {item.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="nm-inset text-[10px] font-bold text-green-600 px-3 py-1 rounded-lg bg-green-500/10"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Columna de Ceas */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-green-600 uppercase tracking-widest ml-4">
              Senas
            </h3>
            {menu.cenas.map((item, idx) => (
              <div key={idx} className="nm-flat p-6 rounded-4xl">
                <h4 className="text-lg font-bold text-slate-800 mb-3">
                  {item.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="nm-inset text-[10px] font-bold text-green-600 px-3 py-1 rounded-lg bg-blue-500/10"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista da Compra Unificada */}
        <div className="nm-inset p-8 rounded-[2.5rem] mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            🛒 Lista da compra necesaria
          </h3>
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8">
            {menu.listaCompra.map((ing, i) => (
              <div
                key={i}
                className="flex items-center gap-2 mb-2 text-slate-600 font-medium capitalize"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {ing}
              </div>
            ))}
          </div>
        </div>

        {/* Botón Principal */}
        <div className="flex justify-center">
          <button
            onClick={obtenerNuevoMenu}
            className="nm-button group flex items-center gap-4 px-12 py-5 rounded-2xl font-bold text-slate-700 hover:text-green-600 transition-all"
          >
            <span className="text-2xl group-active:rotate-180 transition-transform duration-500">
              🔄
            </span>
            <span className="tracking-wide">Xerar nova semana</span>
          </button>
        </div>
      </div>
    </section>
  );
}
