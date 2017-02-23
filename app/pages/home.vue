<template>
  <div>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
    <mu-appbar title="开发者工具"></mu-appbar>
      <mu-list @itemClick="docked ? '' : toggle()" v-for="list in lists">
        <mu-list-item :title="list.name" v-on:click="select(list)" />
      </mu-list>
    </mu-drawer>
    <mu-appbar title="粑粑云">
      <mu-icon-button icon='menu' slot="left" v-on:click="toggle()" />
      <mu-icon-button icon='keyboard_arrow_left' slot="right" v-on:click="back" />
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="最小化" v-on:click="minimize"/>
        <mu-menu-item title="最大化" v-on:click="maximize"/>
        <mu-menu-item title="退出账户" v-on:click="logoutClick"/>
        <mu-menu-item title="结束运行" v-on:click="exit"/>
      </mu-icon-menu>
    </mu-appbar>
    <router-view></router-view>
  </div>
</template>

<script>
import electron from 'electron';
const ipcRenderer = electron.ipcRenderer;
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    user: 'user'
  }),
  data () {
    return {
      open: false,
      docked: false,
      lists: [
        { 'name': '故事包', 'code': 2, 'type': 'story' },
        { 'name': '基础应用包', 'code': 4, 'type': 'baseApp' },
        { 'name': '第三方应用包', 'code': 1, 'type': 'thirdApp' },
      ]
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggle (flag) {
      this.open = !this.open
    },
    select (item) {
      this.$router.replace({path: `/home/${item.type}`});
    },
    back() {
      console.log('lgy')
    },
    minimize() {
      ipcRenderer.send('minimize-window');
    },
    maximize() {
      ipcRenderer.send('maximize-window');
    },
    exit() {
      ipcRenderer.send('close-window');
    },
    async logoutClick() {
      await this.logout();
      this.$router.replace({path: '/'});
    }
  }
}
</script>