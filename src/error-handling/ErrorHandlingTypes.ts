import { ApiErrorResponse } from '@src/api/ApiTipos';
import { AxiosError } from 'axios';

export type ApiRequestError = AxiosError<ApiErrorResponse>;
