import NumberInput from '@src/forms/NumberInput';
import SubmitButton from '@src/forms/SubmitButton';
import { useYupValidationResolver } from '@src/forms/useYupValidationResolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'react-credit-cards/es/styles-compiled.css';
import ErrorMessage from '@src/error-handling/ErrorMessage';
import { Maybe } from '@src/common/CommonTipos';
import { useFocusedField } from '@src/forms/useFocusedField';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import Form from '@src/forms/Form';
import CheckoutFormCreditCard from './CheckoutFormCartaoCredito';
import {
  CompleteCheckoutArgs,
  completeCheckoutArgsSchema,
} from './CheckoutUtils';
import FormItem from '@src/forms/FormItem';
import Input from '@src/forms/Input';
import FormItemLabel from '@src/forms/FormItemLabel';
import CardExpiryInput from './CardExpiryInput';

const defaultValues = completeCheckoutArgsSchema.getDefault();

interface CheckoutFormProps {
  error: Maybe<ApiRequestError>;
  onSubmit: SubmitHandler<CompleteCheckoutArgs>;
}

function CheckoutForm({ error, onSubmit }: CheckoutFormProps) {
  const resolver = useYupValidationResolver(completeCheckoutArgsSchema);
  const { register, formState, handleSubmit, watch } =
    useForm<CompleteCheckoutArgs>({
      resolver,
      defaultValues,
    });

  const { focusedField, focusHandlers } =
    useFocusedField<CompleteCheckoutArgs>();

  const values = watch();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <CheckoutFormCreditCard values={values} focusedField={focusedField} />
      </div>
      <ErrorMessage error={error} />
      <FormItem error={formState.errors.nameSurname}>
        <FormItemLabel htmlFor="nameSurname">Nome Completo</FormItemLabel>
        <Input
          id="nameSurname"
          placeholder="Nome Completo"
          {...focusHandlers(register('nameSurname'))}
        />
      </FormItem>
      <FormItem error={formState.errors.cardNumber}>
        <FormItemLabel htmlFor="cardNumber">Número do cartão</FormItemLabel>
        <NumberInput
          value={undefined}
          id="cardNumber"
          format="#### #### #### ####"
          mask="_"
          placeholder="0000 0000 0000 0000"
          {...focusHandlers(register('cardNumber'))}
        />
      </FormItem>
      <div className="flex justify-between gap-4">
        <FormItem error={formState.errors.expiry}>
          <FormItemLabel htmlFor="expiry">Data de validade</FormItemLabel>
          <CardExpiryInput
            value={undefined}
            mask={undefined}
            id="expiry"
            {...focusHandlers(register('expiry'))}
          />
        </FormItem>
        <FormItem error={formState.errors.cvc}>
          <FormItemLabel htmlFor="cvc">CVC</FormItemLabel>
          <NumberInput
            value={undefined}
            id="cvc"
            mask="_"
            format="###"
            placeholder="000"
            {...focusHandlers(register('cvc'))}
          />
        </FormItem>
      </div>
      <div className="my-2 flex justify-end">
        <SubmitButton formState={formState}>Completar Pagamento</SubmitButton>
      </div>
    </Form>
  );
}

export default CheckoutForm;
