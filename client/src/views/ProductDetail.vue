<template>
  <v-container grid-list-xl pa-5>
    <v-layout row wrap>
      <v-flex xs12 md5 pa-2>
        <ImageFrame :source="productDetail.url" :height="'475px'"></ImageFrame>
      </v-flex>

      <v-flex xs12 md7>
        <v-layout justify-space-start column fill-height px-3>
          <div class="px-2 pb-2">
            <h1 class="display-2">{{ productDetail.name }}</h1>
          </div>
          <div class="pa-2">
            <span class="grey--text display-1">{{ priceFormat }}</span>
          </div>

          <div class="pa-2">
            Stock: {{ productDetail.stock }}
            <br>
            <v-layout row>
              <v-flex xs12 md6>
                Buy: {{ quantity }}
                <v-slider height="24px" v-model="quantity" :min="1" :max="productDetail.stock"></v-slider>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field pt-3 v-model="quantity" type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </div>
          <div class="pa-2">
            <!-- <v-btn block large>ADD TO CART</v-btn> -->
            <AddCartButton
              :quantity="quantity"
              :product-id="productDetail._id"
              :seller-id="productDetail.sellerId"
              :price="productDetail.price"
            ></AddCartButton>
          </div>
          <v-divider></v-divider>
          <div class="pa-2">Description: {{ productDetail.description}}</div>
          <div class="pa-2">Posted at: {{ dateFormat}}</div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddCartButton from '@/components/AddCartButton';
import ImageFrame from '@/components/ImageFrame';
import moment from 'moment';

export default {
  name: 'ProductDetail',
  components: {
    AddCartButton,
    ImageFrame,
  },
  data() {
    return {
      quantity: 1,
    };
  },
  created() {
    this.fetchProductDetail(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchProductDetail']),
  },
  computed: {
    ...mapState(['productDetail']),
    priceFormat() {
      const converter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      });
      return converter.format(this.productDetail.price);
    },
    dateFormat() {
      return moment(this.productDetail.createdAt).format(
        'MMMM Do YYYY, h:mm:ss a',
      );
    },
  },
};
</script>

<style>
#slider {
  align-self: self-end;
}
</style>
