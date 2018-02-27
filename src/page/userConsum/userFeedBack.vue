<template>
    <div class="userFeedBack fillcontain ">
        <head-top></head-top>
        <div class="userFilter">
            <el-form ref="filterForm" :inline="true">
                <el-form-item label="反馈类型列表:">
                    <el-select v-model="feedBackTypeId" ref="feedBackTypeId" placeholder="请选择反馈类型" @change="_feedBackTypeId" class="filter f4">
                        <el-option
                            v-for="item in feedBackTypeIdArr"
                            :key="item.FeedBackTypeId"
                            :label="item.FeedbackTypeName"
                            :value="item.FeedBackTypeId" >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="反馈版本列表:">
                    <el-select v-model="vsn" ref="vsn" placeholder="请选择反馈版本" @change="_vsn" class="filter f4">
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
            <el-button type="primary"  @click="dialogVisible = true">回复</el-button>
            <el-button type="success">发送</el-button>
        </div>
        <div class="table_container">
            <el-table
                :data="userFeedBack"
                border
                style="width: 100%" >
                <el-table-column
                    prop="FeedbackTypeName"
                    label="反馈类型名">
                </el-table-column>
                <el-table-column
                    prop="UserId"
                    label="用户Id"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="NickName"
                    label="用户昵称"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="BookName"
                    label="书名">
                </el-table-column>
                <el-table-column
                    prop="BookVolumeName"
                    label="章节名称">
                </el-table-column>
                <el-table-column
                    label="反馈内容" width="200">
                    <template slot-scope=" scope">
                        <p style="width: 100%;height: 50px" :title=scope.row.Content  class="Content">{{scope.row.Content}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Created"
                    label="反馈时间" width="180">
                </el-table-column>
                <el-table-column
                    prop="Channel"
                    label="渠道">
                </el-table-column>
                <el-table-column
                    prop="Contact"
                    label="联系方式">
                </el-table-column>
                <el-table-column
                    prop="PhoneModel"
                    label="手机型号">
                </el-table-column>
                <el-table-column
                    prop="ReleaseVersion"
                    label="系统版本号">
                </el-table-column>
                <el-table-column
                    prop="Vsn"
                    label="程序版本号">
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
            <el-input type="textarea" style="height: 100px"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary">提交</el-button>
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
                dialogVisible: false

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
                let minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                return y + '-' + m + '-' + d+' '+h+':'+minute;
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


