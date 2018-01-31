<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>导航菜单</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>物料配置</template>
						<el-menu-item index="bookList" @click="bookList">图书列表</el-menu-item>
                        <el-menu-item index="bookranking" @click="bookranking">排行榜</el-menu-item>
						<el-menu-item index="bookThemeList" @click="bookThemeList">书单列表</el-menu-item>
						<el-menu-item index="foodList">卡片类型</el-menu-item>
						<el-menu-item index="orderList">列表管理</el-menu-item>
						<el-menu-item index="adminList">跳样式管理</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>书城配置</template>
                        <el-menu-item index="bookStore" @click="bookStore">书城列表</el-menu-item>
                        <el-menu-item index="bookStoreList" @click="winReload">书城模块列表</el-menu-item>
						<el-menu-item index="addShop">书卡列表</el-menu-item>
						<el-menu-item index="addGoods">导航按钮</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>图书榜单界面</template>
                        <el-menu-item index="bookranking" @click="bookranking">排行榜</el-menu-item>
						<el-menu-item index="newMember">分类列表</el-menu-item>
					</el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>用户系统</template>
                        <el-menu-item  index="userConsumPtion" @click="userConsumPtion">用户消费记录</el-menu-item>
                        <!--<el-menu-item  index="userBookConsumPtion" @click="userBookConsumPtion">书籍消费记录</el-menu-item>-->
                        <!--<el-menu-item  index="userBookOrderConsumPtion" @click="userBookOrderConsumPtion">章节消费记录</el-menu-item>-->
                        <el-menu-item  index="userReCharge" @click="userReCharge">用户充值记录</el-menu-item>
                        <!--<el-menu-item  index="userRechargeDetail" @click="userRechargeDetail">用户单条充值明细</el-menu-item>-->
                    </el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-edit"></i>对话小说榜单配置</template>
                        <el-menu-item index="pointInterest" @click="pointInterest">点趣列表</el-menu-item>
                        <el-menu-item index="pointInterestIndex" @click="pointInterestIndex">点趣首页配置</el-menu-item>
                        <el-menu-item index="dialogNovel" @click="dialogNovel">对话小说列表</el-menu-item>
						<el-menu-item index="vueEdit">分类列表</el-menu-item>
                        <el-menu-item index="vueEdit">列表管理</el-menu-item>
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
		computed: {
			defaultActive: function(){
//				return this.$route.path.replace('/', '');
			}
		},
        methods: {
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
            userBookConsumPtion: function() {
                this.$router.replace({ path: '/userBookConsumPtion'})
            },
            userBookOrderConsumPtion: function() {
                this.$router.replace({ path: '/userBookOrderConsumPtion'})
            },
            userReCharge: function() {
                this.$router.replace({ path: '/userReCharge'})
            },
            userRechargeDetail: function() {
                this.$router.replace({ path: '/userRechargeDetail'})
            }
        }
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
