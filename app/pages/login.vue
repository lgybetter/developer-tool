<template>
  <div>
    <mu-appbar title="粑粑云"></mu-appbar>
    <div class="login-box">
      <div class="login-row">
        <mu-text-field labelFloat label="邮箱" type="email" v-model="email"></mu-text-field>
      </div>
      <div class="login-row">
        <mu-text-field labelFloat label="密码" type="password" v-model="password"></mu-text-field>
      </div>
      <div class="login-row">
        <div class="login-checkbox">
          <mu-checkbox label="记住密码" v-model="savePassword"/>
        </div>
        <div class="login-checkbox">
          <mu-checkbox label="自动登录" v-model="autoLogin"/>
        </div>
      </div>
      <div class="login-row">
        <div class="login-item">
          <mu-raised-button label="登录" primary v-on:click="loginClick"/>
        </div>
        <div class="login-item">
          <mu-raised-button label="注册" primary v-on:click="signInClick"/>
        </div>
      </div>
    </div>
    <mu-snackbar v-if="snackbar" :message="tip" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>
  </div>
</template>

<script>
import container from '../components/container'
import { mapActions, mapGetters } from 'vuex';
import Promise from 'bluebird';

export default {
  computed: mapGetters({
    user: 'user'
  }),
  data() {
    return {
      email: '',
      password: '',
      tip: '',
      savePassword: false,
      autoLogin: false,
      snackbar: false,
    }
  },
  async created() {
    await this.getUser().then(user => {
      if(user) {
        if(user.savePassword) {
          this.savePassword = user.savePassword;
          this.email = user.email;
          this.password = user.password;
        }
        if(user.autoLogin) {
          this.$router.replace({path: '/home'});
        }
      }
    });
  },
  components: {
    container
  },
  methods: {
    ...mapActions(['login', 'getUser']),
    async loginClick() {
      let body = {
        email: this.email,
        password: this.password,
        savePassword: this.savePassword,
        autoLogin: this.autoLogin
      }
      let user = await this.login(body);
      if(user.token) {
        this.tip = '登陆成功';
        await this.showSnackbar();
        this.$router.replace({path: '/home'});
      } else {
        this.tip = '登陆失败';
        await this.showSnackbar();
      }
    },
    signInClick() {
      this.$router.replace({path: '/signin'})
    },
    showSnackbar () {
      this.snackbar = true
      if (this.snackTimer) clearTimeout(this.snackTimer)
      return new Promise((resolve, reject) => {
        this.snackTimer = setTimeout(() => { 
          this.snackbar = false;
          return resolve() 
        }, 1000);
      });
    },
    hideSnackbar () {
      this.snackbar = false
      if (this.snackTimer) clearTimeout(this.snackTimer)
    },
  }
}
</script>

<style lang="less">

.login-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
}

.login-row {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}

.login-item {
  display: flex;
  margin: 20px 40px 20px 40px;
}

.login-checkbox {
  display: flex;
  margin: 0px 20px 0px 20px;
}

.login-row:nth-child(1), .login-row:nth-child(2), .login-row:nth-child(3), .login-row:nth-child(4) {
  justify-content: center;
}

</style>