<template>
    <div class="booklist  book">
        <head-top></head-top>
        <el-input @keyup.enter.native="getBookListSearch" style="width: 200px;margin-left: 20px" class="filter-item" placeholder="名字或者作者" v-model="nameOrAuthor">
        </el-input>
        <el-input @keyup.enter.native="getBookListSearch" style="width: 200px;" class="filter-item" placeholder="状态" v-model="isOnshelf" >
        </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="getBookListSearch">搜索</el-button>
        <div class="table_container">
            <el-table
                :data="bookList"
                border :highlight-current-row="true"
                @row-dblclick='handleRowHandle'>
                <el-table-column
                    label="书Id" width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.Id}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="书名">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.Name>{{scope.row.Name}}</p>
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
                    width="180"
                    class="bookListSummary">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.Summary >{{scope.row.Summary}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="封面">
                    <template slot-scope="scope">
                        <img :src="scope.row.FrontImageFilename" alt="" class="FrontImageFilename">
                    </template>
                </el-table-column>
                <el-table-column
                    label="章节数">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.VolumeCount}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="书类型">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.BookType}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否收费">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.IsCharged}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="收费起始章节">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.ChargedVolumeOrder}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="支付方式">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.PayType}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="限免起始时间"  width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.FreeBegin >{{scope.row.FreeBegin}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="限免截至时间" width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.FreeEnd >{{scope.row.FreeEnd}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="普通价格">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%">{{scope.row.UnitPrice}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="会员价格">
                    <template scope="scope">
                        <p style="width: 100%;height: 100%">{{scope.row.VipPrice}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="仅充值币购买">
                    <template scope="scope">
                        <p style="width: 100%;height: 100%">{{scope.row.IsBuyByRechargeCoin}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态" width="60">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%"><span v-show="scope.row.Status == 'onshelf'">上架</span><span v-show="scope.row.Status != 'onshelf'">下架</span></p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="生成时间"  width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.Created >{{scope.row.Created}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="最后修改时间" width="80">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" :title=scope.row.Updated >{{scope.row.Updated}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="书来源">
                    <template scope=" scope">
                        <p style="width: 100%;height: 100%" >{{scope.row.BookSourceName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
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
                :total="BookListRecordCount">
            </el-pagination>
        </div>
        <el-dialog title="图书编辑" :visible.sync="dialogFormVisible" class="bookedit">
            <el-form :model="BookListId" label-width="130px" :label-position="labelPosition" style="padding-left:20px">
                <el-form-item label="ID">
                    <el-input v-model="BookListId.Id" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="书名">
                    <el-input v-model="BookListId.Name"></el-input>
                </el-form-item>
                <el-form-item label="书作者">
                    <el-input v-model="BookListId.Author"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select  v-model="BookListId.Tag"  ref="bookTag">
                        <el-option label="连载中" value="连载中"></el-option>
                        <el-option label="完结" value="完结"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="书简介" style="width: 100%">
                    <el-input type="textarea" v-model="BookListId.Summary" ></el-input>
                </el-form-item>
                <el-form-item label="封面" style="width: 100%" >
                    <img :src="BookListId.FrontImageFilename" alt="" ref="bookEdit" style="width: 100px;height: 100px;">
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
                    <el-select  v-model="BookListId.IsComplete"  ref="bookIsComplete">
                        <el-option label="false" value="false"></el-option>
                        <el-option label="true" value="true"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否收费">
                    <el-select  v-model="IsCharged"  ref="IsCharged" @click="changeIsCharge">
                        <el-option label="免费" value="0"></el-option>
                        <el-option label="收费" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收费起始章节">
                    <el-input v-model="BookListId.ChargedVolumeOrder"></el-input>
                </el-form-item>
                <el-form-item label="书分类">
                     <el-select v-model="BookListId.BookType" placeholder="请选择模块类型" ref="BookTypeId" @visible-change="changeBookType" @change="changeBookTypeId">
                        <el-option  v-for="item in BookTypeList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                     </el-select>
                </el-form-item>
                <el-form-item label="书状态">
                    <el-select  v-model="BookListId.Status"  ref="bookStatus">
                        <el-option label="上架" value="onshelf"></el-option>
                        <el-option label="下架" value="revoked"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收费方式">
                    <el-select v-model="PayType" ref="PayType" @click="changePayType">
                        <el-option label="按本" value="0"></el-option>
                        <el-option label="按章" value="1"></el-option>
                        <el-option label="按千字" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="限免起止时间" >
                        <el-date-picker
                            v-model="date"
                            type="datetimerange"
                            :title="date"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="BookListId.KeyWord" ref="KeyWord"></el-input>
                </el-form-item>
                <el-form-item label="普通单位价格">
                    <el-input v-model="BookListId.UnitPrice" ref="UnitPrice"></el-input>
                </el-form-item>
                <el-form-item label="VIP单位价格">
                    <el-input v-model="BookListId.VipPrice" ref="VipPrice"></el-input>
                </el-form-item>
                <el-form-item label="是否仅用充值币购买">
                    <el-select  v-model="BookListId.IsBuyByRechargeCoin"  ref="IsBuyByRechargeCoin">
                        <el-option label="true" value="true"></el-option>
                        <el-option label="false" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="书评价条数">
                    <el-input v-model="BookListId.CommentCount" ref="CommentCount" :readonly="true"></el-input>
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
                bookEdit:'',
                changeList:'',
                dialogFormVisible:false,
                fileList: [],
                date:'',
                IsCharged:'',
                IsCharged1:'',
                changeIsCharged:false,
                PayType:'',
                PayType1:'',
                changePayTyped:false,
                BookTypeId:'',
                BookTypeId1:'',
                changeBookTyped:false,
                BookType1:'',
                uploadUrl: 'http://47.52.25.158:9002/api/commons/common/upload?sessionKey='+localStorage.SessionKey,
            }
        },
        created() {
            this.getBookList()
            this.getBookTypeList()
        },
        methods: {
            trim(str) {
                return str.replace(/(^\s+)|(\s+$)/g, "")
            },
            initDate() {
                let that = this
                setTimeout(function(){
                    console.log(that.BookListId)
                    let strTime1=that.BookListId.Created;
                    let strTime2=that.BookListId.Updated;
                    let BeginDate= new Date(Date.parse(strTime1.replace(/-/g,  "/")));
                    let EndDate= new Date(Date.parse(strTime2.replace(/-/g,  "/")));
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
            getBookTypeList(){
                this.$store.dispatch('getBookTypeList', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {

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
                this.$refs.bookEdit.src = response.dt[0].FileUrl
                let lists = document.querySelectorAll(".el-upload-list")
                for (let list of lists) {
                    list.style.display = "none"
                }
            },
            handleEdit(index,row) {
                let that = this
                this.changeIsCharged = false
                this.changePayTyped = false
                that.dialogFormVisible = true
                that.bookId = row.Id
                that.getBookListIdSearch()
                setTimeout(function(){
                    if(that.BookListId.IsCharged === 0){
                        that.IsCharged = "免费"
                    }
                    if(that.BookListId.IsCharged === 1){
                        that.IsCharged = "收费"
                    }
                    if(that.BookListId.PayType === 0){
                        that.PayType = "按本"
                    }
                    if(that.BookListId.PayType === 1){
                        that.PayType = "按章"
                    }
                    if(that.BookListId.PayType === 2){
                        that.PayType = "按千字"
                    }
                },100)
            },
            changeIsCharge() {
                this.changeIsCharged = true
            },
            changePayType() {
                this.changePayTyped = true
            },
            changeBookType() {
                this.changeBookTyped = true
            },
            changeBookTypeId(vId) {
                let obj = {};
                obj = this.BookTypeList.find((item)=>{
                    return item.Id === vId;
                });
                this.BookType1 = obj.Name
            },
            onSubmitBook() {
                let formData = this.BookListId
                console.log(this.changeBookTyped)
                if(!this.changeIsCharged) {
                    this.IsCharged1 = this.BookListId.IsCharged
                } else{
                    this.IsCharged1 = this.$refs.IsCharged.value
                }
                if(!this.changePayTyped) {
                    this.PayType1 = this.BookListId.PayType
                } else{
                    this.PayType1 = this.$refs.PayType.value
                }
                if(!this.changeBookTyped){
                    this.BookTypeId1 = this.BookListId.BookTypeId
                    this.BookType1 = this.BookListId.BookType
                } else {
                    this.BookTypeId1 =this.$refs.BookTypeId.value
                }
                let d = new Date(this.date[0])
                let d1 = new Date(this.date[1])
                let FreeBegin = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                let FreeEnd = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate() + ' ' + d1.getHours() + ':' + d1.getMinutes() + ':' + d1.getSeconds();
                let data = {
                    Id: formData.Id,
                    Name: formData.Name,
                    Author: formData.Author,
                    Tag: this.$refs.bookTag.value,
                    Summary: formData.Summary,
                    FrontImageFilename: this.$refs.bookEdit.src,
                    IsComplete: this.$refs.bookIsComplete.value,
                    IsCharged: this.IsCharged1,
                    ChargedVolumeOrder: formData.ChargedVolumeOrder,
                    BookTypeId: this.BookTypeId1,
                    BookType: this.BookType1,
                    KeyWord: formData.KeyWord,
                    Status: this.$refs.bookStatus.value,
                    PayType: this.PayType1,
                    FreeBegin:FreeBegin,
                    FreeEnd:FreeEnd,
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
            getModulePage(){
                let routeId = this.$store.getters.getModule.list.Id
                this.$router.push(this.$route.query.redirect || '/bookStoreList/getModule/'+routeId)
            },
            handleRowHandle(row,event) {
                this.$store.state.dataConfig.getModulelist.refresh = true
                if(this.$store.state.dataConfig.getBookList.bookRanked) {
                    let index = this.$store.state.dataConfig.getBookRankingListId.index
                    this.$store.state.dataConfig.getBookList.bookRanked = false
                    this.$store.state.dataConfig.getBookRankingListId.AddTableData[index].BookId = row.Id
                    this.$store.state.dataConfig.getBookRankingListId.AddTableData[index].Author = row.Author
                    this.$store.state.dataConfig.getBookRankingListId.AddTableData[index].Name = row.Name
                    this.$router.push(this.$route.query.redirect || '/bookranking')
                } else if(!this.$store.state.dataConfig.getModulelist.dialogFormVisibleModuleDetail){
                    let indexAdd =  this.$store.state.dataConfig.getModuleDetailList.index
                    if (this.$store.state.dataConfig.getModule.flagImg){
                        this.getModulePage()
                        this.$nextTick(function(){
                            this.$store.state.dataConfig.getModule.listAdd.ImageOperationIdAdd =  row.Id
                            this.$store.state.dataConfig.getModule.listAdd.ImageToBookNameAdd =  row.Name
                        })
                    } else if(this.$store.state.dataConfig.getModule.flagDetail){
                        let that = this
                        this.getModulePage()
                        this.$nextTick(function(){
                            that.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails[indexAdd].BookName = row.Name
                            that.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails[indexAdd].BookId = row.Id
                            that.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails[indexAdd].OperationId = ''
                            that.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails[indexAdd].ClickWebViewUrl = ''
                        })
                    } else{
                        this.getModulePage()
                        this.$nextTick(function(){
                            this.$store.state.dataConfig.getModule.listAdd.FootOperationIdAdd =  row.Id
                            this.$store.state.dataConfig.getModule.listAdd.FootToBookNameAdd =  row.Name
                        })
                    }
                } else{
                    this.$store.state.dataConfig.getModulelist.refresh = true
                    let index =  this.$store.state.dataConfig.getModule.index
                    if (this.$store.state.dataConfig.getModule.flagImg){
                        this.getModulePage()
                        this.$nextTick(function(){
                            this.$store.state.dataConfig.getModule.list.ImageToBookId = row.Id
                            this.$store.state.dataConfig.getModule.listName.ImageToBookName = row.Name
                        })
                    } else if(this.$store.state.dataConfig.getModule.flagDetail){
                        let that = this
                        that.getModulePage()
                        this.$nextTick(function() {
                            that.$store.state.dataConfig.getModuleDetailList.list[index].BookName = row.Name
                            that.$store.state.dataConfig.getModuleDetailList.list[index].BookId = row.Id
                            that.$store.state.dataConfig.getModuleDetailList.list[index].OperationId = ''
                            that.$store.state.dataConfig.getModuleDetailList.list[index].ClickWebViewUrl = ''
                        })
                    } else{
                        this.getModulePage()
                        this.$nextTick(function() {
                            this.$store.state.dataConfig.getModule.list.FootOperationId = row.Id
                            this.$store.state.dataConfig.getModule.listName.FootToBookName = row.Name
                        })

                    }
                }
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
            BookListRecordCount: function() {
                return  this.$store.state.dataConfig.getBookList.RecordCount
            },
            PageCount: function() {
                return  this.$store.state.dataConfig.getBookList.PageCount
            },
            BookListId: function() {
                return  this.$store.state.dataConfig.getBookListIdSearch.list
            },
            BookTypeList: function() {
                return  this.$store.state.dataConfig.getBookTypeList.list
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
        width: 100%;
        padding: 20px;
        overflow-x: auto !important;
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
    .booklist .el-table{
        width: 2400px;
        max-width: 200%;
    }
    .booklist .el-table__body-wrapper .cell{
        height: 80px;
        line-height: 80px;
        padding: 0;
        box-sizing: content-box;
        p{
            padding: 10px;
            text-align: center;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }
    }
    .FrontImageFilename{
        display: block;
        width: 50px;
        margin: 0 auto;
        margin-top: 5px;
    }
    .el-input input{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }
    .bookedit .el-form-item{
        width: 50%;
        float: left;
        .el-textarea__inner{
            height: 100px;
        }
        .el-date-editor{
            width: 300px;
        }
    }
    ::-webkit-scrollbar {
         width: 0px;
         height: 16px;
         background-color: #f9f9f9;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 0px;
        background-color: #e0e0e0;
    }
</style>
