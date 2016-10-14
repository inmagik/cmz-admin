import {
  GET_LIST,
  GET_MATCHING,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  CUSTOM_GET,
  CUSTOM_POST,
  CUSTOM_PUT,
  CUSTOM_DELETE,
  ME,
  REFRESH_TOKEN,
  LOGIN,
  UPDATE_SORT,
} from './types';
import { fetchJson, queryParameters } from '../util/fetch';
import { omit } from 'lodash';

export default (apiUrl) => ({ getToken, getLangs }) => {

  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    switch (type) {
    case LOGIN:
      url = `${apiUrl()}/auth/`;
      options.method = 'POST';
      options.body = JSON.stringify(params.credentials);
      break;
    case ME:
      url = `${apiUrl()}/me/`
      break;
    case REFRESH_TOKEN:
      url = `${apiUrl()}/refresh-token/`;
      options.method = 'POST';
      options.body = JSON.stringify({ token: params.token });
      break;
    case CUSTOM_GET:
      url = `${apiUrl(params.lang)}/${resource}/?${queryParameters(params.query || {})}`;
      break;
    case CUSTOM_POST:
      url = `${apiUrl(params.lang)}/${resource}/?${queryParameters(params.query || {})}`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data || {});
      break;
    case CUSTOM_PUT:
      url = `${apiUrl()}/${resource}/?${queryParameters(params.query || {})}`;
      options.method = 'PUT';
      // options.body = params.data.reduce((FormData, value) => {
      //
      // }, new FormData())
      // new FormData(params.data);
      // options.body = JSON.stringify(params.data || {});
      break;
    case CUSTOM_DELETE:
      url = `${apiUrl(params.lang)}/${resource}/?${queryParameters(params.query || {})}`;
      options.method = 'DELETE';
      break;
    case GET_LIST: {
      const { page, perPage } = params.pagination || { page: 1, perPage: 1000 };
      const { field, order } = params.sort || {};
      console.info(field);
      const filter = params.filter || {};
      const query = {
        // pagination
        limit: perPage,
        offset: (page - 1) * perPage,
        // order
        ...(field ? {
          ordering: `${ order === 'DESC' ? '-' : '' }${field}`
        } : {}),
        // filter
        ...filter
      };
      url = `${apiUrl(params.lang)}/${resource}/?${queryParameters(query)}`;
      break;
    }
    case GET_MATCHING: {
      const query = {
        filter: JSON.stringify(params.filter),
      };
      url = `${apiUrl(params.lang)}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_ONE:
      url = `${apiUrl(params.lang)}/${resource}/${params.id}/`;
      break;
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl(params.lang)}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const query = {
        filter: JSON.stringify({ [params.target]: params.id }),
      };
      url = `${apiUrl(params.lang)}/${resource}?${queryParameters(query)}`;
      break;
    }
    case UPDATE:
      url = `${apiUrl(params.lang)}/${resource}/${params.id}/`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case CREATE:
      url = `${apiUrl(params.lang)}/${resource}/`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${apiUrl(params.lang)}/${resource}/${params.id}/`;
      options.method = 'DELETE';
      break;
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
    }

    // Auth request
    let token;
    if (params.token) {
      // When given use params token
      token = params.token;
    } else if (typeof tokenGetter === 'function') {
      // Otherwise use the provided tokenGetter callback
      token = getToken(type, resource, params);
    }
    if (token) {
      options.auth = `JWT ${token}`;
    }

    return { url, options };
  };

  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
    case GET_LIST:
      return {
        data: json.results.map(x => x),
        total: parseInt(json.count, 10),
      };
    case LOGIN:
    case REFRESH_TOKEN:
      return json.token;
    case CREATE:
      return { ...params.data, id: json.id };
    default:
      return json;
    }
  };
let i = 0;
  const rest = (type, resource, params) => {
    // Mock the world....
    if (type === UPDATE_SORT) {
    i++;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if ( i === 4) {
            i=0;
          reject({ status: 400 });
        } else {
          resolve(params.ids);
        }
        }, 200);
      });
    }
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToREST(response, type, resource, params));
  };

  return (type, resource, params) => {
      if (type === GET_ONE) {
        return rest(type, resource, params)
          .then(record =>
            Promise.all(getLangs().map(lang =>
              // TODO: Check for 404...
              rest(type, resource, { ...params, lang }).then(r => r, () => ({ language_code: lang }))
            ))
            .then(languages => ({ ...record, languages }))
          );
      }
      if (type === UPDATE) {
        return rest(type, resource, { ...params, data: omit(params.data, ['languages'])})
          .then(record => Promise.all(params.data.languages.map(langRecord => (
            rest(type, resource, { ...params, data: langRecord })
          ))));
      }
      return rest(type, resource, params);
  };
};
