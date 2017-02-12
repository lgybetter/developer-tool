<template>
  <div>
    <mu-appbar title="粑粑云"></mu-appbar>
    <div class="box">
      <div class="row">
        <mu-text-field labelFloat label="邮箱" type="email"></mu-text-field>
      </div>
      <div class="row">
        <mu-text-field labelFloat label="密码" type="password"></mu-text-field>
      </div>
      <div class="row">
        <mu-text-field labelFloat label="确认密码" type="password"></mu-text-field>
      </div>
      <div class="row">
        <div class="item">
          <mu-raised-button fullWidth label="注册" primary v-on:click="signIn"/>
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
    signIn() {
      this.$router.replace({path: '/'})
    }
  }
}
</script>

<style lang="less">

.box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
}

.row {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}

.item {
  display: flex;
  width: 256px;
  margin-top: 10px;
}

.row:nth-child(1), .row:nth-child(2), .row:nth-child(3), .row:nth-child(4){
  justify-content: center;
}

</style>