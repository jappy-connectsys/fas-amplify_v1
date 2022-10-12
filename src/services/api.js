/* eslint-disable symbol-description */
import axios from 'axios';
import { API_URL, REACT_APP_DIRECTUS_TOKEN } from '../config';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.localStorage = axios.create({
      baseURL: API_URL,
      headers: {
        Pragma: 'no-cache',
        Authorization: 'Bearer ' + REACT_APP_DIRECTUS_TOKEN
      },
      params: {},
    });
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer);
    }

    return this[singleton];
  }

  get = (...params) => this.localStorage.get(...params);

  post = (...params) => this.localStorage.post(...params);

  put = (...params) => this.localStorage.put(...params);

  patch = (...params) => this.localStorage.patch(...params);

  delete = (...params) => this.localStorage.delete(...params);
}

export default ApiService.instance;
