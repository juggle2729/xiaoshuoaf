<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container bookthemelist ">
            <div>
                <el-table
                    :data="userTask"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="TaskName"
                        label="任务名">
                    </el-table-column>
                    <el-table-column
                        prop="CreateDate"
                        label="任务完成时间">
                    </el-table-column>
                    <el-table-column
                        prop="VipDays"
                        label="任务赠送VIP天数">
                    </el-table-column>
                    <el-table-column
                        prop="RechargeCoin"
                        label="任务赠送阅币">
                    </el-table-column>
                    <el-table-column
                        prop="GivenCoin"
                        label="任务赠送阅券">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block booklistpag">
                <el-pagination
                    @current-change="handleCurrent"
                    layout="total, prev, pager, next"
                    :total="userTaskRecordCount">
                </el-pagination>
            </div>
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
        created() {

        },
        methods: {
            handleCurrent(val) {
                let data = this.$store.state.dataConfig.userTask.params
                this.$store.dispatch('userTask', {
                    page:{"PageIndex": val,"PageSize":"20"},
                    params:data
                })
            }
        },
        computed: {
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userTask: function() {
                return  this.$store.state.dataConfig.userTask.list
            },
            userTaskRecordCount: function() {
                return  this.$store.state.dataConfig.userTask.RecordCount
            },
        },
        watch: {
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
        padding: 20px;
    }
</style>

