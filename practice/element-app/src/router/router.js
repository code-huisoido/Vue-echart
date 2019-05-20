import Router from 'vue-router'

const route = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/hello',
        name: 'hello',
        component: () => import('../components/HelloWorld.vue')
    }, {
        path: '/practice',
        name: 'practice',
        component: () => import('../components/Practice.vue')
    }, {
        path: '/watch',
        name: 'watch',
        component: () => import('../components/WatchExample.vue')
    }, {
        path: '/promise',
        name: 'promise',
        component: () => import('../components/Promise.vue')
    }, {
        path: '/china-map',
        name: 'china-map',
        component: () => import('../components/ChinaMap.vue')
    }, {
        path: '/hk-map',
        name: 'hk-map',
        component: () => import('../components/HKMap.vue')
    }, {
        path: '/scatter-map',
        name: 'scatter-map',
        component: () => import('../components/ScatterMap.vue')
    }]
})

export default route