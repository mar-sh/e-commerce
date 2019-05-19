<template>
  <!-- <v-content> -->

  <v-container fluid fill-height>
    <v-layout align-center justify-center v-if="isLoading">
      <div class="col-12">
        <pulse-loader class="text-center" :color="'grey'" :size="'35px'"></pulse-loader>
      </div>
    </v-layout>
    <v-layout justify-center v-if="!isLoading">
      <v-flex xs12 sm8 md4>
        <v-card flat>
          <v-toolbar flat dark class="primary">
            <v-toolbar-title class="justify-center">ADD A NEW PRODUCT</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form flat>
              <v-text-field v-model="name" prepend-icon="shopping_basket" label="Name" required></v-text-field>
              <v-text-field
                v-model="price"
                prepend-icon="attach_money"
                label="Price"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="stock"
                prepend-icon="add_box"
                label="Stock"
                type="number"
                min="1"
                required
              ></v-text-field>
              <v-text-field v-model="description" prepend-icon="description" label="Description"></v-text-field>
              <v-text-field
                label="Select Image"
                @keyup.tab="pickFile"
                @click="pickFile"
                v-model="imageName"
                prepend-icon="add_a_photo"
              ></v-text-field>
              <input
                type="file"
                name="image"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="secondary" block @click.prevent="addProduct">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- </v-content> -->
</template>

<script>
import backend from '@/api/backend';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'ProductAdd',
  components: {
    PulseLoader,
  },
  data() {
    return {
      name: '',
      price: '',
      stock: '',
      description: '',
      imageName: '',
      imageFile: '',
      isLoading: false,
    };
  },
  methods: {
    addProduct() {
      this.isLoading = true;

      const data = new FormData();
      data.append('name', this.name);
      data.append('price', this.price);
      data.append('stock', this.stock);
      data.append('description', this.description);
      data.append('image', this.imageFile);

      this.name = '';
      this.price = 0;
      this.stock = 1;
      this.information = '';
      this.imageName = '';
      this.imageFile = '';

      backend({
        method: 'POST',
        url: '/products',
        headers: { Authorization: localStorage.getItem('accessToken') },
        data,
      })
        .then(() => {
          this.isLoading = false;
          this.$router.push({ name: 'home' });
          alertify.success('Your product has been successfuly added');
        })
        .catch(({ response }) => {
          this.isLoading = false;
          if (response) {
            alertify.error(response.data.message);
          }
          this.$router.replace({ name: 'add-product' });
        });
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const { files } = e.target;

      if (files[0] !== undefined) {
        this.imageName = files[0].name;

        if (this.imageName.lastIndexOf('.') <= 0) {
          return '';
        }
        const fr = new FileReader();

        fr.readAsDataURL(files[0]);
        fr.addEventListener('load', () => {
          this.imageFile = files[0];
        });
      } else {
        this.imageName = '';
        this.imageFile = '';
      }
    },
  },
};
</script>
<style>
</style>
