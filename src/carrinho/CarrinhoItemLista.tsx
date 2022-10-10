import Preco from '@src/common/Preco';
import CarrinhoItemActionButtons from './CarrinhoItemActionButtons';
import Lista from '@src/common/Lista';
import ListaItem from '@src/common/ListaItem';
import { CarrinhoIcon } from '@src/common/Icons';
import { useAppSelector } from '@src/store/store';
import { selectCarrinhoItems } from './carrinhoSlice';
import React from 'react';

interface CarrinhoItemListaProps {
  className?: string;
}

function CarrinhoItemLista({ className }: CarrinhoItemListaProps) {
  const CarrinhoItems = useAppSelector(selectCarrinhoItems);

  return (
    <Lista
      className={className}
      isAnimated
      emptyMessage={
        <div className="flex flex-col gap-2 justify-center items-center text-secondary-main">
          <CarrinhoIcon size={80} />
          <div className="text-xl font-semibold">Seu Carrinho está vazio</div>
        </div>
      }
    >
      {CarrinhoItems.map((CarrinhoItem) => {
        return (
          <ListaItem key={CarrinhoItem.info.id} className="border-b-2 py-2">
            <div className="flex gap-4">
              <div className="flex-grow font-semibold">
                {CarrinhoItem.info.titulo}
              </div>
              <div className="flex flex-col items-end">
                <Preco
                  className="text-primary-dark"
                  value={CarrinhoItem.info.preco * CarrinhoItem.count}
                />
              </div>
            </div>
            <div className="mt-2">
              <CarrinhoItemActionButtons CarrinhoItem={CarrinhoItem} />
            </div>
          </ListaItem>
        );
      })}
    </Lista>
  );
}

export default CarrinhoItemLista;
