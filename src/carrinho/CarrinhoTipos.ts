import { Produtos } from '@src/produtos/ProdutosTipos';

export interface CarrinhoItem {
  info: Produtos;
  count: number;
}
