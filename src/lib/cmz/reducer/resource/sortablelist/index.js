import { combineReducers } from 'redux';
import ids from './ids';

export default (resource) => combineReducers({
  ids: ids(resource),
});
