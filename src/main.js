import Vue from 'vue'
import App from './App.vue'
import router from './router';

// 组件
import wTag from '@/components/w-tag.vue'

const components = {
  wTag
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
