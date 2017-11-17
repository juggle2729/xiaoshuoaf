import Vue from 'vue'

export default {
  loginAPI (params, cb, errorCb) {
      console.log(params)
    return Vue.http.get('api/accounts/account/login', {params:params})
      .then((response) => {
          cb(response.data)
      }, (error) => {
        errorCb(error)
      })
  }
}
