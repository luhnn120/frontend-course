import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
window.location.href = `${window.location.origin}/#/title`
new Vue({
  render: h => h(App),
}).$mount('#app')
