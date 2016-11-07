import { combineReducers } from 'redux';
import resourceReducer from './resource';
import authReducer from '../../auth/reducer';
import languagesReducer from './languages';
import loading from './loading';
// import notification from './notification';
// import references from './references';

export default (config, asyncReducers) => {
  const { resources } = config;
  const resourceReducers = {};
  resources.forEach(resource => {
    resourceReducers[resource.name] = resourceReducer(resource.name, resource.options || {});
  });
  const auth = authReducer();
  const languages = languagesReducer(config.languages);
  return combineReducers({
    ...resourceReducers,
    languages,
    auth,
    loading,
    ...asyncReducers
    // notification,
    // references,
  });
};
