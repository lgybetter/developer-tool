<template>
  <container>
    <mu-flexbox>
      <mu-flexbox-item>
        <mu-text-field label="应用名称" v-model="packageData.name"></mu-text-field>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox>
      <mu-flexbox-item>
        <mu-text-field label="应用版本" v-model="packageData.version"></mu-text-field>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox>
      <mu-flexbox-item>
        <mu-text-field label="内容" fullWidth multiLine :rows="3" :rowsMax="6" labelFloat v-model="packageData.content"></mu-text-field>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-raised-button label="保存" primary v-on:click="save"/>
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
        name: '',
        version: '',
        content: ''
      }
    }
  },
  methods: {
    save() {
      packageControllers.openDialog().then(filePath => {
        filePath = path.join(filePath, 'package.json');
        return packageControllers.writePackage(filePath, this.packageData);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  components: { 
    container 
  }
}
</script>