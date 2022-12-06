import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout'
import login from '@/views/login'
import home from '@/views/home'
import user from '@/views/user'
const goods = ()=>import('@/views/goods')
const params = ()=>import('@/views/params')
const Specifications = ()=>import('@/views/params/paramsinfo/Specifications')
const advert = ()=>import('@/views/advert')
const order = ()=>import('@/views/order')
const orderlist =()=>import('@/views/order/orderlist')
const orderback = () =>import('@/views/order/orderback')
const addgoods = ()=>import('@/views/goods/addgoods')
Vue.use(VueRouter)
const routes=[
    {
        path:'',
        component:layout,
        meta:{
            isLogin : true
        },
        children:[
            {   //首页
                path:'/',
                name:'home',
                component:home
            },
            {   //  商品管理
                path:'/goods',
                name:'goods',
                component:goods
            },
            {
                path:'/add-goods',
                name:'addgoods',
                component:addgoods
            },
            {   //  规格参数
                path:'/params',
                name:'params',
                component:params,
                redirect:'/params/specifications',
                children:[
                    {
                        path:'specifications',
                        name:'Specifications',
                        component:Specifications
                    }
                ]
            },
            {   //  广告
                path:'/advert',
                name:'advert',
                component:advert
            },
            {
                path:'/user',
                name:user,
                component:user
            },
            {   // 订单
                path:'/order',
                name:'order',
                component:order,
                redirect:'/order/order-list',
                children:[
                    {
                        path:'order-list',
                        component:orderlist
                    },
                    {
                        path:'order-back',
                        component:orderback
                    }
                ]
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:login,

    }

]
const router = new VueRouter({
    routes
})
import store from '../store/index'
router.beforeEach((to,from,next) => {
    console.log(to)
    if (to.matched.some(ele=>ele.meta.isLogin)) {
        let token = store.state.loginmodule.userinfo.token
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})
export default router