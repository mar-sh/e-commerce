<template>
  <v-list flat three-line>
    <template v-for="(tx, index) in transactions">
      <v-list-tile :key="tx._id">
        <v-layout row wrap>
          <v-flex xs12 md10>
            <v-list-tile-content>
              <v-list-tile-title class="body-1">Order ID: {{ tx._id}}</v-list-tile-title>
              <v-list-tile-sub-title class="body-1">Item: {{ tx.cartId.productId.name }}</v-list-tile-sub-title>
              <v-list-tile-sub-title
                class="body-1"
              >{{ displayDateMessage(tx.status, tx.createdAt, tx.updatedAt) }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-flex>

          <v-flex xs12 md2 py-3>
            <v-list-tile-action pa-3>
              <v-chip :color="deliveryStatus(tx.status)" label>{{ tx.status }}</v-chip>
              <v-btn
                v-show="tx.status === 'delivered' && !(isAdmin) "
                flat
                color="secondary"
                @click.prevent="confirmCompletion(tx._id)"
              >Confirm</v-btn>
              <v-btn
                v-show="tx.status === 'delivering' && isAdmin"
                flat
                color="secondary"
                @click.prevent="confirmDelivery(tx._id)"
              >Confirm</v-btn>
            </v-list-tile-action>
          </v-flex>
        </v-layout>
      </v-list-tile>
      <v-divider v-if="index < transactions.length -1" :key="index"></v-divider>
    </template>
  </v-list>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import backend from "@/api/backend";

export default {
  name: "TransactionList",
  props: {
    transactions: {
      type: Array
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format("LL");
    },
    deliveryStatus(status) {
      return status === "delivering"
        ? "orange"
        : status === "delivered"
        ? "blue"
        : "green";
    },
    confirmDelivery(id) {
      backend({
        method: "PATCH",
        url: `/transactions/${id}`,
        headers: { Authorization: localStorage.getItem("accessToken") },
        data: {
          status: "delivered"
        }
      })
        .then(({ data }) => {
          this.$emit("fetch-tx");
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirmCompletion(id) {
      alertify.confirm(
        "Confirm delivery",
        "Mark this as delivered?",
        () => {
          this.$emit("fetch-tx");
          backend({
            method: "PATCH",
            url: `/transactions/${id}`,
            headers: { Authorization: localStorage.getItem("accessToken") },
            data: {
              status: "completed",
              confirmed: "true"
            }
          })
            .then(({ data }) => {
              this.$emit("fetch-tx");
            })
            .catch(err => {
              console.log(err);
              alertify.error('something went wrong');
            });
        },
        () => {
          alertify.message("Canceled");
        }
      );

      this.$emit("fetch-tx");
      backend({
        method: "PATCH",
        url: `/transactions/${id}`,
        headers: { Authorization: localStorage.getItem("accessToken") },
        data: {
          status: "completed",
          confirmed: "true"
        }
      })
        .then(({ data }) => {
          this.$emit("fetch-tx");
        })
        .catch(err => {
          console.log(err);
        });
    },
    displayDateMessage(status, created, updated) {
      if (status !== "completed") {
        return `Checkout time: ${this.formatDate(created)}`;
      } else {
        return `Delivered: ${this.formatDate(updated)}`;
      }
    }
  },
  computed: {
    isAdmin() {
      return this.$route.path === "/admin/dashboard";
    }
  }
};
</script>

<style>
</style>
