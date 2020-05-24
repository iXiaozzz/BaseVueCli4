import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.scss'
import '@/lib/flexible/flexible'
import router from './router'
import '@/filter/'
import '@/http/axios'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
