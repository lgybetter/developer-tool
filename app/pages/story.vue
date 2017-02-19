<template>
  <container>
    <mu-flexbox>
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
      }
    }
  },
  methods: {
    save() {
      packageControllers.openDialog().then(filePath => {
        this.filePath = filePath;
        filePath = path.join(filePath, 'package.json');
        return packageControllers.writePackage(filePath, this.packageData);
      }).catch(err => {
        console.log(err);
      })
    },
    compress() {
      packageControllers.compressDir(this.filePath, 'lgybetter');
    }
  },
  components: { 
    container 
  }
}
</script>


