<template>
    <div class="userConsum fillcontain ">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="userRechargeDetail"
                border
                style="width: 100%" >
                <el-table-column
                    prop="UserName"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="OrderId"
                    label="订单编号"
                    height="50"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="Nickname"
                    label="付费书名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="PayAmount"
                    label="充值金额">
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
                    label="充值VIP天数">
                </el-table-column>
                <el-table-column
                    prop="PayType"
                    label="充值方式">
                </el-table-column>
                <el-table-column
                    prop="DealDate"
                    label="充值时间">
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-left: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="userRechargeDetailRecordCount">
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
            handleCurrentChange(val) {
                let data = this.$store.state.dataConfig.userRecharge.params
                this.$store.dispatch('userRechargeDetail', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    params:data
                })
            }
        },
        computed: {
            sessionKey: function () {
                return this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userRechargeDetail: function() {
                return this.$store.state.dataConfig.userRechargeDetail.list
            },
            userRechargeDetailRecordCount: function() {
                return this.$store.state.dataConfig.userRechargeDetail.RecordCount
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


