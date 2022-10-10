import { GetServerSideProps } from 'next';
import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { createQueryClient } from '@src/query-client/QueryClientUtils';
import ErrorMessage from '@src/error-handling/ErrorMessage';
import ProdutosDetalhes from '@src/produtos/ProdutosDetalhes';
import { ParsedRouteParams, parseRouteParams } from '@src/routing/RoutingUtils';
import AppDesign from '@src/app-design/AppDesign';
import Loading from '@src/common/Loading';
import { useRouteParams } from '@src/routing/useRouteParams';
import BaseSeo from '@src/seo/BaseSeo';
import Painel from '@src/common/Painel';
import React from 'react';
import PaginaTopo from '@src/common/PaginaTopo';
import { RouteParams, routes } from '@src/routing/routes';
import { useQuery } from '@tanstack/react-query';
import { produtosAPI } from '@src/produtos/produtosAPI';

type ProdutosViewRouteParams = RouteParams<typeof routes['produtos']>;

function getProdutosId(
  routeParams: ParsedRouteParams<ProdutosViewRouteParams>,
) {
  return Number(routeParams.get('produtosId'));
}

interface ProdutosViewProps {
  // eslint-disable-next-line react/no-unused-prop-types
  dehydratedState?: DehydratedState;
}

function ProdutosView() {
  const { routeParams } = useRouteParams<ProdutosViewRouteParams>();
  const produtosId = getProdutosId(routeParams);
  const {
    data: produtos,
    isLoading,
    error,
  } = useQuery(produtosAPI.fetchOneProdutos({ args: { produtosId } }));

  return (
    <>
      <BaseSeo
        title={produtos?.titulo}
        description={produtos?.descricao}
        images={
          produtos?.imagem
            ? [
                {
                  url: produtos.imagem,
                  alt: produtos.titulo,
                },
              ]
            : undefined
        }
      />
      <PaginaTopo title={produtos?.titulo} />
      <Loading isLoading={isLoading}>
        <ErrorMessage error={error}>
          {produtos && (
            <Painel>
              <ProdutosDetalhes produtos={produtos} />
            </Painel>
          )}
        </ErrorMessage>
      </Loading>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ProdutosViewProps> = async (
  ctx,
) => {
  // Using hydration:
  const queryClient = createQueryClient();
  const produtosId = getProdutosId(parseRouteParams(ctx.query));
  await queryClient.prefetchQuery(
    produtosAPI.fetchOneProdutos({
      args: { produtosId },
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

ProdutosView.Design = AppDesign;

export default ProdutosView;
