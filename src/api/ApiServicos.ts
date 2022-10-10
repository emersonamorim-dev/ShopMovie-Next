import { ProdutosServicos } from '../produtos/produtosServicos';
import { categoriasServicos } from '../categorias/categoriasServicos';
import { checkoutServicos } from '../checkout/checkoutServicos';

declare module 'next' {
  interface NextApiRequest {
    servicos: typeof servicos;
  }
}

export const servicos = {
  ProdutosServicos,
  categoriasServicos,
  checkoutServicos,
};
