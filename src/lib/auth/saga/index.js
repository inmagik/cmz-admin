import { take, call, put, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  LOGIN,
  LOGIN_LOADING,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  AUTH_WITH_TOKEN_LOADING,
  AUTH_WITH_TOKEN_FAILURE,
  AUTH_WITH_TOKEN_SUCCESS,
  REFRESH_TOKEN_LOADING,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
  LOGOUT,
  logout
} from '../actions';

const auth = ({
  /**
   * Function to authenticate with credentials
   * (credentials) => Promise(token)
   */
  login,
  /**
   * Function to get user data from token
   * (token) => Promise(user)
   */
  me,
  /**
   * Function to refresh token, when not provided token will no be refreshed
   * (oldToken) => Promise(newToken)
   */
  refreshToken,
  /**
   * Milleseconds tick to refresh token
   */
  refreshTokenTick = (60 * 4 * 1000),
  /**
    * Function with login effects
    * ({ user, token }) => [action()]
    */
  loginEffetcs,
  /**
   * Function with logout effects
   * () => [action()]
   */
  logoutEffects
}) => {

  /**
   * Store, Get and Remove token from local storage.
   */
  const STORAGE_KEY = 'auth-token';
  const storeToken = (token) =>
    localStorage.setItem(STORAGE_KEY, token);
  const getToken = (token) =>
    localStorage.getItem(STORAGE_KEY, token);
  const removeToken = () =>
    localStorage.removeItem(STORAGE_KEY);

  /**
   * Utily for emit user provided effects
   */
  function *emitEffects(fn, ...args) {
    const arrayize = (arr) => Array.isArray(arr) ? arr : [arr];
    const sideEffects = typeof fn  === 'function' ? arrayize(fn(...args)) : [];
    yield [
      ...sideEffects.map(e => put(e))
    ];
  }

  /**
   * Pull login action and then try to authenticate user with given
   * credentials, if ok store token, set the state and redirect to home page.
   */
  function *watchLogin() {
    const { payload } = yield take(LOGIN);
    const { credentials } = payload;
    yield put({ type: LOGIN_LOADING });
    try {
      const token = yield call(login, credentials);
      const user = yield call(me, token);
      yield call(storeToken, token);
      yield put({ type: LOGIN_SUCCESS, payload: { token, user }});
      yield emitEffects(loginEffetcs, { token, user });
      return token;
    } catch (error) {
      yield put({ type: LOGIN_FAILURE, error: error.message ? error.message : error });
    }
  }

  /**
   * Pull logout action and then remove token from storage
   * and redirect to login.
   */
  function *watchLogout() {
    yield take(LOGOUT);
    yield call(removeToken);
    yield emitEffects(logoutEffects);
  }

  /**
   * When token is in local storage take it, refresh it (if neeeded),
   * get user data and authenticate in redux store
   */
  function *authenticateWithStorageToken() {
    let token = yield call(getToken);
    if (token) {
      yield put({ type: AUTH_WITH_TOKEN_LOADING });
      try {
        // Refresh token from storage before me
        token = yield call(refreshToken, token);
        // Get the user data
        const user = yield call(me, token);
        // Authenticate user in state
        yield put({ type: AUTH_WITH_TOKEN_SUCCESS, payload: { token, user }});
        return token;
      } catch (error) {
        yield put({ type: AUTH_WITH_TOKEN_FAILURE, error: error.message ? error.message : error });
        // The token was wrong...
        yield call(removeToken);
      }
    }
  }

  /**
   * Refresh token on N milleseconds, set new token in state and in local storage
   * when failed for auth problem dispatch logout
   */
  function *watchRefreshToken(tokenToRefresh) {
    let token = tokenToRefresh;
    while (true) {
      yield call(delay, refreshTokenTick);
      yield put({ type: REFRESH_TOKEN_LOADING });
      try {
        token = yield call(refreshToken, token);
        yield call(storeToken, token);
        yield put({ type: REFRESH_TOKEN_SUCCESS, payload: { token }});
      } catch (error) {
        yield put({ type: REFRESH_TOKEN_FAILURE, error: error.message ? error.message : error });
        if (error.status === 401 || error.status === 403) {
          yield put(logout())
        }
      }
    }
  }

  /**
   * Race between refresh and logout
   */
  function *watchRefreshTokenAndLogout(token) {
    if (typeof refreshToken === 'function') {
      yield race({
        logout: watchLogout(),
        refresh: watchRefreshToken(token),
      });
    } else {
      yield watchLogout();
    }
  }

  /**
   * Auth Flow
   */
  return function *authFlow() {
    // auth using local storage token
    let token = yield authenticateWithStorageToken();
    if (token) {
      yield watchRefreshTokenAndLogout(token);
    }

    // auth using login form
    while (true) {
      token = yield watchLogin();
      if (token) {
        yield watchRefreshTokenAndLogout(token);
      }
    }
  };
};

export default auth;
