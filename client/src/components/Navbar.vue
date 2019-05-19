<template>
  <v-toolbar id="toolbar" app flat class="primary" dark>
    <v-toolbar-title class="v-list__tile--link" @click.prevent="goHomePage">ECM</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      id="cart-icon"
      v-if="user"
      :disabled="!authenticated"
      icon
      flat
      :ripple="false"
      @click.prevent="goCartPage"
    >
      <v-badge left color="white">
        <template v-slot:badge>
          <span class="black--text">{{ cartLength }}</span>
        </template>
        <v-icon class="material-icons">shopping_cart</v-icon>
      </v-badge>
    </v-btn>
    <v-toolbar-items id="entry" v-if="!authenticated">
      <v-divider vertical inset></v-divider>
      <v-btn v-show="!authenticated" flat depressed small @click.prevent="goRegisterPage">REGISTER</v-btn>
      <v-divider vertical inset></v-divider>
      <v-btn v-show="!authenticated" flat depressed small @click.prevent="goLoginPage">LOGIN</v-btn>
    </v-toolbar-items>

    <v-toolbar-items id="menu" v-else>
      
      <v-btn v-show="authenticated && !user" flat depressed small @click.prevent="goAdminPage">Dashboard</v-btn>
      <v-divider vertical inset dark></v-divider>
      <v-btn v-show="authenticated && user" flat depressed small @click.prevent="goTransactionPage">My transactions</v-btn>
      <v-divider vertical inset dark></v-divider>
      <v-btn
        v-show="authenticated && !user"
        flat
        depressed
        small
        @click.prevent="goAddProductPage"
      >ADD PRODUCT</v-btn>
      <v-divider vertical inset></v-divider>
      <v-btn v-show="authenticated" flat depressed small @click.prevent="userLogout">SIGN OUT</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Navbar',
  props: ['cart-length'],
  data() {
    return {};
  },
  created() {
    
  },
  methods: {
    ...mapMutations(['USER_LOGOUT', 'CLEAR_CART', 'SET_ROLE']),
    goHomePage() {
      this.$router.push({ name: 'home' });
    },
    goRegisterPage() {
      this.$router.push({ name: 'register' });
    },
    goLoginPage() {
      this.$router.push({ name: 'login' });
    },
    goAddProductPage() {
      this.$router.push({ name: 'add-product' });
    },
    goCartPage() {
      this.$router.push({ name: 'cart' });
    },
    goTransactionPage() {
      this.$router.push({ name: 'transaction' });
    },
    goAdminPage() {
      this.$router.push({ name: 'dashboard' });
    },
    userLogout() {
      localStorage.clear();
      this.USER_LOGOUT();
      this.SET_ROLE('');
      this.CLEAR_CART();
      alertify.success('Bye');
      this.$router.push({ name: 'login' });
    },
  },
  computed: {
    ...mapState(['authenticated', 'role']),
    user() {
      return (this.role === 'user');
    }
  },
  
};
</script>

<style scoped>
</style>
