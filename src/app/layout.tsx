import type { Metadata } from "next";
import { Lexend, Domine } from "next/font/google"; 
import "./globals.scss";
import { ThemeProvider } from "@/components/ThemeProvider";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const domineFont = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quero Notebook | Promoções e Histórico de Preços",
  description: "Encontre os melhores Notebooks, Tablets e Monitores em promoção na Amazon e Mercado Livre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${lexend.variable} ${domineFont.variable}`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
