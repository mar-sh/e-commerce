<template>
  <v-app>
    <Navbar :cart-length="cartLength"></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  data() {
    return {
      //
    };
  },
  components: {
    Navbar,
    Footer,
  },
  created() {
    if (localStorage.getItem('accessToken')) {
      this.USER_LOGIN();
      this.SET_ROLE(localStorage.getItem('role'));
      this.fetchUserCart(localStorage.getItem('accessToken'));
    } else {
      this.USER_LOGOUT();
    }
  },
  methods: {
    ...mapActions([
      'fetchUserCart',
    ]),
    ...mapMutations([
      'USER_LOGIN',
      'USER_LOGOUT',
      'SET_ROLE',
    ]),
  },
  computed: {
    ...mapGetters([
      'cartLength',
    ]),
  },
};
</script>
