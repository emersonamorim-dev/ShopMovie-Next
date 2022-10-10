import { createHandler } from '@src/api/ApiUtils';
import { Produtos } from '@src/produtos/ProdutosTipos';
import { StatusCodes } from 'http-status-codes';
import createHttpError from 'http-errors';

export default createHandler<{ GET: Produtos }>({
  GET: (req, res) => {
    const produtosId = Number(req.query.produtosId);

    if (!produtosId) {
      throw new createHttpError.BadRequest();
    }

    const response = req.servicos.ProdutosServicos.getOneProdutosById({
      produtosId,
    });

    res.status(StatusCodes.OK).json(response);
  },
});
