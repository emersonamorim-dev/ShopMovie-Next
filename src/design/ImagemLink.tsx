import NextLink, { NextLinkProps } from '@src/routing/NextLink';
import BaseImagem from '@src/common/BaseImagem';
import React from 'react';

type ImagemLinkProps = Pick<NextLinkProps, 'href'> & {
  imagemSrc: string;
  titulo: string;
};

function ImagemLink({ href, imagemSrc, titulo }: ImagemLinkProps) {
  return (
    <NextLink
      className="relative block w-full h-80 group rounded-md overflow-hidden"
      href={href}
    >
      <BaseImagem
        src={imagemSrc}
        alt={titulo}
        layout="fill"
        objectFit="cover"
        className="transition duration-700 transform group-hover:scale-110"
        priority
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="p-6 bg-black bg-opacity-50 rounded-md">
          <h2 className="text-white text-4xl font-bold border-b-4 mb-2 text-center">
            {titulo}
          </h2>
        </div>
      </div>
    </NextLink>
  );
}

export default ImagemLink;
