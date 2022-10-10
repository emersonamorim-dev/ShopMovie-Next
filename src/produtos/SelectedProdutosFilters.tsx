import Button from '@src/common/Button';
import Chip from '@src/common/Chip';
import { Maybe } from '@src/common/CommonTipos';
import Lista from '@src/common/Lista';
import ListaItem from '@src/common/ListaItem';
import React from 'react';
import { ProdutosFilterSelectedOption } from './ProdutosTipos';

interface ProdutosFilterProps {
  selectedOptions: Maybe<ProdutosFilterSelectedOption[]>;
  onRemove: (option: ProdutosFilterSelectedOption) => void;
  onReset: VoidFunction;
}

function SelectedProdutosFilters({
  selectedOptions,
  onRemove,
  onReset,
}: ProdutosFilterProps) {
  const visibleOptions = selectedOptions?.filter((option) => option.isVisible);

  if (!visibleOptions?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 items-start">
      <Lista className="flex flex-row flex-wrap gap-1">
        {visibleOptions.map((selectedOption) => {
          return (
            <ListaItem
              key={`${selectedOption.filterKey}_${selectedOption.value}`}
            >
              <Chip
                variant="secondary"
                textAlign="left"
                closeButtonProps={{
                  'aria-label': `Remove ${selectedOption.titulo} filter`,
                  onClick: () => onRemove(selectedOption),
                }}
              >
                {selectedOption.titulo}
              </Chip>
            </ListaItem>
          );
        })}
        <ListaItem>
          <Button className="text-sm" variant="transparent" onClick={onReset}>
            Limpar filtros
          </Button>
        </ListaItem>
      </Lista>
    </div>
  );
}

export default SelectedProdutosFilters;
