"use client"; // indica que este componente será renderizado no client-side, necessário para usar hooks como useState
import { MoviesProps } from "@/app/page"; //importa a interface MovieProps da page

// interface que declara o tipo das props do componente FormSearchMovies
interface FormSearchMoviesProps {
  setMovies: React.Dispatch<React.SetStateAction<MoviesProps[]>>;
  setErro: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormSearchMovies({
  setMovies,
  setErro,
}: FormSearchMoviesProps) {
  //função para puxar dados da api com base no que o usuário digitou no formulário
  async function SearchMovies(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // previne o comportamento padrão do form (recarregar a página)

    const formData = new FormData(event.currentTarget); // pega os dados do formulário submetido

    const nameMovie = formData.get("nameMovie"); // pega o valor do campo nameMovie

    // se o campo estiver vazio ou nulo
    if (!nameMovie || nameMovie === "") {
      setErro("Nome inválido"); // seta a mensagem de erro para avisar o usuário
      setTimeout(() => setErro(""), 3000); // limpa a mensagem de erro após 3 segundos
      setMovies([]); // limpa a lista de filmes para não mostrar resultados antigos
      return; // interrompe a execução da função pois o input é inválido
    }

    // monta a url da api omdb com a chave e o nome do filme pesquisado
    const url = `http://www.omdbapi.com/?apikey=58e8b40e&s=${nameMovie}`;

    try {
      const response = await fetch(url); // faz a requisição para a api
      const data = await response.json(); // converte a resposta em json

      // data.Search é o array de filmes na API OMDB
      if (!data.Search) {
        // se não encontrou filmes

        setErro("Nenhum filme encontrado"); // seta mensagem de erro
        setTimeout(() => setErro(""), 3000); // limpa a mensagem após 3 segundos
        setMovies([]); // limpa lista de filmes
      } else {
        // se encontrou filmes
        setErro(""); // limpa qualquer mensagem de erro

        setMovies(data.Search || []); // atualiza o estado dos filmes com os resultados encontrados
      }
    } catch (err) {
      // se der algum erro na requisição

      console.error(err); // loga o erro no console para debug
      setErro("Erro ao buscar filmes"); // avisa o usuário que ocorreu um erro
      setMovies([]); // limpa lista de filmes para não mostrar resultados errados
      setTimeout(() => setErro(""), 3000); // limpa a mensagem após 3 segundos
    }
  }

  return (
    <form
      className="bg-slate-50 flex flex-col items-center rounded-md w-70 h-auto gap-2 p-4 mb-10"
      onSubmit={SearchMovies}
    >
      <h1 className="text-gray-700">Procurar filme</h1>{" "}
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
  );
}
