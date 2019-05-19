import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import ProductAdd from './views/ProductAdd.vue';
import ProductDetail from './views/ProductDetail.vue';
import ProductEdit from './views/ProductEdit.vue';
import Cart from './views/Cart.vue';
import CartCheckout from './views/CartCheckout.vue';
import Transaction from './views/Transaction.vue';
import AdminDashboard from './views/AdminDashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: ProductAdd,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetail,
    },
    {
      path: '/edit-product/:id',
      name: 'edit-product',
      component: ProductEdit,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      children: [
        {
          path: ':id',
          name: 'cart-checkout',
          component: CartCheckout,
        },
      ],
    },
    {
      path: '/transactions',
      name: 'transaction',
      component: Transaction,
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: AdminDashboard,
    },
  ],
});
