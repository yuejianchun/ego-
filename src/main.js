import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import "./assets/CSS/reset.css"
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/index'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;

Vue.use(Element);
Vue.prototype.$api = api
Vue.config.productionTip = false
let user = localStorage.getItem('user')
if(user){
  user = JSON.parse(user)
  store.commit('loginmodule/setUser',user)
}
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
