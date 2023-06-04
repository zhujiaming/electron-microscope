<template>
  <div class="head-content">
    <a-radio-group v-model="value" @change="onChange">
      <a-radio-button value="1"> 1s </a-radio-button>
      <a-radio-button value="10"> 10s </a-radio-button>
      <a-radio-button value="30"> 30s </a-radio-button>
      <a-radio-button value="60"> 60s </a-radio-button>
    </a-radio-group>
    <div id="save-button">
      <a-button type="primary" style="color: #171815" @click="saveFile"> Save </a-button>
    </div>
  </div>
</template>
<script>
import "ant-design-vue/dist/antd";

export default {
  name: "HeaderControl",
  data() {
    return {
      value: "a",
    };
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
      this.$parent.$emit("onScanClick", e.target.value * 1000);
    },
    saveFile(){
      this.$parent.$emit("saveFile",'')
    }
  },
};
</script>

<style>
.head-content {
  padding: 0 20px;
  display: flex;
  height: 50px;
  align-items: center;
  /* background: rgb(206, 205, 205); */
  border-bottom:1px solid #C2BDB7
}
#save-button {
  padding-left: inherit;
}
</style>