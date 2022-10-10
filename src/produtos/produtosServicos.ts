import dbJson from '@src/db/db.json';
import createHttpError from 'http-errors';
import {
  getValuesOfSelectedOptions,
  ProdutosFilterKey,
  ProdutosSorting,
} from '@src/produtos/ProdutosUtils';
import {
  FilterProdutosArgs,
  GetOneProdutosByIdArgs,
  Produtos,
  ProdutosFilterOptions,
  ProdutosFilterResponse,
  ProdutosFilterSelectedOption,
} from './ProdutosTipos';

function getProdutosFilterOptions() {
  const { sortings, categorias, precoRanges } = dbJson;
  const filterOptions: ProdutosFilterOptions = {
    sortings: {
      titulo: 'Ordenação',
      options: sortings,
      filterKey: ProdutosFilterKey.SORTING,
    },
    categorias: {
      titulo: 'Categorias',
      options: categorias,
      filterKey: ProdutosFilterKey.CATEGORIAS,
    },
    precoRanges: {
      titulo: 'Precos',
      options: precoRanges,
      filterKey: ProdutosFilterKey.PRECO_RANGES,
    },
  };
  return filterOptions;
}

function getProdutosFilterSelectedOptions(args: FilterProdutosArgs) {
  const { sortings, categorias, precoRanges } = dbJson;
  const selectedOptions: ProdutosFilterSelectedOption[] = [];

  let isDefaultSortingApplied = false;
  let selectedSorting = sortings.find(
    (sorting) => sorting.value === args.sorting,
  );

  if (!selectedSorting) {
    selectedSorting = sortings.find((sorting) => sorting.isDefault)!;
    isDefaultSortingApplied = true;
  }

  selectedOptions.push({
    value: selectedSorting.value,
    titulo: selectedSorting.titulo,
    isVisible: !isDefaultSortingApplied,
    filterKey: ProdutosFilterKey.SORTING,
  });

  selectedOptions.push(
    ...categorias
      .filter((categoria) => args.categorias?.includes(categoria.value))
      .map((categoria) => ({
        value: categoria.value,
        titulo: categoria.titulo,
        isVisible: true,
        filterKey: ProdutosFilterKey.CATEGORIAS,
      })),
  );

  selectedOptions.push(
    ...precoRanges
      .filter((precoRange) => args.precoRanges?.includes(precoRange.value))
      .map((precoRange) => ({
        value: precoRange.value,
        titulo: precoRange.titulo,
        isVisible: true,
        filterKey: ProdutosFilterKey.PRECO_RANGES,
      })),
  );

  return selectedOptions;
}

function getManyProdutos(args: FilterProdutosArgs) {
  let response: Produtos[] = [...dbJson.produtos];

  if (args.categorias?.length) {
    response = response.filter((Produtos) =>
      args.categorias?.includes(Produtos.categoria.value),
    );
  }

  if (args.precoRanges?.length) {
    const ProdutosInPrecoRanges: Produtos[] = [];

    args.precoRanges.forEach((precoRange) => {
      const [minPrecoText, maxPrecoText] = precoRange.split('-');
      const minpreco = Number(minPrecoText);
      const maxpreco = maxPrecoText === 'max' ? Infinity : Number(maxPrecoText);
      ProdutosInPrecoRanges.push(
        ...response.filter(
          (Produtos) => Produtos.preco >= minpreco && Produtos.preco <= maxpreco,
        ),
      );
    });

    response = ProdutosInPrecoRanges;
  }

  if (args.sorting) {
    switch (args.sorting) {
      case ProdutosSorting.PRECO_ASC:
        response.sort((a, b) => a.preco - b.preco);
        break;
      case ProdutosSorting.PRECO_DESC:
        response.sort((a, b) => b.preco - a.preco);
        break;
    }
  }

  return response;
}

export const ProdutosServicos = {
  filterProdutos: (args: FilterProdutosArgs): ProdutosFilterResponse => {
    const filterOptions = getProdutosFilterOptions();
    const selectedOptions = getProdutosFilterSelectedOptions(args);
    const produtos = getManyProdutos(
      getValuesOfSelectedOptions(selectedOptions),
    );
    return { filterOptions, selectedOptions, produtos };
  },
  getOneProdutosById: (args: GetOneProdutosByIdArgs) => {
    const found = dbJson.produtos.find(
      (Produtos) => Produtos.id === args.produtosId,
    );

    if (!found) {
      throw new createHttpError.NotFound('Produtos não encontrados');
    }

    return found;
  },
};
