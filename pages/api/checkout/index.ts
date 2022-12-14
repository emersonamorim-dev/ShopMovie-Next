import { StatusCodes } from 'http-status-codes';
import { createHandler } from '@src/api/ApiUtils';

export default createHandler<{ POST: void }>({
  POST: async (req, res) => {
    await req.servicos.checkoutServicos.completeCheckout(req.body);
    res.status(StatusCodes.CREATED).send();
  },
});
