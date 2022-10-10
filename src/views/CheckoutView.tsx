import AppDesign from '@src/app-design/AppDesign';
import CarrinhoItemLista from '@src/carrinho/CarrinhoItemLista';
import {
  clearCarrinho,
  selectCarrinhoItems,
} from '@src/carrinho/carrinhoSlice';
import CarrinhoTotalPreco from '@src/carrinho/CarrinhoTotalPreco';
import ClearCarrinhoButton from '@src/carrinho/ClearCarrinhoButton';
import { checkoutAPI } from '@src/checkout/checkoutAPI';
import CheckoutForm from '@src/checkout/CheckoutForm';
import CheckoutMesagemSucesso from '@src/checkout/CheckoutMesagemSucesso';
import { CompleteCheckoutArgs } from '@src/checkout/CheckoutUtils';
import Container from '@src/common/Container';
import PaginaTopo from '@src/common/PaginaTopo';
import Painel from '@src/common/Painel';
import Secao from '@src/common/Secao';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import BaseSeo from '@src/seo/BaseSeo';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

function CheckoutView() {
  const carrinhoItems = useAppSelector(selectCarrinhoItems);
  const dispatch = useAppDispatch();

  const completeCheckoutMutation = useMutation<
    void,
    ApiRequestError,
    CompleteCheckoutArgs
  >({
    mutationFn: checkoutAPI.completeCheckout,
  });

  useEffect(() => {
    if (completeCheckoutMutation.isSuccess) {
      dispatch(clearCarrinho());
    }
  }, [completeCheckoutMutation.isSuccess, dispatch]);

  return (
    <>
      <BaseSeo title="Checkout" />
      <PaginaTopo title="Checkout" />
      <Container maxWidth="sm" className="flex flex-col justify-center gap-4">
        {completeCheckoutMutation.isSuccess ? (
          <Secao title="Checkout Success" titleAs="h1" hideTitle>
            <Painel>
              <CheckoutMesagemSucesso />
            </Painel>
          </Secao>
        ) : (
          <Secao title="Carrinho" titleAs="h2" hideTitle>
            <Painel title="Carrinho" actions={<ClearCarrinhoButton />}>
              <CarrinhoItemLista />
              <CarrinhoTotalPreco />
            </Painel>
          </Secao>
        )}
        {carrinhoItems.length > 0 && (
          <Secao title="Forma de Pagamento" titleAs="h2" hideTitle>
            <Painel title="Forma de Pagamento">
              <CheckoutForm
                error={completeCheckoutMutation.error}
                onSubmit={async (values) => {
                  await completeCheckoutMutation.mutateAsync(values);
                }}
              />
            </Painel>
          </Secao>
        )}
      </Container>
    </>
  );
}

CheckoutView.Design = AppDesign;

export default CheckoutView;
