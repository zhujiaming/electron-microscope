import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.less';
import VueViewer from 'v-viewer'


Vue.config.productionTip = false

Vue.use(Antd);
Vue.use(VueViewer);


new Vue({
  render: h => h(App),
}).$mount('#app')
