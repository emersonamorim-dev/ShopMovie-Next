import 'react-credit-cards/es/styles-compiled.css';
import CartaoCredito, { Focused } from 'react-credit-cards';
import { Maybe } from '@src/common/CommonTipos';
import { CompleteCheckoutArgs } from './CheckoutUtils';
import { FieldPath } from 'react-hook-form';

interface CheckoutFormCartaoCreditoProps {
  values: CompleteCheckoutArgs;
  focusedField: Maybe<FieldPath<CompleteCheckoutArgs>>;
}

const focusedFieldByFieldPath: Record<
  FieldPath<CompleteCheckoutArgs>,
  Focused
> = {
  nameSurname: 'nome',
  cardNumber: 'numero',
  expiry: 'expira',
  cvc: 'cvc',
};

function CheckoutFormCartaoCredito({
  values,
  focusedField,
}: CheckoutFormCartaoCreditoProps) {
  return (
    <CartaoCredito
      name={values.nameSurname}
      number={values.cardNumber.split(' ').join('')}
      expiry={values.expiry}
      cvc={values.cvc}
      focused={focusedField ? focusedFieldByFieldPath[focusedField] : undefined}
    />
  );
}

export default CheckoutFormCartaoCredito;
