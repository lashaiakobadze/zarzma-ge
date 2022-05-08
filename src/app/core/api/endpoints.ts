import { APIEndpoint, APIMethod } from './api.models';

export const COUNTRY_URL: APIEndpoint = {
  api: 'v3/covid-19/all',
  method: APIMethod.get,
  mock: [''],
  authorization: false
};
