import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import useToasts from 'ui-kit/useToasts';
import { HttpStatusCode } from '@constants/enum';
import HistoryPaths from '@services/historyPath';
import httpClient from '@services/httpClient';
import tokenStorage from '@services/tokenStorage';

const AuthUrlPath = {
  SignUp: 'sign-up',
  SignIn: 'sign-in',
};

const setRequestAuthBearerHeader = request => {
  const token = tokenStorage.getItem();

  request.headers.set('Authorization', `Bearer ${token}`);
};

const saveResponseAuthToken = async ({ url }, { prefixUrl }, response) => {
  const path = url.replace(prefixUrl, '');

  if ([AuthUrlPath.SignUp, AuthUrlPath.SignIn].includes(path)) {
    const token = await response.text();

    tokenStorage.setItem(token);
  }
};

const showToastOnError = addToast => async error => {
  const { message } = await error.response.json();
  addToast({ message: message || 'Unknown error', color: 'error' });

  return error;
};

const logoutOnTokenExpiration = error => {
  if (error.response.status === HttpStatusCode.UNAUTHORIZED) {
    return redirect(HistoryPaths.enterRoom.path);
  }

  return error;
};

const useHttpInit = () => {
  const addToast = useToasts(({ addToast }) => addToast);

  useEffect(() => {
    httpClient.init({
      prefixUrl: import.meta.env.VITE_BASE_URL,
      hooks: {
        beforeRequest: [setRequestAuthBearerHeader],
        beforeError: [showToastOnError(addToast), logoutOnTokenExpiration],
        afterResponse: [saveResponseAuthToken],
      },
    });
  }, [addToast]);
};

export default useHttpInit;
