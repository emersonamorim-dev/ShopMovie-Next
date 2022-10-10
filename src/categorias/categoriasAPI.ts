import { servicos } from '@src/api/ApiServicos';
import { IS_SERVER } from '@src/common/CommonUtils';
import { httpClient } from '@src/http-client/httpClient';
import { createQuery } from '@src/query-client/QueryClientUtils';
import { Categorias } from './CategoriasTipos';

export const categoriasAPI = {
  fetchManyCategorias: createQuery<['categorias'], Categorias[]>({
    getQueryKey: () => ['categorias'],
    queryFn: async () => {
      if (IS_SERVER) {
        return servicos.categoriasServicos.getManyCategorias();
      }
      const { data } = await httpClient.get<Categorias[]>('/api/categorias');
      return data;
    },
  }),
};