<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container bookthemelist ">
            <div>
                <el-table
                    :data="userBookShelf"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="BookName"
                        label="书名">
                    </el-table-column>
                    <el-table-column
                        prop="Author"
                        label="作者">
                    </el-table-column>
                    <el-table-column
                        prop="Created"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        prop="LastReadTime"
                        label="最后阅读时间">
                    </el-table-column>
                    <el-table-column
                        prop="LastReadBookOrderName"
                        label="最后阅读章节"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="UnitPrice"
                        label="普通价格">
                    </el-table-column>
                    <el-table-column
                        prop="VipPrice"
                        label="VIP价格">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block booklistpag">
                <el-pagination
                    @current-change="handleCurrent"
                    layout="total, prev, pager, next"
                    :total="userBookShelfRecordCount">
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
                let data = this.$store.state.dataConfig.userBookShelf.params
                this.$store.dispatch('userBookShelf', {
                    page:{"PageIndex": val,"PageSize":"20"},
                    params:data
                })
            }
        },
        computed: {
            sessionKey: function() {
                return  this.$store.state.dataConfig.getModulelist.sessionKey
            },
            userBookShelf: function() {
                return  this.$store.state.dataConfig.userBookShelf.list
            },
            userBookShelfRecordCount: function() {
                return  this.$store.state.dataConfig.userBookShelf.RecordCount
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

