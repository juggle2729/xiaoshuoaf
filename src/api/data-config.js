import Vue from 'vue'

export default {
    getModulelistAPI (payload, cb, errorCb) {
        return Vue.http.get('bookstores/bookstore/getModulelist/'+payload.page.PageIndex+'/'+payload.page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getModuleAPI (payload, cb, errorCb) {
        return Vue.http.get('bookstores/bookstore/getModule', {params:payload})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getModuleTypeListAPI (payload, cb, errorCb) {
        return Vue.http.get('bookstores/bookstore/getModuleTypelist/'+payload.page.PageIndex+'/'+payload.page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getModuleClickTypeListAPI (payload, cb, errorCb) {
        return Vue.http.get('bookstores/bookstore/getModuleClickTypelist/'+payload.page.PageIndex+'/'+payload.page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getModuleDetailListAPI (page, params,cb) {
        console.log(params);
        return Vue.http.get('bookstores/bookstore/getmoduledetaillist/'+page.PageIndex+'/'+page.PageSize,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
   upDateAPI (payload, cb, errorCb) {
        return Vue.http.post('bookstores/bookstore/update/?sessionKey='+localStorage.SessionKey,payload)
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getBookListAPI (page,cb) {
        return Vue.http.get('books/book/getbooklist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getBookListSearchAPI (page, params, cb) {
        return Vue.http.get('books/book/getbooklist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getTrankingTypeListAPI (page,cb) {
        return Vue.http.get('/bookstores/bookstore/getrankingtypelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
}
