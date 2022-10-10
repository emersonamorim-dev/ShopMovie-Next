import { AnyFunction, Id } from '@src/common/CommonTipos';
import { pruneQueryParams } from './RoutingUtils';
import { ParsedUrlQuery } from 'querystring';
import { FilterProdutosArgs } from '@src/produtos/ProdutosTipos';

interface CreateRouteArgs {
  params?: unknown;
  query?: unknown;
}

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];
type HasRequiredField<T> = RequiredKeys<T> extends never ? false : true;

type CreateRouteResult<RouteArgs extends CreateRouteArgs> = (
  // args parameter is optional when both of params and query fields are optional
  ...args: HasRequiredField<RouteArgs> extends true ? [RouteArgs] : [RouteArgs?]
) => {
  pathname: string;
  query: ParsedUrlQuery;
};

function createRoute<RouteArgs extends CreateRouteArgs>(
  pathname: (pathParams: RouteArgs['params']) => string,
): CreateRouteResult<RouteArgs> {
  return (...args) => {
    const [routeArgs] = args;
    return {
      pathname: pathname(routeArgs?.params),
      query: pruneQueryParams(routeArgs?.query),
    };
  };
}

type RouteArgs<T extends AnyFunction> = NonNullable<Parameters<T>[0]>;
export type PathParams<T extends AnyFunction> = RouteArgs<T>['params'];
export type QueryParams<T extends AnyFunction> = RouteArgs<T>['query'];
export type RouteParams<T extends AnyFunction> = PathParams<T> & QueryParams<T>;

export const routes = {
  home: createRoute(() => '/'),
  buscar: createRoute<{ query?: FilterProdutosArgs }>(() => '/buscar'),
  produtos: createRoute<{ params: { produtosId: Id } }>(
    (params) => `/produtos/${params.produtosId}`,
  ),
  checkout: createRoute(() => '/checkout'),
};
