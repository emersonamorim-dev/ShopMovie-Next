import { Maybe } from '@src/common/CommonTipos';
import { RouterEvent, useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRouterEvent = (name: RouterEvent, cb: Maybe<VoidFunction>) => {
  const router = useRouter();


  useEffect(() => {
    if (cb) {
      router.events.on(name, cb);

      return () => {
        router.events.off(name, cb);
      };
    }
  }, [cb, name, router.events]);
};
