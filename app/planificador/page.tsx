"use client";

import { useState } from "react";
import RandomMenuSection from "./planificador"; // Ajusta la ruta a tu componente

export default function Home() {
  const [usuario, setUsuario] = useState<"invitado" | "anxo" | null>(null);
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [mostrarLoginAnxo, setMostrarLoginAnxo] = useState(false);

  const handleLoginAnxo = () => {
    if (password === "comer") {
      setUsuario("anxo");
      setErrorLogin(false);
    } else {
      setErrorLogin(true);
    }
  };

  const handleCerrarSesion = () => {
    setUsuario(null);
    setPassword("");
    setMostrarLoginAnxo(false);
  };

  // --- PANTALLA DE LOGIN ---
  if (!usuario) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="nm-flat p-10 rounded-[2.5rem] max-w-md w-full text-center">
          <h1 className="text-3xl font-black text-slate-800 mb-8">
            Benvido! 👋
          </h1>

          <div className="space-y-4 flex flex-col">
            {!mostrarLoginAnxo ? (
              <>
                <button
                  onClick={() => setUsuario("invitado")}
                  className="w-full py-4 rounded-xl font-bold text-slate-700 hover:bg-slate-300 transition-colors"
                >
                  👤 Entrar como Invitado
                </button>
                <button
                  onClick={() => setMostrarLoginAnxo(true)}
                  className="w-full py-4 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg"
                >
                  👑 Entrar como Andrea e Anxo
                </button>
              </>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <input
                  type="password"
                  placeholder="Contrasinal..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLoginAnxo()}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 outline-none focus:border-green-500 font-medium"
                />
                {errorLogin && (
                  <p className="text-red-500 font-bold text-sm">
                    Contrasinal incorrecto!
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setMostrarLoginAnxo(false)}
                    className="w-1/3 py-4 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleLoginAnxo}
                    className="w-2/3 py-4 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg"
                  >
                    Entrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // --- PANTALLA PRINCIPAL (Una vez logueado) ---
  return (
    <main className="min-h-screen relative pb-20">
      {/* Barra superior con usuario y botón de salir */}
      <div className="absolute top-6 right-6 flex items-center gap-4 bg-green-100 px-5 py-2 rounded-2xl shadow-sm border border-green-100">
        <span className="font-bold text-slate-600 capitalize">
          👤 {usuario}
        </span>
        <button
          onClick={handleCerrarSesion}
          className="text-sm font-bold text-red-500 hover:text-red-700"
        >
          Saír
        </button>
      </div>

      <RandomMenuSection usuario={usuario} />
    </main>
  );
}
