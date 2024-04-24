import { useEffect } from 'react';
import useToasts from 'ui-kit/useToasts';
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

export default () => {
  const addToast = useToasts(({ addToast }) => addToast);

  useEffect(() => {
    httpClient.init({
      prefixUrl: import.meta.env.VITE_BASE_URL,
      hooks: {
        beforeRequest: [setRequestAuthBearerHeader],
        beforeError: [showToastOnError(addToast)],
        afterResponse: [saveResponseAuthToken],
      },
    });
  }, []);
};
