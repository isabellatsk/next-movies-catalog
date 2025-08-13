"use client"; // indica que este componente será renderizado no client-side, necessário para usar hooks como useState
import { useState } from "react"; // importa o hook useState do react para gerenciar estados locais
import FormSearchMovies from "@/components/form"; //importa componente para exibir o formulário
import ListMovies from "@/components/list"; //importa componente para exibir a lista de filmes

export interface MoviesProps {
  // define a interface Typescript para o formato de um filme, usado para tipar os dados do array movies
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

// componente principal da página home
export default function Home() {
  const [movies, setMovies] = useState<MoviesProps[]>([]); // estado para guardar o array de filmes retornados da api, inicia vazio

  const [erro, setErro] = useState(""); // estado para guardar mensagens de erro, inicia vazio

  return (
    <main className="h-screen flex flex-col items-center mt-14">
      {/* container principal da página, ocupa altura total, usa flex em coluna e centraliza itens */}

      {/* parágrafo para mostrar a mensagem de erro em vermelho */}
      <h2 className={`text-red-400 mb-2`}>{erro}</h2>

      {/* formulário */}
      <FormSearchMovies setMovies={setMovies} setErro={setErro} />

      {/* lista de filmes */}
      <ListMovies movies={movies} />
    </main>
  );
}
