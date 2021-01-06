<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin" to="/register">Need an account ? </nuxt-link>
          <nuxt-link v-if="!isLogin" to="/login">Have an account ? </nuxt-link>
        </p>

        <ul class="error-messages">
           <template v-for="(messages, field) in errors">
             <li v-for="(msg, index) in messages" :key="index">
               {{field}} {{msg}}
             </li>
           </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if="!isLogin" class="form-group">
            <input class="form-control form-control-lg" type="text" v-model="user.username" placeholder="Your Name" required>
          </fieldset>
          <fieldset class="form-group">
            <input type="email" class="form-control form-control-lg" v-model="user.email" placeholder="Email" required>
          </fieldset>
          <fieldset class="form-group">
            <input minlength="8" class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password" required>
          </fieldset>
          <button  class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign in': 'Sign up' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import request from '@/utils/request.js';
import { login, register } from '@/api/user.js';
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
    middleware: 'notAuthenticated',
    name: 'login',
    computed: {
      isLogin() {
        return this.$route.name === 'login'
      }
    },
    data() {
      return {
        user: {
          email: '',
          password: '',
          username: ''
        },
        errors: {}
      }
    },
    methods: {
      async onSubmit(){
        try {
              // 提交表单
              const  { data } = this.isLogin ? await login({user: this.user}) : await register({user: this.user});
              this.$store.commit('setUser', data.user);
              Cookie.set('user', data.user);
              this.$router.push('/home');
          } catch(err) {
            this.errors = err.response.data.errors;
          }
      }
    }
      
}
</script>

<style>

</style>