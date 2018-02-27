<template>
    <el-form class="fillcontain">
        <head-top></head-top>
        <el-form class="table_container">
            <el-form ref="form" :model="list" label-width="100px" :label-position="labelPosition" style="padding-left:20px" v-if="dialogFormVisibleDetail">
                <div class="topModule">
                    <el-form-item label="主题">
                        <el-input v-model="list.Title" style="width:200px" ref="Title"></el-input>
                    </el-form-item>
                    <el-form-item label="通知">
                        <el-input v-model="list.Notice" style="width:200px" ref="Notice"></el-input>
                    </el-form-item>
                    <el-form-item label="模块类型">
                        <el-select v-model="list.ModuleDescription" placeholder="请选择模块类型" ref="ModuleType" @change="changeModuleType" >
                            <el-option  v-for="item in ModuleTypeList" :key="item.Id" :label="item.ModuleDescription" :value="item.ModuleType"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="序号" >
                        <el-input v-model="list.SerialNumber" style="width:200px" ref="SerialNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="配置归属">
                        <el-input v-model="StoreVersionAdd" style="width:200px" ref="StoreVersionAdd" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="是否提前预览" >
                        <el-select  v-model="IsPreview" ref="IsPreview">
                            <el-option label="是" value="true"></el-option>
                            <el-option label="否" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="免费起止时间">
                        <el-date-picker
                            v-model="date"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <el-form-item label="尾标" class="font" style="width: 40%;float: left;margin-right: 10%">
                    <div style="width: 100%;height:400px;border: 1px solid #e0e0e0;padding-top: 20px;padding-left: 20px">
                        <el-form-item label="脚标名称">
                            <el-input v-model="list.FootName" style="width:200px" ref="FootName"></el-input>
                        </el-form-item>
                        <el-form-item label="点击类型名称">
                            <el-select v-model="list.FootClickTypeName" placeholder="请选择点击内容点击类型名称" ref="FootClickTypeName" @visible-change="changeFootClickType">
                                <el-option  v-for="item in  ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="点击跳转业务ID" v-show="showFootOperationId">
                            <el-input v-model="list.FootOperationId" style="width:200px" ref="FootOperationId"  @focus="_toFoot"></el-input>
                        </el-form-item>
                        <el-form-item label="书名" v-show="showFootToBookName">
                            <el-input v-model="listName.FootToBookName" style="width:200px" ref="FootToBookName" @focus="_toFoot"></el-input>
                        </el-form-item>
                        <el-form-item label="点击跳转到网页" v-show="showFootToClickWebViewUrl">
                            <el-input v-model="list.FootToClickWebViewUrl" style="width:200px" ref="FootToClickWebViewUrl" :data-operationId="list.FootOperationId"></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="图片" class="image" style="width: 40%;float: left">
                    <div style="width: 100%;height:400px;border: 1px solid #e0e0e0;padding-top: 20px;padding-left: 20px">
                        <!--<el-form-item label="图片ID" style="display:none">-->
                            <!--<el-select v-model="list.ImageId" placeholder="请选择图片ID">-->
                                <!--<el-option label="区域一" value="shanghai"></el-option>-->
                                <!--<el-option label="区域二" value="beijing"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <el-form-item label="图片" >
                            <img :src="list.ImageUrl" alt="" ref="ImageUrl" style="width: 100px;height: 50px;">
                            <from>
                                <el-upload
                                    class="upload-demo"
                                    :action="uploadUrl"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccessImg"
                                    :file-list="fileListImg"
                                    style="margin-top: 10px">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </from>
                        </el-form-item>
                        <el-form-item label="点击图片类型" >
                            <el-select v-model="list.ImageClickTypeName" placeholder="请选择点击图片类型" ref="ImageClickTypeName" @visible-change="changeImageClickType">
                                <el-option  v-for="item in  ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="点击跳转网页" v-show="showImageToClickWebViewUrl">
                            <el-input v-model="list.ImageToClickWebViewUrl" style="width:200px" ref="ImageToClickWebViewUrl"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转业务ID" v-show="showImageOperationId">
                            <el-input v-model="list.ImageOperationId" style="width:200px" ref="ImageOperationId" @focus="_toFoot"></el-input>
                        </el-form-item>
                        <el-form-item label="书ID" v-show="showImageToBookId">
                            <el-input v-model="list.ImageToBookId" style="width:200px" ref="ImageToBookId" @focus="_toFoot"></el-input>
                        </el-form-item>
                        <el-form-item label="书名" v-show="showImageToBookName">
                            <el-input v-model="listName.ImageToBookName" style="width:200px" ref="ImageToBookName" @focus="_toFoot"></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>
                <div class="moduleDetail" >
                    <div style="padding-bottom: 10px">
                        内容列表
                    </div>
                    <el-table
                        :data="getModuleDetailListTableData"
                        border
                        highlight-current-row
                        max-width="100%">
                        <el-table-column
                            label="元素名"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.Name" style="width:100%" ref="moduleDetailName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="图片"
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
                                <el-select  v-model="scope.row.ClickTypeName" placeholder="请选择模块类型" ref="DetailClickType" @change="changeClickType(scope.$index, scope.row)">
                                    <el-option    v-for="item in ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="图书名称" width="150">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.BookName" style="width:100%" ref="moduleDetailBookName" :title=scope.row.BookName @focus="_toFoot"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="跳转业务Id" width="150"
                            align>
                            <template scope="scope" >
                                <el-input v-model="scope.row.OperationId" style="width:100%" ref="ClickOperationId" :title=scope.row.OperationId  @focus="_toFoot"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="跳转网址" width="150"
                            align>
                            <template scope="scope" >
                                <el-input v-model="scope.row.ClickWebViewUrl" style="width: 100%" ref="ClickWebViewUrl" :title=scope.row.ClickWebViewUrl></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="排序编号"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.SerialNumber" style="width:100%" ref="moduleDetailSerialNumber"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="最小版本号"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.MinVer" style="width:100%" ref="moduleDetailMinVer"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="原始价格"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.OldPriceText" style="width:100%" ref="moduleDetailOldPriceText"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="新价格"
                            width="100">
                            <template scope=" scope">
                                <el-input v-model="scope.row.NewPriceText" style="width:100%" ref="moduleDetailNewPriceText"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" >
                            <template slot-scope="scope">
                                <el-button size="mini" type="info"  @click="handleAddDetail(scope.$index, scope.row)">新增</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="submitButton">
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                </div>
            </el-form>
            <el-form ref="form"  :model="listAdd" label-width="100px" :label-position="labelPosition" style="padding-left:20px" v-if="dialogFormVisibleAdd">
                    <div class="topModule">
                        <el-form-item label="主题">
                            <el-input v-model="TitleAdd" style="width:200px" ref="TitleAdd"></el-input>
                        </el-form-item>
                        <el-form-item label="通知">
                            <el-input v-model="NoticeAdd" style="width:200px" ref="NoticeAdd"></el-input>
                        </el-form-item>
                        <el-form-item label="模块类型">
                            <el-select v-model="ModuleTypeAdd" placeholder="请选择模块类型" ref="ModuleTypeAdd" >
                                <el-option  v-for="item in ModuleTypeList" :key="item.Id" :label="item.ModuleDescription" :value="item.ModuleType"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="序号" >
                            <el-input v-model="SerialNumberAdd" style="width:200px" ref="SerialNumberAdd"></el-input>
                        </el-form-item>
                        <el-form-item label="配置归属">
                            <el-input v-model="StoreVersionAdd" style="width:200px" ref="StoreVersionAdd" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="是否提前预览" >
                            <el-select  v-model="IsPreviewAdd" ref="IsPreviewAdd">
                                <el-option label="是" value="true"></el-option>
                                <el-option label="否" value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="免费起止时间"  class="datePicker">
                            <el-date-picker
                                v-model="dateAdd"
                                type="datetimerange"
                                size="large"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <el-form-item label="尾标" style="width: 40%;float: left;margin-right: 10%">
                        <div style="width: 100%;height:400px;border: 1px solid #e0e0e0;padding-top: 20px;padding-left: 20px">
                            <el-form-item label="脚标名称">
                                <el-input v-model="FootNameAdd" style="width:200px" ref="FootNameAdd"></el-input>
                            </el-form-item>
                            <el-form-item label="点击类型名称">
                                <el-select v-model="FootClickTypeAdd" placeholder="请选择点击类型" ref="FootClickTypeAdd" @change="changeFootClickTypeAdd">
                                    <el-option  v-for="item in  ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="点击跳转业务ID" v-show="showFootOperationId">
                                <el-input v-model="listAdd.FootOperationIdAdd" style="width:200px" ref="FootOperationIdAdd" @focus="_toFoot"></el-input>
                            </el-form-item>
                            <el-form-item label="书名" v-show="showFootToBookName">
                                <el-input v-model="listAdd.FootToBookNameAdd" style="width:200px" ref="FootToBookNameAdd" @focus="_toFoot"></el-input>
                            </el-form-item>
                            <el-form-item label="点击跳转到网页" v-show="showFootToClickWebViewUrl">
                                <el-input v-model="FootToClickWebViewUrlAdd" style="width:200px" ref="FootToClickWebViewUrlAdd" ></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label="图片" style="width: 40%;float: left;margin-right: 10%">
                        <div style="width: 100%;height:400px;border: 1px solid #e0e0e0;padding-top: 20px;padding-left: 20px">
                            <el-form-item label="图片" >
                                <img  alt="" ref="ImageUrlAdd" style="width: 100px;height: 50px;">
                                <from>
                                    <el-upload
                                        class="upload-demo"
                                        :action="uploadUrl"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :on-success="handleSuccessImgAdd"
                                        :file-list="fileListImgAdd"
                                        style="margin-top: 10px">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </from>
                            </el-form-item>
                            <el-form-item label="点击图片类型" >
                                <el-select v-model="ImageClickTypeAdd" placeholder="请选择点击图片类型" ref="ImageClickTypeAdd" @change="changeImageClickTypeAdd">
                                    <el-option  v-for="item in  ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="点击跳转网页" v-show="showImageToClickWebViewUrl">
                                <el-input v-model="ImageToClickWebViewUrlAdd" style="width:200px" ref="ImageToClickWebViewUrlAdd"></el-input>
                            </el-form-item>
                            <el-form-item label="跳转业务ID" v-show="showImageOperationId">
                                <el-input v-model="listAdd.ImageOperationIdAdd" style="width:200px" ref="ImageOperationIdAdd" @focus="_toFoot"></el-input>
                            </el-form-item>
                            <el-form-item label="书ID" v-show="showImageToBookId">
                                <el-input v-model="ImageToBookIdAdd" style="width:200px" ref="ImageToBookIdAdd" @focus="_toFoot"></el-input>
                            </el-form-item>
                            <el-form-item label="书名" v-show="showImageToBookName">
                                <el-input v-model="listAdd.ImageToBookNameAdd" style="width:200px" ref="ImageToBookName" @focus="_toFoot"></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <div style="padding-bottom: 10px">
                        内容列表
                    </div>
                    <div class="detailAdd"  style="width: 100%;overflow-x: scroll">
                        <div>
                            <el-button style="float: right;margin-bottom: 10px" @click="addtr">新增</el-button>
                        </div>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" contenteditable="true" id="mytable">
                            <thead>
                            <tr style="height: 40px">
                                <th>元素名</th>
                                <th>图片</th>
                                <th>描述</th>
                                <th>作者</th>
                                <th>标签</th>
                                <th>分类</th>
                                <th>点击类型</th>
                                <th>书名</th>
                                <th>跳转业务ID</th>
                                <th>跳转网址</th>
                                <th>排序序号</th>
                                <th>最小版本</th>
                                <th>原始价格号</th>
                                <th>新价格</th>
                               <th>操作</th>
                           </tr>
                           </thead>
                           <tbody id="tableBody">
                           <tr v-for="(item,index) in  AddTableDataDetails">
                               <td>{{item.Name}}</td>
                               <td style="width: 200px">
                                   <img  :src=item.IconUrl alt="" class="iconUrl" ref="imgDetail" width="80px" height="40px" style="margin-left: 20px">
                                   <from>
                                       <el-upload
                                           class="upload-demo"
                                           :action="uploadUrl"
                                           :on-preview="handlePreview"
                                           :on-remove="handleRemove"
                                           :on-success="handleSuccessAdd"
                                           :file-list="fileListAdd"
                                           style="margin-top: 10px;float: right">
                                           <el-button size="small" type="primary" @click="changeImgAdd(index)">点击上传</el-button>
                                       </el-upload>
                                   </from>
                               </td>
                               <td style="max-width: 300px">{{item.Summary}}</td>
                               <td>{{item.Author}}</td>
                               <td>{{item.Tag}}</td>
                                <td>{{item.Category}}</td>
                                <td style="width: 200px">
                                    <el-select  v-model="item.ClickType" placeholder="请选择模块类型" ref="DetailClickTypeAdd"  @change="changeClickTypeAdd">
                                        <el-option   v-for="item in ModuleClickTypeList" :key="item.Id" :label="item.Name" :value="item.ClickType"></el-option>
                                    </el-select>
                                </td>
                                <td @click="_toFootAdd(index)">{{item.BookName}}</td>
                                <td @click="_toFootAdd(index)">{{item.OperationId}}</td>
                                <td>{{item.ClickWebViewUrl}}</td>
                                <td>{{item.SerialNumber}}</td>
                                <td>{{item.MinVer}}</td>
                               <td>{{item.OldPriceText}}</td>
                               <td>{{item.NewPriceText}}</td>
                                <td><el-button  type="button" @click="deleteTr($event)">删除</el-button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="submitButton">
                        <el-button type="primary" @click="onSubmitAdd">保存</el-button>
                        <el-button>取消</el-button>
                    </div>
            </el-form>
        </el-form>
    </el-form>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
            this.showEdit(),
                this.storeVersionAdd()
                this.getModule(),
                this.getModuleTypeList()
                this.getModuleClickTypeList(),
                this.getModuleDetailList()
        },
        components: {
            headTop,
        },
        data() {
            return {
                dialogFormVisibleDetail:false,
                dialogFormVisibleAdd: false,
                StoreVersionName:'1',
                labelPosition:'left',
                ModuleType:'',
                ModuleType1:'',
                IsPreview:'',
                changeModuleTyped: false,
                FootClickTypeName: '请选择点击类型',
                FootClickType1:'',
                FootToClickWebViewUrl:'',
                FootToBookName:'',
                showFootToBookName: true,
                ImageClickType:'',
                date: '',
                dateAdd:'',
                nameOrAuthor:'',
                isOnshelf: 1,
                shortNameOrAuthor: '',
                shortIsOnshelf: 1,
                showFootOperationId:true,
                showFootToClickWebViewUrl: true,
                changeFootClickTyped:false,
                showImageToClickWebViewUrl:true,
                showImageOperationId:true,
                showImageToBookId:false,
                showImageToBookName:true,
                ImageToBookId:'',
                ImageOperationId:'',
                ImageToBookName:'',
                ImageToOperationId:'',
                ImageToClickWebViewUrl:'',
                ImageClickTypeName: '请选择点击图片类型',
                ImageClickType1:'',
                changeImageClickTyped:false,
                showShortBookList:false,
                showBookThemeList: false,
                flagDetail: false,
                flagImg: false,
                moduleDetailBookName: '',
                DetailClickType:'',
                indexActive: '',
                fileList: [],
                fileListImg: [],
                fileListImgAdd: [],
                imgAddIndex:'',
                fileListAdd: [],
                url:'',
                imgIndex:'',
                rowIndex:'',
                uploadUrl: 'http://47.52.25.158:9002/api/commons/common/upload?sessionKey='+localStorage.SessionKey,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                isPay:{isPay:'1'},
                TitleAdd:'',
                NoticeAdd:'',
                SerialNumberAdd:'',
                StoreVersionAdd1:'',
                StoreVersionAdd:'',
                ModuleTypeAdd:'',
                IsPreviewAdd:'',
                FootNameAdd:'',
                FootClickTypeAdd: '请选择点击类型',
                FootOperationIdAdd:'',
                FootToClickWebViewUrlAdd:'',
                ImageUrlAdd:'',
                ImageToClickWebViewUrlAdd:'',
                ImageClickTypeAdd: '请选择点击图片类型',
                ImageOperationIdAdd:'',
                ImageToBookIdAdd:'',
                DetailClickTypeAdd:'请选择模块类型',
                ClickTypeAdd1:'',
                toBookListed: false,
                toBookRankinged:false,
                toThemeListed: false,
                toStoreListed:false,
            }
        },
        created() {

        },
        methods: {
            showEdit(){
                if(this.$store.state.dataConfig.getModulelist.dialogFormVisibleModuleDetail){
                    this.dialogFormVisibleDetail = true
                } else{
                    this.dialogFormVisibleAdd = true
                }
            },
            showImageToBookName(){
                this.$nextTick(function() {
                    this.ImageToBookName = this.$store.state.dataConfig.getModule.ImageToBookName
                })
            },
            storeVersionAdd(){
                this.StoreVersionAdd = this.$store.state.dataConfig.getModulelist.BookStoreVersion
                this.StoreVersionAdd1 = this.$store.state.dataConfig.getModulelist.BookStoreVersion1

            },
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
                let that = this
                this.$store.dispatch('getModule',
                    {payload: {sessionKey:localStorage.SessionKey, id:this.$route.params.Id,isPay:'1'}})
                    .then(response => {
                        setTimeout(function(){
                            that.initDate()
                            let Previewed = that.list.IsPreview
                            if(Previewed){
                                that.IsPreview = "是"
                            } else{
                                that.IsPreview = "否"
                            }
                        },1000)
                    }
                )
            },
            getModuleTypeList() {
                this.$store.dispatch('getModuleTypeList', {
                    page:{"PageIndex":"1","PageSize":"10"}
                }).then(
                    (response) => {
                    }
                ).catch()
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
                if(this.changeFootClickTyped){
                    this.FootClickType1 = this.$refs.FootClickTypeName.value
                } else{
                    this.FootClickType1 = this.list.FootClickType
                }
                if(this.changeImageClickTyped) {
                    this.ImageClickType1 = this.$refs.ImageClickTypeName.value
                } else{
                    this.ImageClickType1 = this.list.ImageClickType
                }
                if(this.changeModuleTyped) {
                    this.ModuleType1 = this.$refs.ModuleType.value
                } else{
                    this.ModuleType1 = this.list.ModuleType
                }
                let data = {
                    Id: this.list.Id,
                    ModuleType: this.ModuleType1,
                    Notice: this.list.Notice,
                    Title: this.list.Title,
                    IsHasFoot:this.list.IsHasFoot,
                    SerialNumber:this.$refs.SerialNumber.value,
                    StoreVersion: this.StoreVersionName,
                    BeginDate:this.list.BeginDate,
                    EndDate:this.list.EndDate,
                    IsPreview:this.$refs.IsPreview.value,
                    FootName:this.$refs.FootName.value,
                    FootClickType: this.FootClickType1,
                    FootOperationId: this.$refs.FootOperationId.value,
                    FootToClickWebViewUrl: this.$refs.FootToClickWebViewUrl.value,
                    ImageUrl: this.$refs.ImageUrl.src,
                    ImageClickType: this.ImageClickType1,
                    ImageToBookId: this.$refs.ImageToBookId.value,
                    ImageOperationId: this.$refs.ImageOperationId.value,
                    ImageToClickWebViewUrl: this.$refs.ImageToClickWebViewUrl.value,
                    detail: this.getModuleDetailListTableData
                }
                let that = this
                this.$store.dispatch('upDate', {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data:data
                }).then(
                    (response) => {
                        this.$store.state.dataConfig.getModulelist.refresh = false
                        this.$message.success('保存成功');
                        setTimeout(function() {
                            that.$router.push('/bookStoreList')
                        },1000)
                    }
                ).catch(

                )
            },
            onSubmitAdd(){

                let d = new Date(this.dateAdd[0])
                let d1 = new Date(this.dateAdd[1])
                let BeginDateAdd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                let EndDateAdd = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate() + ' ' + d1.getHours() + ':' + d1.getMinutes() + ':' + d1.getSeconds();
                let data  = {
                    ModuleType: this.$refs.ModuleTypeAdd.value,
                    Notice:this.NoticeAdd,
                    Title: this.TitleAdd,
                    IsHasFoot: true,
                    IsPreview: this.$refs.IsPreviewAdd.value,
                    SerialNumber:this.SerialNumberAdd,
                    StoreVersion: this.StoreVersionAdd1,
                    BeginDate:BeginDateAdd,
                    EndDate:EndDateAdd,
                    FootName: this.$refs.FootNameAdd.value,
                    FootClickType: this.$refs.FootClickTypeAdd.value,
                    FootOperationId:this.$refs.FootOperationIdAdd.value,
                    FootToClickWebViewUrl:this.$refs.FootToClickWebViewUrlAdd.value,
                    ImageUrl: this.$refs.ImageUrlAdd.src,
                    ImageClickType: this.$refs.ImageClickTypeAdd.value,
                    ImageToClickWebViewUrl: this.$refs.ImageToClickWebViewUrlAdd.value,
                    ImageToBookId: this.$refs.ImageToBookIdAdd.value,
                    ImageOperationId: this.$refs.ImageOperationIdAdd.value,
                    detail: this.AddTableDataDetails
                }
                let that = this
                this.$store.dispatch('addModule', {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data:data
                }).then(
                    (response) => {
                        this.$store.state.dataConfig.getModulelist.refresh = false
                        this.$message.success('保存成功');
                        setTimeout(function() {
                            that.$router.push('/bookStoreList')
                        },1000)
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
            _toFoot(){
                this.ImageOperationIdAdd = this.$store.state.dataConfig.getModuleDetailList.ImageOperationIdAdd
                this.FootOperationIdAdd = this.$store.state.dataConfig.getModuleDetailList.FootOperationIdAdd
                if(this.toBookListed){
                    this.$router.push(this.$route.query.redirect || '/booklist')
                }
                if(this.toBookRankinged){
                    this.$router.push(this.$route.query.redirect || '/bookranking')
                }
                if(this.toThemeListed) {
                    this.$router.push(this.$route.query.redirect || '/bookThemeList')
                }
                if(this.toStoreListed) {
                    this.$router.push(this.$route.query.redirect || '/bookStoreList')
                }
            },
            _toFootAdd(index) {
                this.$store.state.dataConfig.getModuleDetailList.index = index
                if(this.toBookListed){
                    this.$router.push(this.$route.query.redirect || '/booklist')
                }
                if(this.toBookRankinged){
                    this.$router.push(this.$route.query.redirect || '/bookranking')
                }
                if(this.toThemeListed) {
                    this.$router.push(this.$route.query.redirect || '/bookThemeList')
                }
                if(this.toStoreListed) {
                    this.$router.push(this.$route.query.redirect || '/bookStoreList')
                }
            },
            changeModuleType(){
                this.changeModuleTyped =true
            },
            changeFootClickType() {
                this.$store.state.dataConfig.getModule.list.FootOperationId = ''
                this.$store.state.dataConfig.getModule.flagImg = false
                this.$store.state.dataConfig.getModule.flagDetail = false
                this.$store.state.dataConfig.getModule.flagFoot = true
                this.changeFootClickTyped =true
                this.showFootOperationId = true
                this.showFootToClickWebViewUrl = true
                this.showFootToBookName = true
                this.$nextTick(function(){
                    let value = this.$refs.FootClickTypeName.value
                    console.log("**99***99")
                    if(value === 21){
                        this.showFootOperationId = false
                        this.showFootToBookName = false
                    }
                    if(value === 22){
                        this.showFootToClickWebViewUrl = false
                        this.showFootOperationId = false
                        this.toBookListed = true
                        this.toBookRankinged = false
                        this.toThemeListed = false
                        this.toStoreListed = false
                        this.$nextTick(function() {
                            this.FootToBookName = this.$store.state.dataConfig.getModule.FootToBookName
                        })
                    }
                    if(value === 23) {
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                        this.toBookRankinged = true
                        this.toBookListed = false
                        this.toThemeListed = false
                        this.toStoreListed = false
                    }
                    if(value === 24){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 25){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 28){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 29){
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                        this.toThemeListed = true
                        this.toBookListed = false
                        this.toBookRankinged = false
                        this.toStoreListed = false
                    }
                    if(value === 30){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 31){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 32){
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                        this.toStoreListed = true
                        this.toBookListed = false
                        this.toBookRankinged = false
                        this.toThemeListed = false
                    }
                })
            },
            changeFootClickTypeAdd(){
                this.$store.state.dataConfig.getModule.list.FootOperationId = ''
                this.$store.state.dataConfig.getModule.flagImg = false
                this.$store.state.dataConfig.getModule.flagDetail = false
                this.$store.state.dataConfig.getModule.flagFoot = true
                this.showFootOperationId = true
                this.showFootToClickWebViewUrl = true
                this.showFootToBookName = true
                this.$nextTick(function(){
                    let value = this.$refs.FootClickTypeAdd.value
                    console.log("**99***99")
                    if(value === 21){
                        this.showFootOperationId = false
                        this.showFootToBookName = false
                    }
                    if(value === 22){
                        this.showFootToClickWebViewUrl = false
                        this.showFootOperationId = false
                        this.toBookListed = true
                        this.toBookRankinged = false
                        this.toThemeListed = false
                        this.toStoreListed = false
                    }
                    if(value === 23) {
                        this.showFootToClickWebViewUrl = false
                        this.toBookRankinged = true
                        this.showFootToBookName = false
                        this.toBookListed = false
                        this.toThemeListed = false
                        this.toStoreListed = false
                        this.FootOperationIdAdd = this.$store.state.dataConfig.getModuleDetailList.FootOperationIdAdd
                    }
                    if(value === 24){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 25){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 28){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 29){
                        this.showFootToClickWebViewUrl = false
                        this.toThemeListed = true
                        this.showFootToBookName = false
                        this.toBookListed = false
                        this.toBookRankinged = false
                        this.toStoreListed = false
                        this.FootOperationIdAdd = this.$store.state.dataConfig.getModuleDetailList.FootOperationIdAdd
                    }
                    if(value === 30){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 31){
                        this.showFootOperationId = false
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                    }
                    if(value === 32){
                        this.showFootToClickWebViewUrl = false
                        this.showFootToBookName = false
                        this.toStoreListed = true
                        this.toBookListed = false
                        this.toBookRankinged = false
                        this.toThemeListed = false
                        this.FootOperationIdAdd = this.$store.state.dataConfig.getModuleDetailList.FootOperationIdAdd
                    }
                })
            },
            changeImageClickType() {
                this.$store.state.dataConfig.getModule.list.ImageToBookId = ''
                this.changeImageClickTyped = true
                this.showImageOperationId = true
//                this.showImageToBookId = true
                this.showImageToBookName = true
                this.showImageToClickWebViewUrl = true
                this.$store.state.dataConfig.getModulelist.refresh = true
                this.$store.state.dataConfig.getModule.flagFoot = false
                this.$store.state.dataConfig.getModule.flagDetail = false
                this.$store.state.dataConfig.getModule.flagImg = true
                this.$nextTick(function(){
                    let value = this.$refs.ImageClickTypeName.value
                    if(value === "跳转到WebView" || value === 21){
                        this.showImageOperationId = false
                        this.showImageToBookId = false
                        this.showImageToBookName = false
                    }
                    if(value === 22) {
                        this.toThemeListed = false;
                        this.toBookListed = true;
                        this.toBookRankinged = false;
                        this.toStoreListed = false;
                        this.showImageToClickWebViewUrl = false;
                        this.showImageOperationId = false;
//                        this.showImageToBookName = true;
                    }
                    if(value === 24) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 25) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 28) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 29){
                        this.showImageToClickWebViewUrl = false;
                        this.showImageToBookId = false;
                        this.showImageToBookName = false
                        this.toThemeListed = true;
                        this.toBookListed = false;
                        this.toBookRankinged = false;
                        this.toStoreListed = false
                    }
                    if(value === 30) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 31) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 32){
                        this.showImageToClickWebViewUrl = false;
                        this.showImageToBookId = false;
                        this.showImageToBookName = false
                        this.toThemeListed = false;
                        this.toBookListed = false;
                        this.toBookRankinged = false;
                        this.toStoreListed = true
                    }
                    if(value === 23) {
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookId = false
                        this.showImageToBookName = false
                        this.toThemeListed = false
                        this.toBookListed = false
                        this.toBookRankinged = true
                        this.toStoreListed = false
                    }
                })
            },
            changeImageClickTypeAdd(){
                this.$store.state.dataConfig.getModule.list.ImageToBookId = ''
                this.showImageOperationId = true
//                this.showImageToBookId = true
                this.showImageToBookName = true
                this.showImageToClickWebViewUrl = true
                this.$store.state.dataConfig.getModulelist.refresh = true
                this.$store.state.dataConfig.getModule.flagFoot = false
                this.$store.state.dataConfig.getModule.flagDetail = false
                this.$store.state.dataConfig.getModule.flagImg = true
                this.$nextTick(function(){
                    let value = this.$refs.ImageClickTypeAdd.value
                    if(value === "跳转到WebView" || value === 21){
                        this.showImageOperationId = false
                        this.showImageToBookId = false
                        this.showImageToBookName = false
                    }
                    if(value === 22) {
                        this.toThemeListed = false;
                        this.toBookListed = true;
                        this.toBookRankinged = false;
                        this.toStoreListed = false;
                        this.showImageToClickWebViewUrl = false;
                        this.showImageOperationId = false;
                        this.ImageOperationIdAdd = this.$store.state.dataConfig.getModuleDetailList.ImageOperationIdAdd
                    }
                    if(value === 24) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 25) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 28) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 29){
                        this.showImageToClickWebViewUrl = false;
                        this.showImageToBookId = false;
                        this.showImageToBookName = false
                        this.toThemeListed = true;
                        this.toBookListed = false;
                        this.toBookRankinged = false;
                        this.toStoreListed = false
                        this.ImageOperationIdAdd = this.$store.state.dataConfig.getModuleDetailList.ImageOperationIdAdd
                    }
                    if(value === 30) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 31) {
                        this.showImageOperationId = false;
                        this.showImageToBookId = false;
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookName = false
                    }
                    if(value === 32){
                        this.showImageToClickWebViewUrl = false;
                        this.showImageToBookId = false;
                        this.showImageToBookName = false
                        this.toThemeListed = false;
                        this.toBookListed = false;
                        this.toBookRankinged = false;
                        this.toStoreListed = true;
                        this.ImageOperationIdAdd = this.$store.state.dataConfig.getModuleDetailList.ImageOperationIdAdd
                    }
                    if(value === 23) {
                        this.showImageToClickWebViewUrl = false
                        this.showImageToBookId = false
                        this.showImageToBookName = false
                        this.toThemeListed = false
                        this.toBookListed = false
                        this.toBookRankinged = true
                        this.toStoreListed = false

                    }
                })
            },
            changeClickType(index,row) {
                console.log("***************")
                console.log(row)
                this.$store.state.dataConfig.getModulelist.refresh = true
                this.$store.state.dataConfig.getModule.flagImg = false
                this.$store.state.dataConfig.getModule.flagFoot = false
                this.$store.state.dataConfig.getModule.flagDetail = true
                this.$store.state.dataConfig.getModule.index = index
                console.log(row.ClickTypeName)
                if(row.ClickTypeName === 22) {
                    this.getModuleDetailListTableData[index].ClickType = 22
                    this.toBookListed = true
                    this.toBookRankinged = false
                    this.toThemeListed = false
                    this.toStoreListed = false
                }
                if(row.ClickTypeName === 23) {
                    this.getModuleDetailListTableData[index].ClickType = 23
                    this.toBookRankinged = true
                    this.toBookListed = false
                    this.toThemeListed = false
                    this.toStoreListed = false
                }
                if(row.ClickTypeName === 29) {
                    this.getModuleDetailListTableData[index].ClickType = 29
                    this.toThemeListed = true
                    this.toBookListed = false
                    this.toBookRankinged = false
                    this.toStoreListed = false
                }
                if(row.ClickTypeName === 32) {
                    this.getModuleDetailListTableData[index].ClickType = 32
                    this.toStoreListed = true
                    this.toBookListed = false
                    this.toBookRankinged = false
                    this.toThemeListed = false
                }
            },
            changeClickTypeAdd(vId){
                let obj = {};
                obj = this.ModuleClickTypeList.find((item)=>{
                    return item.ClickType === vId;
                });
                this.$store.state.dataConfig.getModuleDetailList.ClickTypeAdd1.push(obj.ClickType)
                let value = obj.ClickType
                this.$store.state.dataConfig.getModulelist.refresh = true
                this.$store.state.dataConfig.getModule.flagImg = false
                this.$store.state.dataConfig.getModule.flagFoot = false
                this.$store.state.dataConfig.getModule.flagDetail = true
                if(value === 22) {
                    this.toBookListed = true
                    this.toBookRankinged = false
                    this.toThemeListed = false
                    this.toStoreListed = false
                }
                if(value === 23) {
                    this.toBookRankinged = true
                    this.toBookListed = false
                    this.toThemeListed = false
                    this.toStoreListed = false
                }
                if(value === 29) {
                    this.toThemeListed = true
                    this.toBookListed = false
                    this.toBookRankinged = false
                    this.toStoreListed = false
                }
                if(value === 32) {
                    this.toStoreListed = true
                    this.toBookListed = false
                    this.toBookRankinged = false
                    this.toThemeListed = false
                }
            },
            changeImg(index,row) {
                this.imgIndex = index;
                this.rowIndex = row;
                let lists = document.querySelectorAll(".el-upload-list")
                for (let list of lists) {
                    list.style.display = "none"
                }
            },
            handleSuccess(response,file,fileList) {
                console.log(response)
                this.getModuleDetailListTableData[this.imgIndex].IconUrl = response.dt[0].FileUrl
            },
            handleSuccessImg(response,file,fileList) {
                this.$refs.ImageUrl.src = response.dt[0].FileUrl
            },
            handleSuccessImgAdd(response,file,fileList) {
                this.$refs.ImageUrlAdd.src = response.dt[0].FileUrl
            },
            changeImgAdd(index) {
                this.imgAddIndex = index;
                let lists = document.querySelectorAll(".el-upload-list")
                for (let list of lists) {
                    list.style.display = "none"
                }
            },
            handleSuccessAdd(response,file,fileList) {
                console.log(response)
                this.AddTableDataDetails[this.imgAddIndex].IconUrl = response.dt[0].FileUrl
            },
            handleAddDetail() {
                let length = this.getModuleDetailListTableData.length
                let item = {
                    __RowNumber: length+1,
                    ClickTypeName:"",
                    NewPriceText:'',
                    IconUrl:'',
                    Name:"",
                    MinVer:'',
                    Author:"",
                    ClickWebViewUrl:'',
                    Category:"",
                    ClickType:'',
                    Id:'',
                    BookId:'',
                    BookName:"'",
                    OldPriceText:'',
                    OperationId:'',
                    SerialNumber:'',
                    Summary:'',
                    Tag:""
                }
                this.getModuleDetailListTableData.push(item)
            },
            addtr() {
                var tableItem = {
                    "IconUrl":'',
                    "Name":'',
                    "Summary":'',
                    "Author":'',
                    "Tag":'',
                    "Category":'',
                    "ClickType":'',
                    "BookId":'',
                    "BookName":'',
                    "OperationId":'',
                    "ClickWebViewUrl":'',
                    "SerialNumber":'',
                    "MinVer":''
                }
                this.AddTableDataDetails.push(tableItem)
            },
            deleteTr(e) {
                e.currentTarget.parentNode.parentNode.remove()
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
            listName: function() {
                return  this.$store.state.dataConfig.getModule.listName
            },
            listAdd: function() {
                return  this.$store.state.dataConfig.getModule.listAdd
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
            BookStoreversionList: function() {
                return  this.$store.state.dataConfig.getBookStoreversionList.list
            },
            listSvr: function() {
                let listStr = []
                let list = this.$store.state.dataConfig.getBookStoreversionList.list
                for (let i=0;i<list.length;i++){
                    let item = {
                        "StoreVersion": list[i].StoreVersion,
                        "Description": list[i].Description,
                        "Id": i
                    }
                    listStr.push(item)
                }
                return listStr
            },
            AddTableDataDetails: function() {
                return  this.$store.state.dataConfig.getModuleDetailList.AddTableDataDetails
            }

        },
        watch: {
            Id (val,oldval) {
                var refreshed = this.$store.state.dataConfig.getModulelist.refresh
                var showed = this.$store.state.dataConfig.getModulelist.dialogFormVisibleModuleDetail
                if(!refreshed){
                        this.getModule(),
                            this.storeVersionAdd()
                        this.getModuleClickTypeList(),
                        this.getModuleDetailList()
                }
                if(showed) {
                    this.dialogFormVisibleDetail = true
                    this.dialogFormVisibleAdd = false
                } else{
                    this.dialogFormVisibleAdd = true
                    this.dialogFormVisibleDetail = false
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
        width: 100%;
        padding: 20px;
        .el-table__body-wrapper {
            position: relative;
        }
    }
    .topModule{
        height: 300px;
        .el-form-item{
            width: 33.33%;
            float: left;
        }
    }
    .font .el-form-item{
        width: 80%;
    }
    .image .el-form-item{
        width: 80%;
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
    .moduleDetail{
        width: 100%;
        overflow-x: scroll;
        .el-table{
            width: 2000px;
            max-width: 200%;
            .el-table__body-wrapper{
                overflow: hidden;
                position: relative;
            }
        }
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
    .detailAdd{
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
    .datePicker .el-input{
        width: 400px;
    }
    ::-webkit-scrollbar {
        width: 0px;
        height: 16px;
        background-color: #f9f9f9;
    }
    .table_container ::-webkit-scrollbar {
        width: 0;
        height: 16px;
        background: #e0e0e0;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 0px;
        background-color: #e0e0e0;
    }
</style>
