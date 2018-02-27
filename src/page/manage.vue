<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>导航菜单</el-menu-item>
					<el-submenu index="2" v-show="showed">
						<template slot="title"><i class="el-icon-document"></i>物料配置</template>
						<el-menu-item index="bookList" @click="bookList">图书列表</el-menu-item>
                        <el-menu-item index="bookranking" @click="bookranking">排行榜</el-menu-item>
						<el-menu-item index="bookThemeList" @click="bookThemeList">书单列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3"  v-show="showed">
						<template slot="title"><i class="el-icon-plus"></i>书城配置</template>
                        <el-menu-item index="bookStore" @click="bookStore">书城列表</el-menu-item>
                        <el-menu-item index="bookStoreList" @click="winReload">书城模块列表</el-menu-item>
					</el-submenu>
					<el-submenu index="4"  v-show="showed">
						<template slot="title"><i class="el-icon-star-on"></i>图书榜单界面</template>
                        <el-menu-item index="bookranking" @click="bookranking">排行榜</el-menu-item>
					</el-submenu>
                    <el-submenu index="5" >
                        <template slot="title"><i class="el-icon-setting"></i>用户系统</template>
                        <el-menu-item  index="userConsumPtion" @click="userConsumPtion">用户消费记录</el-menu-item>
                        <el-menu-item  index="userReCharge" @click="userReCharge">用户充值记录</el-menu-item>
                        <el-menu-item  index="userRechargeOrder" @click="userRechargeOrder">用户实时充值记录</el-menu-item>
                        <el-menu-item  index="userInfo" @click="userInfo">用户信息</el-menu-item>
                        <el-menu-item  index="userFeedBack" @click="userFeedBack">用户反馈</el-menu-item>
                    </el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
        beforeMount(){
            this.showUser()
        },
        data() {
            return {
                showed: true
            }
        },
        methods: {
            showUser() {
                if(window.localStorage.UserId == 2) {
                    this.showed = false
                }
            },
            winReload: function() {
                this.$router.replace({ path: '/bookStoreList'})
            },
            pointInterest: function() {
                this.$router.replace({ path: '/pointInterest'})
            },
            pointInterestIndex: function() {
                this.$router.replace({ path: '/pointInterestIndex'})
            },
            dialogNovel: function() {
                this.$router.replace({ path: '/dialogNovel'})
            },
            bookList: function() {
                this.$router.replace({ path: '/bookList'})
            },
            bookranking: function() {
                this.$router.replace({ path: '/bookranking'})
            },
            bookStore: function() {
                this.$router.replace({ path: '/bookStore'})
            },
            bookThemeList: function() {
                this.$router.replace({ path: '/bookThemeList'})
            },
            userConsumPtion:function() {
                this.$router.replace({ path: '/userConsumPtion'})
            },
            userReCharge: function() {
                this.$router.replace({ path: '/userReCharge'})
            },
            userRechargeOrder: function() {
                this.$router.replace({ path: '/userRechargeOrder'})
            },
            userInfo: function() {
                this.$router.replace({ path: '/userInfo'})
            },
            userFeedBack: function() {
                this.$router.replace({ path: '/userFeedBack'})
            }
        },
		computed: {
            UserId: function() {

            },
		},
        watch: {

        }
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
