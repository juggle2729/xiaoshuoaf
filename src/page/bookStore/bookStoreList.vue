<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
            <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
            label="Id"
            width="80">
            <template scope=" scope">
                <p @click="toGetModule(scope.row.Id)">{{scope.row.Id}}</p>
            </template>
        </el-table-column>
        <el-table-column
            prop="ModuleType"
            label="ModuleType"
            width="150">
        </el-table-column>
        <el-table-column
            prop="ModuleDescription"
            label="ModuleDescription"
            width="180">
        </el-table-column>
        <el-table-column
            prop="StoreVersionName"
            label="StoreVersionName">
        </el-table-column>
        <el-table-column
            prop="Title"
            label="Title">
        </el-table-column>
    </el-table>
        </div>
        <div class="block">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="RecordCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {getAuthHeaders} from '../../router'
    export default {
        beforeMount() {
            this.$store.dispatch('getModulelist', {payload:{page:{"PageIndex":"1","PageSize":"10"}}}).then(
                (response) => {
                }
            ).catch(

            )
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
        methods: {
            toGetModule: function(Id) {
                this.$router.push('bookStoreList/getModule/'+Id)
            },
            handleCurrentChange(val) {
                this.$store.dispatch('getModulelist', {payload:{page:{"PageIndex":val,"PageSize":"10"}}}).then(
                    (response) => {
                    }
                ).catch(

                )
            },
            handleCreate() {

            },
        },
        computed: {
            tableData: function() {
                return  this.$store.state.dataConfig.getModulelist.list
            },
            RecordCount: function() {
                return  this.$store.state.dataConfig.getModulelist.RecordCount
            },
            PageCount: function() {
                return  this.$store.state.dataConfig.getModulelist.PageCount
            }
        }
    }
</script>

<style  lang="less">
    .table_container{
        padding: 20px;
    }
</style>
