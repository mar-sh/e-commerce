<template>
  <v-btn
    flat
    depressed
    light
    block
    outline
    color="secondary"
    :disabled="disabled"
    @click.prevent="addCart()"
  >Add to Cart</v-btn>
</template>

<script>
import { mapMutations } from 'vuex';
import backend from '@/api/backend';

export default {
  name: 'AddCartButton',
  props: ['quantity', 'product-id', 'seller-id', 'price' ,'disabled', 'label'],
  methods: {
    ...mapMutations([
      'PUSH_NEW_CART_ITEM',
    ]),
    addCart() {
      console.log('add cart');

      const data = {
        productId: this.productId,
        sellerId: this.sellerId,
        quantity: this.quantity,
        amount: this.quantity * this.price,
      };

      backend({
        method: 'POST',
        url: '/carts',
        headers: { Authorization: localStorage.getItem('accessToken') },
        data,
      })
        .then(({ data }) => {
          alertify.success("Added to cart!")
          this.PUSH_NEW_CART_ITEM(data);
        })
        .catch(({ response }) => {
          alertify.error('Please login first');
        });
    },
  },
};
</script>

<style>
</style>
