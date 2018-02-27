<template>
    <div class="userConsum fillcontain ">
        <head-top></head-top>
        <!--<div style="height: 40px">-->
            <!--<div class="filterSearch">-->
                <!--<el-input @keyup.enter.native="" style="width: 200px;" class="filter-item" placeholder="关键字"  >-->
                <!--</el-input>-->
                <!--<el-button class="filter-item" type="primary" v-waves icon="search" @click="">搜索</el-button>-->
            <!--</div>-->
        <!--</div>-->
        <div class="userFilter">
            <el-form ref="filterForm" :inline="true">
                <el-select v-model="filterForm.orderBy" ref="orderBy" placeholder="请选择顺序" @change="orderBy" class="filter f1">
                    <el-option label="年龄从小到大" value="Age"></el-option>
                    <el-option label="年龄从大到小" value="Age DESC"></el-option>
                    <el-option label="用户ID从小到大" value="UserId"></el-option>
                    <el-option label="用户ID从大到小" value="UserId DESC"></el-option>
                    <el-option label="消费币从小到大" value="TotalRechargeCoin"></el-option>
                    <el-option label="消费币从大到小" value="TotalRechargeCoin DESC"></el-option>
                    <el-option label="剩余币从小到大" value="RechargeCoin"></el-option>
                    <el-option label="剩余币从大到小" value="RechargeCoin DESC"></el-option>
                    <el-option label="消费券从小到大" value="TotalGivenCoin"></el-option>
                    <el-option label="消费券从大到小" value="TotalGivenCoin DESC"></el-option>
                    <el-option label="剩余券从小到大" value="GivenCoin"></el-option>
                    <el-option label="剩余券从大到小" value="GivenCoin DESC"></el-option>
                </el-select>
                <el-form-item label="消费币区间:" class="filter f2">
                    <el-input  v-model="filterForm.chargeCoinMin" style="width: 80px"></el-input>--
                    <el-input  v-model="filterForm.chargeCoinMax" style="width: 80px"></el-input>
                </el-form-item>
                <el-form-item label="消费券区间:" class="filter f3">
                    <el-input  v-model="filterForm.givenCoinMin" style="width: 80px"></el-input>--
                    <el-input  v-model="filterForm.givenCoinMax" style="width: 80px"></el-input>
                </el-form-item>
                <el-form-item label="渠道:">
                    <el-select v-model="filterForm.channel" ref="channel" placeholder="请选择" @change="channel" class="filter f4">
                        <el-option
                            v-for="item in channelArr"
                            :key="item.__RowNumber"
                            :label="item.txt"
                            :value="item.val" >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:"  class="datePicker">
                    <el-date-picker
                        v-model="filterForm.filterDate"
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
        <div class="table_container">
            <el-table
                :data="userConsumPtion"
                border
                style="width: 100%" >
                <el-table-column
                    prop="UserId"
                    label="用户Id"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="Name"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="Sex"
                    label="性别" width="100">
                </el-table-column>
                <el-table-column
                    prop="Age"
                    label="年龄" width="100">
                </el-table-column>
                <el-table-column
                    prop="TotalRechargeCoin"
                    label="消费币" width="100">
                </el-table-column>
                <el-table-column
                    prop="RechargeCoin"
                    label="剩余币" width="100">
                </el-table-column>
                <el-table-column
                    prop="TotalGivenCoin"
                    label="消费券">
                </el-table-column>
                <el-table-column
                    prop="GivenCoin"
                    label="剩余券">
                </el-table-column>
                <el-table-column
                    prop="Channel"
                    label="渠道" width="100">
                </el-table-column>
                <el-table-column
                    prop="MaxCreatedDate"
                    label="最后付费时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info"  @click="handleMore(scope.$index, scope.row)">查看更多</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-left: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="userConsumPtionRecordCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
    export default {
        beforeMount() {
            this.getChannel()
        },
        data() {
            return {
                filterForm: {
                    orderBy:'',
                    chargeCoinMin:'',
                    chargeCoinMax:'',
                    givenCoinMin:'',
                    givenCoinMax:'',
                    channel:'',
                    filterDate:'',
                },
                BeginDate:'',
                EndDate:'',
                channelArr:[]

            }
        },
        components: {
            ElFormItem, headTop,
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
                let d1 = new Date(this.filterForm.filterDate[0])
                let d2 = new Date(this.filterForm.filterDate[1])
                this.BeginDate = this.formatDate(d1)
                this.EndDate = this.formatDate(d2)
                this.$store.state.dataConfig.userConsumPtion.BeginDate = this.BeginDate
                this.$store.state.dataConfig.userConsumPtion.EndDate = this.EndDate
            },
            getChannel() {
                this.$http.get('api/materiels/getchannel/1/10/?sessionKey='+localStorage.SessionKey+'&'+'isPay='+1).then(res=>{
                    this.channelArr = res.body.dt.PageData
                    console.log(res.body.dt.PageData)
                })
            },
            search(){
                this.initDate()
                let data = {
                    begin: this.BeginDate,
                    end: this.EndDate,
                    minRechargeCoin: this.filterForm.chargeCoinMin,
                    maxRechargeCoin: this.filterForm.chargeCoinMax,
                    minGivenCoin: this.filterForm.givenCoinMin,
                    maxGivenCoin: this.filterForm.givenCoinMax,
                    orderBy: this.$refs.orderBy.value,
                    channel: this.$refs.channel.value
                }
                console.log(data)
                this.$store.dispatch('userConsumPtion', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                })
            },
            orderBy() {
                this.search()
            },
            channel() {
                this.search()
            },
            handleCurrentChange(val) {
                this.initDate()
                let data = {
                    begin: this.BeginDate,
                    end: this.EndDate,
                    minRechargeCoin: this.filterForm.chargeCoinMin,
                    maxRechargeCoin: this.filterForm.chargeCoinMax,
                    minGivenCoin: this.filterForm.givenCoinMin,
                    maxGivenCoin: this.filterForm.givenCoinMax
                }
                console.log(data)
                this.$store.dispatch('userConsumPtion', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    params:data
                })
            },
            handleMore(index,row) {
                console.log(row)
                this.initDate()
                let data = {
                    begin: this.BeginDate,
                    end: this.EndDate,
                    userId:row.UserId,
                    minRechargeCoin: this.filterForm.chargeCoinMin,
                    maxRechargeCoin: this.filterForm.chargeCoinMax,
                    minGivenCoin: this.filterForm.givenCoinMin,
                    maxGivenCoin: this.filterForm.givenCoinMax
                }
                this.$store.state.dataConfig.userBookConsumPtion.params = data
                console.log(data)
                this.$store.dispatch('userBookConsumPtion', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                })
                this.$router.push(this.$route.query.redirect || '/userBookConsumPtion/')
            }
        },
        computed: {
            sessionKey: function () {
                return this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userConsumPtion: function() {
                return this.$store.state.dataConfig.userConsumPtion.list
            },
            userConsumPtionRecordCount: function() {
                return this.$store.state.dataConfig.userConsumPtion.RecordCount
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
    .userConsum{
        .userFilter{
            padding: 20px;
            padding-bottom: 0;
            height: 100px;
            .filter{
                width: 270px;
                margin-right: 10px;
            }
            .f1{
                width: 200px;
            }
            .f4{
                width: 100px;
            }
        }
        .filterSearch{
            float: right;
            height: 40px;
            margin-bottom: 10px;
        }
        .table_container {
            padding: 20px;
        }
    }
</style>

