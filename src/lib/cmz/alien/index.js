import { promiseAPieceOfStatePlease } from './util';
import { routesReplicator } from './replicators';

// FIXME: This should become a piece of alien not the main...
export const makeResourcesRoutes = (store) => (partialNextState, callback) => {
  // TODO: In a real perfect world this promise can reject when
  // schema failed
  promiseAPieceOfStatePlease(store, (state) => state.cmz.alien.schema)
    .then((schema) => callback(null, routesReplicator(schema)));
};

// This is intended to use togheter with alien saga
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
