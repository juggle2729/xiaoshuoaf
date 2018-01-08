<template>
    <div class="booklist table_container book">
        <head-top></head-top>
        <el-input @keyup.enter.native="getBookListSearch" style="width: 200px;" class="filter-item" placeholder="名字或者作者" v-model="nameOrAuthor">
        </el-input>
        <el-input @keyup.enter.native="getBookListSearch" style="width: 200px;" class="filter-item" placeholder="状态" v-model="isOnshelf" >
        </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="getBookListSearch">搜索</el-button>
        <div class="table_container">
            <el-table
                :data="bookList"
                border highlight-current-row
                @row-dblclick='handleRowHandle'
                style="width: 100%">
                <el-table-column
                    label="Id" width="60">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.Id}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="书名">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.Name}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="作者">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.Author}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="标签">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.Tag}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="描述"
                    width="180">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.Summary >{{scope.row.Summary}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="图片">
                    <template scope=" scope">
                        <img :src="scope.row.FrontImageFilename" alt="" class="FrontImageFilename">
                    </template>
                </el-table-column>
                <el-table-column
                    label="体积">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.VolumeCount}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="图书类型">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.BookType}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="章节价格">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.UnitPrice}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="VIP价格">
                    <template scope="scope">
                        <p style="width: 100%;height: 100%">{{scope.row.VipPrice}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="支付类型">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.PayType}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="免费时间"  width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.FreeBegin >{{scope.row.FreeBegin}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="免费截止时间" width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.FreeEnd >{{scope.row.FreeEnd}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态" width="60">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%"><span v-show="scope.row.Status == 'onshelf'">上架</span><span v-show="scope.row.Status != 'onshelf'">下架</span></p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="起始时间"  width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.Created >{{scope.row.Created}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="更新时间" width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.Updated >{{scope.row.Updated}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="书名起源">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" >{{scope.row.BookSourceName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block booklistpag">
            <el-pagination
                @current-change="handleCurrentChangeBookList"
                layout="total, prev, pager, next"
                :total="BookLostRecordCount">
            </el-pagination>
        </div>
        <el-dialog title="图书编辑" :visible.sync="dialogFormVisible">
            <el-form :model="BookListId" label-width="130px" :label-position="labelPosition" style="padding-left:20px">
                <el-form-item label="ID">
                    <el-input v-model="BookListId.Id"></el-input>
                </el-form-item>
                <el-form-item label="书名">
                    <el-input v-model="BookListId.Name"></el-input>
                </el-form-item>
                <el-form-item label="书作者">
                    <el-input v-model="BookListId.Author"></el-input>
                </el-form-item>
                <el-form-item label="书连载情况">
                    <el-select  v-model="BookListId.Tag"  ref="bookTag">
                        <el-option label="连载中" value="连载中"></el-option>
                        <el-option label="完结" value="完结"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="书简介">
                    <el-input type="textarea" v-model="BookListId.Summary"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-input v-model="BookListId.FrontImageFilename" :title=BookListId.FrontImageFilename></el-input>
                    <img src="" alt="">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :file-list="fileList"
                        style="margin-top: 10px">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="连载是否完结">
                    <el-select  v-model="BookListId.Tag"  ref="bookIsComplete">
                        <el-option label="连载中" value="false"></el-option>
                        <el-option label="完结" value="true"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否收费">
                    <el-select  v-model="IsCharged"  ref="IsCharged">
                        <el-option label="免费" value="0"></el-option>
                        <el-option label="收费" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收费起始章节">
                    <el-input v-model="BookListId.ChargedVolumeOrder"></el-input>
                </el-form-item>
                <el-form-item label="书分类">
                    <el-input v-model="BookListId.BookType"></el-input>
                </el-form-item>
                <el-form-item label="书分类ID">
                    <el-input v-model="BookListId.BookTypeId" ref="BookTypeId"></el-input>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="BookListId.KeyWord"></el-input>
                </el-form-item>
                <el-form-item label="书状态">
                    <el-select  v-model="BookListId.Status"  ref="bookStatus">
                        <el-option label="上架" value="onshelf"></el-option>
                        <el-option label="下架" value="revoked"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收费方式">
                    <el-select v-model="PayType" ref="PayType">
                        <el-option label="按本" value="0"></el-option>
                        <el-option label="按章" value="1"></el-option>
                        <el-option label="按千字" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="BookListId.KeyWord" ref="KeyWord"></el-input>
                </el-form-item>
                <el-form-item label="限免起止时间" >
                        <el-date-picker
                            v-model="date"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item label="普通单位价格">
                    <el-input v-model="BookListId.UnitPrice" ref="UnitPrice"></el-input>
                </el-form-item>
                <el-form-item label="VIP单位价格">
                    <el-input v-model="BookListId.VipPrice" ref="VipPrice"></el-input>
                </el-form-item>
                <el-form-item label="是否仅用充值币购买">
                    <el-input v-model="BookListId.IsBuyByRechargeCoin" ref="IsBuyByRechargeCoin"></el-input>
                </el-form-item>
                <el-form-item label="书评价条数">
                    <el-input v-model="BookListId.CommentCount" ref="CommentCount"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitBook">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import headTop from '../../components/headTop'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            headTop,
        },
        data() {
            return {
                isPay:{isPay:'1'},
                showWebView:true,
                nameOrAuthor:'',
                isOnshelf: 1,
                bookId:'',
                changeList:'',
                dialogFormVisible:false,
                fileList: [],
                date:'',
                IsCharged:'',
                PayType:'',
                uploadUrl: 'http://192.168.0.72:8022/api/commons/common/upload?sessionKey='+localStorage.SessionKey,
            }
        },
        created() {
            this.getBookList()
        },
        methods: {
            trim(str) {
                return str.replace(/(^\s+)|(\s+$)/g, "")
            },
            initDate() {
                let that = this
                setTimeout(function(){
                    console.log(that.BookListId)
                    var strTime1=that.BookListId.Created;
                    var strTime2=that.BookListId.Updated;
                    var BeginDate= new Date(Date.parse(strTime1.replace(/-/g,  "/")));
                    var EndDate= new Date(Date.parse(strTime2.replace(/-/g,  "/")));
                    that.date = [BeginDate,EndDate]
                },100)
            },
            getBookList() {
                let that = this
                this.$store.dispatch('getBookList', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {

                    }
                ).catch(

                )
            },
            getBookListSearch() {
                var data = {
                    nameOrAuthor: this.nameOrAuthor,
                    isOnshelf: this.isOnshelf,
                    isPay:'1'
                }
                this.$store.dispatch('getBookListSearch', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            getBookListIdSearch() {
                var data = {
                    bookId: this.bookId,
                    isPay:'1'
                }
                this.$store.dispatch('getBookListIdSearch', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                }).then(
                    (response) => {
                        this.initDate()
                    }
                ).catch(

                )
            },
            handleCurrentChangeBookList(val) {
                this.$store.dispatch('getBookList', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            handleSuccess(response,file,fileList) {
                console.log(response)
                this.BookListId.FrontImageFilename = response.dt[0].FileUrl
                let lists = document.querySelectorAll(".el-upload-list")
                for (let list of lists) {
                    list.style.display = "none"
                }
            },
            handleEdit(index,row) {
                let that = this
                this.dialogFormVisible = true
                this.bookId = row.Id
                this.getBookListIdSearch()
                if(that.BookListId.IsCharged == 0){
                    this.IsCharged = "免费"
                }
                if(that.BookListId.IsCharged == 1){
                    this.IsCharged = "收费"
                }
                if(that.BookListId.PayType === 0){
                    this.PayType = "按本"
                }
                if(that.BookListId.PayType === 1){
                    this.PayType = "按章"
                }
                if(that.BookListId.PayType === 2){
                    this.PayType = "按千字"
                }
            },
            onSubmitBook() {
                let formData = this.BookListId
                let data = {
                    Id: formData.Id,
                    Name: formData.Name,
                    Author: formData.Author,
                    Tag: this.$refs.bookTag.value,
                    Summary: formData.Summary,
                    FrontImageFilename: formData.FrontImageFilename,
                    IsComplete: this.$refs.bookIsComplete.value,
                    IsCharged: this.$refs.IsCharged.value,
                    ChargedVolumeOrder: formData.ChargedVolumeOrder,
                    BookType: formData.BookType,
                    BookTypeId: formData.BookTypeId,
                    KeyWord: formData.KeyWord,
                    Status: this.$refs.bookStatus.value,
                    PayType:this.$refs.PayType.value,
                    UnitPrice: formData.UnitPrice,
                    VipPrice: formData.VipPrice,
                    IsBuyByRechargeCoin: formData.IsBuyByRechargeCoin,
                    CommentCount: formData.CommentCount,
                }
                console.log(data)
                this.$store.dispatch('upDateBook', {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data:data
                }).then(
                    (response) => {
                        this.$message.success('修改成功');
                        this.dialogFormVisible = false
                        this.getBookList()
                    }
                ).catch(

                )
            },

            handleDelete(index, row) {
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$store.dispatch('deleteBook', {payload:{sessionKey:localStorage.SessionKey,bookId:row.Id,isPay:'1'}}).then(
                        (response) => {
                            this.$message.success('删除成功');
                            this.getBookList()
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleRowHandle(row,event) {
                this.$store.state.dataConfig.getModulelist.refresh = true
                let index =  this.$store.state.dataConfig.getModule.index
                let routeId = this.$store.getters.getModule.list.Id
                if (this.$store.state.dataConfig.getModule.flagImg){
                    this.$store.state.dataConfig.getModule.list.ImageToBookId = row.Id
                } else{
                    this.$nextTick(function() {
                        this.$store.state.dataConfig.getModuleDetailList.list[index].BookName = row.Name
                    })
                }
                this.$router.push(this.$route.query.redirect || '/bookStoreList/getModule/'+routeId)
            }
        },
        computed: {
            ...mapGetters([
                'list',
                'getModuleDetailList'
                // ...
            ]),
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
            },
            bookList: function() {
                return  this.$store.state.dataConfig.getBookList.list
            },
            BookLostRecordCount: function() {
                return  this.$store.state.dataConfig.getBookList.RecordCount
            },
            PageCount: function() {
                return  this.$store.state.dataConfig.getBookList.PageCount
            },
            BookListId: function() {
                return  this.$store.state.dataConfig.getBookListIdSearch.list
            }
        },
        watch: {
            '$route'(to,from) {

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
    .book{
        font-size: 12px !important;
    }
    .table_container{
        padding: 10px;
        .el-input{
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .el-textarea{
            width: 400px;
        }
        .el-button--primary{
            vertical-align: top;
        }
    }
    .booklistpag{
        margin: 10px 0px;
    }
    .booklist .el-table__body-wrapper .cell{
        height: 100px;
        line-height: 100px;
        padding: 0;
        box-sizing: content-box;
        p{

            word-wrap:break-word
        }
    }
    .FrontImageFilename{
        display: block;
        width: 50px;
        height: 70px;
        margin: 0 auto;
        margin-top: 15px;
    }
    .el-input input{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }

</style>
