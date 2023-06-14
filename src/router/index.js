import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)
//重写路由push方法，捕获重定向路由错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const routes = [

  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/components/index/Index.vue"),
    meta: {
      title: "欢迎来到我的博客~"
    }
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/page",
    component: () => import("@/components/index/Home"),
    meta: {
      title: "嗨~，很高兴认识你"
    },
    children: [{
      path: "page",
      name: "Page",
      component: () => import("@/views/tabs/Page"),
      meta: {
        title: "嗨~，很高兴认识你"
      },
    },
    {
      path: "page/login",
      name: "Login",
      component: () => import("@/views/Login"),
      meta: {
        title: "很荣幸得到你的欣赏~"
      },
    },
    {
      path: "about",
      name: "About",
      component: () => import("@/views/tabs/About"),
      meta: {
        title: "非常开心你能来了解我~"
      },
    },
    {
      path: "articles",
      name: "Articles",
      component: () => import("@/views/tabs/Articles"),
      meta: {
        title: "阅读是一个良好的习惯*（>.<）* "
      },
    },
    {
      path: "assort",
      name: "Assort",
      component: () => import("@/views/tabs/Assort"),
      meta: {
        title: "加油呀！学无止境哦~"
      },
    },
    {
      path: "articles/:id",
      name: "Article",
      component: () => import("@/views/Article"),
      meta: {
        title: "喜欢这篇文章吗~"
      },
    },
    {
      path: "edit",
      name: "Edit",
      component: () => import("@/views/tabs/Edit"),
      meta: {
        title: "感谢你的分享~~"
      }
    },
    {
      path: "comments",
      name: "Comments",
      component: () => import("@/views/tabs/Comments"),
      meta: {
        title: "你有什么想和我说的呢~"
      },
    },
    {
      path: "chat",
      name: "Chat",
      component: () => import("@/views/tabs/Chat"),
      meta: {
        title: "休息一下~"
      },
    }
    ]
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/components/404/404.vue"),
    meta: {
      title: "页面跑路了~"
    },
  },

]


const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === "/hoem/edit") {
//     let token = sessionStorage.getItem("token")
//     if (!token) {
//       next('/home/page');
//     }
//   }
//   next()
// })

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router