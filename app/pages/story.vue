<template>
  <div>
    <container>
      <div>
        <mu-text-field label="故事名称" v-model="packageData.name"></mu-text-field>
      </div>
      <div>
        <mu-select-field v-model="packageData.models" label="适用固件" multiple>
          <template v-for="model in models">
            <mu-menu-item :value="model.id" :title="model.name"/>
          </template>
        </mu-select-field>
      </div>
      <div>
        <mu-select-field v-model="packageData.appAndContentCategories" label="分类" multiple>
          <template v-for="appAndContentCategory in appAndContentCategories">
            <mu-menu-item :value="appAndContentCategory.id" :title="appAndContentCategory.name"/>
          </template>
        </mu-select-field>
      </div>
      <div>
        <mu-select-field v-model="packageData.ageCategories" label="适用年龄" multiple>
          <template v-for="ageCategory in ageCategories">
            <mu-menu-item :value="ageCategory.id" :title="ageCategory.name"/>
          </template>
        </mu-select-field>
      </div>
      <div>
        <mu-select-field v-model="packageData.professionTags" label="职业标签" multiple>
          <template v-for="professionTag in professionTags">
            <mu-menu-item :value="professionTag.id" :title="professionTag.name"/>
          </template>
        </mu-select-field>
      </div>
      <div>
        <mu-select-field v-model="packageData.contentTags" label="内容标签" multiple>
          <template v-for="contentTag in contentTags">
            <mu-menu-item :value="contentTag.id" :title="contentTag.name"/>
          </template>
        </mu-select-field>
      </div>
      <div>
        <mu-select-field v-model="packageData.tagCategories" label="查询标签" multiple>
          <template v-for="tagCategory in tagCategories">
            <mu-menu-item :value="tagCategory.id" :title="tagCategory.name"/>
          </template>
        </mu-select-field>
      </div>
      <div>
        <mu-select-field v-model="packageData.abilityTags" label="能力标签" multiple>
          <template v-for="abilityTag in abilityTags">
            <mu-menu-item :value="abilityTag.id" :title="abilityTag.name"/>
          </template>
        </mu-select-field>
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
    appAndContentCategories: 'appAndContentCategory',
    ageCategories: 'ageCategory',
    tagCategories: 'tagCategory',
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
    console.log(this.models[0]);
  },
  data() {
    return {
      packageData: {
        name: '',
        price: 0,
        models: [],
        professionTags: [],
        contentTags: [],
        appAndContentCategories: [],
        ageCategories: [],
        tagCategories: [],
        abilityTags: [],
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


