
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import VueObserveVisibility from 'vue-observe-visibility'

// router setup
import router from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueObserveVisibility);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
});
