import AddToCarrinhoButton from '@src/carrinho/AddToCarrinhoButton';
import NextLink from '@src/routing/NextLink';
import BaseImagem from '@src/common/BaseImagem';
import Chip from '@src/common/Chip';
import Preco from '@src/common/Preco';
import { Produtos } from './ProdutosTipos';
import { routes } from '@src/routing/routes';
import React from 'react';

interface ProdutosCardProps {
  produtos: Produtos;
}

function ProdutosCard({ produtos }: ProdutosCardProps) {
  return (
    <article className="flex flex-col h-full group border-2 p-2 rounded-md">
      <div className="relative cursor-pointer">
        <NextLink
          href={routes.produtos({ params: { produtosId: produtos.id } })}
        >
          <div className="p-2 ">
            <div className="transition duration-500 ease-out bg-transparent p-2 transform group-hover:scale-110">
              <BaseImagem
                src={produtos.imagem}
                alt={produtos.titulo}
                layout="responsive"
                height={12}
                width={10}
                objectFit="contain"
              />
            </div>
          </div>
        </NextLink>
      </div>
      <div className="mt-2 flex flex-col items-center">
        <div className="text-md">
          <Preco className="text-primary-dark" value={produtos.preco} />
        </div>
        <h2 className="font-bold text-sm flex-grow text-center">
          {produtos.titulo}
        </h2>
        <NextLink
          href={routes.buscar({
            query: { categorias: [produtos.categoria.value] },
          })}
          className="mt-2"
        >
          <Chip variant="secondary">{produtos.categoria.titulo}</Chip>
        </NextLink>
      </div>
      <div className="flex-grow" />
      <div className="mt-4">
        <AddToCarrinhoButton Produtos={produtos} />
      </div>
    </article>
  );
}

export default ProdutosCard;
