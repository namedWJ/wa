import Vue from 'vue'
import App from './App.vue'
import router from './router';

// 组件
import wTag from '@/components/w-tag.vue'
import wSimpleRadio from '@/components/w-simpleRadio.vue';


const components = {
  wTag,
  wSimpleRadio,
};
// 组件注册
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key]);
});


Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
