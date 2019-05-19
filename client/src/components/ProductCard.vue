<template>
  <v-flex xs12 md6 pa-3>
    <v-hover >
      <v-layout
        row
        wrap
        justify-start
        fill-height
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 1}`"
      >
        <v-flex xs5>
          <v-card flat height="200">
            <ImageFrame
            :source="product.url"
            :height="'200px'"
            class="v-list__tile--link"
            @ask-detail="goProductDetail(product._id)"
             ></ImageFrame>
          </v-card>
        </v-flex>

        <v-flex xs7 >
          <v-card id="product-info" height="200">
            <v-card-title id="card-title">
              <v-container id="info-container" align-content-space-around>
                <span
                  class="grey--text headline font-weight-medium v-list__tile--link"
                  @click.prevent="goProductDetail(product._id)"
                >{{ product.name }}</span>
                <br>
                <v-divider light class="pb-2 pt-1"></v-divider>
                <span>Price: {{ priceFormat }}</span>
                <br>
                <span>Stock Available: {{ productAvailability }}</span>
                <br>
                <span>Description: {{ product.description }}</span>
                <br>
              </v-container>
            </v-card-title>

            <v-card-actions id="card-action">
              <slot></slot>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-hover>
  </v-flex>
</template>

<script>
import ImageFrame from '@/components/ImageFrame';

export default {
  name: 'ProductCard',
  components: {
    ImageFrame,
  },
  props: {
    product: {
      type: Object,
    },
  },
  methods: {
    goProductDetail(id) {
      this.$router.push({ name: 'product', params: { id } });
    },
  },
  computed: {
    priceFormat() {
      const converter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      });
      return converter.format(this.product.price);
    },
    productAvailability() {
      return this.product.stock > 0 ? this.product.stock : 'Out of stock';
    },
  },
};
</script>

<style scoped>
#product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#card-title {
  padding-top: 0;
}

#card-action {
  align-self: flex-end;
  padding-bottom: 0;
  padding-right: 2px;
}

#info-container {
  padding-top: 3px;
  padding-left: 1px;
}
</style>
