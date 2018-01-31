<template>
    <div class="userRecharge fillcontain ">
        <head-top></head-top>
        <div class="userFilter">
            <el-form ref="filterForm" :inline="true">
                <el-select v-model="filterForm.orderBy" ref="orderBy" placeholder="请选择排序方式" @change="orderBySearch" class="filter f1">
                    <el-option label="总充值金额从小到大" value="TotalPayAmount"></el-option>
                    <el-option label="总充值金额从大到小" value="TotalPayAmount DESC"></el-option>
                    <el-option label="充值次数从小到大" value="RechargeCount"></el-option>
                    <el-option label="充值次数从大到小" value="RechargeCount DESC"></el-option>
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
                    <el-option label="年龄从小到大" value="Age"></el-option>
                    <el-option label="年龄从大到小" value="Age DESC"></el-option>
                    <el-option label="用户ID从小到大" value="UserId"></el-option>
                    <el-option label="用户ID从大到小" value="UserId DESC"></el-option>
                </el-select>
                <el-form-item label="充值总金额区间:" class="filter f2">
                    <el-input  v-model="filterForm.minPayAmount" style="width: 80px"></el-input>--
                    <el-input  v-model="filterForm.maxPayAmount" style="width: 80px"></el-input>
                </el-form-item>
                <el-form-item label="充值金币数区间:" class="filter f3">
                    <el-input  v-model="filterForm.minReChargeCoin" style="width: 80px"></el-input>--
                    <el-input  v-model="filterForm.maxReChargeCoin" style="width: 80px"></el-input>
                </el-form-item>
                <el-form-item label="充值VIP天数区间:" class="filter f4">
                    <el-input  v-model="filterForm.minVipDays" style="width: 80px"></el-input>--
                    <el-input  v-model="filterForm.maxVipDays" style="width: 80px"></el-input>
                </el-form-item>
                <el-form-item label="渠道:">
                    <el-select v-model="filterForm.channel" ref="channel" placeholder="请选择" @change="channel" class="filter f4">
                        <el-option label="ofw" value="ofw"></el-option>
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
                :data="userRecharge"
                border
                style="width: 100%" >
                <el-table-column
                    prop="UserName"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="UserId"
                    label="用户Id"
                    width="100">
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
                    prop="RechargeCount"
                    label="充值次数">
                </el-table-column>
                <el-table-column
                    prop="TotalRechargeCoin"
                    label="充值金币数">
                </el-table-column>
                <el-table-column
                    prop="RechargeCoin"
                    label="剩余充值币数">
                </el-table-column>
                <el-table-column
                    prop="TotalGivenCoin"
                    label="赠送金币数">
                </el-table-column>
                <el-table-column
                    prop="GivenCoin"
                    label="剩余赠送金币数">
                </el-table-column>
                <el-table-column
                    prop="Channel"
                    label="渠道">
                </el-table-column>
                <el-table-column
                    prop="TotalVipDays"
                    label="充值VIP天数">
                </el-table-column>
                <el-table-column
                    prop="RemainderVipDays"
                    label="剩余VIP天数">
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
                :total="userRechargeRecordCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        beforeMount() {
        },
        data() {
            return {
                filterForm: {
                    orderBy:'',
                    minPayAmount:'',
                    maxPayAmount:'',
                    minReChargeCoin:'',
                    maxReChargeCoin:'',
                    minVipDays:'',
                    maxVipDays:'',
                    channel:'',
                    channelOptions:[
                        {
                            label:"free",
                            value:"free"
                        },
                        {
                            label:"liehu",
                            value:"free"
                        }
                    ],
                    filterDate:''
                },
                BeginDate:'',
                EndDate:''

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
            initDate() {
                let d = new Date(this.filterForm.filterDate[0])
                let d1 = new Date(this.filterForm.filterDate[1])
                this.BeginDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                this.EndDate = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate() + ' ' + d1.getHours() + ':' + d1.getMinutes() + ':' + d1.getSeconds();
                this.$store.state.dataConfig.userConsumPtion.BeginDate = this.BeginDate
                this.$store.state.dataConfig.userConsumPtion.EndDate = this.EndDate
            },

            search(){
                this.initDate()
                let data = {
//                    begin: this.BeginDate,
//                    end: this.EndDate,
                    minPayAmount:this.filterForm.minPayAmount,
                    maxPayAmount:this.filterForm.maxPayAmount,
                    minReChargeCoin:this.filterForm.minReChargeCoin,
                    maxReChargeCoin:this.filterForm.maxReChargeCoin,
                    minVipDays:this.filterForm.minVipDays,
                    maxVipDays:this.filterForm.maxVipDays,
                    channel:this.$refs.channel.value,
                    orderBy: this.$refs.orderBy.value
                }
                console.log(data)
                this.$store.dispatch('userRecharge', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                })
            },
            orderBySearch() {
                this.search()
            },
            channel() {
                this.search()
            },
            handleMore(index,row) {
                console.log(row)
                this.initDate()
                let data = {
//                    begin: this.BeginDate,
//                    end: this.EndDate,
                    userId:row.UserId,
                }
                console.log(data)
                this.$store.state.dataConfig.userRecharge.params = data
                this.$store.dispatch('userRechargeDetail', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                })
                this.$router.push(this.$route.query.redirect || '/userRechargeDetail')
            }
        },
        computed: {
            sessionKey: function () {
                return this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userRecharge: function() {
                return this.$store.state.dataConfig.userRecharge.list
            },
            userRechargeRecordCount: function() {
                return this.$store.state.dataConfig.userRecharge.RecordCount
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
    .userRecharge{
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
        }
    }
</style>

