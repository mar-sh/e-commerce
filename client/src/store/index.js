import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    products: [],
    productDetail: {},
    cart: [],
    cartItem: {},
    provinces: [],
    cities: [],
  },
  mutations,
  actions,
  getters,
});
