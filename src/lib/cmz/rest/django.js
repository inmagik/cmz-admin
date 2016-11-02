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
import { compose } from 'lodash/fp';
import { omit } from 'lodash';

export default (apiUrl) => ({ getToken }) => {

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
      url = `${apiUrl(params.language)}/${resource}/?${queryParameters(params.query || {})}`;
      break;
    case CUSTOM_POST:
      url = `${apiUrl(params.language)}/${resource}/?${queryParameters(params.query || {})}`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data || {});
      break;
    case CUSTOM_PUT:
      url = `${apiUrl()}/${resource}/?${queryParameters(params.query || {})}`;
      options.method = 'PUT';
      break;
    case CUSTOM_DELETE:
      url = `${apiUrl(params.language)}/${resource}/?${queryParameters(params.query || {})}`;
      options.method = 'DELETE';
      break;
    case GET_LIST: {
      const { page, perPage } = params.pagination || { page: 1, perPage: 1000 };
      const { field, order } = params.sort || {};
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
      url = `${apiUrl(params.language)}/${resource}/?${queryParameters(query)}`;
      break;
    }
    case GET_MATCHING: {
      const query = {
        filter: JSON.stringify(params.filter),
      };
      url = `${apiUrl(params.language)}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_ONE:
      url = `${apiUrl(params.language)}/${resource}/${params.id}/`;
      break;
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl(params.language)}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const query = {
        filter: JSON.stringify({ [params.target]: params.id }),
      };
      url = `${apiUrl(params.language)}/${resource}?${queryParameters(query)}`;
      break;
    }
    case UPDATE:
      url = `${apiUrl(params.language)}/${resource}/${params.id}/`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case CREATE:
      url = `${apiUrl(params.language)}/${resource}/`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${apiUrl(params.language)}/${resource}/${params.id}/`;
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
    } else if (typeof getToken === 'function') {
      // Otherwise use the provided tokenGetter callback
      token = getToken(type, resource, params);
    }
    if (token) {
      options.auth = `JWT ${token}`;
    }

    return { url, options };
  };

  // Normalize a record in lang add the langs key
  // with the form {..., langs: { it: {...}, en: {...}, ... }}
  // const normailizeJsonWithLangs = (json, lang) => {
  //   if (lang) {
  //     const mapper = compose(
  //       // Become { lang: { it: {...} } }
  //       (record) => ({ ...record, langs: { [lang]: record } }),
  //       // This django field make confusion when merging data...
  //       (record) => omit(record, ['language_code'])
  //     );
  //     return Array.isArray(json) ? json.map(mapper) : mapper(json);
  //   }
  //   return json;
  // };

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

  return (type, resource, params) => {
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
      .then(response => convertHTTPResponseToREST(response, type, resource, params));
  };

  // Take base record and lang records and make one record with all langs
  // const joinIntoOneLangRecord = (record, langRecords) => ({
  //   ...record,
  //   langs: langRecords.reduce((langs, langRecord) => ({
  //     ...langs,
  //     ...langRecord.langs
  //   }), {})
  // });

  // return (type, resource, params) => {
  //   // Perform a multilangs GET_ONE with N rest calls...
  //   if (type === GET_ONE && Array.isArray(params.langs)) {
  //     const restLangs = () => Promise.all(params.langs.map(lang =>
  //       rest(type, resource, { ...params, lang })
  //         .then(
  //           r => r, // Ok nothing to do
  //           error => {
  //             // Lang not alredy configured...
  //             if (error.status === 404) {
  //               return { langs: { [lang]: {} } };
  //             }
  //             // Other errors stop all promise
  //             return Promise.reject(error);
  //           }
  //         )
  //     ));
  //
  //     return rest(type, resource, params).then(record => restLangs().then(jsons =>
  //       joinIntoOneLangRecord(omit(record, ['language_code']), jsons)
  //     ));
  //   }
  //   // Perform a multilang UPDATE with N rest calls...
  //   if (type === UPDATE && Array.isArray(params.langs)) {
  //     const restLangs = () => Promise.all(params.langs.map(lang =>
  //       rest(type, resource, { ...params, data: { ...params.data.langs[lang], language_code: lang }})
  //     ));
  //
  //     return rest(type, resource, { ...params, data: omit(params.data, ['langs']) })
  //       .then(record => restLangs().then(jsons =>
  //         joinIntoOneLangRecord(omit(record, ['language_code']), jsons)
  //       ));
  //   }
  //   // Perform a multilang CREATE with N rest calls...
  //   if (type === CREATE && Array.isArray(params.langs)) {
  //     const restLangs = (id) => Promise.all(params.langs.map(lang =>
  //       rest(UPDATE, resource, { ...params, id, data: { ...params.data.langs[lang], language_code: lang }})
  //       // .then({
  //       //
  //       // })
  //     ));
  //
  //     return rest(type, resource, { ...params, data: omit(params.data, ['langs']) })
  //       .then(record => restLangs(record.id).then(jsons =>
  //         joinIntoOneLangRecord(omit(record, ['language_code']), jsons)
  //       ));
  //   }
  //   return rest(type, resource, params);
  // };
};
