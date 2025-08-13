import type { Metadata } from "next"; // importa o tipo metadata do next para tipar os metadados da página
import { Geist, Geist_Mono } from "next/font/google"; // importa as fontes geist e geist_mono do google fonts via next/font/google
import "./globals.css"; // importa o arquivo global de estilos css

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
// configura a fonte geist sans, criando uma variável css --font-geist-sans
// o subset latin indica que só vai carregar caracteres latinos

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// configura a fonte geist mono, criando a variável css --font-geist-mono
// também com subset latin para caracteres latinos

export const metadata: Metadata = {
  title: "Catálogo de filmes",
  description: "Um catálogo simples para buscar filmes",
};
// exporta o objeto metadata que contém título e descrição da aplicação
// isso é usado pelo next para inserir as metatags no head da página

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // define o componente root layout, que recebe os filhos (children)
  // readonly e tipado como React.ReactNode para garantir imutabilidade e tipo correto

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* tag body com classes css:
          - geistSans.variable e geistMono.variable: adiciona as variáveis css das fontes para uso global
          - antialiased: para suavizar a renderização das fontes */}
        <header className="bg-red-900 w-full py-3 px-3 text-center text-2xl text-white">
          <h2>CATÁLOGO DE FILMES</h2>
        </header>{" "}
        {/* header fixo no topo com fundo azul escuro, texto branco centralizado, tamanho 2xl */}
        {children} {/* renderiza o conteúdo filho passado para o layout */}
      </body>
    </html>
  );
}
