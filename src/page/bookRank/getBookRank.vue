<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container bookranking">
            <el-table
                :data="getBookRankingList"
                border
                @row-dblclick='handleRowHandle'
                style="width: 100%">
                <el-table-column
                    label="ID"
                    width="100">
                    <template  slot-scope="scope">
                        <span>{{scope.row.Id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="名称">
                    <template  slot-scope="scope">
                        <span>{{scope.row.Name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="封面">
                    <template  slot-scope="scope">
                        <img :src="scope.row.IconUrl"  style="width: 100px;height: 50px;display: block;z-index: 10000">
                    </template>
                </el-table-column>
                <el-table-column
                    label="顺序">
                    <template  slot-scope="scope">
                        <span>{{scope.row.SerialNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="榜单分组">
                    <template  slot-scope="scope">
                        <span>{{scope.row.GroupName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否显示为完结页列表">
                    <template  slot-scope="scope">
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
            <div class="block bookranklistpag">
                <el-pagination
                    @current-change="handleCurrentChangeBookRankList"
                    layout="total, prev, pager, next"
                    :total="BookRankListRecordCount">
                </el-pagination>
            </div>
            <el-dialog title="排行榜" :visible.sync="dialogFormVisible">
                <div v-if="showBookRankDetail">
                    <el-form :model="form" label-width="130px" :label-position="labelPosition" style="padding-left:20px">
                        <el-form-item label="名称">
                            <el-input ref="Name"></el-input>
                        </el-form-item>
                        <el-form-item label="ID">
                            <el-input v-model="changeList.Id" ref="Id"></el-input>
                        </el-form-item>
                        <el-form-item label="是否显示完结页">
                            <el-select placeholder="是否可见" v-model="changeList.IsShowEndPage" ref="IsShowEndPage">
                                <el-option label="是" value="true"></el-option>
                                <el-option label="否" value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="榜单分组排序">
                            <el-input v-model="changeList.SerialNumber" ref="SerialNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="榜单图片">
                            <img :src="changeList.IconUrl" alt=""  ref="imgUrl" style="width: 100px;height: 50px;display: block">
                            <from>
                                <el-upload
                                    class="upload-demo"
                                    :action="uploadUrl"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    :file-list="fileList"
                                    style="margin-top: 10px">
                                    <el-button size="small" type="primary" @click="">点击上传</el-button>
                                </el-upload>
                            </from>
                        </el-form-item>
                    </el-form>
                    <div>排行榜对应书籍</div>
                    <div class="bookRankDetail" >
                        <el-table
                            :data=" getBookRankingListId"
                            border
                            highlight-current-row
                            max-width="100%">
                            <el-table-column
                                label="ID">
                                <template scope=" scope">
                                    <el-input v-model="scope.row.Id" style="width:100%" ref="bookRankDetailId"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="图书ID">
                                <template scope=" scope">
                                    <el-input v-model="scope.row.BookId" style="width:100%" ref="bookRankDetailBookId"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="名称">
                                <template scope=" scope">
                                    <el-input v-model="scope.row.Name" style="width:100%" ref="bookRankDetailName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="作者">
                                <template scope=" scope">
                                    <el-input v-model="scope.row.Author" style="width:100%" ref="bookRankDetailAuthor"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="顺序">
                                <template scope=" scope">
                                    <el-input v-model="scope.row.SerialNumber" style="width:100%" ref="bookRankDetailSerialNumber"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block bookranklistpag">
                            <el-pagination
                                @current-change="handleCurrentChangeBookRankListId"
                                layout="total, prev, pager, next"
                                :total="BookRankListIdRecordCount">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div v-if="showbookRankAdd">
                    <el-form :model="form" label-width="130px" :label-position="labelPosition" style="padding-left:20px">
                        <el-form-item label="名称">
                            <el-input ref="NameAdd"></el-input>
                        </el-form-item>
                        <el-form-item label="ID">
                            <el-input ref="IdAdd"></el-input>
                        </el-form-item>
                        <el-form-item label="是否显示完结页">
                            <el-select placeholder="是否可见"  ref="IsShowEndPageAdd">
                                <el-option label="是" value="true"></el-option>
                                <el-option label="否" value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="榜单分组排序">
                            <el-input ref="SerialNumberAdd"></el-input>
                        </el-form-item>
                        <el-form-item label="榜单图片">
                            <img  alt=""  ref="imgUrlAdd" style="width: 100px;height: 50px;display: block">
                            <from>
                                <el-upload
                                    class="upload-demo"
                                    :action="uploadUrl"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    :file-list="fileList"
                                    style="margin-top: 10px">
                                    <el-button size="small" type="primary" @click="">点击上传</el-button>
                                </el-upload>
                            </from>
                        </el-form-item>
                    </el-form>
                    <div>排行榜对应书籍</div>
                    <div class="bookRankAdd" style="width: 100%;overflow-x: scroll" >
                        <div>
                            <el-button style="float: right" @click="addtr">新增</el-button>
                        </div>
                        <table width="100%"  cellspacing="0" cellpadding="0" contenteditable="true" id="mytable">
                            <thead>
                            <tr style="height: 40px">
                                <th style="display: none">ID</th>
                                <th>图书Id</th>
                                <th>名称</th>
                                <th>作者</th>
                                <th>顺序</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody id="tableBody">
                            <tr v-for="(item,index) in  AddTableData">
                                <td style="display: none">{{item.Id}}</td>
                                <td @dblclick="toBookListRank(index)">{{item.BookId}}</td>
                                <td>{{item.Name}}</td>
                                <td>{{item.Author}}</td>
                                <td>{{item.SerialNumber}}</td>
                                <td><el-button  type="button" @click="deleteTr($event)">删除</el-button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmitBookRanking">确 定</el-button>
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
                showBookRankDetail: false,
                showbookRankAdd:false,
                changeList:'',
                id:'',
                fileList: [],
                uploadUrl: 'http://192.168.0.72:8022/api/commons/common/upload?sessionKey='+localStorage.SessionKey,
            }
        },
        components: {
            headTop,
        },
        created() {

        },
        methods: {
            getBookRanking() {
                this.$store.dispatch('getBookRankingList', {page:{"PageIndex":"1","PageSize":"10"},params:{sessionKey:localStorage.SessionKey,isPay:'1'}}).then(
                    response => {

                    }
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
            },
            handleEdit(index,row) {
                console.log(row)
                this.showBookRankDetail = true
                this.showbookRankAdd = false
                this.changeList = row
                this.dialogFormVisible = true
                this.id = row.Id
                this.$store.dispatch('getBookRankingListId',{
                    PageIndex:1,
                    PageSize:10,
                    sessionKey:localStorage.SessionKey,
                    isPay:'1',
                    bookRankingTypeId: this.id
                }).then(
                    response => {

                    }
                )
            },
            handleAdd(index,row) {
                this.showbookRankAdd = true
                this.showBookRankDetail = false
                this.dialogFormVisible = true
                this.changeList = ''
            },
            toBookListRank(index){
                this.$store.state.dataConfig.getBookList.bookRanked = true
                this.$store.state.dataConfig.getBookRankingListId.index = index
                this.$router.push(this.$route.query.redirect || '/bookList')
            },
            addtr() {
                var tableItem = {
                    Author:"",
                    BookId:"",
                    Id:"",
                    Name:"",
                    SerialNumber:""
                }
                this.AddTableData.push(tableItem)
            },
            deleteTr(e) {
                e.currentTarget.parentNode.parentNode.remove()
            },
            handleCurrentChangeBookRankList(val){
                this.$store.dispatch('getBookRankingList', {page:{"PageIndex":val,"PageSize":"10"},params:{sessionKey:localStorage.SessionKey,isPay:'1'}}).then(
                    response => {

                    }
                )
            },
            handleCurrentChangeBookRankListId(val){
                this.$store.dispatch('getBookRankingListId', {
                    PageIndex:val,
                    PageSize:10,
                    sessionKey:localStorage.SessionKey,
                    isPay:'1',
                    bookRankingTypeId: this.id
                }).then(
                    (response) => {

                    }
                ).catch(

                )
            },
            handleSuccess(response,file,fileList) {
                console.log(132456)
                console.log(response.dt[0].FileUrl)
                if(this.showBookRankDetail){
                    this.changeList.IconUrl = response.dt[0].FileUrl
                } else{
                    this.$refs.imgUrlAdd.src = response.dt[0].FileUrl
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
                    this.$store.dispatch('deleteBookRanking', {payload:{sessionKey:localStorage.SessionKey,isPay:1,bookRankingTypeId:row.Id}}).then(
                        (response) => {
                            setTimeout(function(){
                                that.getBookRanking()
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
            onSubmitBookRanking(){
                this.dialogFormVisible = false
                if(this.showBookRankDetail){
                    let that = this
                    var bookList = []
                    setTimeout(function(){
                        console.log(that.getBookRankingListId)
                        let list = that.getBookRankingListId
                        for(let i=0;i<list.length;i++){
                            let item = {
                                "BookId": list[i].BookId,
                                "SerialNumber": list[i].SerialNumber
                            }
                            bookList.push(item)
                        }
                    },500)
                    let data = {
                        Id: this.$refs.Id.value,
                        Name: this.$refs.Name.value,
                        SerialNumber: this.$refs.SerialNumber.value,
                        IconUrl: this.$refs.imgUrl.src,
                        IsShowEndPage: this.$refs.IsShowEndPage.value,
                        BookList: bookList
                    }
                    console.log(data)
                    this.$store.dispatch('upDateBookRanking', {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data:data
                    }).then(
                        (response) => {
                            setTimeout(function(){
                                that.getBookRanking()
                                this.$message.success('修改成功');
                            },1000)
                        }
                    ).catch(

                    )
                } else{
                    let that = this
                    var mytable = document.querySelector("#mytable");
                    console.log(mytable.rows.length)
                    var tableData = [];
                    for(var i=1,rows=mytable.rows.length; i<rows; i++){
                        for(var j=0,cells=mytable.rows[i].cells.length; j<cells; j++){
                            if(!tableData[i]){
                                tableData[i] = {};
                            }
                            tableData[i]= {
                                "BookId":mytable.rows[i].cells[1].innerText,
                                "SerialNumber":mytable.rows[i].cells[4].innerText,
                            }
                        }
                    }
                    let dataAdd = {
                        Name: this.$refs.NameAdd.value,
                        SerialNumber: this.$refs.SerialNumberAdd.value,
                        IconUrl: this.$refs.imgUrlAdd.src,
                        IsShowEndPage: this.$refs.IsShowEndPageAdd.value,
                        BookList: tableData.slice(1)
                    }
                    console.log(dataAdd)
                    this.$store.dispatch('addBookRanking', {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data:dataAdd
                    }).then(
                        (response) => {
                            setTimeout(function(){
                                that.getBookRanking()
                                this.$message.success('删除成功');
                            },1000)
                        }
                    ).catch(

                    )
                }
            }
        },
        computed: {
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
            },
            getBookRankingList: function() {
                return  this.$store.state.dataConfig.getBookRankingList.list
            },
            BookRankListRecordCount: function() {
                return  this.$store.state.dataConfig.getBookRankingList.RecordCount
            },
            BookRankListPageCount: function() {
                return  this.$store.state.dataConfig.getBookRankingList.PageCount
            },
            getBookRankingListId: function() {
                return  this.$store.state.dataConfig.getBookRankingListId.list
            },
            BookRankListIdRecordCount: function() {
                return  this.$store.state.dataConfig.getBookRankingListId.RecordCount
            },
            BookRankListIdPageCount: function() {
                return  this.$store.state.dataConfig.getBookRankingListId.PageCount
            },
            AddTableData: function() {
                return  this.$store.state.dataConfig.getBookRankingListId.AddTableData
            }
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
        .bookranklistpag{
            margin: 10px -10px;
        }
        .bookRankDetail{
            .cell{
                box-sizing: border-box;
            }
             .el-table__row .el-input input {
                border: none;
                padding: 0;
                text-align: center;
            }
        }
        .bookRankAdd{
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
        }

    }
</style>
