<template>
  <v-toolbar id="toolbar" app flat class="primary" dark>
    <v-toolbar-title class="v-list__tile--link" @click.prevent="goHomePage">ECM</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      id="cart-icon"
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
      <v-divider vertical inset dark></v-divider>
      <v-btn v-show="authenticated" flat depressed small @click.prevent>My transactions</v-btn>
      <v-divider vertical inset dark></v-divider>
      <v-btn
        v-show="authenticated"
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
  methods: {
    ...mapMutations(['USER_LOGOUT', 'CLEAR_CART']),
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
    userLogout() {
      localStorage.clear();
      this.USER_LOGOUT();
      this.CLEAR_CART();
      alertify.success('Bye');
      this.$router.push({ name: 'login' });
    },
  },
  computed: {
    ...mapState(['authenticated']),
  },
};
</script>

<style scoped>
</style>
