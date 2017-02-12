<template>
  <div>
    <mu-appbar title="粑粑云"></mu-appbar>
    <div class="login-box">
      <div class="login-row">
        <mu-text-field labelFloat label="邮箱" type="email"></mu-text-field>
      </div>
      <div class="login-row">
        <mu-text-field labelFloat label="密码" type="password"></mu-text-field>
      </div>
      <div class="login-row">
        <div class="login-item">
          <mu-raised-button label="登录" primary v-on:click="login"/>
        </div>
        <div class="login-item">
          <mu-raised-button label="注册" primary v-on:click="signIn"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import container from '../components/container'

export default {
  components: {
    container
  },
  methods: {
    login() {
      this.$router.replace({path: '/home'});
    },
    signIn() {
      this.$router.replace({path: '/signin'})
    }
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

.login-row:nth-child(1), .login-row:nth-child(2), .login-row:nth-child(3) {
  justify-content: center;
}

</style>