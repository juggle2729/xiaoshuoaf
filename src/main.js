import Vue from 'vue'
import Resource from 'vue-resource'
// import NProgress from 'vue-nprogress'
// import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
// import * as filters from './filters'
// import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
// import VuePaginate from 'vue-paginate'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// Vue.use(VuePaginate)
Vue.use(ElementUI)
Vue.use(Resource)
Vue.http.options.root = 'http://47.52.25.158:9002'

const options = {
    latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
    router: true, // Show progressbar when navigating routes, default: true
    // TODO: bug here, when progressbar turn on http, cause one error, see https://github.com/rstacruz/nprogress/pull/129
    http: false // Show progressbar when doing Vue.http, default: true
}


// sync(store, router)



const { state } = store


// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key])
// })

const app = new Vue({
    router,
    store,
    ...App
})

export { app, router, store }
