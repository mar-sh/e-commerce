<template>
  <v-container>
    <h1 class="display-2 text-uppercase text-xs-center font-weight-light pa-3">Transactions History</h1>
    <v-text-field
      v-model="keyword"
      hide-details
      single-line
      append-icon="clear"
      @click:append.prevent="resetTransactions"
      label="Search transactions"
    ></v-text-field>
    <v-divider></v-divider>
    <h1 class="headline font-weight-medium">Delivering</h1>
    <v-card>
      <TransactionList :transactions="delivering" @fetch-tx="fetchAllTransactions"></TransactionList>
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
import { mapState, mapActions } from 'vuex';
import TransactionList from '@/components/TransactionList';

export default {
  name: 'AdminDashboard',
  components: {
    TransactionList,
  },
  data() {
    return {
      keyword: '',
      searched: [],
    };
  },
  created() {
    this.fetchAllTransactions();
  },
  methods: {
    ...mapActions(['fetchAllTransactions']),
    resetTransactions() {
      this.keyword = '';
      this.fetchAllTransactions();
    },
  },
  computed: {
    ...mapState(['transactions']),
    delivering() {
      return (this.searched && this.searched.length)
        ? this.searched.filter(tx => tx.status === 'delivering')
        : this.transactions.filter(tx => tx.status === 'delivering');
    },
    waiting() {
      return (this.searched && this.searched.length)
        ? this.searched.filter(tx => tx.status === 'delivered')
        : this.transactions.filter(tx => tx.status === 'delivered');
    },
    completed() {
      return (this.searched && this.searched.length)
        ? this.searched.filter(tx => tx.status === 'completed')
        : this.transactions.filter(tx => tx.status === 'completed');
    },
  },
  watch: {
    keyword(value) {
      const reg = new RegExp(value, 'ig');
      this.searched = this.transactions.filter(tx => tx.cartId.productId.name.match(reg));
    },
  },
};
</script>

<style>
</style>
