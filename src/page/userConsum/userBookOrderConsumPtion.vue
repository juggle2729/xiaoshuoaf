<template>
    <div class="userConsum fillcontain ">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="userBookOrderConsumPtion"
                border
                style="width: 100%" >
                <el-table-column
                    prop="BookName"
                    label="付费书名">
                </el-table-column>
                <el-table-column
                    prop="OrderName"
                    label="付费章节ID">
                </el-table-column>
                <el-table-column
                    prop="RechargeCoin"
                    label="消费币">
                </el-table-column>
                <el-table-column
                    prop="GivenCoin"
                    label="消费券">
                </el-table-column>
                <el-table-column
                    prop="CreatedDate"
                    label="付费时间" width="200">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" >查看更多</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-left: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="userBookOrderConsumPtionRecordCount">
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
                this.$store.dispatch('userBookOrderConsumPtion', {
                    page:{"PageIndex":val,"PageSize":"10"},
                    params:data
                })
            }
        },
        computed: {
            sessionKey: function () {
                return this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userBookOrderConsumPtion: function() {
                return this.$store.state.dataConfig.userBookOrderConsumPtion.list
            },
            userBookOrderConsumPtionRecordCount: function() {
                return this.$store.state.dataConfig.userBookOrderConsumPtion.RecordCount
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

