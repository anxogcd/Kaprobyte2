"use client";

import { loadAnxoData, saveAnxoData } from "@/app/actions/session";
import menuData from "@/app/data/menus.json";
import { useEffect, useState } from "react";

// --- Interfaces para Tipado ---
interface Prato {
  title: string;
  ingredients: string[];
}
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
  const conteoIngredientes = new Map<string, number>();

  [...comidasSeleccionadas, ...cenasSeleccionadas].forEach((prato) => {
    prato.ingredients.forEach((ing) => {
      const ingNormalizado = ing.toLowerCase();
      conteoIngredientes.set(
        ingNormalizado,
        (conteoIngredientes.get(ingNormalizado) || 0) + 1,
      );
    });
  });

  const listaFinal: IngredienteCompra[] = Array.from(
    conteoIngredientes,
    ([nome, cantidade]) => ({ nome, cantidade }),
  ).sort((a, b) =>
    b.cantidade !== a.cantidade
      ? b.cantidade - a.cantidade
      : a.nome.localeCompare(b.nome),
  );

  return {
    comidas: comidasSeleccionadas,
    cenas: cenasSeleccionadas,
    listaCompra: listaFinal,
    totalIngredientes: listaFinal.length,
  };
};

export default function RandomMenuSection({
  usuario,
}: {
  usuario: "invitado" | "anxo";
}) {
  const [menu, setMenu] = useState<ResultadoMenu | null>(null);
  const [marcados, setMarcados] = useState<string[]>([]);
  const [pratosMarcados, setPratosMarcados] = useState<string[]>([]); // Novo estado para pratos
  const [cargando, setCargando] = useState(true);

  // 1. Cargar datos iniciales según el tipo de usuario
  useEffect(() => {
    const inicializarDatos = async () => {
      setCargando(true);
      if (usuario === "anxo") {
        const data = await loadAnxoData();
        if (data && data.menu) {
          setMenu(data.menu);
          setMarcados(data.marcados || []);
          setPratosMarcados(data.pratosMarcados || []); // Recuperamos os pratos marcados
        } else {
          generarYGuardarNuevoMenu();
        }
      } else {
        const menuGuardado = localStorage.getItem("menuSemanal");
        const marcadosGuardados = localStorage.getItem("ingredientesMarcados");
        if (menuGuardado) {
          setMenu(JSON.parse(menuGuardado));
          if (marcadosGuardados) setMarcados(JSON.parse(marcadosGuardados));
        } else {
          generarYGuardarNuevoMenu();
        }
      }
      setCargando(false);
    };

    inicializarDatos();
  }, [usuario]);

  // 2. Función para generar un nuevo menú y guardarlo
  const generarYGuardarNuevoMenu = async () => {
    const nuevoMenu = xerarMenuSemanal();
    setMenu(nuevoMenu);
    setMarcados([]);
    setPratosMarcados([]); // Reset de pratos

    if (usuario === "anxo") {
      await saveAnxoData(nuevoMenu, [], []);
    } else {
      localStorage.setItem("menuSemanal", JSON.stringify(nuevoMenu));
      localStorage.setItem("ingredientesMarcados", JSON.stringify([]));
    }
  };

  // 3. Función para tachar ingredientes
  const toggleMarcado = async (nomeIngrediente: string) => {
    // 1. Calculamos a nova lista de forma síncrona
    const nuevaListaMarcados = marcados.includes(nomeIngrediente)
      ? marcados.filter((item) => item !== nomeIngrediente)
      : [...marcados, nomeIngrediente];

    // 2. Actualizamos o estado visual de React
    setMarcados(nuevaListaMarcados);

    // 3. Gardamos onde corresponda usando a variable xa calculada
    if (usuario === "invitado") {
      localStorage.setItem(
        "ingredientesMarcados",
        JSON.stringify(nuevaListaMarcados),
      );
    }

    if (usuario === "anxo" && menu) {
      await saveAnxoData(menu, nuevaListaMarcados, pratosMarcados);
    }
  };

  // 4. NOVA Función: Marcar/Desmarcar pratos (Só para Anxo)
  const togglePrato = async (tituloPrato: string) => {
    if (usuario !== "anxo") return;

    // 1. Calculamos a nova lista de forma síncrona
    const novaListaPratos = pratosMarcados.includes(tituloPrato)
      ? pratosMarcados.filter((t) => t !== tituloPrato)
      : [...pratosMarcados, tituloPrato];

    // 2. Actualizamos o estado visual de React
    setPratosMarcados(novaListaPratos);

    // 3. Enviamos a nova lista ao servidor xunto co resto de datos
    if (menu) {
      await saveAnxoData(menu, marcados, novaListaPratos);
    }
  };

  if (cargando)
    return (
      <div className="text-center py-20 font-bold text-slate-500 animate-pulse">
        Cargando datos...
      </div>
    );
  if (!menu) return null;

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">
            Planificasión Semanal (5 días)
          </h2>
          <p className="text-slate-500 font-medium">
            Suxerensias personalisadas con todo do millor para{" "}
            <span className="font-bold capitalize text-green-600">
              {usuario}.
            </span>{" "}
            Se non che molan, dáñe outra ves ao botón!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* XANTARES */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-green-600 uppercase tracking-widest ml-4">
              Xantares
            </h3>
            {menu.comidas.map((item, idx) => {
              const pratoMarcado = pratosMarcados.includes(item.title);
              return (
                <div
                  key={idx}
                  onClick={() => togglePrato(item.title)}
                  className={`nm-flat p-6 rounded-4xl transition-all duration-300 ${
                    usuario === "anxo" ? "cursor-pointer select-none" : ""
                  } ${pratoMarcado ? "ring-2 ring-orange-500 bg-orange-500/5 opacity-80" : ""}`}
                >
                  <h4
                    className={`text-lg font-bold mb-3 ${pratoMarcado ? "text-orange-600" : "text-slate-800"}`}
                  >
                    {item.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className={`nm-inset text-[10px] font-bold px-3 py-1 rounded-lg ${
                          pratoMarcado
                            ? "text-orange-600 bg-orange-500/10"
                            : "text-green-600 bg-green-500/10"
                        }`}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CEAS */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-green-600 uppercase tracking-widest ml-4">
              Senas
            </h3>
            {menu.cenas.map((item, idx) => {
              const pratoMarcado = pratosMarcados.includes(item.title);
              return (
                <div
                  key={idx}
                  onClick={() => togglePrato(item.title)}
                  className={`nm-flat p-6 rounded-4xl transition-all duration-300 ${
                    usuario === "anxo" ? "cursor-pointer select-none" : ""
                  } ${pratoMarcado ? "ring-2 ring-orange-500 bg-orange-500/5 opacity-80" : ""}`}
                >
                  <h4
                    className={`text-lg font-bold mb-3 ${pratoMarcado ? "text-orange-600" : "text-slate-800"}`}
                  >
                    {item.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className={`nm-inset text-[10px] font-bold px-3 py-1 rounded-lg ${
                          pratoMarcado
                            ? "text-orange-600 bg-orange-500/10"
                            : "text-blue-600 bg-blue-500/10"
                        }`}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LISTA DA COMPRA */}
        <div className="nm-inset p-8 rounded-[2.5rem] mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              🛒 Lista da compra
            </h3>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-2xl">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total:
              </span>
              <span className="text-xl font-black text-green-600">
                {menu.totalIngredientes}
              </span>
            </div>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-x-8 gap-y-4">
            {menu.listaCompra.map((ing, i) => {
              const estaMarcado = marcados.includes(ing.nome);
              return (
                <div
                  key={i}
                  onClick={() => toggleMarcado(ing.nome)}
                  className={`flex items-center gap-3 mb-3 font-medium capitalize break-inside-avoid cursor-pointer select-none transition-all duration-300 ${
                    estaMarcado
                      ? "text-slate-400 line-through opacity-60"
                      : "text-slate-600 hover:text-green-700"
                  }`}
                >
                  <span
                    className={`text-[11px] font-black px-2.5 py-1 rounded-lg shrink-0 transition-colors duration-300 ${
                      estaMarcado
                        ? "bg-slate-200 text-slate-500"
                        : "text-green-700 bg-green-100"
                    }`}
                  >
                    {ing.cantidade}x
                  </span>
                  <span className="truncate">{ing.nome}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={generarYGuardarNuevoMenu}
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
