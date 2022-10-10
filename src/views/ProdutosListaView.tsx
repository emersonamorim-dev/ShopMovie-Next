import ProdutosCard from '@src/produtos/ProdutosCard';
import { useRouteParams } from '@src/routing/useRouteParams';
import Painel from '@src/common/Painel';
import AppDesign from '@src/app-design/AppDesign';
import Lista from '@src/common/Lista';
import BaseSeo from '@src/seo/BaseSeo';
import Button from '@src/common/Button';
import { FilterIcon } from '@src/common/Icons';
import ProdutosFilter from '@src/produtos/ProdutosFilter';
import Drawer, { useDrawer } from '@src/common/Drawer';
import Secao from '@src/common/Secao';
import { QueryParams, RouteParams, routes } from '@src/routing/routes';
import { dehydrate, useQuery } from '@tanstack/react-query';
import { produtosAPI } from '@src/produtos/produtosAPI';
import ListaItem from '@src/common/ListaItem';
import ProdutosCardSkeleton from '@src/produtos/ProdutosCardSkeleton';
import { createMockArray } from '@src/common/CommonUtils';
import SelectedProdutosFilters from '@src/produtos/SelectedProdutosFilters';
import {
  getValuesOfSelectedOptions,
  ProdutosFilterKey,
} from '@src/produtos/ProdutosUtils';
import { GetServerSideProps } from 'next';
import { createQueryClient } from '@src/query-client/QueryClientUtils';
import { ParsedRouteParams, parseRouteParams } from '@src/routing/RoutingUtils';
import React from 'react';

type ProdutosListaViewQueryParams = QueryParams<typeof routes['buscar']>;
type ProdutosListaViewRouteParams = RouteParams<typeof routes['buscar']>;

function getFilterProdutosArgs(
  routeParams: ParsedRouteParams<ProdutosListaViewRouteParams>,
) {
  const query: ProdutosListaViewQueryParams = {};

  const sorting = routeParams.get(ProdutosFilterKey.SORTING);
  if (sorting) {
    query.sorting = sorting;
  }

  query.categorias = routeParams.getMany(ProdutosFilterKey.CATEGORIAS);
  query.precoRanges = routeParams.getMany(ProdutosFilterKey.PRECO_RANGES);

  return query;
}

function ProdutosListaView() {
  const { routeParams, setQueryParams } =
    useRouteParams<ProdutosListaViewRouteParams>();
  const filterProdutosArgs = getFilterProdutosArgs(routeParams);

  const { data, isLoading, isFetching } = useQuery({
    ...produtosAPI.filterProdutos({
      args: filterProdutosArgs,
    }),
    keepPreviousData: true,
  });

  const filterSectionContent = (
    <div className="pb-6 flex flex-col gap-4">
      <ProdutosFilter
        isLoading={isLoading}
        isDisabled={isFetching}
        options={data?.filterOptions}
        values={getValuesOfSelectedOptions(data?.selectedOptions)}
        onChange={(filterKey, newValue) => {
          setQueryParams({
            ...filterProdutosArgs,
            [filterKey]: newValue,
          });
        }}
      />
    </div>
  );

  const { isOpen, open, close } = useDrawer({ closeOnRouteChange: false });

  return (
    <>
      <BaseSeo title="Produtos" />
      <div className="flex gap-2">
        <Secao
          title="Produtos Filter"
          titleAs="h2"
          hideTitle
          className="hidden md:block w-72 px-2 max-h-[80vh] overflow-auto sticky top-24"
        >
          {filterSectionContent}
        </Secao>
        <Secao
          title="Produtos"
          titleAs="h1"
          hideTitle
          className="flex-1 flex flex-col gap-2"
        >
          <SelectedProdutosFilters
            selectedOptions={data?.selectedOptions}
            onRemove={(option) => {
              const { [option.filterKey]: currentValue, ...restQuery } =
                filterProdutosArgs;
              if (Array.isArray(currentValue)) {
                setQueryParams({
                  ...filterProdutosArgs,
                  [option.filterKey]: currentValue.filter(
                    (value) => value !== option.value,
                  ),
                });
              } else {
                setQueryParams(restQuery);
              }
            }}
            onReset={() => setQueryParams({})}
          />
          <div className="md:hidden flex justify-end">
            <Button variant="transparent" icon={<FilterIcon />} onClick={open}>
              Filtrar
            </Button>
            <Drawer title="Produtos Filter" isOpen={isOpen} onClose={close}>
              {filterSectionContent}
            </Drawer>
          </div>
          <Painel>
            <Lista className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
              {isFetching
                ? createMockArray(8).map((i) => {
                    return (
                      <ListaItem key={i}>
                        <ProdutosCardSkeleton />
                      </ListaItem>
                    );
                  })
                : data?.produtos.map((Produtos) => {
                    return (
                      <ListaItem key={Produtos.id}>
                        <ProdutosCard produtos={Produtos} />
                      </ListaItem>
                    );
                  })}
            </Lista>
          </Painel>
        </Secao>
      </div>
    </>
  );
}

ProdutosListaView.Design = AppDesign;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = createQueryClient();
  const parsedQuery = getFilterProdutosArgs(parseRouteParams(ctx.query));
  await queryClient.prefetchQuery(
    produtosAPI.filterProdutos({
      args: parsedQuery,
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProdutosListaView;
