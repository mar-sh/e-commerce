<template>
  <v-container fluid>
    <!-- <v-container fluid fill-height> -->
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-card>
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title>MY TRANSACTIONS</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <TransactionList :transactions="transactions" @fetch-tx="fetchTransactions">

          </TransactionList>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- </v-container> -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TransactionList from '@/components/TransactionList';
import moment from 'moment';

export default {
  name: 'Transaction',
  components: {
    TransactionList,
  },
  created() {
    this.fetchTransactions();
  },
  methods: {
    ...mapActions(['fetchTransactions']),
    formatDate(date) {
      return moment(date).format('LL');
    },
  },
  computed: {
    ...mapState(['transactions']),
  },
};
</script>

<style scoped>
</style>
