import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaprobyte",
  description: "Planificador de menús personalisados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gl" className={jakarta.className}>
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen bg-nm-bg text-slate-800 font-sans p-4">
          {/* --- HEADER / NAVBAR --- */}
          <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50">
            {/* Engadimos nm-flat para que o nav destaque sobre o fondo */}
            <nav className="nm-flat rounded-2xl px-8 h-20 flex items-center justify-between">
              {/* Menú - Texto en verde escuro para coherencia */}
              <ul className="flex gap-6 text-sm font-bold text-slate-700">
                <a href="/">
                  <li className="nm-button px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 transition-all">
                    Inisio
                  </li>
                </a>

                <a href="/planificador">
                  <li className="nm-button px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 transition-all">
                    Planificador
                  </li>
                </a>

                <a href="/froitas">
                  <li className="nm-button px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 transition-all">
                    Froitas
                  </li>
                </a>

                <a href="/peixes">
                  <li className="nm-button px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 transition-all">
                    Peixes
                  </li>
                </a>

                <a href="/verduras">
                  <li className="nm-button px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 transition-all">
                    Verduras
                  </li>
                </a>
              </ul>

              {/* Logo con laranxa para contraste e o gris verdoso profundo */}
              <div className="text-2xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
                KAPRO<span className="text-orange-500">BYTE</span>
              </div>
            </nav>
          </header>

          <main className="pt-32 pb-10">
            {/* O contenedor principal agora usa o verde de fondo e o relevo inset */}
            <div className="max-w-7xl mx-auto nm-inset rounded-[3rem] p-8 min-h-[60vh] border-none">
              {children}
            </div>
          </main>

          {/* --- FOOTER --- */}
          <footer className="max-w-7xl mx-auto mb-8">
            {/* Engadimos nm-flat ao footer para pechar o deseño con coherencia */}
            <div className="nm-flat rounded-2xl py-10 text-center">
              <p className="font-medium text-slate-600">
                © 2026{" "}
                <span className="text-orange-600 font-bold">Kaprobyte</span>.
                <span className="italic ml-2 text-slate-500">
                  Aliméntate ben para non ser un cocherito.
                </span>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
