<template>
  <v-container fluid>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <router-view></router-view>
      </v-layout>
    </v-container>

    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs12 sm6>
          <v-card>
            <v-toolbar flat color="primary" dark>
              <v-toolbar-title>MY CART</v-toolbar-title>

              <v-spacer></v-spacer>

              <i class="material-icons v-list__tile--link" @click.prevent="closeCheckout">close</i>
            </v-toolbar>

            <v-list flat three-line>
              <template v-for="(item, index) in cart">
                <v-divider v-if="index > 0" :key="index" inset></v-divider>

                <v-list-tile :key="item._id" avatar>
                  <v-list-tile-avatar>
                    <img :src="item.productId.url">
                  </v-list-tile-avatar>

                  <v-layout row wrap justify-space-between>
                    <v-flex xs6>
                      <v-list-tile-content>
                        <v-list-tile-title>Item: {{ item.productId.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>Total price: {{ item.amount}}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>Date: {{ formatDate(item.createdAt) }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-flex>

                    <v-flex xs6>
                      <v-list-tile-action id="action-container">
                        <v-btn
                          flat
                          small
                          color="secondary"
                          @click.prevent="cartCheckout(item._id)"
                        >Checkout</v-btn>
                        <v-btn
                          flat
                          small
                          color="secondary"
                          @click.prevent="deleteItem(item._id)"
                        >Discard</v-btn>
                      </v-list-tile-action>
                    </v-flex>
                  </v-layout>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "Cart",
  data() {
    return {
      keyword: ""
    };
  },
  created() {
    this.fetchUserCart(localStorage.getItem("accessToken"));
  },
  methods: {
    ...mapActions([
      "fetchUserCart", 
      "deleteCartItem",
    ]),
    cartCheckout(id) {
      this.$router.push({ name: "cart-checkout", params: { id } });
    },
    closeCheckout() {
      this.$router.push({ name: 'cart' });
    },
    deleteItem(id) {
      alertify.confirm(
        "Confirm removal",
        "Are you sure you want to discard this item ?",
        () => {
          this.deleteCartItem(id);
          this.$router.push({ name: "cart" });
          alertify.success("Deleted");
        },
        () => {
          alertify.message("Canceled");
        }
      );
    },
    formatDate(date) {
      return moment(date).format("ll");
    }
  },
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style>
/* #action-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
} */
</style>
