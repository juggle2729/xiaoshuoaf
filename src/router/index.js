import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const bookList = r => require.ensure([], () => r(require('@/page/bookList')), 'bookList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addShop',
			component: addShop,
			meta: ['书城配置', '书城列表'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['书城配置', '书卡列表'],
		},{
            path: '/navButton',
            component: addGoods,
            meta: ['书城配置', '导航按钮'],
        },{
			path: '/bookList',
			component: bookList,
			meta: ['物料配置', '图书列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['物料配置', '书单列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['物料配置', '卡片类型'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['物料配置', '列表管理'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['物料配置', '跳转样式管理'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图书榜单界面', '排行榜列表'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图书榜单界面', '分类列表'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['对话小说榜单配置', '对话小说列表'],
		},{
            path: '/uploadImg',
            component: uploadImg,
            meta: ['对话小说榜单配置', '分类列表'],
        },{
            path: '/uploadImg',
            component: uploadImg,
            meta: ['对话小说榜单配置', '列表管理'],
        },{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['运营活动配置', '应用内推送'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
