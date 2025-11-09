// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { NavigationTransition } from "@/components/navigation-transition";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Dancing_Script, Caveat } from "next/font/google";

// Fuentes personalizadas desde Google Fonts
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

// Metadatos SEO
export const metadata: Metadata = {
  title: "TIKI PR - Agencia de Producción Creativa & Relaciones Públicas | México",
  description:
    "Agencia de Producción Creativa, Relaciones Públicas & Marketing en México. Transformamos ideas en historias de impacto con más de 1000 publicaciones exitosas. Especialistas en estrategia integrada.",
  keywords:
    "agencia PR, relaciones públicas México, producción creativa, marketing digital, comunicación estratégica",
  authors: [{ name: "TIKI PR" }],
  generator: "v0.app",
  openGraph: {
    title: "TIKI PR - Conectamos y Comunicamos Tus Ideas",
    description: "Agencia de Producción Creativa, Relaciones Públicas & Marketing",
    type: "website",
    locale: "es_MX",
  },
};

// Layout raíz
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Aplicar tema antes del hidratado para evitar FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('light', theme === 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body
        className={`font-sans antialiased bg-background text-foreground ${dancingScript.variable} ${caveat.variable}`}
      >
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}