// Make a function for inject reducers in a given store
export const makeInjectReducers = (store, makeRootReducer) => {
  let asyncReducers = {};
  return (reducers) => {
    asyncReducers = {
      ...asyncReducers,
      ...reducers
    };
    store.replaceReducer(makeRootReducer(asyncReducers));
  };
};
