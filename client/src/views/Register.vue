<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm8 md4>
        <v-card flat>
          <v-toolbar flat dark class="primary">
            <v-toolbar-title class="justify-center">REGISTER</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form flat @submit.prevent="userRegister">
              <v-text-field
                v-model="username"
                prepend-icon="person"
                name="username"
                label="username"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="email"
                prepend-icon="email"
                name="email"
                label="email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" class="secondary" block @click.prevent="userRegister">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import backend from '@/api/backend';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations(['USER_LOGIN', "SET_ROLE"]),
    userRegister() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      backend({
        method: 'POST',
        url: '/register',
        data,
      })
        .then(({ data }) => {
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('user', data.currentUser.userId);
          localStorage.setItem('email', data.currentUser.email);
          localStorage.setItem('role', data.currentUser.role);
          this.USER_LOGIN();
          this.SET_ROLE(localStorage.getItem('role'));
          alertify.success('Welcome to ECM');
          this.$router.push({ name: 'home' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
