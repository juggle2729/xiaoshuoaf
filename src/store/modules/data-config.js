import moment from 'moment'
import * as types from '../mutation-types'
import dataConfig from '../../api/data-config'
import { QINIU_IMAGE_DOMAIN } from '../../const'
// initial state
const state = {
    getModulelist:{
        list:[],
        PageCount:'',
        RecordCount:'',
        sessionKey:'',
        refresh:true
    },
    getModule: {
      list:'',
      flagImg: true,
      index: ''
    },
    getModuleTypeList: {
        list:''
    },
    getModuleClickTypeList: {
        list:''
    },
    getModuleDetailList: {
        list:''
    },
    update: {
        list:''
    },
    getBookList: {
        list: '',
        PageCount: '',
        RecordCount: '',
    },
    getBookListIdSearch: {
        list:''
    },
    getTrankingTypeList: {
        list:'',
        PageCount:'',
        RecordCount:''
    },
    getShortBookList: {
        list:'',
        PageCount:'',
        RecordCount:''
    },
    getBookThemeList: {
        list:'',
        PageCount:'',
        RecordCount:''
    },
    delete: {
        status:''
    },
    addModule: {
        status:''
    },
    upDateBook: {
        status:''
    },
    deleteBook: {
        status:''
    },
    getBookRanking: {
        list:'',
        PageCount:'',
        RecordCount:''
    }
}
// actions
const actions = {
    getModulelist ({commit},params) {
        commit(types.Get_Module_List_REQUEST)
        dataConfig.getModulelistAPI(params.page,params.params,
            (data) => commit(types.Get_Module_List_SUCCESS, data),
            (error) => commit(types.Get_Module_List_FAILURE, error)
        )
    },
    getModule ({commit},params) {
        commit(types.Get_Module_REQUEST)
        dataConfig.getModuleAPI(params.payload,
            (data) => commit(types.Get_Module_SUCCESS, data)
        )
    },
    getModuleTypeList ({commit},params) {
        commit(types.Get_Module_Type_List_REQUEST)
        dataConfig.getModuleTypeListAPI(params.page,params.isPay,
            (data) => commit(types.Get_Module_Type_List_SUCCESS, data)
        )
    },
    getModuleClickTypeList ({commit},params) {
        commit(types.Get_Module_Click_Type_List_REQUEST)
        dataConfig.getModuleClickTypeListAPI(params.page,params.isPay,
            (data) => commit(types.Get_Module_Click_Type_List_SUCCESS, data)
        )
    },
    getModuleDetailList ({commit},params) {
        commit(types.Get_Module_Detail_List_REQUEST)
        dataConfig.getModuleDetailListAPI(params.page,params.params,
            (data) => commit(types.Get_Module_Detail_List_SUCCESS, data)
        )
    },
   upDate ({commit},params) {
        commit(types.Up_Date_REQUEST)
        dataConfig.upDateAPI(params,
            (data) => commit(types.Up_Date_SUCCESS, data)
        )
    },
    getBookList ({commit},params) {
        commit(types.Get_Book_List_REQUEST)
        dataConfig.getBookListAPI(params.page,params.isPay,
            (data) => commit(types.Get_Book_List_SUCCESS, data)
        )
    },
    getBookListSearch ({commit},params) {
        commit(types.Get_Book_List_Search_REQUEST)
        dataConfig.getBookListSearchAPI(params.page,params.params,
            (data) => commit(types.Get_Book_List_Search_SUCCESS, data)
        )
    },
    getBookListIdSearch ({commit},params) {
        commit(types.Get_Book_List_Search_Id_REQUEST)
        dataConfig.getBookListSearchIdAPI(params.page,params.params,
            (data) => commit(types.Get_Book_List_Search_Id_SUCCESS, data)
        )
    },
    getTrankingTypeList ({commit},params) {
        commit(types.Get_Tranking_Type_List_REQUEST)
        dataConfig.getTrankingTypeListAPI(params.page,params.isPay,
            (data) => commit(types.Get_Tranking_Type_List_SUCCESS, data)
        )
    },
    getShortBookList ({commit},params) {
        commit(types.Get_Short_Book_List_REQUEST)
        dataConfig.getShortBookListAPI(params.page,
            (data) => commit(types.Get_Short_Book_List_SUCCESS, data)
        )
    },
    getShortBookListSearch ({commit},params) {
        commit(types.Get_Short_Book_List_Search_REQUEST)
        dataConfig.getShortBookListSearchAPI(params.page,params.params,
            (data) => commit(types.Get_Short_Book_List_Search_SUCCESS, data)
        )
    },
    getBookThemeList ({commit},params) {
        commit(types.Get_Book_Theme_List_REQUEST)
        dataConfig.getBookThemeListAPI(params.page,params.isPay,
            (data) => commit(types.Get_Book_Theme_List_SUCCESS, data)
        )
    },
    delete ({commit},params) {
        commit(types.Delete_REQUEST)
        dataConfig.deleteAPI(params.payload,
            (data) => commit(types.Delete_SUCCESS, data)
        )
    },
    addModule ({commit},params) {
        commit(types.Add_Module_REQUEST)
        dataConfig.addModuleAPI(params,
            (data) => commit(types.Add_Module_SUCCESS, data)
        )
    },
    upDateBook ({commit},params) {
        commit(types.Up_Date_Book_REQUEST)
        dataConfig.upDateBookAPI(params,
            (data) => commit(types.Up_Date_Book_SUCCESS, data)
        )
    },
    deleteBook ({commit},params) {
        commit(types.Delete_Book_REQUEST)
        dataConfig.deleteBookAPI(params.payload,
            (data) => commit(types.Delete_Book_SUCCESS, data)
        )
    },
    getBookRanking ({commit},params) {
        commit(types.Get_Book_Ranking_REQUEST)
        dataConfig.getBookRankingAPI(params.page,params.params,
            (data) => commit(types.Get_Book_Ranking_SUCCESS, data)
        )
    },
}

// mutations
const mutations = {
  [types.Get_Module_List_REQUEST] (state) {

  },
  [types.Get_Module_List_SUCCESS] (state, data) {
      state.getModulelist.list = data.dt.PageData
      state.getModulelist.PageCount = data.dt.PageCount
      state.getModulelist.RecordCount = data.dt.RecordCount
      state.getModulelist.sessionKey = data.st
  },
    [types.Get_Module_REQUEST] (state) {

    },
    [types.Get_Module_SUCCESS] (state, data) {
        state.getModule.list = data.dt
        state.getModule.sessionKey = data.st
    },
    [types.Get_Module_Type_List_REQUEST] (state) {

    },
    [types.Get_Module_Type_List_SUCCESS] (state, data) {
        state.getModuleTypeList.list = data.dt.PageData
    },
    [types.Get_Module_Click_Type_List_REQUEST] (state) {

    },
    [types.Get_Module_Click_Type_List_SUCCESS] (state, data) {
        state.getModuleClickTypeList.list = data.dt.PageData
    },
    [types.Get_Module_Detail_List_REQUEST] (state) {

    },
    [types.Get_Module_Detail_List_SUCCESS] (state, data) {
        state.getModuleDetailList.list = data.dt.PageData
    },
    [types.Up_Date_REQUEST] (state) {

    },
    [types.Up_Date_SUCCESS] (state, data) {

    },
    [types.Get_Book_List_REQUEST] (state) {

    },
    [types.Get_Book_List_SUCCESS] (state, data) {
        state.getBookList.list = data.dt.PageData
        state.getBookList.PageCount = data.dt.PageCount
        state.getBookList.RecordCount = data.dt.RecordCount
    },
    [types.Get_Book_List_Search_REQUEST] (state) {

    },
    [types.Get_Book_List_Search_SUCCESS] (state, data) {
        state.getBookList.list = data.dt.PageData
        state.getBookList.PageCount = data.dt.PageCount
        state.getBookList.RecordCount = data.dt.RecordCount
    },
    [types.Get_Book_List_Search_Id_REQUEST] (state) {

    },
    [types.Get_Book_List_Search_Id_SUCCESS] (state, data) {
        state.getBookListIdSearch.list = data.dt
    },
    [types.Get_Tranking_Type_List_REQUEST] (state) {

    },
    [types.Get_Tranking_Type_List_SUCCESS] (state, data) {
        state.getTrankingTypeList.list = data.dt.PageData
        state.getTrankingTypeList.PageCount = data.dt.PageCount
        state.getTrankingTypeList.RecordCount = data.dt.RecordCount
    },
    [types.Get_Short_Book_List_REQUEST] (state) {

    },
    [types.Get_Short_Book_List_SUCCESS] (state, data) {
        state.getShortBookList.list = data.dt.PageData
        state.getShortBookList.PageCount = data.dt.PageCount
        state.getShortBookList.RecordCount = data.dt.RecordCount
    },
    [types.Get_Short_Book_List_Search_REQUEST] (state) {

    },
    [types.Get_Short_Book_List_Search_SUCCESS] (state, data) {
        state.getShortBookList.list = data.dt.PageData
        state.getShortBookList.PageCount = data.dt.PageCount
        state.getShortBookList.RecordCount = data.dt.RecordCount
    },
    [types.Get_Book_Theme_List_REQUEST] (state) {

    },
    [types.Get_Book_Theme_List_SUCCESS] (state, data) {
        state.getBookThemeList.list = data.dt.PageData
        state.getBookThemeList.PageCount = data.dt.PageCount
        state.getBookThemeList.RecordCount = data.dt.RecordCount
    },
    [types.Delete_REQUEST] (state) {

    },
    [types.Delete_SUCCESS] (state, data) {
        state.delete.status = data.st
    },
    [types.Add_Module_REQUEST] (state) {

    },
    [types.Add_Module_SUCCESS] (state, data) {
        state.addModule.status = data.st
    },
    [types.Up_Date_Book_REQUEST] (state) {

    },
    [types.Up_Date_Book_SUCCESS] (state, data) {
        state.upDateBook.status = data.st
    },
    [types.Delete_Book_REQUEST] (state) {

    },
    [types.Delete_Book_SUCCESS] (state, data) {
        state.deleteBook.status = data.st
    },
    [types.Get_Book_Ranking_REQUEST] (state) {

    },
    [types.Get_Book_Ranking_SUCCESS] (state, data) {
        state.getBookRanking.list = data.dt.PageData
        state.getBookRanking.PageCount = data.dt.PageCount
        state.getBookRanking.RecordCount = data.dt.RecordCount
    },
}

export default {
  state,
  actions,
  mutations
}
