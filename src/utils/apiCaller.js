import axios from "../config/axios";

const request = (endpoint, method, headers = {}, params = {}, body = {}) => {
  const config = {
    url: endpoint,
    method,
    headers: Object.assign({}, headers),
    params: Object.assign(params),
    data: body,
  };
  return axios(config);
};

const get = (endpoint, params = {}, headers = {}) =>
  request(endpoint, "GET", headers, params);

const post = (endpoint, body = {}, params = {}, headers = {}) =>
  request(endpoint, "POST", headers, params, body);

const put = (endpoint, body = {}, params = {}, headers = {}) =>
  request(endpoint, "PUT", headers, params, body);

const remove = (endpoint, body = {}, params = {}, headers = {}) =>
  request(endpoint, "DELETE", headers, params, body);

export { request, get, post, put, remove };
