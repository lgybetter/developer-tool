<template>
  <div>
    <container>
      <div>
        <mu-text-field label="故事名称" v-model="packageData.name"></mu-text-field>
      </div>
      <div>
        <mu-select-field v-model="packageData.type" label="故事类型">
          <mu-menu-item value="picture" title="绘本故事"/>
          <mu-menu-item value="interaction" title="互动故事"/>
        </mu-select-field>
      </div>
      <div>
        <mu-text-field label="故事版本" v-model="packageData.version"></mu-text-field>
      </div>
      <div>
        <mu-text-field label="价格" type="number" v-model="packageData.price"></mu-text-field>
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
import container from '../components/container';
import packageControllers from '../controllers/packageController';
import { mapActions, mapGetters } from 'vuex';
import Promise from 'bluebird';
import path from 'path';

export default {
  computed: mapGetters({
    user: 'user',
    models: 'models',
    professionTags: 'professionTags',
    contentTags: 'contentTags',
    appAndContentCategory: 'appAndContentCategory',
    ageCategory: 'ageCategory',
    tagCategory: 'tagCategory',
    abilityTags: 'abilityTags'
  }),
  async created() {
    await this.getContentData({token: this.user.token, dataType: 'models', urlType: 'models'});
    await this.getContentData({token: this.user.token, dataType: 'professionTags', urlType: 'profession-tags'});
    await this.getContentData({token: this.user.token, dataType: 'contentTags', urlType: 'content-tags'});
    await this.getContentData({token: this.user.token, dataType: 'appAndContentCategory', urlType: 'app-and-content-category'});
    await this.getContentData({token: this.user.token, dataType: 'ageCategory', urlType: 'age-category'});
    await this.getContentData({token: this.user.token, dataType: 'tagCategory', urlType: 'tag-category'});
    await this.getContentData({token: this.user.token, dataType: 'abilityTags', urlType: 'ability-tags'});
  },
  data() {
    return {
      packageData: {
        name: '',
        price: 0,
        type: '',
        version: '',
        content: ''
      },
      filePath: '',
      snackbar: false,
      tip: ''
    }
  },
  methods: {
    ...mapActions(['getContentData']),
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


