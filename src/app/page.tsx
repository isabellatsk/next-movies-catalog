"use client";
// indica que este componente será renderizado no client-side, necessário para usar hooks como useState

import MoviePoster from "@/components/poster";
// importa o componente MoviePoster para exibir o pôster dos filmes

import Link from "next/link";
// importa o componente Link do next para navegação entre páginas

import { useState } from "react";
// importa o hook useState do react para gerenciar estados locais

export interface MoviesProps {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}
// define a interface typescript para o formato de um filme, usado para tipar os dados do array movies

export default function Home() {
  // componente principal da página home

  const [movies, setMovies] = useState<MoviesProps[]>([]);
  // estado para guardar o array de filmes retornados da api, inicia vazio

  const [erro, setErro] = useState("");
  // estado para guardar mensagens de erro, inicia vazio

  async function SearchMovies(event: React.FormEvent<HTMLFormElement>) {
    // função assíncrona que será executada quando o formulário for enviado

    event.preventDefault();
    // previne o comportamento padrão do form (recarregar a página)

    const formData = new FormData(event.currentTarget);
    // pega os dados do formulário submetido

    const nameMovie = formData.get("nameMovie");
    // pega o valor do campo nameMovie

    if (!nameMovie || nameMovie === "") {
      // se o campo estiver vazio ou nulo

      setErro("Nome inválido");
      // seta a mensagem de erro para avisar o usuário

      setTimeout(() => setErro(""), 3000);
      // limpa a mensagem de erro após 3 segundos

      setMovies([]);
      // limpa a lista de filmes para não mostrar resultados antigos

      return;
      // interrompe a execução da função pois o input é inválido
    }

    // monta a url da api omdb com a chave e o nome do filme pesquisado
    const url = `http://www.omdbapi.com/?apikey=58e8b40e&s=${nameMovie}`;

    try {
      const response = await fetch(url);
      // faz a requisição para a api

      const data = await response.json();
      // converte a resposta em json

      // data.Search é o array de filmes na API OMDB
      if (!data.Search) {
        // se não encontrou filmes

        setErro("Nenhum filme encontrado");
        // seta mensagem de erro

        setTimeout(() => setErro(""), 3000);
        // limpa a mensagem após 3 segundos

        setMovies([]);
        // limpa lista de filmes
      } else {
        // se encontrou filmes

        setErro("");
        // limpa qualquer mensagem de erro

        setMovies(data.Search || []);
        // atualiza o estado dos filmes com os resultados encontrados
      }
    } catch (err) {
      // se der algum erro na requisição

      console.error(err);
      // loga o erro no console para debug

      setErro("Erro ao buscar filmes");
      // avisa o usuário que ocorreu um erro

      setMovies([]);
      // limpa lista de filmes para não mostrar resultados errados

      setTimeout(() => setErro(""), 3000);
      // limpa a mensagem após 3 segundos
    }
  }

  return (
    <main className="h-screen flex flex-col items-center mt-14">
      {/* container principal da página, ocupa altura total, usa flex em coluna e centraliza itens */}

      <form
        className="bg-slate-50 flex flex-col items-center rounded-md w-70 h-auto gap-2 p-4 mb-10"
        onSubmit={SearchMovies}
      >
        {/* formulário com fundo cinza, flex coluna, arredondado, largura fixa, espaçamento e padding */}

        <h1 className="text-gray-700">Procurar filme</h1>
        {/* título do formulário */}

        <p className={`text-red-400`}>{erro}</p>
        {/* parágrafo para mostrar a mensagem de erro em vermelho */}

        <input
          name="nameMovie"
          type="text"
          placeholder="Digite o nome do filme"
          className="text-gray-700 border border-red-900 hover:border-red-700 rounded-md px-2 py-1 w-full max-w-xs focus:outline-none"
        />
        {/* campo de texto para o usuário digitar o nome do filme, com borda, arredondado e tamanho máximo */}

        <button
          type="submit"
          className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded w-full max-w-xs"
        >
          Pesquisar
        </button>
        {/* botão para enviar o formulário com fundo azul, texto branco, padding e arredondado */}
      </form>

      <div className="bg-red-900 rounded-md w-auto p-4 text-center mx-8">
        {/* container para mostrar a lista de filmes encontrados, com fundo cinza, padding, arredondado e texto centralizado */}

        <h2 className="p-4 text-white">
          {movies.length === 0
            ? "A lista de filmes encontrados será exibida aqui"
            : "Lista de filmes encontrados"}
          {/* se o array de movies estiver vazio mostra a primeira mensagem */}
        </h2>
        {/* título da lista */}

        <div
          className={`flex flex-wrap justify-center gap-4 ${
            movies.length === 0 ? "mt-0" : "mt-4"
          }`}
        >
          {/* container flexível para os filmes, com quebra de linha, centralizado e espaçamento entre itens */}

          {/* para cada elemento de movies ele mostra uma div com as informações */}
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-md p-3 w-70 h-100 shadow-md flex flex-col items-center"
            >
              {/* cartão individual de cada filme com fundo branco, arredondado, sombra, padding e itens centralizados */}

              <h3 className="text-xs text-gray-700">Ano: {movie.Year}</h3>
              {/* mostra o ano do filme */}

              <h2 className="font-bold text-sm text-center mb-2">
                {movie.Title}
              </h2>
              {/* mostra o título do filme */}

              <MoviePoster poster={movie.Poster} />
              {/* componente que mostra o pôster do filme */}

              <Link
                href={`/details?id=${movie.imdbID}`}
                className="py-1 px-4 border-1 hover:border-2 border-red-700 rounded-md mt-5 text-red-900"
              >
                Ver detalhes
              </Link>
              {/* link para página de detalhes do filme (rota dinâmica, query string) */}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
