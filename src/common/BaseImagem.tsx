import Imagem, { ImageProps } from 'next/image';
import { Omit } from './CommonTipos';

type BaseImagemProps = Omit<ImageProps, 'alt'> &
  Required<Pick<ImageProps, 'alt'>>;

function BaseImagem({ unoptimized = true, alt, ...rest }: BaseImagemProps) {
  return <Imagem {...rest} alt={alt} unoptimized={unoptimized} />;
}

export default BaseImagem;
