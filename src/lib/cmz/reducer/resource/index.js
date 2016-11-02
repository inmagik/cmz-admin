import { combineReducers } from 'redux';
import data from './data';
import list from './list';
import edit from './edit';
import sortablelist from './sortablelist';
import { get } from 'lodash';

export default (resource, options) => combineReducers({
  data: data(resource),
  // TODO: Implement default params shit
  list: list(resource, (options.list || {}).params || {}),
  edit: edit(resource),
  sortablelist: sortablelist(resource),
});
