import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wally | Transformación Digital e Inteligencia Artificial Enterprise",
  description: "Ayudamos a las empresas a optimizar procesos, analizar datos y escalar mediante soluciones de software e inteligencia artificial a medida de alto rendimiento.",
  keywords: ["wally", "inteligencia artificial", "transformacion digital", "desarrollo a medida", "software enterprise", "analisis de datos", "automatizacion"],
  authors: [{ name: "Wally Corp" }],
  openGraph: {
    title: "Wally | Soluciones de Software e Inteligencia Artificial",
    description: "Ayudamos a las empresas a optimizar procesos, analizar datos y escalar con IA y software premium a la medida.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${firaCode.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-brand-black text-white font-sans selection:bg-electric-blue selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
