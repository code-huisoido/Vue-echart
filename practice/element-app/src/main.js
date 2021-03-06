import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
//import ElementUI from 'element-ui'
import { Button, Select, Menu, Submenu, MenuItem, MenuItemGroup, Row, Col} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import axios from 'axios';

Vue.config.productionTip = false

Vue.use(Button).use(Select).use(Menu).use(Submenu).use(MenuItem).use(MenuItemGroup).use(Row).use(Col)

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
