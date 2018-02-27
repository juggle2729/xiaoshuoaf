<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
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
                    label="顺序">
                    <template  slot-scope=" scope">
                        <span>{{scope.row.Order}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="封面">
                    <template  slot-scope=" scope">
                        <img :src="scope.row.CoverUrl" alt="" style="width: 100px;height: 50px;">
                    </template>
                </el-table-column>
                <el-table-column
                    label="标签">
                    <template  slot-scope=" scope">
                        <span>{{scope.row.Tag}}</span>
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
            <el-dialog title="点趣分类列表编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form" label-width="130px" :label-position="labelPosition" style="padding-left:20px">
                    <el-form-item label="ID">
                        <el-input v-model="changeList.ID"></el-input>
                    </el-form-item>
                    <el-form-item label="书名">
                        <el-input v-model="changeList.Name"></el-input>
                    </el-form-item>
                    <el-form-item label="顺序">
                        <el-input v-model="changeList.Order"></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <img :src="changeList.CoverUrl" alt="" width="100px" height="50px">
                        <el-upload
                            class="upload-demo"
                            :action="uploadUrl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :file-list="fileList"
                            style="margin-top: 10px">
                            <el-button size="small" type="primary" @click="changeImg(scope.$index,scope.row)">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-select  placeholder="请选择分类标签">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
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
        data() {
            return {
                tableData: [{
                    ID:1,
                    Name: '热门推荐',
                    Order:1,
                    CoverUrl:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
                    Tag: '连载'
                }, {
                    ID:2,
                    Name: '精品榜单',
                    Order:2,
                    CoverUrl:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
                    Tag: '连载'
                }, {
                    ID:3,
                    Name: '热门推荐',
                    Order:3,
                    CoverUrl:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
                    Tag: '连载'
                }, {
                    ID:4,
                    Name: '精品榜单',
                    Order:4,
                    CoverUrl:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
                    Tag: '连载'
                }],
                changeList:'',
                labelPosition:'left',
                dialogFormVisible:false,
                uploadUrl: 'http://47.52.25.158:9002/api/commons/common/upload?sessionKey='+localStorage.SessionKey,
            }
        },
        components: {
            headTop,
        },
        methods: {
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
        },
        computed: {
            sessionKey: function() {

            },

        },
        watch: {
//            sessionKey: function(val,odlVal) {
//                if (val === 2) {
//                    alert("session过期")
//                    this.$router.push(this.$route.query.redirect || '/')
//                }
//            }
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
