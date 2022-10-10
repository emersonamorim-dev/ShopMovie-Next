import { Maybe } from '@src/common/CommonTipos';
import { ProdutosFilterSelectedOption } from './ProdutosTipos';

export enum ProdutosSorting {
  PRECO_ASC = 'preco-asc',
  PRECO_DESC = 'preco-desc',
}

export enum ProdutosFilterKey {
  SORTING = 'sorting',
  CATEGORIAS = 'categorias',
  PRECO_RANGES = 'precoRanges',
}

function getOneSelectedOptionValue(
  filterKey: ProdutosFilterKey,
  selectedOptions: Maybe<ProdutosFilterSelectedOption[]>,
) {
  return selectedOptions?.find((option) => option.filterKey === filterKey)
    ?.value;
}

function getManySelectedOptionValues(
  filterKey: ProdutosFilterKey,
  selectedOptions: Maybe<ProdutosFilterSelectedOption[]>,
) {
  return (
    selectedOptions
      ?.filter((option) => option.filterKey === filterKey)
      .map((option) => option.value) ?? []
  );
}

export function getValuesOfSelectedOptions(
  selectedOptions: Maybe<ProdutosFilterSelectedOption[]>,
) {
  const values = {
    [ProdutosFilterKey.SORTING]: getOneSelectedOptionValue(
      ProdutosFilterKey.SORTING,
      selectedOptions,
    ),
    [ProdutosFilterKey.CATEGORIAS]: getManySelectedOptionValues(
      ProdutosFilterKey.CATEGORIAS,
      selectedOptions,
    ),
    [ProdutosFilterKey.PRECO_RANGES]: getManySelectedOptionValues(
      ProdutosFilterKey.PRECO_RANGES,
      selectedOptions,
    ),
  };

  return values;
}
