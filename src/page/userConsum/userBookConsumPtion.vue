<template>
    <div class="userConsum fillcontain ">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="userBookConsumPtion"
                border
                style="width: 100%" >
                <el-table-column
                    prop="UserId"
                    label="用户Id"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="Nickname"
                    label="昵称">
                </el-table-column>
                <el-table-column
                    prop="Name"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="BookName"
                    label="付费书名">
                </el-table-column>
                <el-table-column
                    prop="BookId"
                    label="付费书Id">
                </el-table-column>
                <el-table-column
                    prop="TotalRechargeCoin"
                    label="消费币">
                </el-table-column>
                <el-table-column
                    prop="TotalGivenCoin"
                    label="消费券">
                </el-table-column>
                <el-table-column
                    prop="timesCount"
                    label="购买次数">
                </el-table-column>
                <el-table-column
                    prop="OrderCount"
                    label="购买章节数">
                </el-table-column>
                <el-table-column
                    prop="CreatedDate"
                    label="最后付费时间" width="200">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info"  @click="handleOrder(scope.$index, scope.row)">查看更多</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-left: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="userBookConsumPtionRecordCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
    export default {
        beforeMount() {
        },
        data() {
            return {

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
            handleCurrentChange(val) {
                let data = this.$store.state.dataConfig.userBookConsumPtion.params
                this.$store.dispatch('userBookConsumPtion', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    params:data
                })
            },
            handleOrder(index,row){
                let data = {
                    userId:row.UserId,
                    bookId:row.BookId,
                    begin: this.$store.state.dataConfig.userConsumPtion.BeginDate,
                    end: this.$store.state.dataConfig.userConsumPtion.EndDate
                }
                this.$store.state.dataConfig.userBookOrderConsumPtion.params = data
                this.$store.dispatch('userBookOrderConsumPtion', {
                    page:{"PageIndex":"1","PageSize":"10"},
                    params:data
                })
                this.$router.push(this.$route.query.redirect || '/userBookOrderConsumPtion/')
            }
        },
        computed: {
            sessionKey: function () {
                return this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userBookConsumPtion: function() {
                return this.$store.state.dataConfig.userBookConsumPtion.list
            },
            userBookConsumPtionRecordCount: function() {
                return this.$store.state.dataConfig.userBookConsumPtion.RecordCount
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
        .table_container {
            padding: 20px;
        }
    }
</style>

