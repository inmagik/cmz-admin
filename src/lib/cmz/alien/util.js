// Oh, oh this trasform a piece of state into a promise
// Wait until the requested piece state is not falsy, then resolve the promise
// TODO: More powerful implementation can resolve or reject base on other params...
export const promiseAPieceOfStatePlease = (store, selectState) => (
  new Promise((resolve) => {
    const getPieceOfStateAndResolve = () => {
      const state = store.getState();
      const value = selectState(state);

      if (value) {
        resolve(value);
        return value;
      }
    };

    if (!getPieceOfStateAndResolve()) {
      const unsubscribe = store.subscribe(() => {
        if (getPieceOfStateAndResolve()) {
          unsubscribe();
        }
      });
    }
  })
);
