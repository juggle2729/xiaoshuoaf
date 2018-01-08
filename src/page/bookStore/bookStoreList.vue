<template>
    <div class="fillcontain bookStoreList">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                border
                style="width: 100%" >
                <el-table-column
                    label="Id"
                    width="80">
                    <template scope=" scope">
                        <p @dblclick="toGetModule(scope.row.Id)">{{scope.row.Id}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ModuleType"
                    label="模块类别">
                </el-table-column>
                <el-table-column
                    prop="ModuleDescription"
                    label="模块详细描述"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="StoreVersionName"
                    label="模块配置归属名称">
                </el-table-column>
                <el-table-column
                    prop="StoreVersion"
                    label="版本号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="SerialNumber"
                    label="连载数"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="起始时间">
                    <template scope="scope">
                        <p>{{scope.row.BeginDate}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="结束时间">
                    <template scope="scope">
                        <p>{{scope.row.EndDate}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="IsPreview"
                    label="是否预览">
                </el-table-column>
                <el-table-column
                    prop="Title"
                    label="模块标题">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleAdd(scope.$index, scope.row)">新增</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                            <el-form-item label="模块类型编号" >
                                <el-input v-model="ModuleType"></el-input>
                            </el-form-item>
                            <el-form-item label="滚动通知左边标题" >
                                <el-input v-model="Notice"></el-input>
                            </el-form-item>
                            <el-form-item label="模块标题" >
                                <el-input v-model="Title"></el-input>
                            </el-form-item>
                            <el-form-item label="是否预览" >
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
                                <el-select  v-model="StoreVersion" placeholder="请选择配置归属" >
                                    <el-option label="书城" value="1"></el-option>
                                    <el-option label="发现" value="2"></el-option>
                                </el-select>
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
                            <el-form-item label="起止时间"  class="datePicker">
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
                    <div class="detail" style="width: 100%;overflow-x: scroll">
                        <div>
                            <el-button style="float: right" @click="addtr">新增</el-button>
                        </div>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" contenteditable="true" id="mytable">
                            <thead>
                            <tr style="height: 40px">
                                <th>图片</th>
                                <th>名称</th>
                                <th>描述</th>
                                <th>作者</th>
                                <th>标签</th>
                                <th>类别</th>
                                <th>点击操作编码</th>
                                <th>待跳转的书ID</th>
                                <th>主业务ID</th>
                                <th>跳转网页</th>
                                <th>排序</th>
                                <th>最小版本</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody id="tableBody">
                            <tr v-for="(item,index) in  AddTableData">
                                <td style="width: 200px">
                                    <img  :src=item.IconUrl alt="" class="iconUrl" ref="imgDetail" width="80px" height="40px">
                                    <from>
                                        <el-upload
                                            class="upload-demo"
                                            :action="uploadUrl"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleSuccess"
                                            :file-list="fileList"
                                            style="margin-top: 10px;float: right">
                                            <el-button size="small" type="primary" @click="changeImgAdd(index)">点击上传</el-button>
                                        </el-upload>
                                    </from>
                                </td>
                                <td>{{item.Name}}</td>
                                <td>{{item.Summary}}</td>
                                <td>{{item.Author}}</td>
                                <td>{{item.Tag}}</td>
                                <td>{{item.Category}}</td>
                                <td>{{item.ClickType}}</td>
                                <td>{{item.BookId}}</td>
                                <td>{{item.OperationId}}</td>
                                <td>{{item.ClickWebViewUrl}}</td>
                                <td>{{item.SerialNumber}}</td>
                                <td>{{item.MinVer}}</td>
                                <td><el-button  type="button" @click="deleteTr($event)">删除</el-button></td>
                            </tr>
                            </tbody>
                        </table>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <el-button @click="back">取消</el-button>
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

        },
        data() {
            return {
                dialogFormVisible:false,
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
                AddTableData:[
                    {
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
                ],
                isPay:{isPay:'1'},
                imgAddIndex:'',
                fileList: [],
                uploadUrl: 'http://192.168.0.72:8022/api/commons/common/upload?sessionKey='+localStorage.SessionKey,
            }
        },
        components: {
            headTop,
        },
        created: function () {
            this.getModuleList()
            this.getModuleTypeList(),
            this.getModuleClickTypeList()
            this.refresh()
        },
        destroyed: function(){

        },
        methods: {
            toGetModule: function(Id) {
                this.$store.state.dataConfig.getModulelist.refresh = false
                this.$router.push('bookStoreList/getModule/'+Id)
            },
            getModuleList: function() {
                this.$store.dispatch('getModulelist', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:this.isPay
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            getModuleTypeList() {
                this.$store.dispatch('getModuleTypeList', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {

                    }
                ).catch(

                )
            },
            getModuleClickTypeList: function() {
                this.$store.dispatch('getModuleClickTypeList', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {

                    }
                )
            },
            handleCurrentChange(val) {
                this.$store.dispatch('getModulelist', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    params:this.isPay
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            handleCreate() {

            },
            handleAdd(index, row) {
                this.dialogFormVisible = true
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
                var mytable = document.querySelector("#mytable");
                console.log(mytable.rows.length)
                var tableData = [];
                for(var i=1,rows=mytable.rows.length; i<rows; i++){
                    for(var j=0,cells=mytable.rows[i].cells.length; j<cells; j++){
                        if(!tableData[i]){
                            tableData[i] = {};
                        }
                        tableData[i]= {
                            "IconUrl":mytable.rows[i].cells[0].firstElementChild.getAttribute("src"),
                            "Name":mytable.rows[i].cells[1].innerText,
                            "Summary":mytable.rows[i].cells[2].innerText,
                            "Author":mytable.rows[i].cells[3].innerText,
                            "Tag":mytable.rows[i].cells[4].innerText,
                            "Category":mytable.rows[i].cells[5].innerText,
                            "ClickType":mytable.rows[i].cells[6].innerText,
                            "BookId":mytable.rows[i].cells[7].innerText.replace(/\n/g,''),
                            "OperationId":mytable.rows[i].cells[8].innerText.replace(/\n/g,''),
                            "ClickWebViewUrl":mytable.rows[i].cells[9].innerText.replace(/\n/g,''),
                            "SerialNumber":mytable.rows[i].cells[10].innerText.replace(/\n/g,''),
                            "MinVer":mytable.rows[i].cells[11].innerText.replace(/\n/g,'')
                        }
                    }
                }
                let d = new Date(this.dateAdd[0])
                let d1 = new Date(this.dateAdd[0])
                let BeginDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                let EndDate = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate() + ' ' + d1.getHours() + ':' + d1.getMinutes() + ':' + d1.getSeconds();
                let data  = {
                    ModuleType: this.ModuleType,
                    Notice:this.Notice,
                    Title: this.Title,
                    IsHasFoot: Boolean(this.IsHasFoot),
                    IsPreview:Boolean(this.IsPreview),
                    SerialNumber:this.SerialNumber,
                    StoreVersion: this.StoreVersion,
                    BeginDate:BeginDate,
                    EndDate:EndDate,
                    FootName: this.FootName,
                    FootClickType: this.FootClickType,
                    FootOperationId:this. FootOperationId,
                    FootToClickWebViewUrl:this.FootToClickWebViewUrl,
                    ImageUrl: this.ImageUrl,
                    ImageClickType: this.ImageClickType,
                    ImageToClickWebViewUrl: this.ImageToClickWebViewUrl,
                    ImageToBookId: this.ImageToBookId,
                    ImageOperationId: this.ImageOperationId,
                    detail:tableData.slice(1)
                }
                this.$store.dispatch('addModule', {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data:data
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            back() {
                this.dialogFormVisible = false
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
            }
        },
        computed: {
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
            },
            ModuleTypeList: function() {
                return  this.$store.state.dataConfig.getModuleTypeList.list
            },
            ModuleClickTypeList: function() {
                return  this.$store.state.dataConfig.getModuleClickTypeList.list
            },
            tableData: function() {
                return  this.$store.state.dataConfig.getModulelist.list
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
            ModuleClickTypeList: function() {
                return  this.$store.state.dataConfig.getModuleClickTypeList.list
            },

        },
        watch: {
            '$route'(to,from) {
                this.getModuleList(),
                this. getModuleTypeList(),
                    this.getModuleClickTypeList()
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
        .cell{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
            height: 40px;
            line-height: 40px;
        }
        .buttonAdd{
            margin-bottom: 10px;


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
        table{
            border-right:1px solid #868686;
            border-bottom:1px solid #868686;
            box-sizing: border-box;
        }
        table td{
            border-left: 1px solid #868686;
            border-top: 1px solid #868686;
            .el-upload{
                margin-right: 10px;
            }
        }
        table tr{
            text-align: center;
            height: 50px;
        }
        th{
            border-left: 1px solid #868686;
            border-top: 1px solid #868686;
        }
        .datePicker .el-input{
            width: 400px;
        }
    }
</style>
