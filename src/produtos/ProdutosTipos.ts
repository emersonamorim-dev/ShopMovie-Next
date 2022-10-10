import { Id } from '@src/common/CommonTipos';
import { ProdutosFilterKey } from './ProdutosUtils';

export interface Produtos {
  id: Id;
  categoria: {
    titulo: string;
    value: string;
  };
  descricao: string;
  imagem: string;
  preco: number;
  titulo: string;
}

export interface GetOneProdutosByIdArgs {
  produtosId: Id;
}

export type FilterProdutosArgs = {
  sorting?: string;
  categorias?: string[];
  precoRanges?: string[];
};

export interface ProdutosFilterOptionItem {
  titulo: string;
  value: string;
}

export interface ProdutosFilterData {
  titulo: string;
  options: ProdutosFilterOptionItem[];
  filterKey: ProdutosFilterKey;
}

export type ProdutosFilterOptions = Record<
  'categorias' | 'sortings' | 'precoRanges',
  ProdutosFilterData
>;

export type ProdutosFilterSelectedOption = ProdutosFilterOptionItem & {
  isVisible: boolean;
  filterKey: ProdutosFilterKey;
};

export interface ProdutosFilterResponse {
  filterOptions: ProdutosFilterOptions;
  selectedOptions: ProdutosFilterSelectedOption[];
  produtos: Produtos[];
}
