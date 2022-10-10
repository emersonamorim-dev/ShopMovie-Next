import { createHandler } from '@src/api/ApiUtils';
import {
  FilterProdutosArgs,
  ProdutosFilterResponse,
} from '@src/produtos/ProdutosTipos';
import { ProdutosFilterKey } from '@src/produtos/ProdutosUtils';
import { parseRouteParams } from '@src/routing/RoutingUtils';
import { StatusCodes } from 'http-status-codes';

export default createHandler<{
  GET: ProdutosFilterResponse;
}>({
  GET: (req, res) => {
    const parsedQuery = parseRouteParams<FilterProdutosArgs>(req.query);
    const response = req.servicos.ProdutosServicos.filterProdutos({
      sorting: parsedQuery.get(ProdutosFilterKey.SORTING),
      categorias: parsedQuery.getMany(ProdutosFilterKey.CATEGORIAS),
      precoRanges: parsedQuery.getMany(ProdutosFilterKey.PRECO_RANGES),
    });
    res.status(StatusCodes.OK).json(response);
  },
});
