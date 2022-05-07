import { APIEndpoint, APIMethod } from './api.models';

export const FULL_TREE_URL: APIEndpoint = {
  api: '/api/Login?',
  method: APIMethod.get,
  mock: [''],
  authorization: false
};
