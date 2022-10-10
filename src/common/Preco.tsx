import classNames from 'classnames';
import React from 'react';
import { Maybe } from './CommonTipos';

interface PrecoProps {
  className?: string;
  value: Maybe<number>;
}

function Preco({ className, value }: PrecoProps) {
  return (
    <span className={classNames('font-semibold', className)}>
      R${(value ?? 0).toFixed(2).replace('.', ',')}
    </span>
  );
}

export default Preco;
