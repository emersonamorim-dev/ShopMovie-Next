import { httpClient } from '@src/http-client/httpClient';
import {
  FilterProdutosArgs,
  GetOneProdutosByIdArgs,
  Produtos,
  ProdutosFilterResponse,
} from './ProdutosTipos';
import { IS_SERVER } from '@src/common/CommonUtils';
import { servicos } from '@src/api/ApiServicos';
import { createQuery } from '@src/query-client/QueryClientUtils';

export const produtosAPI = {
  filterProdutos: createQuery<
    ['produtos', FilterProdutosArgs],
    ProdutosFilterResponse,
    FilterProdutosArgs
  >({
    getQueryKey: (args) => ['produtos', args],
    queryFn: async (args) => {

      if (IS_SERVER) {
        return servicos.ProdutosServicos.filterProdutos(args);
      }
      const response = await httpClient.get<ProdutosFilterResponse>(
        `/api/produtos`,
        {
          params: args,
        },
      );
      return response.data;
    },
  }),
  fetchOneProdutos: createQuery<
    ['produtos', GetOneProdutosByIdArgs],
    Produtos,
    GetOneProdutosByIdArgs
  >({
    getQueryKey: (args) => ['produtos', args],
    queryFn: async (args) => {
      if (IS_SERVER) {
        return servicos.ProdutosServicos.getOneProdutosById(args);
      }
      const response = await httpClient.get<Produtos>(
        `/api/produtos/${args.produtosId}`,
      );
      return response.data;
    },
  }),
};
