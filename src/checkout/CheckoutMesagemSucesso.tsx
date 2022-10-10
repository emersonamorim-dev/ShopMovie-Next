import Button from '@src/common/Button';
import { CheckOutlinedIcon } from '@src/common/Icons';
import { routes } from '@src/routing/routes';

function CheckoutMesagemSucesso() {
  return (
    <div className="flex flex-col justify-center items-center text-success-main gap-4">
      <CheckOutlinedIcon className="text-8xl" />
      <div className="font-semibold text-2xl text-center">
        Seu pedido foi recebido
      </div>
      <Button href={routes.buscar()}>Voltar para ShopMovie</Button>
    </div>
  );
}

export default CheckoutMesagemSucesso;
