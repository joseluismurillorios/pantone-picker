import Vue from 'vue';
import Vuex from 'vuex';

import { throttle } from '../helpers/helper-util';
import {
  colors,
  colorGroups,
  filterColor,
  getProps,
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

const defaultStore = {
  colors,
  colorGroups,
  filter: {
    searchTerm: '',
    searchBy: '*',
    searchOptions: [
      { text: 'All', value: '*' },
      { text: 'Name', value: 'name' },
      { text: 'Hex', value: 'components' },
    ],
    results: [],
  },
};

export default new Vuex.Store({
  strict: true,
  plugins: [localStorage],
  state: {
    ...defaultStore,
    ...persistedState,
  },
  getters: {
    results: (state) => state.filter.results,
    resultsCount: (state) => state.filter.results.length,
  },
  mutations: {
    updateTerm(state, searchTerm) {
      state.filter.searchTerm = searchTerm;
    },
    updateResults(state, results) {
      state.filter.results = results;
    },
    updateSearch(state, payload) {
      const {
        name,
        value,
      } = payload;
      state.filter[name] = value;
    },
  },
  actions: {
    updateTerm({ commit, dispatch }, searchTerm) {
      commit('updateTerm', searchTerm);
      if (searchTerm.length > 2) {
        dispatch('updateSearchResultsThrottled', searchTerm);
      } else {
        commit('updateResults', []);
      }
    },
    updateSearchResults({ commit, state }) {
      const {
        filter: { searchTerm, searchBy },
      } = state;
      if (searchTerm.length > 2) {
        const sarchItems = filterColor(searchTerm, getProps(searchBy));
        commit('updateResults', sarchItems);
      }
    },
    updateSearchResultsThrottled: throttle((context, searchTerm) => {
      context.dispatch('updateSearchResults', searchTerm);
    }, 500),

    updateSearch({ commit, dispatch, state }, payload) {
      commit('updateSearch', payload);
      dispatch('updateTerm', state.filter.searchTerm);
    },
  },
  modules: {
  },
});
