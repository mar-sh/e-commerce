<template>
  <v-img
    :src="source"
    :height="height"
    :width="width"
    class="grey darken-4 v-list__tile--link"
    @click.prevent="askDetail"
    alt="product-image"
  ></v-img>
</template>

<script>
export default {
  name: 'ImageFrame',
  props: ['source', 'height', 'width'],
  methods: {
    askDetail() {
      if (this.$route.fullPath === '/') {
        this.$emit('ask-detail');
      }
    },
  },
};
</script>

<style>
</style>
