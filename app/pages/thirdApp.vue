<template>
  <container>
    <div>
      <mu-text-field label="应用名称" v-model="packageData.name"></mu-text-field>
    </div>
    <div>
      <mu-text-field label="应用版本" v-model="packageData.version"></mu-text-field>
    </div>
    <div>
      <mu-text-field label="价格" type="number" v-model="packageData.price"></mu-text-field>
    </div>
    <div>
      <mu-text-field label="应用控制链接" v-model="packageData.controll"></mu-text-field>
    </div>
    <div>
      <mu-text-field label="内容" fullWidth multiLine :rows="3" :rowsMax="6" labelFloat v-model="packageData.content"></mu-text-field>
    </div>
    <div>
      <mu-raised-button label="保存" primary v-on:click="save"/>
    </div>
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
        price: 0,
        version: '',
        controll: '',
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


