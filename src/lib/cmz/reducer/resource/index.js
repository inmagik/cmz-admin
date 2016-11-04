import { combineReducers } from 'redux';
import data from './data';
import list from './list';
import edit from './edit';

export default (resource, options) => combineReducers({
  data: data(resource),
  // TODO: Implement default params shit
  list: list(resource, (options.list || {}).params || {}),
  edit: edit(resource),
});
