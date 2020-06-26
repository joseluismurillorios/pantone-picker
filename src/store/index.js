import Vue from 'vue';
import Vuex from 'vuex';

import { throttle } from '../helpers/helper-util';
import {
  colors,
  colorGroups,
  filterColor,
} from '../helpers/helper-color';
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
    colors,
    colorGroups,
    filter: {
      term: '',
      attrs: ['name', 'component'],
      results: [],
    },
    ...persistedState,
  },
  getters: {
    results: (state) => state.filter.results,
    resultsCount: (state) => state.filter.results.length,
  },
  mutations: {
    updateTerm(state, term) {
      state.filter.term = term;
    },
    updateResults(state, results) {
      state.filter.results = results;
    },
  },
  actions: {
    updateTerm({ commit, dispatch }, term) {
      commit('updateTerm', term);
      if (term.length > 2) {
        dispatch('updateSearchResultsThrottled', term);
      } else {
        commit('updateResults', []);
      }
    },
    updateSearchResults({ commit, state }) {
      const {
        filter: { term, attrs = ['name'] },
      } = state;
      if (term.length > 2) {
        const sarchItems = filterColor(term, attrs);
        commit('updateResults', sarchItems);
      }
    },
    updateSearchResultsThrottled: throttle((context, term) => {
      context.dispatch('updateSearchResults', term);
    }, 500),
  },
  modules: {
  },
});
