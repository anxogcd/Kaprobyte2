"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Planificador", path: "/planificador" },
    { name: "Froitas", path: "/froitas" },
    { name: "Peixes", path: "/peixes" },
    { name: "Verduras", path: "/verduras" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50">
      <nav className="nm-flat rounded-xl px-6 md:px-8 h-20 flex items-center justify-between relative">
        {/* Logo (Alineado a la izquierda en móvil, mantiene su estilo) */}
        <div className="text-xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
          KAPRO<span className="text-orange-500">BYTE</span>
        </div>

        {/* Botón de Hamburguesa para Móviles */}
        <button
          className="md:hidden p-2 rounded-xl nm-button text-slate-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menú de Escritorio (Oculto en móviles, visible a partir del tamaño 'md') */}
        <ul className="hidden md:flex gap-4 text-sm font-bold text-slate-700">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="nm-button block px-4 py-2 rounded-xl hover:text-green-600 transition-all"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menú Desplegable para Móviles */}
      {isOpen && (
        <div className="absolute top-24 left-0 w-full nm-flat rounded-xl p-4 md:hidden flex flex-col gap-3 text-center origin-top animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
              className="nm-button block px-4 py-3 rounded-xl font-bold text-slate-700 hover:text-green-600 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
