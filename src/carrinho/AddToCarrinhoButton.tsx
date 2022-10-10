import Button from '@src/common/Button';
import { Produtos } from '@src/produtos/ProdutosTipos';
import { useAppDispatch } from '@src/store/store';
import { addProdutos } from './carrinhoSlice';

interface AddToCarrinhoButtonProps {
  className?: string;
  Produtos: Produtos;
}

function AddToCarrinhoButton({
  className,
  Produtos,
}: AddToCarrinhoButtonProps) {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="primary"
      isFullWidth
      className={className}
      onClick={() => dispatch(addProdutos(Produtos))}
    >
      Comprar
    </Button>
  );
}

export default AddToCarrinhoButton;
