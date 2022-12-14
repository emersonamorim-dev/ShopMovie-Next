import { goTry } from 'go-try';
import createHttpError from 'http-errors';
import {
  CompleteCheckoutArgs,
  completeCheckoutArgsSchema,
} from './CheckoutUtils';

export const checkoutServicos = {
  completeCheckout: async (args: CompleteCheckoutArgs) => {
    const [error] = await goTry(() =>
      completeCheckoutArgsSchema.validate(args),
    );

    if (error) {
      let errorMessage = 'Entrada inválida';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new createHttpError.BadRequest(errorMessage);
    }
  },
};
