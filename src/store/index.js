import Vue from 'vue';
import Vuex from 'vuex';

import { throttle } from '../helpers/helper-util';
import { setCache, getCache } from './localstorage';

const LS_KEY = 'state';
const persistedState = (getCache(LS_KEY) || {});

const localStorage = (store) => {
  // called when the store is initialized
  store.subscribe(throttle((mutation, state) => {
    // called after every mutation.
    setCache(LS_KEY, state);
  }, 1000));
};

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [localStorage],
  state: {
    filter: {
      term: '',
    },
    ...persistedState,
  },
  mutations: {
    updateMessage(state, term) {
      state.filter.term = term;
    },
  },
  actions: {
  },
  modules: {
  },
});
