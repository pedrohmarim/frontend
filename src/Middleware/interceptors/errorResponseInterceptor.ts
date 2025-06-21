import { AxiosError } from 'axios';
import * as I from './IAxios';
import Swal from 'sweetalert2';
import { disableLoading } from '../helpers/loading';
import { getItem } from 'utils/localStorage';
import { translateToEnglish } from '../helpers/translate';
import { redirectLogin } from '../helpers/redirectLogin';
import { decrementActiveRequests } from './requestInterceptor';

export const errorResponseInterceptor = async (
  error: AxiosError<I.IErrorResponse>
) => {
  decrementActiveRequests();
  disableLoading();

  let description =
    error.response?.data.Message ??
    error.response?.data.error_description ??
    'Não foi possível conectar-se ao servidor.';

  description = description.replace(/'([^']*)'/g, '<b>$1</b>');
  const statusCode = error.response?.status ?? error.response?.data.Status;
  const language = getItem('i18nextLng');

  if (language === 'en') {
    description = await translateToEnglish(description);
  }

  const isUnauthorized =
    statusCode === 401 ||
    description.includes('Não autorizado') ||
    description.includes('Not authorized');

  const isOnChooseProfile = window.location.href.includes('chooseProfile');

  if (isUnauthorized && !isOnChooseProfile) {
    await redirectLogin(description, language ?? 'pt-BR');
  } else {
    Swal.fire({
      icon: 'error',
      title: language === 'en' ? 'Error!' : 'Erro!',
      html: description,
    });
  }

  return Promise.reject(error);
};
