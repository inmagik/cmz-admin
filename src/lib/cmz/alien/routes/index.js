import { promiseAPieceOfStatePlease } from '../util';
import { routesReplicator } from '../replicators';

const makeGetResourcesRoutes = (store) => (partialNextState, callback) => {
  // TODO: In a real perfect world this promise can reject when
  // schema failed
  promiseAPieceOfStatePlease(store, (state) => state.cmz.alien.schema)
    .then((schema) => callback(null, routesReplicator(schema)));
};

export { makeGetResourcesRoutes };
