import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/neworder',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '创建工单',
        component: () => import('@/views/neworder/index'),
        meta: { title: '创建工单', icon: 'form' }
      }
    ]
  },

  {
    path: '/myorders',
    component: Layout,
    redirect: '/myorders/history',
    name: '我的工单',
    meta: {
      title: '我的工单',
      icon: 'nested'
    },
    children: [
      {
        path: 'history',
        name: '工单记录',
        component: () => import('@/views/myorders/index'),
        meta: { title: '工单记录', icon: 'form' }
      },
      {
        path: 'draft',
        name: '草稿箱',
        component: () => import('@/views/myorders/index'),
        meta: { title: '草稿箱', icon: 'form' }
      },
      {
        path: 'trash',
        name: '垃圾篓',
        component: () => import('@/views/myorders/index'),
        meta: { title: '垃圾篓', icon: 'form' }
      }
    ]
  },
  {
    path: '/reception',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '派单中心',
        component: () => import('@/views/reception/index'),
        meta: { title: '派单中心', icon: 'form' }
      }
    ]
  },
  {
    path: '/process',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '受理中心',
        component: () => import('@/views/process/index'),
        meta: { title: '受理中心', icon: 'form' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'form' }
      },
      {
        path: 'dept',
        name: '部门管理',
        component: () => import('@/views/system/dept/index'),
        meta: { title: '部门管理', icon: 'form' }
      },
      {
        path: 'dict',
        name: '字典管理',
        component: () => import('@/views/system/dict/index'),
        meta: { title: '字典管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/ordersetting',
    component: Layout,
    redirect: '/ordersetting/ordertype',
    name: '工单配置',
    meta: {
      title: '工单配置',
      icon: 'nested'
    },
    children: [
      {
        path: 'ordertype',
        name: '工单类型',
        component: () => import('@/views/ordersetting/ordertype/index'),
        meta: { title: '工单类型', icon: 'form' }

      },
      {
        path: 'ordersubtype/skey/:skey',
        name: '二级工单类型',
        hidden: true,
        component: () => import('@/views/ordersetting/ordersubtype/index'),
        meta: { title: '二级工单类型', icon: 'form' }

      },

      {
        path: 'orderstate',
        name: '工单状态',
        component: () => import('@/views/ordersetting/orderstate/index'),
        meta: { title: '工单状态', icon: 'form' }
      },
      {
        path: 'statetransfer',
        name: '状态转移',
        component: () => import('@/views/ordersetting/statetransfer/index'),
        meta: { title: '状态转移', icon: 'form' }
      }
    ]
  },
  {
    path: '/orderutil',
    component: Layout,
    redirect: '/orderutil/OrderDetail',
    name: '公共组件',
    meta: {
      title: '公共组件',
      icon: 'nested'
    },
    children: [
      {
        path: 'OrderDetail',
        name: '工单详情',
        component: () => import('@/views/orderutil/OrderDetail'),
        meta: { title: '工单详情', icon: 'form' }

      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
