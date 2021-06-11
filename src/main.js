import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'

// import {Button} from 'element-ui'

// Vue.use(Button)
export const EventBus = new Vue()


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
