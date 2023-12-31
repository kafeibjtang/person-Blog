import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/utils/element"
import 'element-ui/lib/theme-chalk/index.css';
import "animate.css"
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')