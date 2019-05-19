<template>
  <v-container fluid id="main-container">
    <v-img :src="require('@/assets/testbanner.jpeg')" max-height="450px"></v-img>
    <v-container grid>
      <h1 class="display-2 text-uppercase text-xs-center font-weight-light pa-3">our collections</h1>
      <v-divider/>
      <v-form id="search-form" class="pa-2" @submit.prevent="productSearch">
        <v-text-field
          v-model="keyword"
          hide-details
          single-line
          append-icon="clear"
          @click:append.prevent="clearKeyword"
          label="Search for products"
        ></v-text-field>
        <span class="font-weight-medium">{{ message }}</span>
      </v-form>

      <v-layout row wrap>
        <ProductCard v-for="(product) in displayProducts" :key="product._id" :product="product">
          <AddCartButton
            :quantity="1"
            :product-id="product._id"
            :seller-id="product.sellerId"
            :price="product.price"
          ></AddCartButton>
          <!-- <v-layout row wrap justify-space-between>
        <v-btn>EDIT</v-btn>
        <v-btn>DELETE</v-btn>

          </v-layout>-->
        </ProductCard>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from '@/components/ProductCard';
import AddCartButton from '@/components/AddCartButton';

export default {
  name: 'Home',
  components: {
    ProductCard,
    AddCartButton,
  },
  data() {
    return {
      keyword: '',
      searched: [],
      message: '',
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(['fetchProducts']),
    productSearch() {
      const regex = new RegExp(this.keyword, 'ig');

      this.searched = this.products.filter(v => v.name.match(regex));
      if (!this.searched.length) {
        this.message = 'Sorry, we found nothing :(((';
      } else {
        this.message = '';
      }
    },
    clearKeyword() {
      this.keyword = '';
      this.message = '';
    },
  },
  computed: {
    ...mapState(['products']),
    displayProducts() {
      if (this.searched && this.searched.length) {
        return this.searched;
      }
      return this.products;
    },
  },
  // watch: {
  //   keyword: {
  //     handler: 'productSearch',
  //   }
  // }
};
</script>

<style scoped>
#main-container {
  padding: 0;
}

#banner {
  background-size: auto;
  min-height: "200px";
}

#search-form {
  max-width: 25%;
}
</style>
