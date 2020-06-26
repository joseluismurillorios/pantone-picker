import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    filter: {
      term: '',
    },
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
