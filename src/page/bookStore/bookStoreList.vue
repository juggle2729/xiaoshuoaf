<template>
    <div class="fillcontain bookStoreList">
        <head-top></head-top>
        <div style="margin-left: 20px;margin-top: 20px;font-size: 16px">
            <el-form>
                <el-form-item label="书城名称:">
                    <el-select v-model="BookStoreVersion0" value-key="Id"  @change="changeBookStoreVersion">
                        <el-option
                            v-for="item in listSvr"
                            :key="item.Id"
                            :label="item.Description"
                            :value="item.StoreVersion" >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                border
                @row-dblclick="handleRowHandle"
                style="width:100%" >
                <el-table-column
                    label="Id">
                    <template scope="scope">
                        <p>{{scope.row.Id}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ModuleType"
                    label="模块类别"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="模块描述"
                    width="160">
                    <template scope="scope">
                        <p :title="scope.row.ModuleDescription">{{scope.row.ModuleDescription}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="模块名称">
                    <template scope="scope">
                        <p :title="scope.row.Title">{{scope.row.Title}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="StoreVersionName"
                    label="模块归属"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="SerialNumber"
                    label="顺序"
                    width="80">
                </el-table-column>
                <el-table-column
                    label="模块开始时间">
                    <template scope="scope">
                        <p :title="scope.row.BeginDate">{{scope.row.BeginDate}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="模块结束时间">
                    <template scope="scope">
                        <p :title="scope.row.EndDate">{{scope.row.EndDate}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="StoreVersion"
                    label="适用最小版本号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="IsPreview"
                    label="是否提前预览"
                    width="80">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="toGetModule(scope.$index,scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">新增</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="RecordCount">
            </el-pagination>
        </div>
        <el-dialog title="新增书城列表" :visible.sync="dialogFormVisible">
            <div class="moduleAdd">
                <div class="moduleFrom">
                    <div class="foot">
                        <el-form ref="form"  label-width="180px">
                            <el-form-item label="模块类型">
                                <el-select v-model="请选择模块类型" placeholder="请选择模块类型" ref="ModuleType" >
                                    <el-option  v-for="item in ModuleTypeList" :key="item.Id" :label="item.ModuleDescription" :value="item.ModuleType"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="滚动通知左边标题" >
                                <el-input v-model="Notice"></el-input>
                            </el-form-item>
                            <el-form-item label="模块标题" >
                                <el-input v-model="Title"></el-input>
                            </el-form-item>
                            <el-form-item label="是否提前预览" >
                                <el-select  v-model="IsPreview"  placeholder="是否预览">
                                    <el-option label="true" value="true"></el-option>
                                    <el-option label="false" value="false"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否有脚标">
                                <el-select  v-model="IsHasFoot" placeholder="请选择是否有脚标" >
                                    <el-option label="True" value="true"></el-option>
                                    <el-option label="False" value="fasle"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="序号" >
                                <el-input v-model="SerialNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="配置归属">
                                <el-input v-model="StoreVersion" :readonly="true"></el-input>
                            </el-form-item>
                            <el-form-item label="脚标名称" >
                                <el-input v-model="FootName"></el-input>
                            </el-form-item>
                            <el-form-item label="脚标点击操作码">
                                <el-select  v-model="FootClickType" placeholder="请选择脚标点击操作码" ref="FootClickType">
                                    <el-option    v-for="item in ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="跳转业务主键ID" >
                                <el-input v-model="FootOperationId"></el-input>
                            </el-form-item>
                            <el-form-item label="点击脚标跳转的网页" >
                                <el-input v-model="FootToClickWebViewUrl"></el-input>
                            </el-form-item>
                            <el-form-item label="免费起止时间"  class="datePicker">
                                <el-date-picker
                                    v-model="dateAdd"
                                    type="datetimerange"
                                    size="large"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="image">
                        <el-form ref="form"  label-width="180px">
                            <el-form-item label="图片地址" >
                                <el-input v-model="ImageUrl"></el-input>
                            </el-form-item>
                            <el-form-item label="图片点击操作码">
                                <el-select  v-model="ImageClickType" placeholder="请选择脚标点击操作码" >
                                    <el-option    v-for="item in ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="点击图片跳转的网页" >
                                <el-input v-model="ImageToClickWebViewUrl"></el-input>
                            </el-form-item>
                            <el-form-item label="点击图片待跳转书籍ID" >
                                <el-input v-model="ImageToBookId"></el-input>
                            </el-form-item>
                            <el-form-item label="图片跳转业务主键ID" >
                                <el-input v-model="ImageOperationId"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {getAuthHeaders} from '../../router'
    export default {
        beforeMount() {
            this.getBookStoreversionList()
        },
        data() {
            return {
                dialogFormVisible:false,
                BookStoreVersion0:'',
                ModuleType: '',
                Notice: '',
                Title: '',
                IsHasFoot: '',
                IsPreview: '',
                SerialNumber: '',
                StoreVersion: '',
                dateAdd:'',
                FootName: '',
                FootClickType: '',
                FootOperationId: '',
                FootToClickWebViewUrl: '',
                ImageUrl:'',
                ImageClickType: '',
                ImageToClickWebViewUrl: '',
                ImageToBookId: '',
                ImageOperationId: '',
                IconUrl: '',
                Name: '',
                Summary: '',
                Author: '',
                Tag: '',
                Category: '',
                ClickType: '',
                BookId: '',
                OperationId: '',
                WebViewUrl: '',
                SerialNumber: '',
                ShortBookId: '',
                MinVer: '',
                isPay:{isPay:'1'},

                uploadUrl: 'http://47.52.25.158:9002/api/commons/common/upload?sessionKey='+localStorage.SessionKey,
            }
        },
        components: {
            headTop,
        },
        created: function () {

        },
        destroyed: function(){
        },
        methods: {
            getBookStoreversionList() {
                let that = this
                this.$store.dispatch('getBookStoreversionList', {
                    page: {"PageIndex": "1", "PageSize": "100"}
                }).then(res=>{
                    setTimeout(function(){
                        that.BookStoreVersion0 = that.listSvr[0].Description
                        let StoreVersion = that.listSvr[0].StoreVersion
                        that.$store.state.dataConfig.getModulelist.BookStoreVersion = that.listSvr[0].Description
                        that.$store.state.dataConfig.getModulelist.BookStoreVersion1 = that.listSvr[0].StoreVersion
                        that.getModuleList(StoreVersion)
                    },1)
                })
            },
            toGetModule: function(index,row) {
                this.$store.state.dataConfig.getModulelist.dialogFormVisibleModuleDetail = true
                this.$store.state.dataConfig.getModulelist.dialogFormVisibleModuleAdd = false
                this.$store.state.dataConfig.getModulelist.refresh = false
                this.$store.state.dataConfig.getModule.listName.FootToBookName = ''
                this.$store.state.dataConfig.getModule.listName.ImageToBookName = ''
                this.$router.push('bookStoreList/getModule/'+row.Id)
            },
            getModuleList: function(storeVersion) {
                this.$store.dispatch('getModulelist', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:{
                        storeVersion: storeVersion
                    }
                })

            },
            changeBookStoreVersion(value) {
                let obj = {};
                obj = this.listSvr.find((item)=>{
                    return item.StoreVersion === value;
                });
                console.log(obj)
                this.$store.state.dataConfig.getModulelist.BookStoreVersion = obj.Description
                this.$store.state.dataConfig.getModulelist.BookStoreVersion1 = obj.StoreVersion
                this.$store.dispatch('getModulelist', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:{
                        storeVersion: obj.StoreVersion
                    }
                }).then(
                    (response) => {
                    }
                ).catch(
                )
            },
            handleCurrentChange(val) {
                let that = this
                this.$store.dispatch('getModulelist', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    params:{
                        storeVersion: that.$store.state.dataConfig.getModulelist.BookStoreVersion1
                    }
                }).then(
                    (response) => {
                    }
                ).catch(
                )
            },
            handleCreate() {
            },
            handleAdd(index, row) {
                this.$store.state.dataConfig.getModulelist.dialogFormVisibleModuleDetail = false
                this.$store.state.dataConfig.getModulelist.dialogFormVisibleModuleAdd = true
                this.$store.state.dataConfig.getModulelist.refresh = false
                this.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails = [
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
                this.$router.push('bookStoreList/getModule/'+3)
            },
            changeImgAdd(index) {
                this.imgAddIndex = index;
                let lists = document.querySelectorAll(".el-upload-list")
                for (let list of lists) {
                    list.style.display = "none"
                }
            },
            handleSuccess(response,file,fileList) {
                console.log(response)
                this.AddTableData[this.imgAddIndex].IconUrl = response.dt[0].FileUrl
            },
            onSubmit() {

            },
            handleDelete(index, row) {
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$store.dispatch('delete', {payload:{sessionKey:localStorage.SessionKey,bookStoreModuleId:row.Id,isPay:'1'}}).then(
                        (response) => {
                            this.$message.success('删除成功');
                            this.getModuleList()
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addtr() {
                var tableItem = {
                    "IconUrl":'',
                    "Name":'',
                    "Summary":'',
                    "Author":'',
                    "Tag":'',
                    "Category":'',
                    "ClickType":'',
                    "BookId":'',
                    "OperationId":'',
                    "ClickWebViewUrl":'',
                    "SerialNumber":'',
                    "MinVer":''
                }
                this.AddTableData.push(tableItem)
            },
            deleteTr(e) {
                e.currentTarget.parentNode.parentNode.remove()
            },
            getModulePage(){
                let routeId = this.$store.getters.getModule.list.Id
                this.$router.push(this.$route.query.redirect || '/bookStoreList/getModule/'+routeId)
            },
            handleRowHandle(row,event) {
                this.$store.state.dataConfig.getModulelist.refresh = true
                if(!this.$store.state.dataConfig.getModulelist.dialogFormVisibleModuleDetail){
                    let indexAdd =  this.$store.state.dataConfig.getModuleDetailList.index
                    if (this.$store.state.dataConfig.getModule.flagImg){
                        this.$store.state.dataConfig.getModule.listAdd.ImageOperationIdAdd =  row.Id
                        this.getModulePage()
                    } else if(this.$store.state.dataConfig.getModule.flagDetail){
                        let that = this
                        this.getModulePage()
                        this.$nextTick(function(){
                            that.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails[indexAdd].Name = ''
                            that.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails[indexAdd].BookId = ''
                            that.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails[indexAdd].OperationId = row.Id
                            that.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails[indexAdd].ClickWebViewUrl = ''
                        })
                    } else{
                        this.getModulePage()
                        this.$store.state.dataConfig.getModule.listAdd.FootOperationIdAdd =  row.Id
                        this.$store.state.dataConfig.getModule.listAdd.FootToBookNameAdd =  row.Name
                    }
                } else{
                    let index =  this.$store.state.dataConfig.getModule.index
                    if (this.$store.state.dataConfig.getModule.flagImg){
                        this.$store.state.dataConfig.getModule.list.ImageOperationId = row.Id
                        this.$store.state.dataConfig.getModule.ImageToBookName = row.Name
                        this.getModulePage()
                    } else if(this.$store.state.dataConfig.getModule.flagDetail){
                        this.getModulePage()
                        this.$nextTick(function() {
                            this.$store.state.dataConfig.getModuleDetailList.list[index].OperationId = row.Id
                            this.$store.state.dataConfig.getModuleDetailList.list[index].BookName = ''
                            this.$store.state.dataConfig.getModuleDetailList.list[index].BookId = ''
                            this.$store.state.dataConfig.getModuleDetailList.list[index].ClickWebViewUrl = ''
                        })
                    } else if(this.$store.state.dataConfig.getModule.flagFoot){
                        this.$store.state.dataConfig.getModule.list.FootOperationId = row.Id
                        this.$store.state.dataConfig.getModule.FootToBookName = row.Name
                        this.getModulePage()
                    }
                }
            },
        },
        computed: {
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
            },
            list: function() {
                return  this.$store.state.dataConfig.getModule.list
            },
            tableData: function() {
                var tableData1 = this.$store.state.dataConfig.getModulelist.list
                if(tableData1.length === 0){
                    tableData1 = [{
                        BeginDate:"",
                        StoreVersionName:"",
                        ModuleType:"",
                        ModuleDescription:"",
                        SerialNumber:null,
                        Id:"",
                        EndDate:"",
                        IsPreview:false,
                        StoreVersion:"",
                        Title:null,
                    }]
                    return tableData1
                } else{
                    return tableData1
                }
            },
            RecordCount: function() {
                return  this.$store.state.dataConfig.getModulelist.RecordCount
            },
            PageCount: function() {
                return  this.$store.state.dataConfig.getModulelist.PageCount
            },
            deleteSt: function() {
                return  this.$store.state.dataConfig.delete.status
            },
            BookStoreversionList: function() {
                return  this.$store.state.dataConfig.getBookStoreversionList.list
            },
            listSvr: function() {
                let listStr = []
                let list = this.$store.state.dataConfig.getBookStoreversionList.list
                for (let i=0;i<list.length;i++){
                    let item = {
                        "StoreVersion": list[i].StoreVersion,
                        "Description": list[i].Description,
                        "Id": i*10
                    }
                    listStr.push(item)
                }
                return listStr
            },
            refresh: function() {
                return  this.$store.state.dataConfig.getModulelist.refresh
            }
        },
        watch: {
            '$route'(to,from) {
                let refreshed = this.$store.state.dataConfig.getModulelist.refresh
                if(!refreshed){
                    this.getBookStoreversionList()
                    this.getModuleList()
                }
            },
            sessionKey: function(val,odlVal) {
                if (val === 2) {
                    alert("session过期")
                    this.$router.push(this.$route.query.redirect || '/')
                }
            }
        }
    }
</script>

<style  lang="less">
    .table_container{
        padding: 20px;
        td .cell{
            text-align: center;
            height: 40px;
            line-height: 40px;
            p{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 100%;
            }
        }
        .buttonAdd{
            margin-bottom: 10px;
        }
    }
    .bookStoreList {
        .table_container{
            .el-button--primary{
                vertical-align: middle;
            }
        }
    }
    .bookStoreList .el-dialog--small{
        width: 100%;
    }
    .bookStoreList .el-dialog {
        top: 0 !important;
    }
    .moduleAdd{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        z-index: 111;
        .moduleFrom{
            width: 100%;
            height: 100%;
            background: #e0e0e0;
            .el-input{
                width: 200px;
            }
            .el-form-item__label{
                text-align: left;
            }
            .foot{
                padding: 20px;
                margin: 1%;
                box-sizing: border-box;
                overflow: hidden;
                width: 48%;
                border: 1px solid #e0e0e0;
                float: left;
                .el-form-item{
                    float: left;
                    margin-right: 50px;
                }
            }
            .image{
                padding: 20px;
                margin: 1%;
                box-sizing: border-box;
                overflow: hidden;
                width: 48%;
                border: 1px solid #e0e0e0;
                float: left;
                .el-form-item{
                    float: left;
                    margin-right: 60px;
                }
            }
        }

        .datePicker .el-input{
            width: 400px;
        }
    }
</style>
