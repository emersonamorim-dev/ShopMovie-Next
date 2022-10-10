import axios from 'axios';
import { Maybe } from '@src/common/CommonTipos';
import { ApiRequestError } from './ErrorHandlingTypes';
import React from 'react';

type ErrorMessageProps = React.PropsWithChildren<{
  error: Maybe<Error | ApiRequestError>;
}>;

function ErrorMessage({ children, error }: ErrorMessageProps) {
  if (!error) {
    return <>{children}</>;
  }

  let { message } = error ?? {};
  if (axios.isAxiosError(error) && error.response) {
    ({ message } = error.response.data as ApiRequestError);
  }

  if (!message) {
    message = 'Algo deu errado';
  }

  return (
    <div className="bg-error-lighter text-error-dark border border-error-main rounded-md p-4">
      {message}
    </div>
  );
}

export default ErrorMessage;
