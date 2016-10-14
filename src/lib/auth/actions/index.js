export const LOGIN = 'auth@LOGIN';
export const LOGIN_LOADING = 'auth@LOGIN_LOADING';
export const LOGIN_FAILURE = 'auth@LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'auth@LOGIN_SUCCESS';

export const login = (credentials) => ({
  type: LOGIN,
  payload: { credentials },
});

export const AUTH_WITH_TOKEN_LOADING = 'auth@AUTH_WITH_TOKEN_LOADING';
export const AUTH_WITH_TOKEN_FAILURE = 'auth@AUTH_WITH_TOKEN_FAILURE';
export const AUTH_WITH_TOKEN_SUCCESS = 'auth@AUTH_WITH_TOKEN_SUCCESS';

export const LOGOUT = 'auth@LOGOUT';

export const logout = () => ({
  type: LOGOUT
});

export const REFRESH_TOKEN_LOADING = 'auth@REFRESH_TOKEN_LOADING';
export const REFRESH_TOKEN_FAILURE = 'auth@REFRESH_TOKEN_FAILURE';
export const REFRESH_TOKEN_SUCCESS = 'auth@REFRESH_TOKEN_SUCCESS';
