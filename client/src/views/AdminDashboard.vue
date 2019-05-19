<template>
  <v-container>
    <h1 class="display-2 text-uppercase text-xs-center font-weight-light pa-3">Transactions History</h1>
     <v-text-field
          v-model="keyword"
          hide-details
          single-line
          append-icon="clear"
          @click:append.prevent="clearKeyword"
          label="Search transactions"
        ></v-text-field>
    <v-divider></v-divider>
    <h1 class="headline font-weight-medium">Delivering</h1>
    <v-card>
      <TransactionList :transactions="delivering" @fetch-tx="fetchAllTransactions" ></TransactionList>
    </v-card>
    <v-divider></v-divider>

    <h1 class="headline font-weight-medium">Waiting for Confirmation</h1>
    <v-card>
      <TransactionList :transactions="waiting"></TransactionList>
    </v-card>
    <v-divider></v-divider>
    <h1 class="headline font-weight-medium">Completed</h1>
    <v-card>
      <TransactionList :transactions="completed"></TransactionList>
    </v-card>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TransactionList from "@/components/TransactionList";

export default {
  name: "AdminDashboard",
  components: {
    TransactionList,
  },
  data() {
    return {
      keyword: '',
    };
  },
  created() {
    this.fetchAllTransactions();
  },
  methods: {
    ...mapActions(["fetchAllTransactions"])
  },
  computed: {
    ...mapState(["transactions"]),
    delivering() {
      return this.transactions.filter(tx => tx.status === "delivering");
    },
    waiting() {
      return this.transactions.filter(tx => tx.status === "delivered");
    },
    completed() {
      return this.transactions.filter(tx => tx.status === "completed");
    }
  }
};
</script>

<style>
</style>
