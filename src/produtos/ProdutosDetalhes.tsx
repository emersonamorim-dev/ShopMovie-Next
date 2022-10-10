import BaseImage from '@src/common/BaseImagem';
import Chip from '@src/common/Chip';
import NextLink from '@src/routing/NextLink';
import Preco from '@src/common/Preco';
import AddToCarrinhoButton from '@src/carrinho/AddToCarrinhoButton';
import { Produtos } from './ProdutosTipos';
import { routes } from '@src/routing/routes';
import React from 'react';

interface ProdutosDetalhesProps {
  produtos: Produtos;
}

function ProdutosDetalhes({ produtos }: ProdutosDetalhesProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex-1">
        <BaseImage
          src={produtos.imagem}
          alt={produtos.titulo}
          height={10}
          width={10}
          objectFit="contain"
          layout="responsive"
          priority
        />
      </div>
      <div className="flex-1 flex flex-col items-center gap-4">
        <div className="text-center flex flex-col gap-2">
          <div className="font-bold text-2xl">{produtos.titulo}</div>
          <div className="text-4xl">
            <Preco className="text-primary-dark" value={produtos.preco} />
          </div>
        </div>
        <AddToCarrinhoButton className="max-w-xs" Produtos={produtos} />
        <p>{produtos.descricao}</p>
        <NextLink
          href={routes.buscar({
            query: { categorias: [produtos.categoria.value] },
          })}
        >
          <Chip variant="secondary">{produtos.categoria.titulo}</Chip>
        </NextLink>
      </div>
    </div>
  );
}

export default ProdutosDetalhes;
