import { fork } from 'redux-saga/effects';
import crudFetch from './crudFetch';
import authSaga from '../../auth/saga';
import referenceFetch from './referenceFetch';
import defaultSuccessSideEffect from './success';
import defaultFailureSideEffect from './failure';
import { LOGIN, ME, REFRESH_TOKEN } from '../rest';

export default (restClient, config = {}, successSideEffects = defaultSuccessSideEffect, failureSideEffects = defaultFailureSideEffect) => function *rootSaga() {
  yield fork(crudFetch(restClient, successSideEffects, failureSideEffects));
  yield fork(referenceFetch);
  yield fork(authSaga({
    login: (credentials) => restClient(LOGIN, null, { credentials }),
    me: (token) => restClient(ME, null, { token }),
    refreshToken: (token) => restClient(REFRESH_TOKEN, null, { token }),
    ...(config.auth || {}),
  }));
};
