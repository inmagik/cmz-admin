import resourceReducer from '../../reducer/resource';
import { get } from 'lodash';

export default (schemas) => (
  schemas.reduce((reducers, schema) => {
    const resource = get(schema, 'api.uri');
    return {
      ...reducers,
      [resource]: resourceReducer(resource, {})
    };
  }, {})
);
