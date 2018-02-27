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
        refresh:true,
        dialogFormVisibleModuleDetail:false,
        dialogFormVisibleModuleAdd: false,
        BookStoreVersion: '',
        BookStoreVersion1: 1,
    },
    getModule: {
      list:'',
      flagImg: true,
      flagFoot:true,
      flagDetail:true,
      index: '',
        listName:{
            ImageToBookName:'',
            FootToBookName:'',
        },
        listAdd:{
            FootToBookNameAdd:'',
            ImageToBookNameAdd:'',
            FootOperationIdAdd:'',
            ImageOperationIdAdd:''
        }
    },
    getModuleTypeList: {
        list:''
    },
    getModuleClickTypeList: {
        list:''
    },
    getModuleDetailList: {
        list:'',
        index:'',
        ClickTypeAdd1:[],
        AddTableDataDetails:[
            {
                "IconUrl":'',
                "Name":'',
                "Summary":'',
                "Author":'',
                "Tag":'',
                "Category":'',
                "ClickType":'',
                "BookId":'',
                "BookName":'',
                "OperationId":'',
                "ClickWebViewUrl":'',
                "SerialNumber":'',
                "MinVer":'',
                "OldPriceText":'',
                "NewPriceText":''
            }
        ]
    },
    update: {
        list:''
    },
    getBookList: {
        list: '',
        PageCount: '',
        RecordCount: '',
        bookRanked: false
    },
    getBookTypeList: {
        list:''
    },
    getBookListIdSearch: {
        list:''
    },
    // getTrankingTypeList: {
    //     list:'',
    //     PageCount:'',
    //     RecordCount:''
    // },
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
    getBookRankingList: {
        list:'',
        PageCount:'',
        RecordCount:''
    },
    getBookRankingListId: {
        list:'',
        PageCount:'',
        RecordCount:'',
        index:'',
        AddTableData:[
            {
                Author:"",
                BookId:"",
                Id:"",
                Name:"",
                SerialNumber:""
            }
        ]
    },
    deleteBookRanking: {
        status:''
    },
    upDateBookRanking: {
        status:''
    },
    addBookRanking: {
        status:''
    },
    getBookStoreversionList: {
        list:'',
        PageCount:'',
        RecordCount:''
    },
    upDateTab: {
        status: ''
    },
    addTab: {
        status: ''
    },
    deleteTab: {
        status: ''
    },
    userConsumPtion: {
        list:'',
        PageCount:'',
        RecordCount:'',
        BeginDate:'',
        EndDate:''
    },
    userBookConsumPtion: {
        list:'',
        PageCount:'',
        RecordCount:'',
        params:{}
    },
    userBookOrderConsumPtion: {
        list:'',
        PageCount:'',
        RecordCount:'',
        params:{}
    },
    userRecharge: {
        list:'',
        PageCount:'',
        RecordCount:'',
        params:{}
    },
    userRechargeDetail: {
        list:'',
        PageCount:'',
        RecordCount:''
    },
    userRechargeOrder: {
        list:'',
        PageCount:'',
        RecordCount:'',
    },
    userInfo: {
        list:'',
        PageCount:'',
        RecordCount:'',
    },
    userBookShelf: {
        list:'',
        PageCount:'',
        RecordCount:'',
        params:{}
    },
    userTask: {
        list:'',
        PageCount:'',
        RecordCount:'',
        params:{}
    },
    userFeedBack: {
        list:'',
        PageCount:'',
        RecordCount:'',
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
        dataConfig.getModuleTypeListAPI(params.page,
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
    getBookTypeList ({commit},params) {
        commit(types.Get_Book_Type_List_REQUEST)
        dataConfig.getBookTypeListAPI(params.page,params.isPay,
            (data) => commit(types.Get_Book_Type_List_SUCCESS, data)
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
    getBookRankingList ({commit},params) {
        commit(types.Get_Book_Ranking_List_REQUEST)
        dataConfig.getBookRankingListAPI(params.page,params.params,
            (data) => commit(types.Get_Book_Ranking_List_SUCCESS, data)
        )
    },
    getBookRankingListId ({commit},params) {
        commit(types.Get_Book_Ranking_List_Id_REQUEST)
        dataConfig.getBookRankingListIdAPI(params,
            (data) => commit(types.Get_Book_Ranking_List_Id_SUCCESS, data)
        )
    },
    deleteBookRanking ({commit},params) {
        commit(types.Delete_Book_Ranking_REQUEST)
        dataConfig.deleteBookRankingAPI(params.payload,
            (data) => commit(types.Delete_Book_Ranking_SUCCESS, data)
        )
    },
    upDateBookRanking ({commit},params) {
        commit(types.Up_Date_Book_Ranking_REQUEST)
        dataConfig.upDateBookRankingAPI(params,
            (data) => commit(types.Up_Date_Book_Ranking_SUCCESS, data)
        )
    },
    addBookRanking ({commit},params) {
        commit(types.Add_Book_Ranking_REQUEST)
        dataConfig.addBookRankingAPI(params,
            (data) => commit(types.Add_Book_Ranking_SUCCESS, data)
        )
    },
    getBookStoreversionList ({commit},params) {
        commit(types.Get_Book_Storeversion_List_REQUEST)
        dataConfig.getBookStoreversionListAPI(params,
            (data) => commit(types.Get_Book_Storeversion_List_SUCCESS, data)
        )
    },
    upDateTab ({commit},params) {
        commit(types.Up_Date_Tab_REQUEST)
        dataConfig.upDateTabAPI(params,
            (data) => commit(types.Up_Date_Tab_SUCCESS, data)
        )
    },
    addTab ({commit},params) {
        commit(types.Add_Tab_REQUEST)
        dataConfig.addTabAPI(params,
            (data) => commit(types.Add_Tab_SUCCESS, data)
        )
    },
    deleteTab ({commit},params) {
        commit(types.Delete_Tab_REQUEST)
        dataConfig.deleteTabAPI(params.payload,
            (data) => commit(types.Delete_Tab_SUCCESS, data)
        )
    },
    userConsumPtion ({commit},params) {
        commit(types.User_Book_Comsum_Ption_REQUEST)
        dataConfig.userConsumPtionAPI(params.page,params.params,
            (data) => commit(types.User_Comsum_Ption_SUCCESS, data)
        )
    },
    userBookConsumPtion ({commit},params) {
        commit(types.User_Book_Comsum_Ption_REQUEST)
        dataConfig.userBookConsumPtionAPI(params.page,params.params,
            (data) => commit(types.User_Book_Comsum_Ption_SUCCESS, data)
        )
    },
    userBookOrderConsumPtion ({commit},params) {
        commit(types.User_Book_Order_Comsum_Ption_REQUEST)
        dataConfig.userBookOrderConsumPtionAPI(params.page,params.params,
            (data) => commit(types.User_Book_Order_Comsum_Ption_SUCCESS, data)
        )
    },
    userRecharge ({commit},params) {
        commit(types.User_Recharge_REQUEST)
        dataConfig.userRechargeAPI(params.page,params.params,
            (data) => commit(types.User_Recharge_SUCCESS, data)
        )
    },
    userRechargeDetail ({commit},params) {
        commit(types.User_Recharge_Detail_REQUEST)
        dataConfig.userRechargeDetailAPI(params.page,params.params,
            (data) => commit(types.User_Recharge_Detail_SUCCESS, data)
        )
    },
    userRechargeOrder ({commit},params) {
        commit(types.User_Recharge_Order_REQUEST)
        dataConfig.userRechargeOrderAPI(params.page,params.params,
            (data) => commit(types.User_Recharge_Order_SUCCESS, data)
        )
    },
    userInfo ({commit},params) {
        commit(types.User_Info_REQUEST)
        dataConfig.userInfoAPI(params.page,params.params,
            (data) => commit(types.User_Info_SUCCESS, data)
        )
    },
    userBookShelf ({commit},params) {
        commit(types.User_Book_Shelf_REQUEST)
        dataConfig.userBookShelfAPI(params.page,params.params,
            (data) => commit(types.User_Book_Shelf_SUCCESS, data)
        )
    },
    userTask ({commit},params) {
        commit(types.User_Task_REQUEST)
        dataConfig.userTaskAPI(params.page,params.params,
            (data) => commit(types.User_Task_SUCCESS, data)
        )
    },
    userFeedBack ({commit},params) {
        commit(types.User_Feed_Back_REQUEST)
        dataConfig.userFeedBackAPI(params.page,params.params,
            (data) => commit(types.User_Feed_Back_SUCCESS, data)
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
    [types.Get_Book_Type_List_REQUEST] (state) {

    },
    [types.Get_Book_Type_List_SUCCESS] (state, data) {
        state.getBookTypeList.list = data.dt.PageData
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
    // [types.Get_Tranking_Type_List_REQUEST] (state) {
    //
    // },
    // [types.Get_Tranking_Type_List_SUCCESS] (state, data) {
    //     state.getTrankingTypeList.list = data.dt.PageData
    //     state.getTrankingTypeList.PageCount = data.dt.PageCount
    //     state.getTrankingTypeList.RecordCount = data.dt.RecordCount
    // },
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
    [types.Get_Book_Ranking_List_REQUEST] (state) {

    },
    [types.Get_Book_Ranking_List_SUCCESS] (state, data) {
        state.getBookRankingList.list = data.dt.PageData
        state.getBookRankingList.PageCount = data.dt.PageCount
        state.getBookRankingList.RecordCount = data.dt.RecordCount
    },
    [types.Get_Book_Ranking_List_Id_REQUEST] (state) {

    },
    [types.Get_Book_Ranking_List_Id_SUCCESS] (state, data) {
        state.getBookRankingListId.list = data.dt.PageData
        state.getBookRankingListId.PageCount = data.dt.PageCount
        state.getBookRankingListId.RecordCount = data.dt.RecordCount
    },
    [types.Delete_Book_Ranking_REQUEST] (state) {

    },
    [types.Delete_Book_Ranking_SUCCESS] (state, data) {
        state.deleteBookRanking.status = data.st
    },
    [types.Up_Date_Book_Ranking_REQUEST] (state) {

    },
    [types.Up_Date_Book_Ranking_SUCCESS] (state, data) {
        state.upDateBookRanking.status = data.st
    },
    [types.Add_Book_Ranking_REQUEST] (state) {

    },
    [types.Add_Book_Ranking_SUCCESS] (state, data) {
        state.addBookRanking.status = data.st
    },
    [types.Get_Book_Storeversion_List_REQUEST] (state) {

    },
    [types.Get_Book_Storeversion_List_SUCCESS] (state, data) {
        state.getBookStoreversionList.list = data.dt.PageData
        state.getBookStoreversionList.PageCount = data.dt.PageCount
        state.getBookStoreversionList.RecordCount = data.dt.RecordCount
    },
    [types.Up_Date_Tab_REQUEST] (state) {

    },
    [types.Up_Date_Tab_SUCCESS] (state, data) {
        state.upDateTab.status = data.st
    },
    [types.Add_Tab_REQUEST] (state) {

    },
    [types.Add_Tab_SUCCESS] (state, data) {
        state.addTab.status = data.st
    },
    [types.Delete_Tab_REQUEST] (state) {

    },
    [types.Delete_Tab_SUCCESS] (state, data) {
        state.deleteTab.status = data.st
    },
    [types.User_Comsum_Ption_REQUEST] (state) {

    },
    [types.User_Comsum_Ption_SUCCESS] (state, data) {
        state.userConsumPtion.list = data.dt.PageData
        state.userConsumPtion.PageCount = data.dt.PageCount
        state.userConsumPtion.RecordCount = data.dt.RecordCount
    },
    [types.User_Book_Comsum_Ption_REQUEST] (state) {

    },
    [types.User_Book_Comsum_Ption_SUCCESS] (state, data) {
        state.userBookConsumPtion.list = data.dt.PageData
        state.userBookConsumPtion.PageCount = data.dt.PageCount
        state.userBookConsumPtion.RecordCount = data.dt.RecordCount
    },
    [types.User_Book_Order_Comsum_Ption_REQUEST] (state) {

    },
    [types.User_Book_Order_Comsum_Ption_SUCCESS] (state, data) {
        state.userBookOrderConsumPtion.list = data.dt.PageData
        state.userBookOrderConsumPtion.PageCount = data.dt.PageCount
        state.userBookOrderConsumPtion.RecordCount = data.dt.RecordCount
    },
    [types.User_Recharge_REQUEST] (state) {

    },
    [types.User_Recharge_SUCCESS] (state, data) {
        state.userRecharge.list = data.dt.PageData
        state.userRecharge.PageCount = data.dt.PageCount
        state.userRecharge.RecordCount = data.dt.RecordCount
    },
    [types.User_Recharge_Detail_REQUEST] (state) {

    },
    [types.User_Recharge_Detail_SUCCESS] (state, data) {
        state.userRechargeDetail.list = data.dt.PageData
        state.userRechargeDetai.PageCount = data.dt.PageCount
        state.userRechargeDetai.RecordCount = data.dt.RecordCount
    },
    [types.User_Recharge_Order_REQUEST] (state) {

    },
    [types.User_Recharge_Order_SUCCESS] (state, data) {
        state.userRechargeOrder.list = data.dt.PageData
        state.userRechargeOrder.PageCount = data.dt.PageCount
        state.userRechargeOrder.RecordCount = data.dt.RecordCount
    },
    [types.User_Info_REQUEST] (state) {

    },
    [types.User_Info_SUCCESS] (state, data) {
        state.userInfo.list = data.dt.PageData
        state.userInfo.PageCount = data.dt.PageCount
        state.userInfo.RecordCount = data.dt.RecordCount
    },
    [types.User_Book_Shelf_REQUEST] (state) {

    },
    [types.User_Book_Shelf_SUCCESS] (state, data) {
        state.userBookShelf.list = data.dt.PageData
        state.userBookShelf.PageCount = data.dt.PageCount
        state.userBookShelf.RecordCount = data.dt.RecordCount
    },
    [types.User_Task_REQUEST] (state) {

    },
    [types.User_Task_SUCCESS] (state, data) {
        state.userTask.list = data.dt.PageData
        state.userTask.PageCount = data.dt.PageCount
        state.userTask.RecordCount = data.dt.RecordCount
    },
    [types.User_Feed_Back_REQUEST] (state) {

    },
    [types.User_Feed_Back_SUCCESS] (state, data) {
        state.userFeedBack.list = data.dt.PageData
        state.userFeedBack.PageCount = data.dt.PageCount
        state.userFeedBack.RecordCount = data.dt.RecordCount
    },
}

export default {
  state,
  actions,
  mutations
}
