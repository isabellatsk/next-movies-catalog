"use client"; // Indica que este componente é um componente cliente (React Client Component) no Next.js 13+

//
import { Suspense } from "react";

import { useSearchParams, useRouter } from "next/navigation";
// useSearchParams: hook para acessar os parâmetros da query string no app router
// useRouter: hook para navegação (ex: voltar página)

import { useState, useEffect } from "react";
// React hooks para estado local e efeitos colaterais

import { ChevronLeftIcon } from "lucide-react";
// Importa ícone de seta para usar no botão de voltar

import Image from "next/image";
// Componente otimizado do Next.js para imagens (lazy loading, otimizações)

interface MovieDetailProps {
  // Interface TypeScript para tipar o objeto de detalhes do filme
  Title: string;
  imdbID: string;
  Runtime: string;
  Genre: string;
  Country: string;
  Language: string;
  Plot: string;
  Poster: string;
}

function SeeDetailsContent() {
  const router = useRouter(); // instância do roteador para navegação (ex: voltar página)
  const searchParams = useSearchParams(); // hook para ler query strings atuais

  // Estado local para guardar os detalhes do filme ou null enquanto carrega
  const [movieDetail, setMovieDetail] = useState<MovieDetailProps | null>(null);

  // Pega o parâmetro "id" da query string, exemplo: ?id=tt1234567
  const queryString = searchParams.get("id");

  // useEffect para disparar o fetch dos dados sempre que a query string "id" mudar
  useEffect(() => {
    async function fetchData() {
      // Faz a requisição para a API OMDb com a chave da API e o id do filme
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=58e8b40e&i=${queryString}`
      );
      const data = await response.json(); // converte para json
      setMovieDetail(data); // atualiza o estado com os dados recebidos
    }

    fetchData(); // chama a função async dentro do useEffect
  }, [queryString]);
  // Dependência: o efeito roda sempre que queryString mudar (ex: quando navegar para outro filme)

  console.log(movieDetail); // log para debug do estado dos detalhes do filme

  // Enquanto os dados não carregarem, mostra "Carregando..."
  if (!movieDetail) {
    return <div>Carregando...</div>;
  }

  // Renderiza a interface do detalhe do filme
  return (
    // Container principal flex, centraliza conteúdo horizontal e verticalmente
    <main className="flex justify-center items-center">
      {/* Botão voltar fixo absoluto no topo esquerdo com espaçamento */}
      <button
        onClick={() => router.back()} // Volta para a página anterior ao clicar
        className="absolute top-20 left-5 p-2 text-white hover:text-gray-500 text-slate-10"
        // top-20: distancia do topo, left-5: distancia da esquerda
        // p-2: padding para área clicável maior
        // text-white + hover:text cinza para efeito visual no hover
      >
        <ChevronLeftIcon /> {/* Ícone de seta para voltar */}
      </button>

      {/* Div container do conteúdo, fundo cinza claro, bordas arredondadas, padding */}
      {/* Largura responsiva: 90% na maioria das telas e 60% em telas grandes (lg) */}
      {/* Espaço entre imagem e texto, layout em coluna em telas pequenas, linha em telas grandes */}
      <div className="bg-slate-50 rounded-md p-3 w-[90%] lg:w-[60%] h-auto mt-20 mb-10 flex flex-col lg:flex-row gap-6">
        {/* Container da imagem */}
        {/* flex-shrink-0 para impedir que encolha */}
        {/* largura total em telas pequenas, 250px em telas grandes */}
        <div className="flex-shrink-0 w-full lg:w-[250px]">
          <Image
            width={100} // largura mínima (precisa para o Next calcular o espaço)
            height={100} // altura mínima
            alt="Poster" // descrição para acessibilidade
            className="h-auto lg:h-full w-full rounded" // responsivo: altura automática no mobile, altura total no desktop
            src={
              // Operador ternário para verificar se a URL da imagem é válida
              movieDetail.Poster && movieDetail.Poster !== "N/A"
                ? movieDetail.Poster // usa imagem da API se válida
                : "/no-image.jpeg" // caso contrário, usa imagem local padrão
            }
          />
        </div>

        {/* Container das informações de texto */}
        {/* flex-1 para ocupar todo espaço restante */}
        {/* px-5 para padding horizontal */}
        <div className="flex-1 px-5">
          <h2 className="text-2xl">{movieDetail.Title}</h2>
          <p>
            <mark>Tempo:</mark> {movieDetail.Runtime}
          </p>
          <p>
            <mark>Genêro:</mark> {movieDetail.Genre}
          </p>
          <p>
            <mark>País:</mark> {movieDetail.Country}
          </p>
          <p>
            <mark>Linguagem:</mark> {movieDetail.Language}
          </p>
          <p>
            <mark>Plot:</mark> {movieDetail.Plot}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SeeDetails() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SeeDetailsContent />
    </Suspense>
  );
}
