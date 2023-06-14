<template>
  <div class="home">
    <div class="home-left">
      <div class="home-fixd">
        <div class="logo">
          <h1>
            <!-- <img
              src="https://ppt.chnlib.com/FileUpload/2019-02/PNGTou_Ming_Bei_Jing-151450_119.png"
              alt="欢迎~"
            /> -->
            <img src="https://img2.baidu.com/it/u=3242834556,2556611746&fm=253&fmt=auto&app=138&f=PNG?w=500&h=393"
              alt="欢迎~" />
          </h1>
        </div>
        <el-menu router :default-active="idx" class="el-menu-vertical-demo" text-color="#000" active-text-color="#daa520">
          <el-menu-item index="/home/page" @click="addIdx('/home/page')">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/home/about" @click="addIdx('/home/about')">
            <i class="el-icon-s-custom"></i>
            <span slot="title">关于我</span>
          </el-menu-item>
          <el-menu-item index="/home/assort" @click="addIdx('/home/assort')">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">作品集</span>
          </el-menu-item>
          <el-menu-item index="/home/articles" @click="addIdx('/home/articles')">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">学无止境</span>
          </el-menu-item>

          <el-menu-item index="/home/edit" @click="addIdx('/home/edit')">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">文章随笔</span>
          </el-menu-item>
          <el-menu-item index="/home/chat" @click="addIdx('/home/chat')">
            <i class="el-icon-chat-line-round"></i>
            <span slot="title">闲聊时间</span>
          </el-menu-item>
          <el-menu-item index="/home/comments" @click="addIdx('/home/comments')">
            <i class="el-icon-collection"></i>
            <span slot="title">留言板</span>
          </el-menu-item>
          <el-menu-item index="/index" @click="addIdx('/index')">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">返回</span>
          </el-menu-item>
        </el-menu>
        <div class="container">
          <div class="switch switch-yellow">
            <input type="radio" class="switch-input" name="view3" id="week3" checked @change="upOpenPf('open')" />
            <label for="week3" class="switch-label switch-label-off">open</label>
            <input type="radio" class="switch-input" name="view3" id="month3" @change="upOpenPf('close')" />
            <label for="month3" class="switch-label switch-label-on">close</label>
            <span class="switch-selection"></span>
          </div>
          <div class="togg-img">
            <img src="@/assets/images/花瓣.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="sign">
      <SignBtn :msgType="msgType" v-if="$route.name !== 'Login'" />
    </div>
    <transition name="animate__animated" enter-active-class="animate__animated animate__bounceInRight">
      <router-view></router-view>
    </transition>

  </div>
</template>
<script>
import petal from "@/utils/animatio/petal"
import Effect from "@/utils/animatio/effects"
import SignBtn from "../SignBtn.vue"
export default {
  components: { SignBtn },
  name: "home",
  data() {
    return {
      idx: "/home/page",
      pf: null,
      effect: null,
      isTool: true,
      isOpen: false,
      msgType: 1
    }
  },
  created() {
    this.idx = this.$route.path
    this.upOpenPf("open")
    this.setCurrentRoute()
    //修改侧边栏index
    this.$bus.$on("addIdx", (idx, type) => {

      if (type) {
        this.msgType++
      }
      this.addIdx(idx)
    })
    if (this.$route.path.match(/^\/home\/articles/)?.[0]) {
      this.idx = this.$route.path.match(/^\/home\/articles/)[0]
    }
  },
  mounted() {
    /* 鼠标点击特效 */
    $("html").click(this.addEffects);

  },
  methods: {
    //路由跳转修改左侧边栏高亮
    setCurrentRoute() {
      let flag = this.$route.path.match(/^\/home\/assort/)?.[0]
      if (flag) {
        this.idx = "/home/assort"
        return false
      }
      this.idx = this.$route.path
    },
    addEffects(e) {
      this.effect = new Effect(e)
    },
    addIdx(idx) {
      if (idx == "/index") {
        this.upOpenPf("close")
      }
      this.idx = idx
    },
    upOpenPf(type) {
      this.isOpen = type == "open" ? true : false
      if (this.isOpen) {
        /*花瓣特效*/
        this.pf = petal.execute()
        return false
      }
      petal.closePf()
      this.pf = null

    },
    upColumnIdx(idx) {
      this.idx = idx
    }
  },
  beforeDestroy() {
    this.pf = null
    this.effect = null
    $("html").off("click")
  }
}
</script>
<style lang="less" scoped>
@import url(../../assets/style/less/toggles.less);

.sign {
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 20;
}

.home {
  position: relative;
  display: flex;
  min-height: 100vh;

  .home-fixd {
    position: fixed;
  }

  .home-left {
    position: relative;
    flex: 1;
    min-width: 190px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding-top: 2%;
    z-index: 10;

    .logo {
      position: relative;
      transform: translateX(20%);

      h1 {
        cursor: pointer;
        text-align: center;

        img {
          height: 200px;
          max-width: 190px;
        }
      }
    }

    /deep/.el-menu {
      margin-top: 20px;
      border-right: 0;
      background-color: #fff;
    }

    /deep/.el-menu-item {
      display: flex;
      align-items: center;
      padding-top: 20px;
      padding-bottom: 20px;
      font-size: 16px !important;
      background-color: #fff !important;

      &:hover {
        background-image: -webkit-linear-gradient(bottom, red, #fd8403, yellow);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-color: #fff !important;

        // background-image: linear-gradient(to bottom right, red, rgb(0, 81, 255)) !important;
        // background-color: #333333 !important;
      }
    }
  }
}
</style>
  