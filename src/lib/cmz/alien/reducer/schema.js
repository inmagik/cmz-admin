import { SCHEMA_RETRIEVED } from '../actions';

export default (previousState = null, { type, payload }) => {
  switch (type) {
    case SCHEMA_RETRIEVED:
      return payload;
    default:
      return previousState;
  }
};
