import React from 'react';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer, replace } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

// create root reducer
import cmzReducer from './lib/cmz/reducer';
const makeRootReducer = (asyncCmzSubReducers) => {
  return combineReducers({
    routing: routerReducer,
    form: formReducer,
    cmz: cmzReducer({
      resources: [],
      languages: [{ name: 'Italiano', code: 'it' }, { name: 'Inglese', code: 'en' }],
    }, asyncCmzSubReducers),
  })
};
const rootReducer = makeRootReducer();

// create Redux app
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, undefined, compose(
  applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

// inject cmz reducers
import { makeInjectReducers } from './lib/cmz';
const injectCmzReducers = makeInjectReducers(store, makeRootReducer);

// create rest client
import { djangoRestClient, hookRestClientWithStore, fetchJson } from './lib/cmz/rest';
const apiUrl = language => `http://localhost:8000${language ? `/${language}` : ''}/api`;
const restClient = hookRestClientWithStore(store, djangoRestClient(apiUrl));

// create saga
import makeCmzSaga from './lib/cmz/alien/saga';
const getSchema = () => fetchJson('/schema.json').then(({ json }) => json);
const cmzSaga = makeCmzSaga(getSchema, injectCmzReducers);
sagaMiddleware.run(cmzSaga(restClient, {
  // Auth configuration
  auth: {
    logoutEffects: () => replace('/login'),
    refreshTokenTick: (60 * 4 * 1000), // refresh token every 4 minutes
  }
}));

// initialize the router
const history = syncHistoryWithStore(hashHistory, store);

// UI
import AppLayout from './AppLayout';
import Login from './Login';
import Dashboard from './Dashboard';

// HOCs for authorization
import { UserIsAuthenticated, UserIsNotAuthenticated } from './lib/cmz/authorization';

// Autogenerate routes
import { makeGetResourcesRoutes } from './lib/cmz/alien/routes';

// bootstrap redux and the routes
const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/login" component={UserIsNotAuthenticated(Login)} />
      <Route
        path="/"
        component={UserIsAuthenticated(AppLayout)}
        getChildRoutes={makeGetResourcesRoutes(store)}
      >
        <IndexRoute component={Dashboard} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>
  </Provider>
);

export default App;
