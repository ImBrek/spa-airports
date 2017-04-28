import 'whatwg-fetch';
import url from 'url';
import config from 'configs/common';

export const API_CREATE = 'API Create';
export const API_READ = 'API Read';
export const API_UPDATE = 'API Update';
export const API_DELETE = 'API Delete';
export const API_CALL = 'API_CALL';
export const API_CALL_RESULT = 'API_CALL_RESULT';

export const API_STATUS = {
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
};

const methods = {
  [API_READ]: 'GET',
  [API_UPDATE]: 'PUT',
  [API_CREATE]: 'POST',
  [API_DELETE]: 'DELETE',
};

/**
 * Wrapper above isomorphic-fetch for more convenient usage
 * @param options
 * @param {string} options.endpoint relative url to resource
 * @param {API_READ|API_UPDATE|API_CREATE|API_DELETE} options.method
 * @param {Object} [options.body]
 * @param {string} [options.queryParams]
 * @param {string} [options.credentials]
 * @param {Object} [options.headers]
 * @param {Object} [options.schema] schema for normalizr
 * @return {Promise.<{response: *}>}
 */
export default function (options) {
  const { endpoint, method, body, queryParams = '', credentials, headers = {}, schema } = options;

  const fullUrl = url.format({
    ...config.api,
    pathname: endpoint,
    query: queryParams,
  });

  const bodySerialized = body ? JSON.stringify(body) : undefined;

  const httpMethod = methods[method];

  // add content headers
  headers.Accept = 'application/json';

  return fetch(fullUrl, { method: httpMethod, body: bodySerialized, credentials, headers })
  // extract json body from request
    .then((response) => {
      // this request not have body
      if (response.status === API_STATUS.NO_CONTENT) {
        return { json: {}, response };
      }
      return response.json().then(json => ({ json, response }));
    })
    .then(({ json, response }) => {
      // reject promise if request failed
      if (!response.ok) {
        return Promise.reject({ json, response });
      }
      return json;
    })
    // handle error
    .then(
      response => ({ response }),
      (error) => {
        const { json, response } = error;
        return {
          error: (json && json.message) || error || 'Something bad happened',
          response: response || {},
        };
      },
    );
}
