import djangoRestClient from './django';
import { fetchJson } from '../util/fetch';

const hookRestClientWithStore = (store, restClientFactory) => restClientFactory({
  getToken: () => store.getState().cmz.auth.token,
});

export * from './types';
export {
  hookRestClientWithStore,
  fetchJson,
  djangoRestClient,
};
