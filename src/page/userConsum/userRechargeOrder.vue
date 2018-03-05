<template>
    <div class="userRechargeOrder fillcontain ">
        <head-top></head-top>
        <div class="userFilter">
            <el-form ref="filterForm" :inline="true">
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
                    <el-button class="filter-item" type="primary" v-waves icon="search" @click="orderBySearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                :data="userRechargeOrder"
                border
                style="width: 100%" >
                <el-table-column
                    prop="OrderId"
                    label="交易订单ID" width="200">
                </el-table-column>
                <el-table-column
                    prop="UserId"
                    label="用户ID"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="UserName"
                    label="用户名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="NickName"
                    label="付费户名">
                </el-table-column>
                <el-table-column
                    prop="Sex"
                    label="性别" width="80">
                </el-table-column>
                <el-table-column
                    prop="Age"
                    label="年龄" width="80">
                </el-table-column>
                <el-table-column
                    prop="PayAmount"
                    label="充值金额" width="100">
                </el-table-column>
                <el-table-column
                    prop="RechargeCoin"
                    label="充值金币数">
                </el-table-column>
                <el-table-column
                    prop="GivenCoin"
                    label="赠送金币数">
                </el-table-column>
                <el-table-column
                    prop="VipDays"
                    label="VIP天数">
                </el-table-column>
                <el-table-column
                    prop="PayType"
                    label="充值方式">
                </el-table-column>
                <el-table-column
                    prop="Channel"
                    label="充值渠道">
                </el-table-column>
                <el-table-column
                    prop="DealDate"
                    label="充值时间" width="200">
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-left: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="userRechargeOrderRecordCount">
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

            search(){
                this.initDate()
                let data = {
                    begin: this.BeginDate,
                    end: this.EndDate,
                }
                console.log(data)
                this.$store.dispatch('userRechargeOrder', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                })
            },
            handleCurrentChange(val) {
                this.initDate()
                let data = {
                    begin: this.BeginDate,
                    end: this.EndDate,
                }
                console.log(data)
                this.$store.dispatch('userRechargeOrder', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    params:data
                })
            },
            orderBySearch() {
                this.search()
            }
        },
        computed: {
            sessionKey: function () {
                return this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userRechargeOrder: function() {
                return this.$store.state.dataConfig.userRechargeOrder.list
            },
            userRechargeOrderRecordCount: function() {
                return this.$store.state.dataConfig.userRechargeOrder.RecordCount
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
    .userRechargeOrder{
        .userFilter{
            padding: 20px;
            padding-bottom: 0;
            .el-date-editor--datetimerange {
                .el-input{
                    width: 400px;
                }
            }
        }
        .filterSearch{
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

