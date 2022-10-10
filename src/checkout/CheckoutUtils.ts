import * as Yup from 'yup';
import cardValidator from 'card-validator';

export const completeCheckoutArgsSchema = Yup.object({
  nameSurname: Yup.string()
    .required()
    .test(
      'nameSurnameText',
      ({ label }) => `${label} é inválido`,
      (value) => cardValidator.cardholderName(value).isValid,
    )
    .label('Nome Completo')
    .default(''),
  cardNumber: Yup.string()
    .required()
    .test(
      'cardNumberTest',
      ({ label }) => `${label} é inválido`,
      (value) => cardValidator.number(value).isValid,
    )
    .label('Número do cartão')
    .default(''),
  expiry: Yup.string()
    .required()
    .test(
      'expiryTest',
      ({ label }) => `${label} é inválido`,
      (value) => cardValidator.expirationDate(value).isValid,
    )
    .label('Data de validade')
    .default(''),
  cvc: Yup.string()
    .required()
    .test(
      'cvcTest',
      ({ label }) => `${label} é inválido`,
      (value) => cardValidator.cvv(value).isValid,
    )
    .label('CVC')
    .default(''),
});

export type CompleteCheckoutArgs = Yup.TypeOf<
  typeof completeCheckoutArgsSchema
>;
