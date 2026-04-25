"use client";

import menuData from "@/app/data/menus.json";
import { useEffect, useState } from "react";

// --- Interfaces para Tipado ---
interface Prato {
  title: string;
  ingredients: string[];
}

// Nueva interfaz para almacenar el nombre y la cantidad
interface IngredienteCompra {
  nome: string;
  cantidade: number;
}

interface ResultadoMenu {
  comidas: Prato[];
  cenas: Prato[];
  listaCompra: IngredienteCompra[];
  totalIngredientes: number;
}

// --- Función de Lóxica ---
const xerarMenuSemanal = (): ResultadoMenu => {
  const obterAleatorios = (array: Prato[], n: number): Prato[] => {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, n);
  };

  const comidasSeleccionadas = obterAleatorios(menuData.comidas, 5);
  const cenasSeleccionadas = obterAleatorios(menuData.cenas, 5);

  // Usamos un Map para llevar la cuenta de las repeticiones
  const conteoIngredientes = new Map<string, number>();

  [...comidasSeleccionadas, ...cenasSeleccionadas].forEach((prato) => {
    prato.ingredients.forEach((ing) => {
      const ingNormalizado = ing.toLowerCase();
      const cantidadeActual = conteoIngredientes.get(ingNormalizado) || 0;
      conteoIngredientes.set(ingNormalizado, cantidadeActual + 1);
    });
  });

  // Convertimos el Map en un array de objetos y lo ordenamos
  // 1º Por cantidad (de mayor a menor)
  // 2º Por orden alfabético
  const listaFinal: IngredienteCompra[] = Array.from(
    conteoIngredientes,
    ([nome, cantidade]) => ({ nome, cantidade }),
  ).sort((a, b) => {
    if (b.cantidade !== a.cantidade) {
      return b.cantidade - a.cantidade;
    }
    return a.nome.localeCompare(b.nome);
  });

  return {
    comidas: comidasSeleccionadas,
    cenas: cenasSeleccionadas,
    listaCompra: listaFinal,
    totalIngredientes: listaFinal.length, // Sigue indicando los artículos únicos a comprar
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

        {/* Lista da Compra Unificada con Contador */}
        <div className="nm-inset p-8 rounded-[2.5rem] mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              🛒 Lista da compra necesaria
            </h3>
            {/* Indicador de número de ingredientes únicos */}
            <div className="flex items-center gap-2 bg-white/50 self-start px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total:
              </span>
              <span className="text-xl font-black text-green-600">
                {menu.totalIngredientes}
              </span>
              <span className="text-sm font-bold text-slate-500">artigos</span>
            </div>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-x-8 gap-y-4">
            {menu.listaCompra.map((ing, i) => (
              <div
                key={i}
                className="flex items-center gap-3 mb-3 text-slate-600 font-medium capitalize break-inside-avoid"
              >
                {/* Etiqueta indicando la cantidad a la izquierda */}
                <span className="text-[11px] font-black text-green-700 bg-green-100 px-2.5 py-1 rounded-lg shrink-0">
                  {ing.cantidade}x
                </span>
                <span className="truncate">{ing.nome}</span>
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
