import Button from '@src/common/Button';
import { ArrowLeftIcon } from '@src/common/Icons';
import { useRouter } from 'next/router';
import React from 'react';

function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      aria-label="Voltar Home"
      circle
      variant="transparent"
      icon={<ArrowLeftIcon />}
      onClick={router.back}
    />
  );
}

export default GoBackButton;
