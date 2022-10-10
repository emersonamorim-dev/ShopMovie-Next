import Drawer, { DrawerProps } from '@src/common/Drawer';
import CarrinhoDrawerConteudo from './CarrinhoDrawerConteudo';

type CarrinhoDrawerProps = Pick<DrawerProps, 'isOpen' | 'onClose'>;

function CarrinhoDrawer({ isOpen, onClose }: CarrinhoDrawerProps) {
  return (
    <Drawer from="right" isOpen={isOpen} title="Carrinho" onClose={onClose}>
      <CarrinhoDrawerConteudo />
    </Drawer>
  );
}

export default CarrinhoDrawer;
