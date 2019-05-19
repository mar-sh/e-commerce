<template>
  <v-container grid-list-xl pa-5 style="border: 2px solid grey">
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 :align-self-start="true">
        <ImageFrame :source="cartItem.productId.url" :height="'250px'" :width="'250px'"></ImageFrame>
      </v-flex>

      <v-flex xs12 sm6 md9>
        <v-layout justify-space-start column fill-height px-3>
          <div class="px-2 pb-2">
            <h1 class="headline">Cart Id: {{ cartItem._id }}</h1>
          </div>
          <div class="pa-2">
            <span class="black--text subheading">Item: {{ cartItem.productId.name }}</span>
          </div>
          <div class="pa-2">
            <span class="grey--text body-2">Total Charge: {{ priceFormat }}</span>
          </div>

          <v-form>
            <v-container>
              <v-layout>
                <v-flex xs12 md5>
                  <v-select
                    v-model="selectedProvince"
                    :items="provinces"
                    :rules="[v => !!v || 'This is required']"
                    label="Select Province"
                    required
                  ></v-select>
                </v-flex>

                <v-flex xs12 md5>
                  <v-select
                    v-model="selectedCity"
                    :items="cityList"
                    :rules="[v => !!v || 'This is required']"
                    label="Select City"
                    required
                  ></v-select>
                </v-flex>

                <v-flex xs12 md2>
                  <v-btn
                    flat
                    depress
                    class="secondary"
                    @click.prevent="getDeliveryFee"
                    block
                  >Get Quote</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>

          <v-form>
            <v-container>
              <v-layout>
                <v-flex xs12 md5>
                  <v-text-field v-model="userAddress" label="Address" required></v-text-field>
                </v-flex>

                <v-flex xs12 md5>
                  <v-text-field
                    v-model="userContact"
                    mask="####-###-###-####"
                    label="Phone"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md2>
                  <v-btn flat depress class="secondary" @click.prevent="transactionProceed(cartItem._id)" block>Proceed</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <div>
            <span class="caption grey--text">*Each delivery will be done with JNE's most expensive service</span>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ImageFrame from "@/components/ImageFrame";
import backend from '@/api/backend';

export default {
  name: "CartCheckout",
  components: {
    ImageFrame
  },
  created() {
    this.fetchCartItem(this.$route.params.id);
    this.fetchListOfProvinces();
  },
  data() {
    return {
      selectedProvince: null,
      selectedCity: null,
      cityCode: null,
      deliveryFee: 0,
      userAddress: "",
      userContact: ""
    };
  },
  methods: {
    ...mapActions([
      "fetchCartItem",
      "fetchListOfProvinces",
      "fetchListOfCities"
    ]),
    getDeliveryFee() {

      backend({
        method: 'POST',
        url: '/deliveries/cost',
        data: {
          destination: this.cityCode,
        },
      })
        .then(({ data }) => {
          this.deliveryFee = data.value;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    transactionProceed(id) {
      console.log(id);
      const data = {
        cartId: id,
        userAddress: `${this.userAddress}, ${this.selectedCity}, ${this.selectedProvince}`,
        userContact: this.userContact,
        totalCharge: this.totalCharge,
      };

      backend({
        method: 'POST',
        url: '/transactions',
        headers: { Authorization: localStorage.getItem('accessToken') },
        data,
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
  },
  computed: {
    ...mapState(["cartItem", "provinces", "cities"]),
    totalCharge() {
      return this.cartItem.amount + this.deliveryFee;
    },
    priceFormat() {
      const converter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      });
      return converter.format(this.totalCharge);
    },
    cityList() {
      return this.cities.map(city => city.split("|")[1]);
    }
  },
  watch: {
    $route(value) {
      this.fetchCartItem(value.params.id);
    },
    selectedProvince(value) {
      const id = this.provinces.indexOf(value) + 1;
      this.fetchListOfCities(id);
    },
    selectedCity(value) {
      const regex = new RegExp(`^${value}$`, 'i');
      
      this.cities.forEach(city => {
        if (city.split('|')[1].match(regex)) {
          this.cityCode = city.split('|')[0]
        };
      });
    },
  }
};
</script>

<style scoped>
.v-list {
  height: 300px;
  overflow-y: auto;
}
</style>
