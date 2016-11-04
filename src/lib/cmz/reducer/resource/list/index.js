import { combineReducers } from 'redux';
import ids from './ids';
import params from './params';
import total from './total';
import language from './language';

export default (resource) => combineReducers({
  ids: ids(resource),
  params: params(resource),
  total: total(resource),
  // This in different from language in params because this is not the language
  // REQUESTED but this is the ACTUALLY language of data.
  language: language(resource),
});
