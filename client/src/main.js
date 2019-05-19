import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/register' || to.fullPath === '/login')  {
    if (localStorage.getItem('accessToken')) {
      return alertify.error("You,ve already logged in")
    } else next();
  }  else if (to.path === '/') {
    next();
  }
  else if(!localStorage.getItem('accessToken')) {
    alertify.error('Please login first')
    next('/login');
  } else {
     next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
