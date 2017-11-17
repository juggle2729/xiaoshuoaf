<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition" style="padding-left:20px">
                <el-form-item label="主题">
                    <el-input v-model="list.Title" style="width:200px" ref="title"></el-input>
                </el-form-item>
                <el-form-item label="通知">
                    <el-input v-model="list.Notice" style="width:200px" ref="notice"></el-input>
                </el-form-item>
                <el-form-item label="模块类型">
                    <el-select v-model="list.ModuleDescription" placeholder="请选择模块类型" ref="moduleType">
                        <el-option  v-for="item in ModuleTypeList" :key="item.Id" :label="item.ModuleDescription" :value="item.ModuleType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本名称">
                    <el-input v-model="list.StoreVersionName" style="width:200px" data-number="list.SerialNumber" data-version="list.StoreVersion" ref="version"></el-input>
                </el-form-item>
                <el-form-item label="尾标" >
                    <div style="width: 60%;height:300px;border: 1px solid #e0e0e0;padding-top: 20px;padding-left: 20px">
                        <el-form-item label="内容名称">
                            <el-input v-model="list.FootName" style="width:200px" ref="footName"></el-input>
                        </el-form-item>
                        <el-form-item label="点击跳转业务ID">
                            <el-input v-model="list.FootOperationId" style="width:200px" ref="footOperationId"></el-input>
                        </el-form-item>
                        <el-form-item label="点击类型名称">
                            <el-select v-model="list.FootClickTypeName" placeholder="请选择点击内容点击类型名称" ref="nameClickType">
                                <el-option  v-for="item in  ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="点击跳转到网页">
                            <el-input v-model="list.FootToClickWebViewUrl" style="width:200px" ref="webView" :data-operationId="list.FootOperationId"></el-input>
                        </el-form-item>
                        <el-form-item label="FootId" style="display:none">
                            <el-select v-model="list.FoodId" placeholder="请选择FoodId">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="图片">
                    <div style="width: 60%;height:400px;border: 1px solid #e0e0e0;padding-top: 20px;padding-left: 20px">
                        <!--<el-form-item label="图片ID" style="display:none">-->
                        <!--<el-select v-model="list.ImageId" placeholder="请选择图片ID">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <el-form-item label="图片" >
                            <img :src="list.ImageUrl" alt="" ref="image_url">
                        </el-form-item>
                        <el-form-item label="点击图片类型" >
                            <el-select v-model="list.ImageClickTypeName" placeholder="请选择点击图片类型" ref="imageClickType" @change="changeImageClickType">
                                <el-option  v-for="item in  ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="点击跳转网页">
                            <el-input v-model="list.ImageToClickWebViewUrl" style="width:200px" ref="imageWebView"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转业务ID" >
                            <el-input v-model="list.ImageOperationId" style="width:200px" ref="imageToOperationId"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转书籍ID">
                            <el-input v-model="list.ImageToBookId" style="width:200px" ref="imageToBookId"></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>
                <div style="padding-bottom: 10px" class="contentList">内容列表
                    <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                    <!--:on-change="handleChange"-->
                    <!--:file-list="fileList3"-->
                    <!--:multiple="true">-->
                    <!--<el-button size="small" type="primary">点击上传</el-button>-->
                    <!--</el-upload>-->
                </div>
                <div class="moduleDetail">
                    <el-table
                        :data="tableData"
                        border
                        max-width="100%">
                        <el-table-column
                            label="书名"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.Name" style="width:100%" ref="moduleDetailName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="图标"
                            width="120">
                            <template scope=" scope">
                                <img :src="scope.row.IconUrl" alt="" id="iconUrl">
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="描述"
                            width="180">
                            <template scope=" scope">
                                <el-input v-model="scope.row.Summary" style="width:100%" ref="moduleDetailSummary"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="作者"
                            width="80">
                            <template scope=" scope">
                                <el-input v-model="scope.row.Author" style="width:100%" ref="moduleDetailAuthor"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="标签"
                            width="80">
                            <template scope=" scope">
                                <el-input v-model="scope.row.Tag" style="width:100%" ref="moduleDetailTag"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="分类"
                            width="120">
                            <template scope=" scope">
                                <el-input v-model="scope.row.Category" style="width:100%" ref="moduleDetailCategory"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="ClickTypeName"
                            label="点击类型"
                            width="180">
                            <template slot-scope=" scope">
                                <el-select  v-model="scope.row.ClickTypeName" placeholder="请选择模块类型" ref="clickType" @change="changeClickType(scope.$index, scope.row)">
                                    <el-option    v-for="item in ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="BookName"
                            label="图书名称"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="ShortBookName"
                            label="段子名称"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            label="点击跳转网页">
                            <template scope=" scope">
                                <el-input v-model="scope.row.ClickWebViewUrl" style="width:200px" ref="ClickWebViewUrl"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="连载编号"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.SerialNumber" style="width:100%" ref="moduleDetailSerialNumber"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="最小版号"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.MinVer" style="width:100%" ref="moduleDetailMinVer"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="submitButton">
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                </div>
                <div class="booklist" v-show="showBookList">
                    <div>图书详情</div>
                    <el-input @keyup.enter.native="getBookListSearch" style="width: 200px;" class="filter-item" placeholder="名字或者作者" v-model="nameOrAuthor">
                    </el-input>
                    <el-input @keyup.enter.native="getBookListSearch" style="width: 200px;" class="filter-item" placeholder="状态" v-model="isOnshelf" >
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="search" @click="getBookListSearch">搜索</el-button>
                    <i @click="goBack" class="el-icon-error goback"></i>
                    <div class="table_container">
                        <el-table
                            :data="bookList"
                            border
                            style="width: 100%">
                            <el-table-column
                                label="Id"
                                width="80">
                                <template scope=" scope">
                                    <p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id)">{{scope.row.Id}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="Name"
                                label="书名"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Author"
                                label="作者"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Tag"
                                label="标签"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Summary"
                                label="描述"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                label="图片"
                                width="150">
                                <template scope=" scope">
                                    <img :src="scope.row.FrontImageFilename" alt="" id="FrontImageFilename">
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="VolumeCount"
                                label="体积"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="BookType"
                                label="图书类型"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Status"
                                label="状态"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="Created"
                                label="起始时间">
                            </el-table-column>
                            <el-table-column
                                prop="Updated"
                                label="更新时间">
                            </el-table-column>
                            <el-table-column
                                prop="BookSourceName"
                                label="书名起源"
                                width="180">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="block booklistpag">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            layout="total, prev, pager, next"
                            :total="RecordCount">
                        </el-pagination>
                    </div>
                </div>
                <div class="trankingtypelist " v-show="showTrankingTypeList">
                    <div class="table_container">
                        <i @click="goBackTrank" class="el-icon-error goback"></i>
                        <el-table
                            :data="trankingTypeList"
                            border
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
                                prop="SerialNumber"
                                label="连载数"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                label="图标">
                                <template scope=" scope">
                                    <img :src="scope.row.IconUrl" alt="" id="icon_url">
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="GroupName"
                                label="分组">
                            </el-table-column>
                            <el-table-column
                                prop="BookTypeNameList"
                                label="书单名称">
                            </el-table-column>
                            <el-table-column
                                prop="IsShowEndPage"
                                label="是否完结">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="shortbooklist" v-show="showShortBookList">
                    <div>段子详细列表</div>
                    <el-input @keyup.enter.native="getShortBookListSearch" style="width: 200px;" class="filter-item" placeholder="名字或者作者" v-model="shortNameOrAuthor">
                    </el-input>
                    <el-input @keyup.enter.native="getShortBookListSearch" style="width: 200px;" class="filter-item" placeholder="状态" v-model="shortIsOnshelf" >
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="search" @click="getShortBookListSearch">搜索</el-button>
                    <i @click="goBackshort" class="el-icon-error goback"></i>
                    <div class="table_container">
                        <el-table
                            :data="shortBookList"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="Id"
                                label="Id"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="Name"
                                label="书名"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Author"
                                label="作者"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Tag"
                                label="标签"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Summary"
                                label="描述"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                label="图片"
                                width="150">
                                <template scope=" scope">
                                    <img :src="scope.row.FrontImageFilename" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="VolumeCount"
                                label="体积"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Status"
                                label="状态"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="BookTypeName"
                                label="图书类型"
                                width="100">
                            </el-table-column>
                        </el-table>
                    </div>

                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
            this.$store.dispatch('getModule', {payload:{sessionKey:localStorage.SessionKey,id:this.$route.params.Id}}).then(
                (response) => {

                }
            ).catch(
            )
            this.$store.dispatch('getModuleTypeList', {payload:{page:{"PageIndex":"1","PageSize":"10"}}}).then(
                (response) => {

                }
            ).catch(

            )
            this.$store.dispatch('getModuleClickTypeList', {payload:{page:{"PageIndex":"1","PageSize":"10"}}}).then(
                (response) => {

                }
            ).catch(

            )
            this.$store.dispatch('getModuleDetailList', {page:{"PageIndex":"1","PageSize":"10"},params:{sessionKey:localStorage.SessionKey,bookStoreModuleid:this.$route.params.Id}}).then(
                (response) => {

                }
            ).catch(

            )
        },
        components: {
            headTop,
        },
        data() {
            return {
                labelPosition:'left',
//                ImageToBookId:list.ImageToBookId,
                nameOrAuthor:'',
                isOnshelf:'',
                showBookList:false,
                showTrankingTypeList:false,
                showShortBookList:false,
//                fileList3: [{
//                    name: 'food.jpeg',
//                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
//                    status: 'finished'
//                }, {
//                    name: 'food2.jpeg',
//                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
//                    status: 'finished'
//                }]

            }
        },
        created() {

        },
        methods: {
//            onSubmit() {
//                var data = {
//                    Id: this.$route.params.Id,
//                        ModuleType: this.$refs.moduleType.value,
//                        Notice: this.$refs.notice.value,
//                        Title: this.$refs.title.value,
//                        IsHasFoot:this.list.IsHasFoot,
////                    SerialNumber:this.$refs.version.dataset.number,
////                    StoreVersion: this.$refs.version.dataset.version,
//                        FootName:this.$refs.footName.value,
//                        FootClickType:this.$refs.nameClickType.value,
////                  FootOperationId: this.$refs.webView.dataset.operationId,
//                        FootToClickWebViewUrl: this.$refs.webView.value,
//                        ImageUrl: this.$refs.image_url.src,
//                        ImageClickType: this.$refs.imageClickType.value,
//                        ImageToClickWebViewUrl: this.$refs.imageWebView.value,
//                        ImageToBookId: this.$refs.imageToBookId.value,
//                        ImageOperationId: this.$refs.imageToOperationId.value,
//                        detail:[{
//                            IconUrl: '',
//                            Name: this.$refs.moduleDetailName.value,
//                            Summary: this.$refs.moduleDetailSummary.value,
//                            Author: this.$refs.moduleDetailAuthor.value,
//                            Tag: this.$refs.moduleDetailTag.value,
//                            Category: this.$refs.moduleDetailCategory.value,
//                            ClickType: this.$refs.clickType.value,
//                            BookId:'',
//                            ClickWebViewUrl: this.$refs.ClickWebViewUrl.value,
//                            SerialNumber: this.$refs.moduleDetailSerialNumber.value,
//                            ShortBookId: '',
//                            MinVer: this.$refs.moduleDetailMinVer.value
//                        }]
//                }
//                this.$store.dispatch('upDate', {data:data}).then(
//                    (response) => {
//
//                    }
//                ).catch(
//
//                )
//            },
            getBookList() {
                this.$store.dispatch('getBookList', {
                    page:{"PageIndex":"1","PageSize":"10"}
                }).then(
                    (response) => {

                    }
                ).catch(

                )
            },
            getBookListSearch() {
                var data = {
                    nameOrAuthor: this.nameOrAuthor,
                    isOnshelf: this.isOnshelf
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
            getShortBookList() {
                this.$store.dispatch('getShortBookList', {
                    page:{"PageIndex":"1","PageSize":"10"}
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            getShortBookListSearch() {
                var data = {
                    nameOrAuthor: this.shortNameOrAuthor,
                    isOnshelf: this.shortIsOnshelf
                }
                this.$store.dispatch('getShortBookListSearch', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            getTrankingTypeList() {
                this.$store.dispatch('getTrankingTypeList', {
                    page:{"PageIndex":"1","PageSize":"10"}
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            handleCurrentChange(val) {
                var data = {
                    nameOrAuthor: this.nameOrAuthor,
                    isOnshelf: this.isOnshelf
                }
                this.$store.dispatch('getBookListSearch', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    params:data
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            changeImageClickType() {
                var value = this.$refs.imageClickType.value
                if(value === 22) {
                    this.getBookList()
                }
                if(value === 23) {
                    alert(111)
                    this.getTrankingTypeList()
                    this.showTrankingTypeList = true
                }
                if(value === 27) {
                    this.getShortBookList()
                    this.showShortBookList = true
                }
            },
            changeClickType() {
                var value = this.$refs.click_type.value
                alert(value)
                if(value === 22) {
                    this.getBookList()
                    this.showBookList = true
                }
                if(value === 23) {
                    this.getShortBookList()
                    this.showTrankingTypeList = true
                }
                if(value === 27) {
                    this.getShortBookList()
                    this.showShortBookList = true
                }
            },
            goBack() {
                this.showBookList = false
            },
            goBackTrank() {
                this.showTrankingTypeList = false
            },
            selectId(id) {
                alert(id)
                this.showBookList = false
//                this.ImageToBookId = id
            },
//            handleChange(file, fileList) {
//                this.fileList3 = fileList.slice(-3);
//            }
        },
        computed: {
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModule.sessionKey
            },
            list: function() {
                return  this.$store.state.dataConfig.getModule.list
            },
            ModuleTypeList: function() {
                return  this.$store.state.dataConfig.getModuleTypeList.list
            },
            ModuleClickTypeList: function() {
                return  this.$store.state.dataConfig.getModuleClickTypeList.list
            },
            tableData: function() {
                return  this.$store.state.dataConfig.getModuleDetailList.list
            },
            bookList: function() {
                return  this.$store.state.dataConfig.getBookList.list
            },
            RecordCount: function() {
                return  this.$store.state.dataConfig.getBookList.RecordCount
            },
            PageCount: function() {
                return  this.$store.state.dataConfig.getBookList.PageCount
            },
            trankingTypeList: function() {
                return  this.$store.state.dataConfig.getTrankingTypeList.list
            },
            shortBookList: function() {
                return  this.$store.state.dataConfig.getShortBookList.list
            }
        },
        watch: {
            '$route'(to,from) {
                this.$store.dispatch('getModule', {payload:{sessionKey:localStorage.SessionKey,id:this.$route.params.Id}}).then(
                    (response) => {

                    }
                ).catch(

                )
                this.$store.dispatch('getModuleTypeList', {payload:{page:{"PageIndex":"1","PageSize":"10"}}}).then(
                    (response) => {

                    }
                ).catch(

                )
                this.$store.dispatch('getModuleClickTypeList', {payload:{page:{"PageIndex":"1","PageSize":"10"}}}).then(
                    (response) => {

                    }
                ).catch(

                )
                this.$store.dispatch('getModuleDetailList', {page:{"PageIndex":"1","PageSize":"10"},params:{sessionKey:localStorage.SessionKey,bookStoreModuleid:this.$route.params.Id}}).then(
                    (response) => {

                    }
                ).catch(

                )
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
    }
    .el-form-item__content{
        margin-bottom: 20px;
    }
    .el-form-item__label{
        text-align: left;
    }
    #iconUrl{
        display: block;
        width: 80px;
        height: 40px;
    }
    .submitButton{
        margin-top: 30px;
    }
    .el-table table{
        width: auto;
    }
    .booklist,.trankingtypelist,.shortbooklist{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        overflow: auto;
        .filter-item{
            margin-left: 20px;
        }
    }
    .booklistpag{
        margin-left: 20px;
    }
    #FrontImageFilename{
        display: block;
        width: 50px;
        height: 70px;
        margin: 0 auto;
        margin-top: 15px;
    }
    .booklist .el-table__body-wrapper .cell{
        height: 100px;
    }
    .moduleDetail{
        overflow-x: scroll;
    }
    .goback{
        float: right;
        display: block;
        width: 20px;
        height: 20px;
    }
    .trankingtypelist{
        .table_container{
            position: absolute;
            background: #fff;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 50%;
        }
    }
    .el-table__row .el-input input {
        border: none;
        padding: 0;
        text-align: center;
    }
    .el-table__row .cell{
        padding: 0;
    }
    .el-table__row td{
        padding: 0;
        height: 80px;
    }
    .contentList>.upload-demo {
        float: right;
    }
</style>
