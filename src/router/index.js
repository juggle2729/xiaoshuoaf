import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { URL_PREFIX } from '../const'
Vue.use(Router)

function isAuthenticated () {
    if (store.state.auth && store.state.auth.loginStatus && store.state.auth.SessionKey) {
        localStorage.loginStatus = true
        localStorage.SessionKey = store.state.auth.SessionKey
        localStorage.UserId = store.state.auth.UserId
        return true
    }
    if (localStorage.loginStatus && localStorage.SessionKey) {
        store.dispatch('syncAuthStore')
        return true
    }
}

function getAuthHeaders () {
    return {
        'SessionKey': localStorage.SessionKey
    }
}
function requireAuth (to, from, next) {
    if (isAuthenticated()) {
        next()
    } else {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    }
}
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');

const bookList = r => require.ensure([], () => r(require('@/page/bookList/bookList')), 'bookList');
const bookThemeList = r => require.ensure([], () => r(require('@/page/bookThemeList/getBookThemeList')), 'bookThemeList');

const bookStore = r => require.ensure([], () => r(require('@/page/bookStore/bookStore')), 'bookList');
const bookStoreList = r => require.ensure([], () => r(require('@/page/bookStore/bookStoreList')), 'bookListStore');
const getModule = r => require.ensure([], () => r(require('@/page/bookStore/getModule')), 'getModule');

const pointInterest = r => require.ensure([], () => r(require('@/page/dialogicNovels/pointInterest')), 'pointInterest');
const pointInterestIndex = r => require.ensure([], () => r(require('@/page/dialogicNovels/pointInterestIndex')), 'pointInterestIndex');
const dialogNovel = r => require.ensure([], () => r(require('@/page/dialogicNovels/dialogNovel')), 'dialogNovel');

const bookRank = r => require.ensure([], () => r(require('@/page/bookRank/getBookRank')), 'getBookRank');

const userConsumPtion = r => require.ensure([], () => r(require('@/page/userConsum/userConsumPtion')), 'userConsumPtion');
const userBookConsumPtion = r => require.ensure([], () => r(require('@/page/userConsum/userBookConsumPtion')), 'userBookConsumPtion');
const userBookOrderConsumPtion = r => require.ensure([], () => r(require('@/page/userConsum/userBookOrderConsumPtion')), 'userBookOrderConsumPtion');
const userReCharge = r => require.ensure([], () => r(require('@/page/userConsum/userReCharge')), 'userReCharge');
const userRechargeDetail = r => require.ensure([], () => r(require('@/page/userConsum/userRechargeDetail')), 'userRechargeDetaile');
const userRechargeOrder = r => require.ensure([], () => r(require('@/page/userConsum/userRechargeOrder')), 'userRechargeOrder');
const userInfo = r => require.ensure([], () => r(require('@/page/userConsum/userInfo')), 'userInfo');
const userBookShelf = r => require.ensure([], () => r(require('@/page/userConsum/userBookShelf')), 'userBookShelf');
const userTask = r => require.ensure([], () => r(require('@/page/userConsum/userTask')), 'userTask');
const userFeedBack = r => require.ensure([], () => r(require('@/page/userConsum/userFeedBack')), 'userFeedBack');

const routes = [
	{
		path: '/',
		component: login
	},
    {
        path: '/login',
        component: login
    },
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '/bookList',
			component: bookList,
			meta: ['物料配置', '图书列表'],
		},{
            path: '/bookThemeList',
            component: bookThemeList,
            meta: ['物料配置', '书单列表'],
        },{
            path: '/bookranking',
            component: bookRank,
            meta: ['物料配置', '排行榜'],
        },{
            path: '/bookStore',
            component: bookStore,
            meta: ['书城配置', '书城列表'],
        }, {
            path: '/bookStoreList',
            component: bookStoreList,
            meta: ['书城配置', '书城模块列表'],
        }, {
                path: '/bookStoreList/getModule/:Id',
                component: getModule,
                meta: ['书城配置', '书城列表','模块属性'],
            },
            {
                path: '/bookranking',
                component: bookRank,
                meta: ['图书榜单界面', '排行榜','榜单列表'],
            },
            {
                path: '/userConsumPtion',
                component: userConsumPtion,
                meta: ['用户系统', '用户消费系统'],
            },
            {
                path: '/userBookConsumPtion',
                component: userBookConsumPtion,
                meta: ['用户系统', '用户消费系统','书籍消费系统'],
            },
            {
                path: '/userBookOrderConsumPtion',
                component: userBookOrderConsumPtion,
                meta: ['用户系统', '用户消费系统','书籍消费系统','章节消费情况'],
            },
            {
                path: '/userReCharge',
                component: userReCharge,
                meta: ['用户系统', '用户充值记录'],
            },
            {
                path: '/userRechargeDetail',
                component: userRechargeDetail,
                meta: ['用户系统','用户充值记录', '用户单条记录明细'],
            },
            {
                path: '/userRechargeOrder',
                component: userRechargeOrder,
                meta: ['用户系统', '用户实时充值记录'],
            },
            {
                path: '/userInfo',
                component: userInfo,
                meta: ['用户系统', '用户信息'],
            },
            {
                path: '/userBookShelf',
                component: userBookShelf,
                meta: ['用户系统', '用户信息', '用户书架'],
            },
            {
                path: '/userTask',
                component: userTask,
                meta: ['用户系统', '用户信息', '用户已完成任务'],
            },
            {
                path: '/userFeedBack',
                component: userFeedBack,
                meta: ['用户系统', '用户反馈'],
            },
            {
                path: '/pointInterest',
                component: pointInterest,
                meta: ['对话小说榜单配置', '点趣分类列表'],
            },
            {
                path: '/pointInterestIndex',
                component: pointInterestIndex,
                meta: ['点趣首页配置'],
            },
            {
                path: '/dialogNovel',
                component: dialogNovel,
                meta: ['对话小说栏'],
            }
		]
	}
]

export default new Router({
    mode: 'history',
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
export { isAuthenticated, getAuthHeaders }
