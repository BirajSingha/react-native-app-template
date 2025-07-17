import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { API } from '../constants';
import { store } from '@app/store';
import { logoutRequest, reset, setToken } from '@app/store/slice/auth.slice';
import { BASE_URL } from '@env';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async () => {
  const { auth } = API;

  const { refreshToken, token } = store.getState().auth;
  // console.log('refreshToken --- .....', refreshToken, token);

  if (!refreshToken) {
    return null;
  }

  // Uncomment and implement token refresh logic as needed
  try {
    const response = await axios.post(`${BASE_URL}${auth.refreshToken}`, {
      refreshToken: refreshToken,
      accessToken: token,
    });

    // Dispatch action to update the token in the Redux store
    store.dispatch(
      setToken({
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      }),
    );

    return response.data.data.accessToken;
  } catch (error: any) {
    console.log(error.response.data);
    store.dispatch(reset());
    store.dispatch(logoutRequest({}));
    throw error;
  }
};

instance.interceptors.request.use(async config => {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    throw new axios.Cancel(
      'No internet connection. Please connect to the internet.',
    );
  }

  const { token } = store.getState().auth;
  // console.log('token -- ',token);

  if (token && config.headers) {
    // config.headers['x-access-token'] = token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and the request hasn't already been retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the token
        const newToken = await refreshToken();

        // Update the token in the headers
        instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // instance.defaults.headers.common['x-access-token'] = newToken;
        // originalRequest.headers['x-access-token'] = newToken;

        // Retry the original request
        return instance(originalRequest);
      } catch (refreshError) {
        // If the refresh fails, reset the auth state and reject the promise
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
