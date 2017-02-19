<template>
  <div>
    <container>
      <div>
        <mu-flexbox-item>
          <mu-text-field label="故事名称" v-model="packageData.name"></mu-text-field>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item>
          <mu-select-field v-model="packageData.type" label="故事类型">
            <mu-menu-item value="picture" title="绘本故事"/>
            <mu-menu-item value="interaction" title="互动故事"/>
          </mu-select-field>
        </mu-flexbox-item>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item>
          <mu-text-field label="故事版本" v-model="packageData.version"></mu-text-field>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item>
          <mu-text-field label="价格" type="number" v-model="packageData.price"></mu-text-field>
        </mu-flexbox-item>
      </mu-flexbox>
          <mu-flexbox>
        <mu-flexbox-item>
          <mu-text-field label="内容" fullWidth multiLine :rows="3" :rowsMax="6" labelFloat v-model="packageData.content"></mu-text-field>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-raised-button label="保存" primary v-on:click="save"/>
      <mu-raised-button label="压缩" primary v-on:click="compress"/>
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
        filePath: '',
        name: '',
        price: 0,
        type: '',
        version: '',
        content: ''
      },
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


