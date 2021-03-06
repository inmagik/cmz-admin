import djangoRestClient from './django';
export * from './types';

export {
  djangoRestClient,
};

export const hookRestClientWithStore = (store, restClientFactory) => restClientFactory({
  getToken: () => store.getState().cmz.auth.token,
  // getLangs: () => store.getState().cmz.langs.map(lang => lang.code),
});
