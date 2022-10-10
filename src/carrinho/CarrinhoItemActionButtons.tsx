import Button from '@src/common/Button';
import { CarrinhoItem } from './CarrinhoTipos';
import { DeleteIcon, MinusIcon, PlusIcon } from '@src/common/Icons';
import {
  addProdutos,
  removeCarrinhoItem,
  removeProdutos,
} from './carrinhoSlice';
import { useAppDispatch } from '@src/store/store';

interface CarrinhoItemActionButtonsProps {
  CarrinhoItem: CarrinhoItem;
}

function CarrinhoItemActionButtons({
  CarrinhoItem,
}: CarrinhoItemActionButtonsProps) {
  const dispatch = useAppDispatch();
  const produtos = CarrinhoItem.info;

  return (
    <div className="flex justify-between items-center">
      <Button
        aria-label={`Remove "${produtos.titulo}" Carrinho`}
        className="h-8 w-8 text-sm rounded-md"
        variant="secondary"
        icon={<DeleteIcon />}
        onClick={() => dispatch(removeCarrinhoItem(produtos))}
      />
      <div className="flex items-center">
        <Button
          aria-label={`Decrease "${produtos.titulo}" Count in Carrinho`}
          className="h-8 w-8 text-sm rounded-l-md rounded-r-none"
          variant="primary"
          icon={<MinusIcon />}
          onClick={() => dispatch(removeProdutos(produtos))}
        />
        <div className="h-8 w-8 text-sm border-2 flex justify-center items-center">
          {CarrinhoItem.count}
        </div>
        <Button
          aria-label={`Increase "${produtos.titulo}" no Carrinho`}
          className="h-8 w-8 text-sm rounded-r-md rounded-l-none"
          variant="primary"
          icon={<PlusIcon />}
          onClick={() => dispatch(addProdutos(produtos))}
        />
      </div>
    </div>
  );
}

export default CarrinhoItemActionButtons;
