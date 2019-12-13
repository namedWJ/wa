import Vue from 'vue'
import App from './App.vue'
import router from './router';
import '@/less/common.less';

// 组件
import wTag from '@/components/w-tag.vue'
import wButton from '@/components/w-button.vue'
import wCheckbox from '@/components/w-checkbox.vue';
import wInput from '@/components/w-input.vue';
import wForm from '@/components/form/w-form.vue';
import wFormItem from '@/components/form/w-form-item.vue';


const components = {
  wTag,
  wButton,
  wCheckbox,
  wInput,
  wForm,
  wFormItem,
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

// 自适应布局JS
! function(a) {
  a.HB_DISABLE_AJAX_FORCE_HTTPS=!0;
  function b() {
      a.rem = f.getBoundingClientRect().width / 16, f.style.fontSize = a.rem + "px"
  }
  var c, d = a.navigator.appVersion.match(/iphone/gi) ? a.devicePixelRatio : 1,
      e = 1 / d,
      f = document.documentElement,
      g = document.createElement("meta");
  if (a.dpr = d, a.addEventListener("resize", function() {
          clearTimeout(c), c = setTimeout(b, 300)
      }, !1), a.addEventListener("pageshow", function(a) {
          a.persisted && (clearTimeout(c), c = setTimeout(b, 300))
      }, !1), f.setAttribute("data-dpr", d), g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + e + ", maximum-scale=" + e + ", minimum-scale=" + e + ", user-scalable=no, viewport-fit=cover"), f.firstElementChild) f.firstElementChild.appendChild(g);
  else {
      var h = document.createElement("div");
      h.appendChild(g), document.write(h.innerHTML)
  }
  b()
}(window);
