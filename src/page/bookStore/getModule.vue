<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form ref="form" :model="list" label-width="120px" :label-position="labelPosition" style="padding-left:20px">
                <el-form-item label="主题">
                    <el-input v-model="list.Title" style="width:200px" ref="Title"></el-input>
                </el-form-item>
                <el-form-item label="通知">
                    <el-input v-model="list.Notice" style="width:200px" ref="Notice"></el-input>
                </el-form-item>
                <el-form-item label="模块类型">
                    <el-select v-model="list.ModuleDescription" placeholder="请选择模块类型" ref="ModuleType" >
                        <el-option  v-for="item in ModuleTypeList" :key="item.Id" :label="item.ModuleDescription" :value="item.ModuleType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="序号" >
                    <el-input v-model="list.SerialNumber" style="width:200px" ref="SerialNumber"></el-input>
                </el-form-item>
                <el-form-item label="配置归属">
                    <el-select  v-model="StoreVersionName" :placeholder=list.StoreVersionName ref="StoreVersionName">
                        <el-option label="书城" value="1"></el-option>
                        <el-option label="发现" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="开始时间" >-->
                    <!--<el-input v-model="list.BeginDate" style="width:200px"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="结束时间" >-->
                    <!--<el-input v-model="list.EndDate" style="width:200px"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="起止时间">
                    <el-date-picker
                        v-model="date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否预览" >
                    <el-select  v-model="list.IsPreview" ref="IsPreview">
                        <el-option label="true" value="true"></el-option>
                        <el-option label="false" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="尾标" >
                    <div style="width: 60%;height:300px;border: 1px solid #e0e0e0;padding-top: 20px;padding-left: 20px">
                        <el-form-item label="脚标名称">
                            <el-input v-model="list.FootName" style="width:200px" ref="FootName"></el-input>
                        </el-form-item>
                        <el-form-item label="点击跳转业务ID">
                            <el-input v-model="list.FootOperationId" style="width:200px" ref="FootOperationId"></el-input>
                        </el-form-item>
                        <el-form-item label="点击类型名称">
                            <el-select v-model="list.FootClickTypeName" placeholder="请选择点击内容点击类型名称" ref="NameClickType" @change="changeFootClickType">
                                <el-option  v-for="item in  ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="点击跳转到网页" v-show="showFootToClickWebViewUrl">
                            <el-input v-model="list.FootToClickWebViewUrl" style="width:200px" ref="WebView" :data-operationId="list.FootOperationId"></el-input>
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
                        <el-form-item label="图片ID" style="display:none">
                            <el-select v-model="list.ImageId" placeholder="请选择图片ID">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图片" >
                            <img :src="list.ImageUrl" alt="" ref="ImageUrl">
                        </el-form-item>
                        <el-form-item label="点击图片类型" >
                            <el-select v-model="list.ImageClickTypeName" placeholder="请选择点击图片类型" ref="ImageClickType" @change="changeImageClickType">
                                <el-option  v-for="item in  ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="点击跳转网页" v-if="showWebView">
                            <el-input v-model="list.ImageToClickWebViewUrl" style="width:200px" ref="ImageWebView"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转业务ID" >
                            <el-input v-model="list.ImageOperationId" style="width:200px" ref="ImageToOperationId"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转书籍ID" >
                            <el-input v-model="list.ImageToBookId" style="width:200px" ref="ImageToBookId"></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>
                <div style="padding-bottom: 10px">
                    内容列表
                </div>
                <div class="moduleDetail">
                    <el-table
                        :data="getModuleDetailListTableData"
                        border
                        highlight-current-row
                        max-width="100%">
                        <el-table-column
                            label="书名"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.Name" style="width:100%" ref="moduleDetailName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="封面"
                            width="200">
                            <template slot-scope=" scope">
                                <img :src="scope.row.IconUrl" alt="" class="iconUrl" ref="imgDetail">
                                <from>
                                    <el-upload
                                        class="upload-demo"
                                        :action="uploadUrl"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :on-success="handleSuccess"
                                        :file-list="fileList"
                                        style="margin-top: 10px;float: right">
                                        <el-button size="small" type="primary" @click="changeImg(scope.$index,scope.row)">点击上传</el-button>
                                    </el-upload>
                                </from>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="描述"
                            width="160">
                            <template scope=" scope">
                                <el-input v-model="scope.row.Summary" style="width:100%" ref="moduleDetailSummary" :title=scope.row.Summary></el-input>
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
                            label="点击类型"
                            width="210">
                            <template slot-scope=" scope">
                                <el-select  v-model="scope.row.ClickTypeName" placeholder="请选择模块类型" ref="clickType" @change="changeClickType(scope.$index, scope.row)">
                                    <el-option    v-for="item in ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="图书名称">
                            <template slot-scope=" scope">
                                <el-input v-model="scope.row.BookName" style="width:100%" ref="moduleDetailBookName" :title=scope.row.BookName></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="点击跳转网页"
                            align>
                            <template scope=" scope">
                                <el-input v-model="scope.row.ClickWebViewUrl" style="width:200px" ref="ClickWebViewUrl" :title=scope.row.ClickWebViewUrl></el-input>
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
            </el-form>
            <!--<div class="booklist" v-if="showBookList">-->
                <!--<div>图书详情</div>-->
                <!--<el-input @keyup.enter.native="getBookListSearch" style="width: 200px;" class="filter-item" placeholder="名字或者作者" v-model="nameOrAuthor">-->
                <!--</el-input>-->
                <!--<el-input @keyup.enter.native="getBookListSearch" style="width: 200px;" class="filter-item" placeholder="状态" v-model="isOnshelf" >-->
                <!--</el-input>-->
                <!--<el-button class="filter-item" type="primary" v-waves icon="search" @click="getBookListSearch">搜索</el-button>-->
                <!--<i @click="goBack" class="el-icon-error goback"></i>-->
                <!--<div class="table_container">-->
                    <!--<el-table-->
                        <!--:data="bookList"-->
                        <!--border highlight-current-row-->
                        <!--style="width: 100%"-->
                        <!--@row-dblclick='handleRowHandle'>-->
                        <!--<el-table-column-->
                            <!--label="Id"-->
                            <!--width="80">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.Id}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="书名">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.Name}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="作者"-->
                            <!--width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.Author}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="标签"-->
                            <!--width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.Tag}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="描述"-->
                            <!--width="180">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" :title=scope.row.Summary  @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.Summary}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="图片"-->
                            <!--width="150">-->
                            <!--<template scope=" scope">-->
                                <!--<img :src="scope.row.FrontImageFilename" alt="" id="FrontImageFilename" @dblclick="selectId(scope.row.Id,scope.row.Name)">-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="体积"-->
                            <!--width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.VolumeCount}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="图书类型"-->
                            <!--width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.BookType}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="章节价格"-->
                            <!--width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.UnitPrice}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="VIP价格"-->
                            <!--width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.VipPrice}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="支付类型"-->
                            <!--width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.PayType}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="状态"-->
                            <!--width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.Status}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="起始时间"  width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" :title=scope.row.Created @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.Created}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="更新时间" width="100">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" :title=scope.row.Updated @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.Updated}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--label="书名起源"-->
                            <!--width="180">-->
                            <!--<template scope=" scope">-->
                                <!--<p style="width: 100%;height: 100%" @dblclick="selectId(scope.row.Id,scope.row.Name)">{{scope.row.BookSourceName}}</p>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                <!--</div>-->
                <!--<div class="block booklistpag">-->
                    <!--<el-pagination-->
                        <!--@current-change="handleCurrentChangeBookList"-->
                        <!--layout="total, prev, pager, next"-->
                        <!--:total="BookLostRecordCount">-->
                    <!--</el-pagination>-->
                <!--</div>-->
            <!--</div>-->
            <div class="trankingtypelist " v-if="showTrankingTypeList">
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
                    <div class="block booklistpag">
                        <el-pagination
                            @current-change="handleCurrentChangeTranking"
                            layout="total, prev, pager, next"
                            :total="TrankingRecordCount">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="shortbooklist" v-if="showShortBookList">
                <div>段子详细列表</div>
                <el-input @keyup.enter.native="getShortBookListSearch" style="width: 200px;" class="filter-item" placeholder="名字或者作者" v-model="shortNameOrAuthor">
                </el-input>
                <el-input @keyup.enter.native="getShortBookListSearch" style="width: 200px;" class="filter-item" placeholder="状态" v-model="shortIsOnshelf">
                </el-input>
                <el-button class="filter-item" type="primary" v-waves icon="search" @click="getShortBookListSearch">搜索</el-button>
                <i @click="goBackshort" class="el-icon-error goback"></i>
                <div class="table_container">
                    <el-table
                        :data="shortBookList"
                        border
                        style="width:100%"
                        @row-dblclick='handleRowHandleShort'>
                        <el-table-column
                            prop="Id"
                            label="Id"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="Name"
                            label="书名"
                            width="200">
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
                            label="描述">
                            <template scope=" scope">
                                <p style="width: 100%;height: 100%" :title=scope.row.Summary>{{scope.row.Summary}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="图片"
                            width="200">
                            <template scope=" scope">
                                <img :src="scope.row.FrontImageFilename" style="width: 60px;height:80px;margin:10px auto" alt="">
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
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="BookTypeName"
                            label="图书类型"
                            width="100">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block booklistpag">
                    <el-pagination
                        @current-change="handleCurrentChangeShort"
                        layout="total, prev, pager, next"
                        :total="ShortBookListRecordCount">
                    </el-pagination>
                </div>
            </div>
            <div class="bookthemelist " v-if="showBookThemeList">
                <div class="table_container">
                    <i @click="goBackBookThemeList" class="el-icon-error goback"></i>
                    <el-table
                        :data="bookThemeList"
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
                            label="头像">
                            <template scope=" scope">
                                <img :src="scope.row.IconUrl" style="width: 70px;height: 100px;margin: 5px auto" alt="" >
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="图标">
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
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
            this.getModule(),
                this.getModuleClickTypeList(),
                this.getModuleDetailList()
        },
        components: {
            headTop,
        },
        data() {
            return {
                StoreVersionName:'1',
                labelPosition:'left',
                date: '',
                ImageToBookId:'',
                showWebView:true,
                nameOrAuthor:'',
                isOnshelf: 1,
                shortNameOrAuthor: '',
                shortIsOnshelf: 1,
                showFootToClickWebViewUrl: false,
                showBookList:false,
                showTrankingTypeList:false,
                showShortBookList:false,
                showBookThemeList: false,
                flagDetail: false,
                flagImg: false,
                moduleDetailBookName: '',
                indexActive: '',
                fileList: [],
                url:'',
                imgIndex:'',
                rowIndex:'',
                uploadUrl: 'http://192.168.0.72:8022/api/commons/common/upload?sessionKey='+localStorage.SessionKey,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                isPay:{isPay:'1'},
            }
        },
        created() {

        },
        methods: {
            initDate() {
                let that = this
                console.log(that)
                setTimeout(function(){
                    let strTime1=that.list.BeginDate;
                    let strTime2=that.list.EndDate;
                    let BeginDate= new Date(Date.parse(strTime1.replace(/-/g,  "/")));
                    let EndDate= new Date(Date.parse(strTime2.replace(/-/g,  "/")));
                    that.date = [BeginDate,EndDate]
                },100)
            },
            getModule() {
                this.$store.dispatch('getModule', {payload:{sessionKey:localStorage.SessionKey,id:this.$route.params.Id,isPay:'1'}}).then(
                    response => {
                        console.log(111)
                        this.initDate()
                    }
                )
            },
            getModuleClickTypeList() {
                this.$store.dispatch('getModuleClickTypeList', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {

                    }
                ).catch(

                )
            },
            getModuleDetailList() {
                this.$store.dispatch('getModuleDetailList', {page:{"PageIndex":"1","PageSize":"10"},params:{sessionKey:localStorage.SessionKey,bookStoreModuleid:this.$route.params.Id,isPay:'1'}}).then(
                    (response) => {

                    }
                ).catch(

                )
            },
            onSubmit() {
                var data = {
                    Id: Number(this.$route.params.Id),
                    ModuleType: this.list.ModuleType,
                    Notice: this.$refs.Notice.value,
                    Title: this.$refs.Title.value,
                    IsHasFoot:this.list.IsHasFoot,
                    SerialNumber:this.$refs.SerialNumber.value,
                    StoreVersion: this.StoreVersionName,
                    BeginDate:this.list.BeginDate,
                    EndDate:this.list.EndDate,
                    IsPreview:this.$refs.IsPreview.value,
                    FootName:this.$refs.FootName.value,
                    FootClickType:this.list.FootClickType,
                    FootOperationId: this.$refs.FootOperationId.value,
                    FootToClickWebViewUrl: this.$refs.WebView.value,
                    ImageUrl: this.$refs.ImageUrl.src,
                    ImageClickType: this.list.ImageClickType,
                    ImageToClickWebViewUrl: this.$refs.ImageWebView.value,
                    ImageToBookId: this.$refs.ImageToBookId.value,
                    ImageOperationId: this.$refs.ImageToOperationId.value,
                    detail: this.getModuleDetailListTableData
                }
                this.$store.dispatch('upDate', {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data:data
                }).then(
                    (response) => {

                    }
                ).catch(

                )
            },
            getBookList() {
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
            getTrankingTypeList() {
                this.$store.dispatch('getTrankingTypeList', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            handleCurrentChangeTranking(val) {
                this.$store.dispatch('getTrankingTypeList', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    isPay:this.isPay
                    }).then(
                    (response) => {
                    }
                    ).catch(

                    )
            },
            handleCurrentChangeBookList(val) {
                var data = {
                    nameOrAuthor: this.nameOrAuthor,
                    isOnshelf: this.isOnshelf,
                    isPay:this.isPay
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
            handleCurrentChangeShort(val) {
                this.$store.dispatch('getShortBookList', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    isPay:this.isPay
                }).then(
                    (response) => {
                    }
                ).catch(

                )
            },
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
            changeFootClickType() {
                var value = this.$refs.NameClickType.value
                if(value === "跳转到WebView" || value === 21 ){
                    this.showFootToClickWebViewUrl = true
                } else{
                    this.showFootToClickWebViewUrl = false
                }
            },
            changeImageClickType() {
                this.$store.state.dataConfig.getModulelist.refresh = true
                this.$store.state.dataConfig.getModule.flagImg = true
                this.flagDetail = false
                var value = this.$refs.ImageClickType.value
                if(value === 22) {
                    this.$router.push(this.$route.query.redirect || '/bookList')
                }
                if(value === 23) {
                    this.getTrankingTypeList()
                    this.showTrankingTypeList = true
                }
                if(value === 27) {
                    this.getShortBookList()
                    this.showShortBookList = true
                }
                if(value === 29) {
                    this.getBookThemeList()
                    this.showBookThemeList = true
                }
            },
            changeClickType(index,row) {
                this.$store.state.dataConfig.getModulelist.refresh = true
                this.$store.state.dataConfig.getModule.flagImg = false
                this.flagDetail = true
                this.$store.state.dataConfig.getModule.index = index
                if(row.ClickTypeName === 22) {
                    this.$router.push(this.$route.query.redirect || '/bookList')
                }
                if(row.ClickTypeName === 23) {
                    this.getTrankingTypeList()
                    this.showTrankingTypeList = true
                }
                if(row.ClickTypeName === 27) {
                    this.getShortBookList()
                    this.showShortBookList = true
                }
                if(row.ClickTypeName === 29) {
                    this.getBookThemeList()
                    this.showBookThemeList = true
                }
            },
            goBack() {
                this.showBookList = false
            },
            goBackTrank() {
                this.showTrankingTypeList = false
            },
            goBackBookThemeList() {
                this.showBookThemeList = false
            },
            goBackshort() {
                this.showShortBookList = false
            },
            selectId(id,name) {
                this.showBookList = false
                if (this.flagImg) {
                    this.ImageToBookId = id
                }
                if (this.flagDetail) {
                    this.moduleDetailBookName = name
                    this.$nextTick(function () {
                        this.getModuleDetailListTableData[this.indexActive].BookName =name
                    })


                }
            },
            handleRowHandle(row,event) {

            },
            handleRowHandleShort(row,event) {
                this.showShortBookList = false
                if (this.flagDetail) {
                    this.getModuleDetailListTableData[this.indexActive].ShortBookName =row.Name
                }
            },
            handleRemove(file, fileList) {
                console.log(fileList)
                console.log(file)
            },
            changeImg(index,row) {
                this.imgIndex = index;
                this.rowIndex = row;
                let lists = document.querySelectorAll(".el-upload-list")
                for (let list of lists) {
                    list.style.display = "none"
                }
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(response,file,fileList) {
                console.log(response)
                this.getModuleDetailListTableData[this.imgIndex].IconUrl = response.dt[0].FileUrl
            }
        },
        computed: {
            Id: function() {
              return this.$route.params.Id
            },
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
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
            getModuleDetailListTableData: function() {
                return  this.$store.state.dataConfig.getModuleDetailList.list
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
            trankingTypeList: function() {
                return  this.$store.state.dataConfig.getTrankingTypeList.list
            },
            TrankingRecordCount: function() {
                return  this.$store.state.dataConfig.getTrankingTypeList.RecordCount
            },
            shortBookList: function() {
                return  this.$store.state.dataConfig.getShortBookList.list
            },
            ShortBookListRecordCount: function() {
                return  this.$store.state.dataConfig.getShortBookList.RecordCount
            },
            bookThemeList: function() {
                return  this.$store.state.dataConfig.getBookThemeList.list
            },
            BookThemeListRecordCount: function() {
                return  this.$store.state.dataConfig.getBookThemeList.RecordCount
            },
        },
        watch: {
            Id (val,oldval) {
                var refreshed = this.$store.state.dataConfig.getModulelist.refresh
                if(!refreshed){
                        this.getModule(),
                        this.getModuleClickTypeList(),
                        this.getModuleDetailList()
                }
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
    .iconUrl{
        display: block;
        width: 80px;
        height: 40px;
        float: left;
    }
    .submitButton{
        margin-top: 30px;
    }
    .el-table table{
        width: auto;
    }
    .trankingtypelist,.bookthemelist{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        overflow: auto;
        z-index: 111111;
        .filter-item{
            margin-left: 20px;
        }
    }
    .shortbooklist{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        overflow: auto;
        z-index: 111111;
        .filter-item{
            margin-left: 20px;
        }
    }
    .trankingtypelist .table_container{
        width: 70%;
        margin: 0 auto;
    }
    .booklistpag{
        margin: 10px 0px;
    }
    .el-table__row .el-input input {
        border: none;
        padding: 0;
        text-align: center;
    }
    #FrontImageFilename{
        display: block;
        width: 50px;
        height: 70px;
        margin: 0 auto;
        margin-top: 15px;
    }
    .moduleDetai .el-table .cell{
        padding: 0;
        box-sizing: content-box;
    }
    .booklist .el-table__body-wrapper .cell{
        height: 100px;
        line-height: 100px;
        padding: 0;
        box-sizing: content-box;
        p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
        }
    }
    .trankingtypelist .el-table__body-wrapper .cell{
        height: 40px;
    }
    .shortbooklist .el-table__body-wrapper .cell{
        height: 100px;
        line-height: 100px;
        text-align: center;
        p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .bookthemelist .el-table__body-wrapper .cell{
        height: 110px;
        line-height: 110px;
        text-align: center;
    }
    .moduleDetail{
        overflow-x: scroll;
    }
    .el-input input{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }
    .goback{
        float: right;
        display: block;
        width: 20px;
        height: 20px;
        background: red;
    }
    .moduleDetail .cell{
    }
</style>
