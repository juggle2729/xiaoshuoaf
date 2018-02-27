<template>
    <div class="userInfo fillcontain ">
        <head-top></head-top>
        <div class="userFilter">
            <el-form ref="filterForm" :inline="true">
                <el-select v-model="filterForm.orderBy" ref="orderBy" placeholder="请选择排序方式" @change="orderBySearch" class="filter f1">
                    <el-option label="年龄从小到大" value="Age"></el-option>
                    <el-option label="年龄从大到小" value="Age DESC"></el-option>
                    <el-option label="用户ID从小到大" value="UserId"></el-option>
                    <el-option label="用户ID从大到小" value="UserId DESC"></el-option>
                    <el-option label="总充值金额从小到大" value="TotalPayAmount"></el-option>
                    <el-option label="总充值金额从大到小" value="TotalPayAmount DESC"></el-option>
                    <el-option label="充值金币数从小到大" value="TotalRechargeCoin"></el-option>
                    <el-option label="充值金币数从大到小" value="TotalRechargeCoin  DESC"></el-option>
                    <el-option label="剩余充值币数从小到大" value="RechargeCoin"></el-option>
                    <el-option label="剩余充值币数从大到小" value="RechargeCoin DESC"></el-option>
                    <el-option label="赠送金币数从小到大" value="TotalGivenCoin"></el-option>
                    <el-option label="赠送金币数从大到小" value="TotalGivenCoin DESC"></el-option>
                    <el-option label="剩余赠送金币数从小到大" value="GivenCoin"></el-option>
                    <el-option label="剩余赠送金币数从大到小" value="GivenCoin DESC"></el-option>
                    <el-option label="充值VIP天数从小到大" value="TotalVipDays"></el-option>
                    <el-option label="充值VIP天数从大到小" value="TotalVipDays DESC"></el-option>
                    <el-option label="剩余VIP天数从小到大" value="RemainderVipDays"></el-option>
                    <el-option label="剩余VIP天数从大到小" value="RemainderVipDays DESC"></el-option>
                    <el-option label="书架数从小到大" value="BookShelfCount"></el-option>
                    <el-option label="书架数从大到小" value="BookShelfCount DESC"></el-option>
                    <el-option label="阅读数从小到大" value="ReadCount"></el-option>
                    <el-option label="阅读数从大到小" value="ReadCount DESC"></el-option>
                    <el-option label="完成任务数从小到大" value="TaskCount"></el-option>
                    <el-option label="完成任务数从大到小" value="TaskCount DESC"></el-option>
                    <el-option label="累积登陆数从小到大" value="SignCount"></el-option>
                    <el-option label="累积登陆数从大到小" value="SignCount DESC"></el-option>
                    <el-option label="注册时间从近到远" value="Created"></el-option>
                    <el-option label="注册时间从远到近" value="Created DESC"></el-option>
                </el-select>
                <el-form-item label="用户ID:" class="filter f2">
                    <el-input  v-model="filterForm.userId" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称:" class="filter f3">
                    <el-input  v-model="filterForm.NickName" style="width: 80px"></el-input>
                </el-form-item>
                <el-form-item label="渠道:">
                    <el-select v-model="filterForm.channel" ref="channel" placeholder="请选择渠道" @change="channel" class="filter f4">
                        <el-option
                            v-for="item in channelArr"
                            :key="item.__RowNumber"
                            :label="item.txt"
                            :value="item.val" >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                :data="userInfo"
                border
                style="width: 100%" >
                <el-table-column
                    prop="UserId"
                    label="用户Id"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="UserName"
                    label="用户名" width="120">
                </el-table-column>
                <el-table-column
                    prop="Nickname"
                    label="昵称">
                </el-table-column>
                <el-table-column
                    prop="Sex"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="Age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="TotalPayAmount"
                    label="充值总金额">
                </el-table-column>
                <el-table-column
                    prop="TotalRechargeCoin"
                    label="充值金币数">
                </el-table-column>
                <el-table-column
                    prop="TotalGivenCoin"
                    label="赠送金币数">
                </el-table-column>
                <el-table-column
                    prop="RechargeCoin"
                    label="剩余充值币数">
                </el-table-column>
                <el-table-column
                    prop="GivenCoin"
                    label="剩余赠送金币数" width="120">
                </el-table-column>
                <el-table-column
                    prop="TotalVipDays"
                    label="充值VIP天数">
                </el-table-column>
                <el-table-column
                    prop="RemainderVipDays"
                    label="剩余VIP天数">
                </el-table-column>
                <el-table-column
                    label="书架数">
                    <template slot-scope=" scope">
                        <p style="width: 100%;height: 100%" @click="_toUserBookShelf(scope.$index, scope.row)">{{scope.row.BookShelfCount}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ReadCount"
                    label="阅读数">
                </el-table-column>
                <el-table-column
                    label="完成任务数">
                    <template slot-scope=" scope">
                        <p style="width: 100%;height: 100%" @click="_toUserTask(scope.$index, scope.row)">{{scope.row.TaskCount}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SignCount"
                    label="累积登陆数">
                </el-table-column>
                <el-table-column
                    prop="Created"
                    label="注册时间" width="200">
                </el-table-column>
                <el-table-column
                    prop="LastReadTime"
                    label="最后阅读时间" width="200">
                </el-table-column>
                <el-table-column
                    prop="Mobile"
                    label="联系方式" width="200">
                </el-table-column>
                <el-table-column
                    prop="Channel"
                    label="渠道">
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-left: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="userInfoRecordCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
            this.getChannel()
        },
        data() {
            return {
                filterForm: {
                    userId:'',
                    NickName:'',
                    orderBy:'',
                    channel:''
                },
                channelArr: [],

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
            getChannel() {
                this.$http.get('api/materiels/getchannel/1/10/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1).then(res=>{
                    this.channelArr = res.body.dt.PageData
                    console.log(res.body.dt.PageData)
                })
            },
            search(){
                let data = {
                    userId: this.filterForm.userId,
                    nickName: this.filterForm.NickName,
                    channel:this.$refs.channel.value,
                    orderBy: this.$refs.orderBy.value
                }
                console.log(data)
                this.$store.dispatch('userInfo', {
                    page:{"PageIndex":"1","PageSize":"15"},
                    params:data
                })
            },
            orderBySearch() {
                this.search()
            },
            channel() {
                this.search()
            },
            handleCurrentChange(val) {
                let data = {
                    userId: this.filterForm.userId,
                    nickName: this.filterForm.NickName,
                    channel:this.$refs.channel.value,
                    orderBy: this.$refs.orderBy.value
                }
                console.log(data)
                this.$store.dispatch('userInfo', {
                    page:{"PageIndex":val,"PageSize":"15"},
                    params:data
                })
            },
            _toUserBookShelf(index,row) {
                console.log(row)
                let data = {
                    userId: row.UserId
                }
                this.$store.state.dataConfig.userBookShelf.params = data
                this.$store.dispatch('userBookShelf', {
                    page:{"PageIndex":'1',"PageSize":"20"},
                    params:data
                })
                this.$router.push(this.$route.query.redirect || '/userBookShelf')
            },
            _toUserTask(index,row) {
                console.log(row)
                let data = {
                    userId: row.UserId
                }
                this.$store.state.dataConfig.userTask.params = data
                this.$store.dispatch('userTask', {
                    page:{"PageIndex":'1',"PageSize":"20"},
                    params:data
                })
                this.$router.push(this.$route.query.redirect || '/userTask')
            },
        },
        computed: {
            sessionKey: function () {
                return this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userInfo: function() {
                return this.$store.state.dataConfig.userInfo.list
            },
            userInfoRecordCount: function() {
                return this.$store.state.dataConfig.userInfo.RecordCount
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
            }
        }
    }
</script>

<style  lang="less">
    .userInfo{
        .userFilter{
            padding: 20px;
            padding-bottom: 0;
            .filter{
                margin-right: 10px;
            }
            .f1{
                width: 200px;
            }
        }
        .filterSearch{
            float: right;
            height: 40px;
            margin-bottom: 10px;
        }
        .table_container {
            padding: 20px;
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

