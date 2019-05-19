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
        path: '/map',
        name: 'map',
        component: () => import('../components/Map.vue')
    }]
})

export default route