import { combineReducers } from 'redux';
import resourceReducer from './resource';
import authReducer from '../../auth/reducer';
import languagesReducer from './languages';
import loading from './loading';
// import notification from './notification';
// import references from './references';

export default ({ resources, languages }) => {
  const resourceReducers = {};
  resources.forEach(resource => {
    resourceReducers[resource.name] = resourceReducer(resource.name, resource.options);
  });
  const auth = authReducer();
  const langs = languagesReducer(languages);
  return combineReducers({
    ...resourceReducers,
    auth,
    langs,
    loading,
    // notification,
    // references,
  });
};
