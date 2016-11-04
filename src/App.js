import React from 'react';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer, replace } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

// create root reducer
import cmzReducer from './lib/cmz/reducer';
const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  cmz: cmzReducer({
    resources: [
      {
        name: 'news',
        options: { }
      },
      { name: 'portfolioitem' }
    ],
    languages: [{ name: 'Italiano', code: 'it' }, { name: 'Inglese', code: 'en' }],
  }),
});

// create Redux app
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, undefined, compose(
  applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

// create rest client
import { djangoRestClient, hookRestClientWithStore } from './lib/cmz/rest';
const apiUrl = language => `http://localhost:8000${language ? `/${language}` : ''}/api`;
const restClient = hookRestClientWithStore(store, djangoRestClient(apiUrl));

// create saga
import cmzSaga from './lib/cmz/saga';
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
import { NewsList, NewsEdit, NewsCreate } from './News';
import { PortfolioList, PortfolioEdit } from './Portfolio';

// HOCs for authorization
import { UserIsAuthenticated, UserIsNotAuthenticated } from './lib/cmz/authorization';

// bootstrap redux and the routes
const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/login" component={UserIsNotAuthenticated(Login)} />
      <Route path="/" component={UserIsAuthenticated(AppLayout)}>
        <IndexRoute component={Dashboard} />
        <Route path="news" component={NewsList} />
        <Route path="news/create" component={NewsCreate} />
        <Route path="news/:id" component={NewsEdit} />
        <Route path="portfolio" component={PortfolioList} />
        <Route path="portfolio/:id" component={PortfolioEdit} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>
  </Provider>
);

export default App;
