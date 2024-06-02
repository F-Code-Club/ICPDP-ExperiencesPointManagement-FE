import axios, { axiosPrivate } from "../config/axios";

const request = (
  endpoint,
  method,
  isPrivate,
  headers = {},
  params = {},
  body = {}
) => {
  const config = {
    url: endpoint,
    method,
    headers: Object.assign({}, headers),
    params: Object.assign(params),
    data: body,
  };
  return isPrivate ? axiosPrivate(config) : axios(config);
};

const get = (endpoint, isPrivate = false, params = {}, headers = {}) =>
  request(endpoint, "GET", isPrivate, headers, params);

const post = (
  endpoint,
  isPrivate = false,
  body = {},
  params = {},
  headers = {}
) => request(endpoint, "POST", isPrivate, headers, params, body);

const put = (
  endpoint,
  isPrivate = false,
  body = {},
  params = {},
  headers = {}
) => request(endpoint, "PUT", isPrivate, headers, params, body);

const remove = (
  endpoint,
  isPrivate = false,
  body = {},
  params = {},
  headers = {}
) => request(endpoint, "DELETE", isPrivate, headers, params, body);

export { request, get, post, put, remove };
