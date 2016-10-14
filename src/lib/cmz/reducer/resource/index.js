import { combineReducers } from 'redux';
import data from './data';
import list from './list';
import sortablelist from './sortablelist';

export default (resource) => combineReducers({
  data: data(resource),
  list: list(resource),
  sortablelist: sortablelist(resource),
});
