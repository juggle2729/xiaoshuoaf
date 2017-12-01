import Vue from 'vue'

export default {
    getModulelistAPI (payload, cb, errorCb) {
        return Vue.http.get('api/bookstores/bookstore/getModulelist/'+payload.page.PageIndex+'/'+payload.page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getModuleAPI (payload, cb, errorCb) {
        return Vue.http.get('api/bookstores/bookstore/getModule', {params:payload})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getModuleTypeListAPI (payload, cb, errorCb) {
        return Vue.http.get('api/bookstores/bookstore/getModuleTypelist/'+payload.page.PageIndex+'/'+payload.page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getModuleClickTypeListAPI (payload, cb, errorCb) {
        return Vue.http.get('api/bookstores/bookstore/getModuleClickTypelist/'+payload.page.PageIndex+'/'+payload.page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getModuleDetailListAPI (page, params,cb) {
        console.log(params);
        return Vue.http.get('api/bookstores/bookstore/getmoduledetaillist/'+page.PageIndex+'/'+page.PageSize,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
   upDateAPI (payload, cb, errorCb) {
        return Vue.http.post('api/bookstores/bookstore/update/?sessionKey='+localStorage.SessionKey,JSON.stringify(payload))
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getBookListAPI (page,cb) {
        return Vue.http.get('api/books/book/getbooklist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getBookListSearchAPI (page, params, cb) {
        return Vue.http.get('api/books/book/getbooklist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getTrankingTypeListAPI (page,cb) {
        return Vue.http.get('api/bookstores/bookstore/getrankingtypelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getShortBookListAPI (page,cb) {
        return Vue.http.get('shortbook/getshortbooklist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getShortBookListSearchAPI (page, params, cb) {
        return Vue.http.get('shortbook/getshortbooklist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getBookThemeListAPI (page,cb) {
        return Vue.http.get('api/bookstores/bookstore/getbookthemelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey)
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    deleteAPI (payload, cb, errorCb) {
        return Vue.http.delete('api/bookstores/bookstore/delete', {params:payload})
            .then((response) => {
                console.log(response.data)
                cb(response.data)
            }, (error) => {

            })
    },
    addModuleAPI (payload, cb, errorCb) {
        return Vue.http.post('api/bookstores/bookstore/add/?sessionKey='+localStorage.SessionKey,JSON.stringify(payload))
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
}
