import moment from 'moment'
import * as types from '../mutation-types'
import dataConfig from '../../api/data-config'
import { QINIU_IMAGE_DOMAIN } from '../../const'
// initial state
const state = {
    getModulelist:{
        list:[],
        PageCount:'',
        RecordCount:''
    },
    getModule: {
      list:""
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
        list:'',
        PageCount:'',
        RecordCount:''
    },
    getTrankingTypeList: {
        list:'',
        PageCount:'',
        RecordCount:''
    }
}
// actions
const actions = {
    getModulelist ({commit},params) {
        commit(types.Get_Module_List_REQUEST)
        dataConfig.getModulelistAPI(params.payload,
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
        dataConfig.getModuleTypeListAPI(params.payload,
            (data) => commit(types.Get_Module_Type_List_SUCCESS, data)
        )
    },
    getModuleClickTypeList ({commit},params) {
        commit(types.Get_Module_Click_Type_List_REQUEST)
        dataConfig.getModuleClickTypeListAPI(params.payload,
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
        dataConfig.upDateAPI(params.data,
            (data) => commit(types.Up_Date_SUCCESS, data)
        )
    },
    getBookList ({commit},params) {
        commit(types.Get_Book_List_REQUEST)
        dataConfig.getBookListAPI(params.page,
            (data) => commit(types.Get_Book_List_SUCCESS, data)
        )
    },
    getBookListSearch ({commit},params) {
        commit(types.Get_Book_List_Search_REQUEST)
        dataConfig.getBookListSearchAPI(params.page,params.params,
            (data) => commit(types.Get_Book_List_Search_SUCCESS, data)
        )
    },
    getTrankingTypeList ({commit},params) {
        commit(types.Get_Tranking_Type_List_REQUEST)
        dataConfig.getTrankingTypeListAPI(params.page,
            (data) => commit(types.Get_Tranking_Type_List_SUCCESS, data)
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
  },
    [types.Get_Module_REQUEST] (state) {

    },
    [types.Get_Module_SUCCESS] (state, data) {
        state.getModule.list = data.dt
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
    },
    [types.Get_Book_List_Search_REQUEST] (state) {

    },
    [types.Get_Book_List_Search_SUCCESS] (state, data) {
        state.getBookList.list = data.dt.PageData
        state.getBookList.PageCount = data.dt.PageCount
        state.getBookList.RecordCount = data.dt.RecordCount
    },
    [types.Get_Tranking_Type_List_REQUEST] (state) {

    },
    [types.Get_Tranking_Type_List_SUCCESS] (state, data) {
        state.getTrankingTypeList.list = data.dt.PageData
        state.getTrankingTypeList.PageCount = data.dt.PageCount
        state.getTrankingTypeList.RecordCount = data.dt.RecordCount
    },
}

export default {
  state,
  actions,
  mutations
}
