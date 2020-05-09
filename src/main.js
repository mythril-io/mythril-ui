import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/main.scss'

// Extensions
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full.esm'
import Paginate from 'vuejs-paginate'
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import numbro from 'numbro'
import InfiniteLoading from 'vue-infinite-loading'
import Carousel3d from 'vue-carousel-3d';

// Config
Vue.config.productionTip = false

// Register extensions
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('paginate', Paginate)
Vue.component('multiselect', Multiselect)
Vue.use(InfiniteLoading, { /* options */ });
Vue.use(Carousel3d);

// Filters
// Date Filter
Vue.filter('dateFormat', function (date, datetype) {
  if(date)
  {
    if(!datetype) {
      datetype = 1;
    }
    switch(datetype) {
      case 1:
        return moment(date).format("MMM Do YYYY");
      case 2:
        return moment(date).format("MMM YYYY");
      case 3:
        return moment(date).format("YYYY");
      default:
        return moment(date).format("MMM Do YYYY");
    }
  }
  else
  {
    return "TBD";
  }
})

//Percentage Formating
Vue.filter('percentageFormat', function (number) {
  // const roundedNumber = Math.round(number);
  return numbro(number/100).format({output: "percent", mantissa: 0});
})

Vue.filter('numberAverage', function (number) {
  // const roundedNumber = Math.round(number);
  return numbro(number).format({spaceSeparated: true, average: true});
})

//Date Formating (ex. 3 days ago)
Vue.filter('ago', function (date, user) {
  if(user) {
    if(user.timezone) {
        return moment.utc(date).tz(user.timezone).fromNow();
    }
  }
  return moment.utc(date).local().fromNow();
})

Vue.filter('truncate', function (string, value) {
  if(string.length < value) { return string }
  return string.substring(0, value) + '...';
})

// Create Vue instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
