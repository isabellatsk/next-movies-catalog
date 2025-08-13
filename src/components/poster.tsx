"use client";
// indica que esse componente será renderizado no client-side, necessário para usar useState

import Image from "next/image";
// importa o componente Image do next para carregar imagens otimizadas

import { useState } from "react";
// importa o hook useState do react para gerenciar estado local

function isValidPoster(poster: string | null | undefined) {
  // função para validar se a url do pôster é válida

  if (!poster) return false;
  // se o poster for null, undefined ou vazio, retorna falso

  if (poster === "N/A") return false;
  // se for a string "N/A" (como a api pode retornar), retorna falso

  if (poster.trim() === "") return false;
  // se for string só com espaços em branco, retorna falso

  return true;
  // caso contrário, considera válido e retorna true
}

export default function MoviePoster({
  poster,
}: {
  poster: string | null | undefined;
}) {
  // componente que recebe a prop poster, que pode ser string, null ou undefined

  const [imgSrc, setImgSrc] = useState(
    isValidPoster(poster) ? poster ?? "/no-image.jpeg" : "/no-image.jpeg"
  );
  // cria estado imgSrc para controlar qual imagem será exibida
  // se o poster for válido, usa ele (se undefined, usa a imagem padrão)
  // se inválido, já usa direto a imagem padrão "/no-image.jpeg"

  return (
    <Image
      src={imgSrc ?? "/no-image.jpeg"}
      // usa a imgSrc no src, caso seja null ou undefined usa a imagem padrão

      alt="poster do filme"
      // texto alternativo para acessibilidade

      width={200}
      // largura fixa da imagem

      height={250} // nao altera nada
      // altura fixa da imagem, mas provavelmente não afeta visual pois a imagem pode se ajustar ao container (object-cover)

      className="h-[250px] rounded-md"
      // css para ajustar a imagem cobrindo o espaço e com cantos arredondados

      onError={() => setImgSrc("/no-image.jpeg")}
      // se a imagem não carregar (erro), troca para a imagem padrão
    />
  );
}
