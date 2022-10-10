import Button from '@src/common/Button';
import { routes } from '@src/routing/routes';
import { useAppSelector } from '@src/store/store';
import CarrinhoItemLista from './CarrinhoItemLista';
import { selectCarrinhoItems } from './carrinhoSlice';
import CarrinhoTotalPreco from './CarrinhoTotalPreco';
import ClearCarrinhoButton from './ClearCarrinhoButton';

function CarrinhoDrawerConteudo() {
  const CarrinhoItems = useAppSelector(selectCarrinhoItems);

  return (
    <div className="absolute inset-0 flex flex-col">
      <ClearCarrinhoButton />
      <CarrinhoItemLista className="flex-grow overflow-y-auto" />
      <CarrinhoTotalPreco />
      {CarrinhoItems.length > 0 && (
        <Button href={routes.checkout()} variant="primary" className="my-2">
          Finalizar Compra
        </Button>
      )}
    </div>
  );
}

export default CarrinhoDrawerConteudo;
