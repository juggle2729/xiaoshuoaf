import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { URL_PREFIX } from '../const'
Vue.use(Router)

function isAuthenticated () {
    if (store.state.auth && store.state.auth.loginStatus && store.state.auth.SessionKey) {
        localStorage.loginStatus = true
        localStorage.SessionKey = store.state.auth.SessionKey
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

const bookStoreList = r => require.ensure([], () => r(require('@/page/bookStore/bookStoreList')), 'bookListStore');
const getModule = r => require.ensure([], () => r(require('@/page/bookStore/getModule')), 'getModule');

const pointInterest = r => require.ensure([], () => r(require('@/page/dialogicNovels/pointInterest')), 'pointInterest');
const pointInterestIndex = r => require.ensure([], () => r(require('@/page/dialogicNovels/pointInterestIndex')), 'pointInterestIndex');
const dialogNovel = r => require.ensure([], () => r(require('@/page/dialogicNovels/dialogNovel')), 'dialogNovel');

const bookRank = r => require.ensure([], () => r(require('@/page/bookRank/getBookRank')), 'getBookRank');

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
            path: '/bookranking',
            component: bookRank,
            meta: ['物料配置', '排行榜'],
        }, {
            path: '/bookStoreList',
            component: bookStoreList,
            meta: ['书城配置', '书城列表'],
        }, {
                path: '/bookStoreList/getModule/:Id',
                component: getModule,
                meta: ['书城配置', '书城列表','模块属性'],
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
