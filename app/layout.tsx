import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
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
          {/* Aquí inyectamos el componente cliente del Navbar */}
          <Navbar />

          <main className="pt-32 pb-10">
            <div className="max-w-7xl mx-auto nm-inset rounded-[3rem] p-8 min-h-[60vh] border-none">
              {children}
            </div>
          </main>

          {/* --- FOOTER --- */}
          <footer className="max-w-7xl mx-auto mb-8">
            <div className="nm-flat rounded-xl py-10 text-center px-4">
              <p className="font-medium text-slate-600">
                © 2026{" "}
                <span className="text-orange-600 font-bold">Kaprobyte</span>.
                <span className="italic md:ml-2 block md:inline text-slate-500 mt-2 md:mt-0">
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
