import sync from './sync';
import { combineReducers } from 'redux';

export default (resource) => combineReducers({
  sync: sync(resource),
});
