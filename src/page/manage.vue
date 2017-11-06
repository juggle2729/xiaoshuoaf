<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>导航菜单</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>物料配置</template>
						<el-menu-item index="bookList">图书列表</el-menu-item>
						<el-menu-item index="shopList">书单列表</el-menu-item>
						<el-menu-item index="foodList">卡片类型</el-menu-item>
						<el-menu-item index="orderList">列表管理</el-menu-item>
						<el-menu-item index="adminList">跳样式管理</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>书城配置</template>
                        <el-menu-item index="addShop">书城列表</el-menu-item>
						<el-menu-item index="addShop">书卡列表</el-menu-item>
						<el-menu-item index="addGoods">导航按钮</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>图书榜单界面</template>
						<el-menu-item index="visitor">排行榜列表</el-menu-item>
						<el-menu-item index="newMember">分类列表</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>对话小说榜单配置</template>
						<el-menu-item index="uploadImg">对话小说列表</el-menu-item>
						<el-menu-item index="vueEdit">分类列表</el-menu-item>
                        <el-menu-item index="vueEdit">列表管理</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>运营活动配置</template>
						<el-menu-item index="adminSet">应用内推送</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
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
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
