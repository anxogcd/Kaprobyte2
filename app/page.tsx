"use client";
import menuData from "@/app/data/menus.json";
import { useEffect, useState } from "react";

export default function RandomMenuSection() {
  const [seleccion, setSeleccion] = useState({
    comida: { title: "", ingredients: [] as string[] },
    cena: { title: "", ingredients: [] as string[] },
  });

  const obtenerNuevoMenu = () => {
    const comidas = menuData.comidas;
    const cenas = menuData.cenas;

    const comidaAleatoria = comidas[Math.floor(Math.random() * comidas.length)];
    const cenaAleatoria = cenas[Math.floor(Math.random() * cenas.length)];

    setSeleccion({
      comida: comidaAleatoria,
      cena: cenaAleatoria,
    });
  };

  useEffect(() => {
    obtenerNuevoMenu();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">
            Suxerensia do día
          </h2>
          <p className="text-slate-500 font-medium">
            Baseada no teu plan nutrisional de{" "}
            <span className="text-green-600">Kaprobyte</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Card Comida */}
          <div className="nm-flat p-8 rounded-[2.5rem] flex flex-col h-full">
            <div className="mb-6">
              <span className="nm-inset text-green-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                Xantar
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6 min-h-14">
              {seleccion.comida.title}
            </h3>
            <div className="flex flex-wrap gap-3 mt-auto">
              {seleccion.comida.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="nm-flat text-xs font-semibold text-slate-500 px-4 py-2 rounded-xl"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Card Cena */}
          <div className="nm-flat p-8 rounded-[2.5rem] flex flex-col h-full">
            <div className="mb-6">
              <span className="nm-inset text-green-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                Sena
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6 min-h-14">
              {seleccion.cena.title}
            </h3>
            <div className="flex flex-wrap gap-3 mt-auto">
              {seleccion.cena.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="nm-flat text-xs font-semibold text-slate-500 px-4 py-2 rounded-xl"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Botón Principal Neumórfico */}
        <div className="flex justify-center">
          <button
            onClick={obtenerNuevoMenu}
            className="nm-button group flex items-center gap-4 px-12 py-5 rounded-2xl font-bold text-slate-700 hover:text-green-600"
          >
            <span className="text-2xl group-active:rotate-180 transition-transform duration-500">
              🔄
            </span>
            <span className="tracking-wide">Propoñer outro menú</span>
          </button>
        </div>
      </div>
    </section>
  );
}
