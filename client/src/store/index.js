import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    role: '',
    products: [],
    productDetail: {},
    product: {},
    cart: [],
    cartItem: {},
    provinces: [],
    cities: [],
    transactions: [],
  },
  mutations,
  actions,
  getters,
});
