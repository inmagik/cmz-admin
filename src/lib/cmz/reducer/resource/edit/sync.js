import {
  CRUD_GET_ONE_LOADING,
  CRUD_GET_ONE_FAILURE,
  CRUD_GET_ONE_SUCCESS
 } from '../../../actions/dataActions';
import { EDIT_UNLOADED } from '../../../actions/editActions';

export default (resource) => (previousState = false, { type, meta }) => {
  if (!meta || meta.resource !== resource) {
    return previousState;
  }
  switch (type) {

  case CRUD_GET_ONE_SUCCESS:
    return true;
  case CRUD_GET_ONE_LOADING:
  case CRUD_GET_ONE_FAILURE:
  case EDIT_UNLOADED:
    return false;
  default:
    return previousState;
  }
};
