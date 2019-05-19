import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
// import Register from './views/Register.vue';
// import Login from './views/Login.vue';
// import ProductAdd from './views/ProductAdd.vue';
// import ProductDetail from './views/ProductDetail.vue';
// import ProductEdit from './views/ProductEdit.vue';
// import Cart from './views/Cart.vue';
// import CartCheckout from './views/CartCheckout.vue';
// import Transaction from './views/Transaction.vue';
// import AdminDashboard from './views/AdminDashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: () => import(/* webpackChunkName: "about" */ './views/ProductAdd.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import(/* webpackChunkName: "about" */ './views/ProductDetail.vue'),
    },
    {
      path: '/edit-product/:id',
      name: 'edit-product',
      component: () => import(/* webpackChunkName: "about" */ './views/ProductEdit.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "about" */ './views/Cart.vue'),
      children: [
        {
          path: ':id',
          name: 'cart-checkout',
          component: () => import(/* webpackChunkName: "about" */ './views/CartCheckout.vue'),
        },
      ],
    },
    {
      path: '/transactions',
      name: 'transaction',
      component: () => import(/* webpackChunkName: "about" */ './views/Transaction.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/AdminDashboard.vue'),
    },
  ],
});
