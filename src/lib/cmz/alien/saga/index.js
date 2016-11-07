import { fork } from 'redux-saga/effects';
import cmzSaga from '../../saga';
import alienSaga from './alien';

// Run cmz saga and alien saga togheter
const makeCmzSaga = (...alienSagaArguments) => (...cmzSagaArguments) => {
  return function *rootSaga() {
    yield fork(alienSaga(...alienSagaArguments));
    yield fork(cmzSaga(...cmzSagaArguments));
  };
};

export default makeCmzSaga;
