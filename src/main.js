import Vue from 'vue'
import App from './App.vue'
//import VueRouter from 'vue-router'
import axios from 'axios'

Vue.config.productionTip = false

//axios.defaults.headers.post['withCredentials'] = true
axios.defaults.withCredentials = true
Vue.prototype.axios = axios

Vue.prototype.toLocaleString = function(timestamp) {
        var date = new Date(timestamp); 
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
      }

new Vue({
  render: h => h(App),
}).$mount('#app')
