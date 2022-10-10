import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { parseRouteParams, pruneQueryParams } from './RoutingUtils';

export const useRouteParams = <RouteParams>() => {
  const router = useRouter();

  const setQueryParams = useCallback(
    (args: RouteParams) => {
      router.push(
        {
          query: pruneQueryParams(args),
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  return {

    isReady: router.isReady,
    routeParams: parseRouteParams<RouteParams>(router.query),
    setQueryParams,
  };
};
