import Button from '@src/common/Button';
import {
  APP_DESCRIPTION,
  APP_REPOSITORY_URL,
  APP_TITLE,
} from '@src/common/CommonUtils';
import { ExternalLinkIcon } from '@src/common/Icons';
import { routes } from '@src/routing/routes';
import React from 'react';

function Home() {
  return (
    <div className="bg-background-main shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center py-12 px-4">
        <h1 className="text-primary-main text-3xl sm:text-4xl lg:text-5xl font-bold uppercase">
          {APP_TITLE}
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-primary-dark font-semibold">{APP_DESCRIPTION}</p>
          <Button
            className="mt-1"
            variant="transparent"
            href={APP_REPOSITORY_URL}
            isExternalUrl
            icon={<ExternalLinkIcon />}
            iconAlignment="right"
          >
            Compre Filmes, Séries, Livros e DVDs online
          </Button>
        </div>
        <hr className="w-24 border-t-4 border-secondary-lighter" />
        <Button href={routes.buscar()}>Navegar na loja</Button>
      </div>
    </div>
  );
}

export default Home;
