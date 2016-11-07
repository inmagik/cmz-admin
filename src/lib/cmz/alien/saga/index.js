import { put, call } from 'redux-saga/effects';
import { SCHEMA_RETRIEVED } from '../actions';
import alienReducer from '../reducer';
import { reducersReplicator } from '../replicators';
// OK, this is alien saga the purpose of this is to async retrieve the config and
// then building reducers for CMZ Admin App and consolidate state for buling routes
// and UI Admin components
// FIXME: Now for testing purpose i use `getSchema()` as method to async retrieve
// cmz config in the future this must be more more powerful, the config will can be
// url where fetch config, directly the object or other esoteric way to getting config,
// maybe config will be only a way as "pollicino" to discover future config, yeah this is
// a little mad but can be! Ok let's see.

const alien = (getSchema, injectReducers) => {
  return function *alienSaga() {
    // Start the odissea...

    // Yeah, ok first inject the alien reducer
    yield call(injectReducers, {
      alien: alienReducer
    });

    // Ok now getting config from nowhere
    // TODO: Handle errors...
    const schema = yield call(getSchema);

    // Inject reducers from schema
    yield call(injectReducers, reducersReplicator(schema));

    // Finally update store with alien config
    yield put({ type: SCHEMA_RETRIEVED, payload: schema });
  };
};

export default alien;
