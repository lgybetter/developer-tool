<template>
  <div>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-appbar title="开发者工具"></mu-appbar>
      <mu-list @itemClick="docked ? '' : toggle()" v-for="list in lists">
        <mu-list-item :title="list.name" v-on:click="select(list)"/>
      </mu-list>
    </mu-drawer>
    <mu-appbar title="Title">
      <mu-icon-button icon='menu' slot="right" v-on:click="toggle()"/>
    </mu-appbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      docked: false,
      lists: [
        { 'name': '故事包', 'code': 2, 'type': 'story' },
        { 'name': '基础应用包', 'code': 4, 'type': 'thirdApp' },
        { 'name': '第三方应用包', 'code': 1, 'type': 'baseApp' },
      ]
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
    },
    select (item) {
      this.$router.replace({path: `/service/:${item.type}`});
    }
  }
}
</script>

