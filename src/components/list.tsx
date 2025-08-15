import Movieposter from "@/components/poster"; // importa o componente Movieposter para exibir o pôster dos filmes
import Link from "next/link"; // importa o componente Link do next para navegação entre páginas
import { MoviesProps } from "@/app/page";

// interface para declarar o tipo da prop movies
interface ListMoviesProps {
  movies: MoviesProps[];
}

export default function ListMovies({ movies }: ListMoviesProps) {
  return (
    <div className="bg-red-900 rounded-md w-auto p-4 text-center mx-8">
      {/* container para mostrar a lista de filmes encontrados, com fundo cinza, padding, arredondado e texto centralizado */}

      <h2 className="p-4 text-white">
        {movies.length === 0
          ? "A lista de filmes encontrados será exibida aqui"
          : "Lista de filmes encontrados"}
        {/* se o array de movies estiver vazio mostra a primeira mensagem */}
      </h2>

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

            <Movieposter poster={movie.Poster} />
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
  );
}
