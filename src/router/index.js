import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/sys-admin/index', // 默认跳转到这里
    children: [
      {
        path: '/sys-admin/index',
        component: () => import('../views/sys-admin/IndexView.vue')
      },
      {
        path: '/sys-admin/temp/album/add-new',
        component: () => import('../views/sys-admin/temp/AlbumAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/album/list',
        component: () => import('../views/sys-admin/temp/AlbumListView.vue')
      },
      {
        path: '/sys-admin/temp/category/add-new',
        component: () => import('../views/sys-admin/temp/CategoryAddView.vue')
      },
      {
        path: '/sys-admin/temp/category/list-by-parent',
        component: () => import('../views/sys-admin/temp/CategoryListView.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
