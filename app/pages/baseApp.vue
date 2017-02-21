<template>
  <div>
    <container>
      <div>
        <mu-text-field label="应用名称" v-model="packageData.name"></mu-text-field>
      </div>
      <div>
        <mu-text-field label="应用版本" v-model="packageData.version"></mu-text-field>
      </div>
      <div>
        <mu-text-field label="内容" fullWidth multiLine :rows="3" :rowsMax="6" labelFloat v-model="packageData.content"></mu-text-field>
      </div>
      <div>
        <mu-raised-button label="保存" primary v-on:click="save"/>
        <mu-raised-button label="压缩" primary v-show="filePath" v-on:click="compress"/>
      </div>
    </container>
    <mu-snackbar v-if="snackbar" :message="tip" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>
  </div>
</template>

<script>
import container from '../components/container'
import packageControllers from '../controllers/packageController'
import path from 'path'

export default {
  data() {
    return {
      packageData: {
        name: '',
        version: '',
        content: ''
      },
      filePath: '',
      snackbar: false,
      tip: ''
    }
  },
  methods: {
    save() {
      packageControllers.openDialog().then(filePath => {
        this.filePath = filePath;
        filePath = path.join(filePath, 'package.json');
        return packageControllers.writePackage(filePath, this.packageData);
      }).then(() => {
        this.tip = '保存成功';
        this.showSnackbar();
      }).catch(err => {
        console.log(err);
        this.tip = '保存失败';
        this.showSnackbar();
      })
    },
    compress() {
      packageControllers.compressDir(this.filePath, 'lgybetter').then(() => {
        this.tip = '压缩成功';
        this.showSnackbar();
      }).catch(err => {
        this.tip = '压缩失败';
        this.showSnackbar();
      })
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
  },
  components: { 
    container 
  }
}
</script>