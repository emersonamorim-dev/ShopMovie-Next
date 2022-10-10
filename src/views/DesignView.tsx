import AppRodape from '@src/app-design/AppRodape';
import Container from '@src/common/Container';
import Home from '@src/design/Home';
import { GetServerSideProps } from 'next';
import { createQueryClient } from '@src/query-client/QueryClientUtils';
import { dehydrate } from '@tanstack/react-query';
import ErrorMessage from '@src/error-handling/ErrorMessage';
import ImagemLink from '@src/design/ImagemLink';
import ImagemLinkSkeleton from '@src/design/ImagemLinkSkeleton';
import Lista from '@src/common/Lista';
import AppDesignRoot from '@src/app-design/AppDesignRoot';
import { routes } from '@src/routing/routes';
import BaseSeo from '@src/seo/BaseSeo';
import { useQuery } from '@tanstack/react-query';
import { categoriasAPI } from '@src/categorias/categoriasAPI';
import ListaItem from '@src/common/ListaItem';
import { createMockArray } from '@src/common/CommonUtils';
import React from 'react';

function designView() {
  const {
    data: categorias,
    isLoading,
    error,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery(categoriasAPI.fetchManyCategorias());

  return (
    <>
      <BaseSeo
        images={
          categorias?.length
            ? categorias.map((categoria) => ({
                url: categoria.imagem,
                alt: categoria.titulo,
              }))
            : undefined
        }
      />
      <AppDesignRoot>
        <header>
          <Home />
        </header>
        <main className="p-4 flex-grow">
          <ErrorMessage error={error}>
            <Container maxWidth="xl">
              <Lista className="grid lg:grid-cols-2 gap-4">
                {isLoading
                  ? createMockArray(4).map((i) => {
                      return (
                        <ListaItem key={i}>
                          <ImagemLinkSkeleton />
                        </ListaItem>
                      );
                    })
                  : categorias?.map((categoria) => {
                      return (
                        <ListaItem key={categoria.value}>
                          <ImagemLink
                            href={routes.buscar({
                              query: { categorias: [categoria.value] },
                            })}
                            imagemSrc={categoria.imagem}
                            titulo={categoria.titulo}
                          />
                        </ListaItem>
                      );
                    })}
              </Lista>
            </Container>
          </ErrorMessage>
        </main>
        <AppRodape />
      </AppDesignRoot>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = createQueryClient();
  await queryClient.prefetchQuery(categoriasAPI.fetchManyCategorias());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default designView;
