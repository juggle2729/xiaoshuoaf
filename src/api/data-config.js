import Vue from 'vue'

export default {
    getModulelistAPI (page,params, cb, errorCb) {
        return Vue.http.get('api/bookstores/bookstore/getModulelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,{params:params})
            .then((response) => {
                cb(response.data)
                console.log(response.data)
            }, (error) => {

            })
    },
    getModuleAPI (payload, cb, errorCb) {
        return Vue.http.get('api/bookstores/bookstore/getModule', {params:payload})
            .then((response) => {
                cb(response.data)
                console.log(response.data)
            }, (error) => {

            })
    },
    getModuleTypeListAPI (page,cb) {
        return Vue.http.get('api/bookstores/bookstore/getModuleTypelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1)
            .then((response) => {
                cb(response.data)
            }, (error) => {
            })
    },
    getModuleClickTypeListAPI (page,params, cb) {
        return Vue.http.get('api/bookstores/bookstore/getModuleClickTypelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

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
        return Vue.http.post('api/bookstores/bookstore/update/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,JSON.stringify(payload.data),payload.headers)
            .then((response) => {
                cb(response.data)
                console.log(payload)
            }, (error) => {
            })
    },
    getBookListAPI (page,params,cb) {
        return Vue.http.get('api/books/book/getbooklist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getBookTypeListAPI (page,params,cb) {
        return Vue.http.get('api/bookstores/bookstore/getbooktypelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
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
    getBookListSearchIdAPI (page, params, cb) {
        return Vue.http.get('api/books/book/getbook/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    getTrankingTypeListAPI (page,params,cb) {
        return Vue.http.get('api/bookstores/bookstore/getrankingtypelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
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
    getBookThemeListAPI (page,params,cb) {
        return Vue.http.get('api/bookstores/bookstore/getbookthemelist/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,{params:params})
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
        return Vue.http.post('api/bookstores/bookstore/add/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,JSON.stringify(payload.data),payload.headers)
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    upDateBookAPI (payload, cb) {
        return Vue.http.post('api/books/book/update/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,JSON.stringify(payload.data),payload.headers)
            .then((response) => {
                cb(response.data)
                console.log(payload)
            }, (error) => {
            })
    },
    deleteBookAPI (payload, cb, errorCb) {
        return Vue.http.delete('api/books/book/delete/',{params:payload})
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    getBookRankingListAPI (page,params,cb, errorCb) {
        return Vue.http.get('api/materiels/bookrankingtype/getbookrankinglist/'+page.PageIndex+'/'+page.PageSize, {params:params})
            .then((response) => {
                cb(response.data)
                console.log(response.data)
            }, (error) => {

            })
    },
    getBookRankingListIdAPI (params,cb, errorCb) {
        return Vue.http.get('api/materiels/bookrankingtype/getbookrankinglist', {params:params})
            .then((response) => {
                cb(response.data)
                console.log(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    deleteBookRankingAPI (payload, cb, errorCb) {
        return Vue.http.delete('api/materiels/bookrankingtype/delete/',{params:payload})
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    upDateBookRankingAPI (payload, cb, errorCb) {
        return Vue.http.post('api/materiels/bookrankingtype/update?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,JSON.stringify(payload.data),payload.headers)
            .then((response) => {
                cb(response.data)
                console.log(payload)
            }, (error) => {
            })
    },
    addBookRankingAPI (payload, cb, errorCb) {
        return Vue.http.post('api/materiels/bookrankingtype/add?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,JSON.stringify(payload.data),payload.headers)
            .then((response) => {
                cb(response.data)
                console.log(payload)
            }, (error) => {
            })
    },
    getBookStoreversionListAPI (params, cb) {
        return Vue.http.get('api/bookstores/bookstore/getbookstoreversionlist/'+params.page.PageIndex+'/'+params.page.PageSize+'/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1)
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    upDateTabAPI (payload, cb, errorCb) {
        return Vue.http.post('api/bookstores/bookstore/bookstoreversion/update?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,JSON.stringify(payload.data),payload.headers)
            .then((response) => {
                cb(response.data)
                console.log(payload)
            }, (error) => {
            })
    },
    addTabAPI (payload, cb, errorCb) {
        return Vue.http.post('api/bookstores/bookstore/bookstoreversion/add?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,JSON.stringify(payload.data),payload.headers)
            .then((response) => {
                cb(response.data)
                console.log(payload)
            }, (error) => {npm
            })
    },
    deleteTabAPI (payload, cb, errorCb) {
        return Vue.http.delete('api/bookstores/bookstore/bookstoreversion/delete',{params:payload})
            .then((response) => {
                cb(response.data)
            }, (error) => {
                errorCb(error)
            })
    },
    userConsumPtionAPI (page,params,cb) {
        return Vue.http.get('report/userconsumption/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userBookConsumPtionAPI (page,params,cb) {
        return Vue.http.get('report/userbookconsumption/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userBookOrderConsumPtionAPI (page,params,cb) {
        return Vue.http.get('report/userbookorderconsumption/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userRechargeAPI (page,params,cb) {
        return Vue.http.get('report/userrecharge/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userRechargeDetailAPI (page,params,cb) {
        return Vue.http.get('report/userrechargedetail/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userRechargeOrderAPI (page,params,cb) {
        return Vue.http.get('report/userrechargeorder/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userInfoAPI (page,params,cb) {
        return Vue.http.get('report/userinfo/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userBookShelfAPI (page,params,cb) {
        return Vue.http.get('report/userbookshelf/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userTaskAPI (page,params,cb) {
        return Vue.http.get('report/usertask/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
    userFeedBackAPI (page,params,cb) {
        return Vue.http.get('report/userfeedback/'+page.PageIndex+'/'+page.PageSize+'/?sessionKey='+localStorage.SessionKey,{params:params})
            .then((response) => {
                cb(response.data)
            }, (error) => {

            })
    },
}
