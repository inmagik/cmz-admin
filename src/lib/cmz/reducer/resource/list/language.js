import { CRUD_GET_LIST_SUCCESS } from '../../../actions/dataActions';

export default (resource) => (previousState = null, { type, payload, meta }) => {
  if (!meta || meta.resource !== resource) {
      return previousState;
  }
  if (type === CRUD_GET_LIST_SUCCESS) {
      return payload.language;
  }
  return previousState;
};
