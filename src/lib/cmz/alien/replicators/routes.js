import listReplicator from './list';

export default (schema) => {
  return schema.map(rr => ({
    path: rr.resource,
    component: listReplicator(rr)
  }));
};
