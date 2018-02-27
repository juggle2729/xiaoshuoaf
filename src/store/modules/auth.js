import * as types from '../mutation-types'
import auth from '../../api/auth'

// initial state
const state = {
    SessionKey: null,
    requestStatus: null,
    loginStatus: false,
    auth_error: null,
    UserId:''
}

// actions
const actions = {
  login ({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(types.AUTHENTICATE_REQUEST)
      auth.loginAPI(params,
        (data) => {
          commit(types.AUTHENTICATE_SUCCESS, data)
          resolve()
        },
        (error) => {
          commit(types.AUTHENTICATE_FAILURE, error)
        }
      )
    })
  },
  syncAuthStore ({commit}) {
    commit(types.SYNC_AUTH_STORE)
  }
}

// mutations
const mutations = {
  [types.AUTHENTICATE_REQUEST] (state) {
    state.requestStatus = 'started'
  },
  [types.AUTHENTICATE_SUCCESS] (state, data) {
    state.SessionKey = data.dt.SessionKey
    state.loginStatus = true
    state.requestStatus = 'stopped',
    state.UserId = data.dt.LoginUser.UserId,
    localStorage.SessionKey = data.dt.SessionKey
    localStorage.loginStatus = true
      localStorage.UserId = data.dt.LoginUser.UserId
  },
  [types.AUTHENTICATE_FAILURE] (state, error) {
    state.loginStatus = false
    state.auth_error = error
    state.requestStatus = 'stopped'
  },
  [types.SYNC_AUTH_STORE] (state) {
    state.loginStatus = localStorage.loginStatus
    state.SessionKey = localStorage.SessionKey
  }
}

export default {
  state,
  actions,
  mutations
}
