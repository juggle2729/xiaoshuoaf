<template>
    <div class="fillcontain ">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="bookStoreversionList"
                border
                style="width: 100%" >
                <el-table-column
                    prop="Id"
                    label="Id"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="Code"
                    label="Tab编码">
                </el-table-column>
                <el-table-column
                    prop="Description"
                    label="描述">
                </el-table-column>
                <el-table-column
                    prop="SerialNumber"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="IsEnable"
                    label="是否可用">
                </el-table-column>
                <el-table-column
                    prop="StoreVersion"
                    label="配置书城Id编号">
                </el-table-column>
                <el-table-column
                    prop="MinVer"
                    label="适用最小版本号">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handleAddTab(scope.$index, scope.row)">新增</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-left: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="RecordCount">
            </el-pagination>
        </div>
        <el-dialog title="Tab配置" :visible.sync="dialogFormVisible" class="tab">
            <div v-if="showTabDetail">
                <el-form :model="form" label-width="130px" :label-position="labelPosition" style="padding-left:20px">
                    <el-form-item label="ID">
                        <el-input v-model="changeList.Id" ref="Id" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="是否可用">
                        <el-select placeholder="是否可用" v-model="changeList.IsEnable" ref="IsEnable">
                            <el-option label="是" value="true"></el-option>
                            <el-option label="否" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Tab编号">
                        <el-input v-model="changeList.Code" ref="Code" style="width: 200px"></el-input>
                    </el-form-item>
                     <el-form-item label="描述">
                         <el-input v-model="changeList.Description" ref="Description" style="width: 200px"></el-input>
                      </el-form-item>
                    <el-form-item label="序号">
                        <el-input v-model="changeList.SerialNumber" ref="SerialNumber" style="width: 200px"></el-input>
                    </el-form-item>
                     <el-form-item label="配置书城Id编号">
                        <el-input v-model="changeList.StoreVersion" ref="StoreVersion" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="Tab类型">
                        <el-select placeholder="Tab类型" v-model="TabType" ref="TabType">
                            <el-option label="Tab页签" value="1"></el-option>
                            <el-option label="二级页面" value="2"></el-option>
                            <el-option label="书城内导航(男频、女频)" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="适用最小版本号">
                        <el-input v-model="changeList.MinVer" ref="MinVer" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="showTabAdd">
                <el-form :model="form" label-width="130px" :label-position="labelPosition" style="padding-left:20px">
                    <el-form-item label="Tab编号">
                        <el-input  v-model="StoreVersionAdd" ref="StoreVersionAdd" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input  v-model="DescriptionAdd" ref="DescriptionAdd" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="序号">
                        <el-input v-model="SerialNumberAdd" ref="SerialNumberAdd" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="配置书城Id编号">
                        <el-input  v-model="CodeAdd" ref="CodeAdd" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="是否可用">
                        <el-select   v-model="IsEnableAdd" placeholder="是否可用"  ref="IsEnableAdd">
                            <el-option label="true" value="true"></el-option>
                            <el-option label="false" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Tab类型">
                        <el-select placeholder="Tab类型"  v-model="TabTypeAdd" ref="TabTypeAdd">
                            <el-option label="Tab页签" value="1"></el-option>
                            <el-option label="二级页面" value="2"></el-option>
                            <el-option label="书城内导航(男频、女频)" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="适用最小版本号">
                        <el-input  v-model="MinVerAdd" ref="MinVerAdd" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitTab">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
            this.getBookStoreversionList()
        },
        data() {
            return {
                isPay:{isPay:'1'},
                dialogFormVisible:false,
                showTabDetail: false,
                showTabAdd: false,
                CodeAdd:'',
                DescriptionAdd:'',
                SerialNumberAdd:'',
                IsEnableAdd:'',
                StoreVersionAdd:'',
                TabTypeAdd:'',
                MinVerAdd:'',
                TabType:''
            }
        },
        components: {
            headTop,
        },
        created: function () {

        },
        destroyed: function () {

        },
        methods: {
            getBookStoreversionList() {
                this.$store.dispatch('getBookStoreversionList', {
                    page: {"PageIndex": "1", "PageSize": "100"}
                })
            },
            handleCurrentChange (val) {
                this.$store.dispatch('getBookStoreversionList', {
                    page: {"PageIndex": val, "PageSize": "100"}
                })
            },
            handleEdit(index,row) {
                console.log(row)
                this.showTabDetail = true
                this.showTabAdd = false
                this.changeList = row
                this.dialogFormVisible = true
                setTimeout(function(){
                    if(row.TabType === 0){
                        this.TabType= "Tab页签"
                    }
                    if(row.TabType === 1){
                        this.TabType= "二级页面"
                    }
                    if(row.TabType === 2){
                        this.TabType= "书城内导航(男频、女频)"
                    }
                },100)
            },
            handleAddTab(index,row) {
                this.showTabAdd = true
                this.showTabDetail = false
                this.dialogFormVisible = true
                this.changeList = ''
            },
            onSubmitTab() {
                this.dialogFormVisible = false
                let that = this
                if(this.showTabDetail ) {
                    let data = {
                        Id: this.$refs.Id.value,
                        Code: this.$refs.Code.value,
                        Description: this.$refs.Description.value,
                        SerialNumber: this.$refs.SerialNumber.value,
                        IsEnable: this.$refs.IsEnable.value,
                        StoreVersion: this.$refs.StoreVersion.value,
                        TabType:this.$refs.TabType.value,
                        MinVer: this.$refs.MinVer.value
                    }
                    this.$store.dispatch('upDateTab', {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data:data
                    }).then(
                        (response) => {
                            setTimeout(function(){
                                that.getBookStoreversionList()
                                this.$message.success('编辑成功');
                            },1000)
                        }
                    ).catch(

                    )
                } else{
                    let dataAdd = {
                        Code: this.$refs.CodeAdd.value,
                        Description: this.$refs.DescriptionAdd.value,
                        SerialNumber: this.$refs.SerialNumberAdd.value,
                        IsEnable: this.$refs.IsEnableAdd.value,
                        StoreVersion: this.$refs.StoreVersionAdd.value,
                        TabType:this.$refs.TabTypeAdd.value,
                        MinVer: this.$refs.MinVerAdd.value
                    }
                    console.log("*************")
                    console.log(dataAdd)
                    this.$store.dispatch('addTab', {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data:dataAdd
                    }).then(
                        (response) => {
                            setTimeout(function(){
                                that.getBookStoreversionList()
                                this.$message.success('添加成功');
                            },1000)

                        }
                    ).catch(

                    )
                }

            },
            handleDelete(index, row) {
                let that = this
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$store.dispatch('deleteTab', {payload:{sessionKey:localStorage.SessionKey,isPay:1,tabId:row.Id}}).then(
                        (response) => {
                            setTimeout(function(){
                                that.getBookStoreversionList()
                                this.$message.success('删除成功');
                            },1000)
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

        },
        computed: {
            sessionKey: function () {
                return this.$store.state.dataConfig.getModulelist.sessionKey
            },
            bookStoreversionList: function() {
                return  this.$store.state.dataConfig.getBookStoreversionList.list
            },
            RecordCount: function() {
                return  this.$store.state.dataConfig.getBookStoreversionList.RecordCount
            },
        },
        watch: {
            '$route'(to, from) {
                this.getBookStoreversionList()
            },
            sessionKey: function (val, odlVal) {
                if (val === 2) {
                    alert("session过期")
                    this.$router.push(this.$route.query.redirect || '/')
                }
            }
        }
    }
</script>

<style  lang="less">
    .table_container {
        padding: 20px;
    }
</style>

