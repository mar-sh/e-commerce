export default {
  USER_LOGIN(state) {
    state.authenticated = true;
  },
  USER_LOGOUT(state) {
    state.authenticated = false;
  },
  SET_ROLE(state, payload) {
    state.role = payload;
  },
  SET_PRODUCTS(state, payload) {
    state.products = [...payload];
  },
  SET_PRODUCT_DETAIL(state, payload) {
    state.productDetail = { ...payload };
  },
  SET_PRODUCT_EDIT(state, payload) {
    state.product = payload;
  },
  REMOVE_PRODUCT(state, payload) {
    state.products = state.products.filter(product => product._id !== payload);
  },
  SET_CART(state, payload) {
    state.cart = [...payload];
  },
  PUSH_NEW_CART_ITEM(state, payload) {
    state.cart.push(payload);
  },
  ASSIGN_CART_ITEM(state, payload) {
    state.cartItem = { ...payload };
  },
  REMOVE_CART_ITEM(state, payload) {
    state.cart = state.cart.filter(item => item._id !== payload);
  },
  CLEAR_CART(state) {
    state.cart = [];
  },
  SET_TRANSACTIONS(state, payload) {
    state.transactions = [...payload];
  },
  SET_TRANSACTION_STATUS(state, payload) {
    state.transactions.forEach((tx, index) => {
      if (tx._id === payload._id) {
        state.transactions[index] = [...payload];
      }
    });
  },
  SET_PROVINCES(state, payload) {
    state.provinces = [...payload];
  },
  SET_CITIES(state, payload) {
    state.cities = [...payload];
  },
};
