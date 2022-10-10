import AppDesign from '@src/app-design/AppDesign';
import ErrorContent from '@src/error-handling/ErrorContent';
import { StatusCodes } from 'http-status-codes';

function NotFoundView() {
  return (
    <ErrorContent
      statusCode={StatusCodes.NOT_FOUND}
      message="Esta página não foi encontrada"
    />
  );
}

NotFoundView.Design = AppDesign;

export default NotFoundView;
