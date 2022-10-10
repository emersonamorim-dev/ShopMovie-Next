import Badge from '@src/common/Badge';
import Button from '@src/common/Button';
import { useDrawer } from '@src/common/Drawer';
import { CarrinhoIcon } from '@src/common/Icons';
import Preco from '@src/common/Preco';
import { useAppSelector } from '@src/store/store';
import CarrinhoDrawer from './CarrinhoDrawer';
import { selectProdutosCount, selectTotalPreco } from './carrinhoSlice';

function CarrinhoInfo() {
  const totalPreco = useAppSelector(selectTotalPreco);
  const ProdutosCount = useAppSelector(selectProdutosCount);
  const { isOpen, open, close } = useDrawer();

  return (
    <>
      <Badge value={ProdutosCount}>
        <Button
          aria-label="Open Carrinho Info"
          className="text-lg"
          icon={<CarrinhoIcon />}
          onClick={open}
        >
          <Preco value={totalPreco} />
        </Button>
      </Badge>
      <CarrinhoDrawer isOpen={isOpen} onClose={close} />
    </>
  );
}

export default CarrinhoInfo;
