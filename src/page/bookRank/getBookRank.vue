<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="getBookRankingList"
                border
                style="width: 100%">
                <el-table-column
                    label="ID"
                    width="100">
                    <template  slot-scope=" scope">
                        <span>{{scope.row.ID}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="名称">
                    <template  slot-scope=" scope">
                        <span>{{scope.row.Name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="封面">
                    <template  slot-scope=" scope">
                        <img :src="scope.row.IconUrl" alt="" style="width: 100px;height: 50px;">
                    </template>
                </el-table-column>
                <el-table-column
                    label="顺序">
                    <template  slot-scope=" scope">
                        <span>{{scope.row.SerialNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="榜单分组">
                    <template  slot-scope=" scope">
                        <span>{{scope.row.GroupName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否显示为完结页列表">
                    <template  slot-scope=" scope">
                        <span>{{scope.row.IsShowEndPage}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="数量">
                    <template  slot-scope=" scope">
                        <span>{{scope.row.ListCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">新增</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="排行榜" :visible.sync="dialogFormVisible">
                <el-form :model="form" label-width="130px" :label-position="labelPosition" style="padding-left:20px">
                    <el-form-item label="名称">
                        <el-input v-model="changeList.Name"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示完结页">
                        <el-select placeholder="是否可见" v-model="changeList.IsShowEndPage">
                            <el-option label="是" value="true"></el-option>
                            <el-option label="否" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="榜单内容配置">

                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
            this.getBookRanking()
        },
        data() {
            return {
                dialogFormVisible:false,
                changeList:''
            }
        },
        components: {
            headTop,
        },
        created() {

        },
        methods: {
            getBookRanking() {
                this.$store.dispatch('getBookRanking', {page:{"PageIndex":"1","PageSize":"10"},params:{sessionKey:localStorage.SessionKey,isPay:'1'}}).then(
                    response => {

                    }
                )
            },
            handleEdit(index,row) {
                console.log(row)
                this.changeList = row
                this.dialogFormVisible = true
            },
            handleAdd(index,row) {
                this.dialogFormVisible = true
                this.changeList = ''
            },
            handleDelete(index, row) {
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$store.dispatch('delete', {payload:{sessionKey:localStorage.SessionKey,bookStoreModuleId:row.ID}}).then(
                        (response) => {
                            this.$message.success('删除成功');
                            this. getBookRanking()
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
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
            },
            getBookRankingList: function() {
                return  this.$store.state.dataConfig.getBookRanking.list
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
        .el-input{
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .el-textarea{
            width: 400px;
        }
    }
</style>
