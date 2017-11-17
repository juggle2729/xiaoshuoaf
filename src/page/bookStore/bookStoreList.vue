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
            prop="ModuleType"
            label="ModuleType"
            width="150">
        </el-table-column>
        <el-table-column
            prop="ModuleDescription"
            label="ModuleDescription"
            width="180">
        </el-table-column>
        <el-table-column
            prop="StoreVersionName"
            label="StoreVersionName">
        </el-table-column>
        <el-table-column
            prop="Title"
            label="Title">
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
               <div class="detail">
                   <el-table
                       border
                       style="width: 100%">
                       <el-table-column
                           label="日期"
                           width="180">
                       </el-table-column>
                       <el-table-column
                           label="姓名"
                           width="180">
                       </el-table-column>
                       <el-table-column
                           label="地址">
                       </el-table-column>
                   </el-table>
                   <el-form ref="form"  label-width="180px">
                       <el-form-item label="详细内容图片地址" >
                           <el-input v-model="IconUrl"></el-input>
                       </el-form-item>
                       <el-form-item label="详细内容名称" >
                           <el-input v-model="Name"></el-input>
                       </el-form-item>
                       <el-form-item label="详细内容描述" >
                           <el-input v-model="Summary"></el-input>
                       </el-form-item>
                       <el-form-item label="详细内容作者" >
                           <el-input v-model="Author"></el-input>
                       </el-form-item>
                       <el-form-item label="详细内容标签" >
                           <el-input v-model="Tag"></el-input>
                       </el-form-item>
                       <el-form-item label="详细内容类别" >
                           <el-input v-model="Category"></el-input>
                       </el-form-item>
                       <el-form-item label="详细内容点击操作码">
                           <el-select  v-model="ClickType" placeholder="请选择脚标点击操作码" >
                               <el-option    v-for="item in ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                           </el-select>
                       </el-form-item>
                       <el-form-item label="点击详细内容待跳转书籍ID" >
                           <el-input v-model="BookId"></el-input>
                       </el-form-item>
                       <el-form-item label="点击详细内容跳转业务主键ID" >
                           <el-input v-model="OperationId"></el-input>
                       </el-form-item>
                       <el-form-item label="点击详细内容跳转的网页" >
                           <el-input v-model="WebViewUrl"></el-input>
                       </el-form-item>
                       <el-form-item label="详细内容排序" >
                           <el-input v-model="SerialNumber"></el-input>
                       </el-form-item>
                       <el-form-item label="点击详细内容待跳转的段子" >
                           <el-input v-model="ShortBookId"></el-input>
                       </el-form-item>
                       <el-form-item label="详细内容支持的最小版本显示" >
                           <el-input v-model="MinVer"></el-input>
                       </el-form-item>

                   </el-form>
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
                MinVer: ''
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
                    detial:[{
                        IconUrl: this.IconUrl,
                        Name: this.Name,
                        Summary: this.Summary,
                        Author: this.Author,
                        Tag: this.Tag,
                        Category:this.Category,
                        ClickType: this.ClickType,
                        BookId: this.BookId,
                        OperationId: this. OperationId,
                        WebViewUrl: this.WebViewUrl,
                        SerialNumber: this.SerialNumber,
                        ShortBookId: this.ShortBookId,
                        MinVer: this.MinVer
                    }]
                }
                this.$store.dispatch('addModule', {data:data}).then(
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
            overflow:hidden ;

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
    }
</style>
