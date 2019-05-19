import backend from '@/api/backend';

export default {
  fetchProducts(context) {
    backend({
      method: 'GET',
      url: '/products',
    })
      .then(({ data }) => {
        context.commit('SET_PRODUCTS', data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  fetchProductDetail(context, productId) {
    backend({
      method: 'GET',
      url: `/products/${productId}`,
    })
      .then(({ data }) => {
        context.commit('SET_PRODUCT_DETAIL', data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  fetchUserCart(context, userId) {
    backend({
      method: 'GET',
      url: '/carts',
      headers: { Authorization: userId },
    })
      .then(({ data }) => {
        context.commit('SET_CART', data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  fetchCartItem(context, cartId) {
    backend({
      method: 'GET',
      url: `/carts/${cartId}`,
      headers: { Authorization: localStorage.getItem('accessToken') },
    })
      .then(({ data }) => {
        context.commit('ASSIGN_CART_ITEM', data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  deleteCartItem(context, cartId) {
    backend({
      method: 'DELETE',
      url: `/carts/${cartId}`,
      headers: { Authorization: localStorage.getItem('accessToken') },
    })
      .then(() => {
        context.commit('REMOVE_CART_ITEM', cartId);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  fetchListOfProvinces(context) {
    backend({
      method: 'GET',
      url: '/deliveries/province',
    })
      .then(({ data }) => {
        context.commit('SET_PROVINCES', data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  fetchListOfCities(context, provinceId) {
    backend({
      method: 'GET',
      url: `/deliveries/city?province=${provinceId}`,
    })
      .then(({ data }) => {
        context.commit('SET_CITIES', data);
      })
      .catch((err) => {
        console.log(err);
      });
  },


};
