import Vue from 'vue'
import Vuex from 'vuex'
// import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import app from './modules/app'
import menu from './modules/menu'
import auth from './modules/auth'
import dataConfig from './modules/data-config'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'development',
  actions,
  getters,
  modules: {
    app,
    menu,
    auth,
    dataConfig
  },
  state: {

  },
  mutations: {}
})

export default store
