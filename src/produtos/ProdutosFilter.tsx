import { Maybe } from '@src/common/CommonTipos';
import Painel from '@src/common/Painel';
import CheckboxGroup from '@src/forms/CheckboxGroup';
import RadioGroup from '@src/forms/RadioGroup';
import React from 'react';
import {
  FilterProdutosArgs,
  ProdutosFilterData,
  ProdutosFilterOptionItem,
  ProdutosFilterOptions,
} from './ProdutosTipos';
import { ProdutosFilterKey } from './ProdutosUtils';

interface ProdutosFilterProps {
  isLoading: boolean;
  isDisabled?: boolean;
  options: Maybe<ProdutosFilterOptions>;
  values: FilterProdutosArgs;
  onChange: (
    filterKey: ProdutosFilterData['filterKey'],
    value: Maybe<string | string[]>,
  ) => void;
}

// To render filter skeleton during the initial fetch.
const defaultOptions: ProdutosFilterOptions = {
  sortings: {
    titulo: 'Ordenação',
    options: [],
    filterKey: ProdutosFilterKey.SORTING,
  },
  categorias: {
    titulo: 'Categorias',
    options: [],
    filterKey: ProdutosFilterKey.CATEGORIAS,
  },
  precoRanges: {
    titulo: 'Preços',
    options: [],
    filterKey: ProdutosFilterKey.PRECO_RANGES,
  },
};

function ProdutosFilter({
  isLoading,
  isDisabled,
  options,
  values,
  onChange,
}: ProdutosFilterProps) {
  return (
    <>
      {Object.values(options ?? defaultOptions).map((filter) => {
        let filterInput = null;

        switch (filter.filterKey) {
          case ProdutosFilterKey.CATEGORIAS:
          case ProdutosFilterKey.PRECO_RANGES:
            filterInput = (
              <CheckboxGroup<ProdutosFilterOptionItem>
                isLoading={isLoading}
                isDisabled={isDisabled}
                options={filter.options}
                getOptionLabel={(option) => option.titulo}
                getOptionValue={(option) => option.value}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  onChange(filter.filterKey, newValue);
                }}
              />
            );
            break;
          case ProdutosFilterKey.SORTING:
            filterInput = (
              <RadioGroup<ProdutosFilterOptionItem>
                isLoading={isLoading}
                isDisabled={isDisabled}
                options={filter.options}
                getOptionLabel={(option) => option.titulo}
                getOptionValue={(option) => option.value}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  onChange(filter.filterKey, newValue);
                }}
              />
            );
        }

        return (
          <Painel key={filter.filterKey} title={filter.titulo}>
            {filterInput}
          </Painel>
        );
      })}
    </>
  );
}

export default ProdutosFilter;
