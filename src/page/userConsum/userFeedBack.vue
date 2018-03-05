<template>
    <div class="userFeedBack fillcontain ">
        <head-top></head-top>
        <div class="userFilter">
            <el-form ref="filterForm" :inline="true">
                <el-form-item label="反馈类型列表:">
                    <el-select v-model="feedBackTypeId"  clearable ref="feedBackTypeId" placeholder="请选择反馈类型" @change="_feedBackTypeId" class="filter f4">
                        <el-option
                            v-for="item in feedBackTypeIdArr"
                            :key="item.FeedBackTypeId"
                            :label="item.FeedbackTypeName"
                            :value="item.FeedBackTypeId" >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="反馈版本列表:">
                    <el-select v-model="vsn" ref="vsn" clearable placeholder="请选择反馈版本" @change="_vsn" class="filter f4">
                        <el-option
                            v-for="item in vsnArr"
                            :key="item.__RowNumber"
                            :label="item.Txt"
                            :value="item.Val" >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:"  class="datePicker">
                    <el-date-picker
                        v-model="filterDate"
                        type="datetimerange"
                        size="large"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="float: right;margin-right: 20px;margin-bottom: 10px">
            <el-button type="primary"  @click="_reply">回复</el-button>
            <el-button type="success" @click="_sendreply">发送</el-button>
        </div>
        <div class="table_container">
            <el-table
                :data="userFeedBack"
                border
                highlight-current-row
                @row-click="_checkrow"
                style="width: 100%" >
                <el-table-column
                    label="反馈类型名" width="120">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.FeedbackTypeName  class="Content">{{scope.row.FeedbackTypeName}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户Id"
                    width="100">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.UserId  class="Content">{{scope.row.UserId}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户昵称"
                    width="120">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.NickName  class="Content">{{scope.row.NickName}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="书名">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.BookName  class="Content">{{scope.row.BookName}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="章节名称">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.BookVolumeName  class="Content">{{scope.row.BookVolumeName}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="反馈内容" width="200">
                    <template slot-scope=" scope">
                        <p style="width: 100%;height: 50px" :title=scope.row.Content  class="Content">{{scope.row.Content}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="反馈时间" width="180">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.Created  class="Content">{{scope.row.Created}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="回复内容" width="200">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.Reply  class="Content" >{{scope.row.Reply}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="回复时间" width="180">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.ReplyTime  class="Content">{{scope.row.ReplyTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="回复人">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.ReplyUser  class="Content">{{scope.row.ReplyUser}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否发送" width="120">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.IsSend  class="Content">{{scope.row.IsSend}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="渠道">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.Channel  class="Content">{{scope.row.Channel}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="联系方式">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.Contact  class="Content">{{scope.row.Contact}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="手机型号">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.PhoneModel  class="Content">{{scope.row.PhoneModel}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="系统版本号">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.ReleaseVersion  class="Content">{{scope.row.ReleaseVersion}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="程序版本号">
                    <template slot-scope=" scope">
                        <p style="width: 100%" :title=scope.row.Vsn  class="Content">{{scope.row.Vsn}}</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-left: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="userFeedBackRecordCount">
            </el-pagination>
        </div>
        <el-dialog
            title="回复内容"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-input type="textarea" style="height: 100px" v-model="Reply"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="_submitReply">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
            this.feedBackType()
            this.feedBackTypeVsn()
        },
        data() {
            return {
                feedBackTypeId:'',
                feedBackTypeIdArr: [],
                vsn:'',
                vsnArr: [],
                filterDate:'',
                BeginDate:'',
                EndDate:'',
                dialogVisible: false,
                FeedBackId:'',
                Reply:'',
                submited: false,
                index:''
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
            formatDate(date) {
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h= h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+s;
            },
            initDate() {
                let d1 = new Date(this.filterDate[0])
                let d2 = new Date(this.filterDate[1])
                this.BeginDate = this.formatDate(d1)
                this.EndDate = this.formatDate(d2)
                this.$store.state.dataConfig.userConsumPtion.BeginDate = this.BeginDate
                this.$store.state.dataConfig.userConsumPtion.EndDate = this.EndDate
            },
            feedBackType() {
                this.$http.get('report/feedbacktype/1/10/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1).then(res=>{
                    this.feedBackTypeIdArr = res.body.dt.PageData
                    console.log(res.body.dt.PageData)
                })
            },
            handleCurrentChange(val) {
                this.initDate()
                let data = {
                    begin: this.BeginDate,
                    end: this.EndDate,
                    feedBackTypeId:this.$refs.feedBackTypeId.value,
                    vsn: this.$refs.vsn.value
                }
                console.log(data)
                this.$store.dispatch('userFeedBack', {
                    page:{"PageIndex": val,"PageSize":"10"},
                    params:data
                })
            },
            feedBackTypeVsn() {
                this.$http.get('report/feedbacktypevsn/1/10/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1).then(res=>{
                    this.vsnArr = res.body.dt.PageData
                    console.log(res.body.dt.PageData)
                })
            },
            search(){
                console.log("*******")
                this.initDate()
                let data = {
                    begin: this.BeginDate,
                    end: this.EndDate,
                    feedBackTypeId:this.$refs.feedBackTypeId.value,
                    vsn: this.$refs.vsn.value
                }
                console.log(data)
                this.$store.dispatch('userFeedBack', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                })
            },
            _feedBackTypeId() {
                this.search()
            },
            _vsn() {
                this.search()
            },
            _checkrow(row){
                console.log(row)
                this.FeedBackId = row.FeedbackId
                this.index = row.__RowNumber
            },
            _reply() {
                this.dialogVisible = true
            },
            _submitReply() {
                let that = this
                that.submited = true
                let params = {
                    FeedBackId: this.FeedBackId,
                    Reply: this.Reply
                }
                this.$http.post('report/userfeedback/reply/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,params).then(res=>{
                    if(res.data.st === 0) {
                        this.$message.success('发送成功')
                    }
                    that.dialogVisible = false
                    that.search()
                })
            },
            _sendreply() {
                let that = this
                let params = {
                    FeedBackId: this.FeedBackId,
                }
                if(that.userFeedBack[index-1].Reply){
                    this.$http.post('report/userfeedback/sendreply/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1,params).then(res=>{
                        if(res.data.st === 0) {
                            this.$message.success('已经发送过了');
                        } else{
                            this.$message.success('发送成功');
                            that.search()
                        }
                    })
                }
            }
        },
        computed: {
            sessionKey: function () {
                return this.$store.state.auth.SessionKey
            },
            userFeedBack: function() {
                return this.$store.state.dataConfig.userFeedBack.list
            },
            userFeedBackRecordCount: function() {
                return this.$store.state.dataConfig.userFeedBack.RecordCount
            }
        },
        watch: {
            '$route'(to, from) {

            },
            sessionKey: function (val, odlVal) {
                if (val === 2) {
                    alert("session过期")
                    this.$router.push(this.$route.query.redirect || '/')
                }
            },
        }
    }
</script>

<style  lang="less">
    .userFeedBack{
        .el-textarea__inner{
            height: 100px;
        }
        .userFilter{
            padding: 20px;
            padding-bottom: 0;
            .filter{
                margin-right: 10px;
            }
            .f1{
                width: 300px;
            }
        }
        .filterSearch{
            float: right;
            height: 40px;
            margin-bottom: 10px;
        }
        .table_container {
            padding: 20px;
            .el-table__body tr.current-row>td {
                background: rgba(0, 0, 45, .35)!important;
            }
            .Content{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
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
        }
    }
</style>

