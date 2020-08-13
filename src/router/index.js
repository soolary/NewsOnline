// 设置路由
// 这个文件是由脚手架工具自动生成的

// 功能：设置路由。决定哪个地址显示哪个组件
import { getUser } from '../utils/storage'
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入element

// 把组件的引入改成函数的写法
// 以下异步引入路由，打开页面时才加载对应的组件，保证了首屏打开速度
const Login = () => import('../views/login/index.vue')

const Home = () => import('../views/home/index.vue')

const Layout = () => import('../views/layout/index.vue')
// 导入发布文章页面
const addArticle = () => import('../views/addArticle/addArticle.vue')
// 导入评论管理页面
const comment = () => import('../views/comment/index.vue')
// 导入粉丝管理页面
const fans = () => import('../views/fans/fans.vue')
// 导入内容管理页面
const articles = () => import('../views/articles/index.vue')
// 导入素材管理页面
const image = () => import('../views/image/image.vue')
// 导入个人设置页面
const settings = () => import('../views/settings/settings.vue')
// 导入啥都没有页面
const NotFound = () => import('../views/page404/index.vue')
Vue.use(VueRouter)

// 配置路由
const routes = [
  { path: '/login', component: Login },
  // 主页

  // 嵌套路由
  {
    path: '/',
    component: Layout,
    children: [
      {
        // Home嵌套在主页里面
        path: '/',
        component: Home,
        meta: {
          title: '首页',
          icon: 'el-icon-s-home'
        }
      },
      // 内容
      {
        path: '/articles',
        component: articles,
        meta: {
          title: '内容管理',
          icon: 'el-icon-document'
        }
      },
      // 素材
      {
        path: '/image',
        component: image,
        meta: {
          title: '素材管理',
          icon: 'el-icon-picture'
        }
      },
      // 发布文章
      {
        path: '/addArticle',
        component: addArticle,
        meta: {
          title: '发布文章',
          icon: 'el-icon-s-promotion'
        }
      },
      // 编辑文章
      {
        path: '/eaated:id',
        component: addArticle,
        meta: {
          title: '编辑文章'
        }
      },
      // 评论
      {
        path: '/comment',
        component: comment,
        meta: {
          title: '评论管理',
          icon: 'el-icon-chat-dot-round'
        }
      },
      // 粉丝
      {
        path: '/fans',
        component: fans,
        meta: {
          title: '粉丝管理',
          icon: 'el-icon-present'
        }
      },
      // 设置
      {
        path: '/settings',
        component: settings,
        meta: {
          title: '个人设置',
          icon: 'el-icon-setting'
        }
      }
    ]
  },

  // 无法匹配路由会显示404页面
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  routes
})

// 前置路由
// 所有的路由页面中跳转，都会先进入到这个函数中来。
// to: 要跳入的路由信息。你要去哪里
// from: 要跳出的路由信息。你从哪里来
// next: 放行方法
//   - next() : 正确跳转。允许进入到 to 路由
//   - next(路由地址) : 不允许去to，而转去指定的路由地址
router.beforeEach((to, from, next) => {
  // 如果想进入主页，就检查是否登录，没有的话跳转登录
  if (to.path !== '/login') {
    // 检查是否有登陆信息：看localStorage中是否有保存信息
    const userInfo = getUser()
    if (userInfo && userInfo.token) {
      // 有就放行，
      next()
    } else {
      console.log('路由导航守卫:你没有登陆，请回去！')
      // 没有就回去登陆
      next('/login')
    }
  } else {
    // 如果跳转登录，直接放行
    next()
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
