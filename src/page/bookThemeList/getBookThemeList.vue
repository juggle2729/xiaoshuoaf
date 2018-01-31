<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container bookthemelist ">
            <div>
                    <el-table
                        :data="bookThemeList"
                        border
                        @row-dblclick='handleRowHandle'
                        style="width: 100%">
                        <el-table-column
                            label="Id"
                            width="80">
                            <template scope=" scope">
                                <p >{{scope.row.Id}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="Name"
                            label="名称"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            label="头像" width="100">
                            <template scope=" scope">
                                <img :src="scope.row.IconUrl" style="width: 70px;height: 100px;margin: 5px auto" alt="" >
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="图标" width="100">
                            <template scope=" scope">
                                <img :src="scope.row.ImageUrl" style="width: 70px;height: 100px;margin: 5px auto" alt="" >
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="Recommended"
                            label="推荐语">
                        </el-table-column>
                        <el-table-column
                            prop="Summary"
                            label="描述">
                        </el-table-column>
                        <el-table-column
                            prop="BeginDate"
                            label="起始时间">
                        </el-table-column>
                        <el-table-column
                            prop="EndDate"
                            label="截止时间">
                        </el-table-column>
                        <el-table-column
                            prop="SerialNumber"
                            label="连载数"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="IsEnableName"
                            label="是否推荐">
                        </el-table-column>
                    </el-table>
                </div>
            <div class="block booklistpag">
                <el-pagination
                    @current-change="handleCurrentChangeBookThemeList"
                       layout="total, prev, pager, next"
                    :total="BookThemeListRecordCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
            this.getBookThemeList()
        },
        data() {
            return {

            }
        },
        components: {
            headTop,
        },
        created() {

        },
        methods: {
            getBookThemeList() {
                this.$store.dispatch('getBookThemeList', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            handleCurrentChangeBookThemeList(val) {
                this.$store.dispatch('getBookThemeList', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {
                    }
                ).catch(

                )
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
                        alert(1111)
                        this.getModulePage()
                        this.$nextTick(function() {
                            this.$store.state.dataConfig.getModuleDetailList.list[index].OperationId = row.Id
                            this.$store.state.dataConfig.getModuleDetailList.list[index].BookName = ''
                            this.$store.state.dataConfig.getModuleDetailList.list[index].BookId = ''
                            this.$store.state.dataConfig.getModuleDetailList.list[index].ClickWebViewUrl = ''
                        })
                    } else{
                        this.$store.state.dataConfig.getModule.list.FootOperationId = row.Id
                        this.$store.state.dataConfig.getModule.FootToBookName = row.Name
                        this.getModulePage()
                    }
                }
            }
        },
        computed: {
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
            },
            bookThemeList: function() {
                return  this.$store.state.dataConfig.getBookThemeList.list
            },
            BookThemeListRecordCount: function() {
                return  this.$store.state.dataConfig.getBookThemeList.RecordCount
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
        .bookthemelist .el-table__body-wrapper .cell{
            text-align: center;
        }
    }
</style>
