<template>
    <div class="fillcontain">
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
            prop="ModuleTyp"
            label="模块类别"
            width="150">
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
        <div class="moduleAdd" v-if="showModuleAdd">
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
                        <el-form-item label="脚标点击操作码">
                            <el-select  v-model="FootClickType" placeholder="请选择脚标点击操作码" >
                                <el-option    v-for="item in ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="跳转业务主键ID" >
                            <el-input v-model="FootOperationId"></el-input>
                        </el-form-item>
                        <el-form-item label="点击脚标跳转的网页" >
                            <el-input v-model="FootToClickWebViewUrl"></el-input>
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
                           <th>描述</th>
                           <th>作者</th>
                           <th>标签</th>
                           <th>类别</th>
                           <th>点击操作编码</th>
                           <th>待跳转的书ID</th>
                           <th>主业务ID</th>
                           <th>跳转网页</th>
                           <th>排序</th>
                           <th>待跳转的段子</th>
                           <th>最小版本</th>
                           <th>操作</th>
                       </tr>
                       </thead>
                       <tbody id="tableBody">
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><el-button  type="button" @click="deleteTr($event)">删除</el-button></td>
                            </tr>
                       </tbody>
                   </table>
                       <el-button type="primary" @click="onSubmit">保存</el-button>
                   <el-button @click="back">取消</el-button>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {getAuthHeaders} from '../../router'
    export default {
        beforeMount() {
            this.getModuleList()
            this.getModuleClickTypeList()
        },
        data() {
            return {
                showModuleAdd: false,
                ModuleType: '',
                Notice: '',
                Title: '',
                IsHasFoot: '',
                SerialNumber: '',
                StoreVersion: '',
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
            }
        },
        components: {
            headTop,
        },
        created: function () {

        },
        methods: {
            toGetModule: function(Id) {
                this.$router.push('bookStoreList/getModule/'+Id)
            },
            getModuleList: function() {
                this.$store.dispatch('getModulelist', {payload:{page:{"PageIndex":"1","PageSize":"10"}}}).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            getModuleClickTypeList: function() {
                this.$store.dispatch('getModuleClickTypeList', {payload:{page:{"PageIndex":"1","PageSize":"10"}}}).then(
                    (response) => {

                    }
                )
            },
            handleCurrentChange(val) {
                this.$store.dispatch('getModulelist', {payload:{page:{"PageIndex":val,"PageSize":"10"}}}).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            handleCreate() {

            },
            handleAdd(index, row) {
                this.showModuleAdd = true
            },
            onSubmit() {
                var mytable = document.getElementById("mytable");
                console.log(mytable.rows.length)
                var tableData = [];
                for(var i=1,rows=mytable.rows.length; i<rows; i++){
                    for(var j=0,cells=mytable.rows[i].cells.length; j<cells; j++){
                        if(!tableData[i]){
                            tableData[i] = {};
                        }
                        tableData[i]= {
                            "IconUrl":mytable.rows[i].cells[0].innerHTML,
                            "Name":mytable.rows[i].cells[1].innerHTML,
                            "Summary":mytable.rows[i].cells[2].innerHTML,
                            "Author":mytable.rows[i].cells[3].innerHTML,
                            "Tag":mytable.rows[i].cells[4].innerHTML,
                            "Category":mytable.rows[i].cells[5].innerHTML,
                            "ClickType":mytable.rows[i].cells[6].innerHTML,
                            "BookId":mytable.rows[i].cells[7].innerHTML,
                            "OperationId":mytable.rows[i].cells[8].innerHTML,
                            "ClickWebViewUrl":mytable.rows[i].cells[8].innerHTML,
                            "SerialNumber":mytable.rows[i].cells[9].innerHTML,
                            "ShortBookId":mytable.rows[i].cells[10].innerHTML,
                             "MinVer":mytable.rows[i].cells[11].innerHTML
                        }
                    }
                }
                var data  = {
                    ModuleType: Number(this.ModuleType),
                    Notice:this.Notice,
                    Title: this.Title,
                    IsHasFoot: Boolean(this.IsHasFoot),
                    SerialNumber:Number(this.SerialNumber),
                    StoreVersion: Number(this.StoreVersion),
                    FootName: this.FootName,
                    FootClickType: this.FootClickType,
                    ImageUrl: this.ImageUrl,
                    ImageClickType: this.ImageClickType,
                    ImageToClickWebViewUrl: this.ImageToClickWebViewUrl,
                    ImageToBookId: this.ImageToBookId,
                    ImageOperationId: this. ImageOperationId,
                    detial:tableData.slice(1)
                }
                var payload = JSON.stringify(data)
                this.$store.dispatch('addModule', {data:payload}).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            back() {
                this.showModuleAdd = false
            },
            handleDelete(index, row) {
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$store.dispatch('delete', {payload:{sessionKey:localStorage.SessionKey,bookStoreModuleId:row.Id}}).then(
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
                var tbody = document.querySelector("#tableBody")
                var str = "<tr >"+
                    "</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+
                "<td>"+"<button  @click='deleteTr($event)'>删除</button>"+"</td>"+"</tr>"
                var tr = document.createElement("tr")
                tr.innerHTML = str
                tbody.appendChild(tr)
            },
            deleteTr(e) {
                e.currentTarget.parentNode.parentNode.remove()
            }
        },
        computed: {
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
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
        .buttonAdd{
            margin-bottom: 10px;


        }
    }
    .moduleAdd{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        z-index: 111;
        .moduleFrom{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            margin: auto;
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
            border-right:1px solid #F00;
            border-bottom:1px solid #F00;
            box-sizing: border-box;
        }
        table td{
            border-left: 1px solid #F00;
            border-top: 1px solid #F00;
        }
        table tr{
            text-align: center;
            height: 30px;
        }
        th{
            border-left: 1px solid #F00;
            border-top: 1px solid #F00;
        }
    }
</style>
