<template>
  <div class="search-sgin">
    <div class="flexbox">
      <div class="search">
        <div>
          <input
            ref="search"
            type="text"
            v-model="searchValue"
            placeholder="Search . . ."
            required
            @blur="closeSearch"
            @keyup.enter="searchArticle"
          />
        </div>
      </div>
    </div>
    <div class="outLogin" v-if="isLogin">
      <a href="javascript:;" @click="outLogin">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ nickname }} <i class="out"></i>
      </a>
    </div>
    <div class="signBtn" v-else>
      <a href="javascript:;" @click="Login('login')">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        登录
      </a>
      <a href="javascript:;" @click="Login('sign')">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        注册
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['msgType'],
  data() {
    return {
      searchValue: "",
      isLogin: false,
      nickname: ""
    }
  },
  created() {
    this.nickname = sessionStorage.getItem("nickname")
    if (this.nickname) {
      this.isLogin = true
      return false
    }
    this.$bus.$on("isLogin", () => {
      if (sessionStorage.getItem("token")) {
        this.isLogin = true
      }
    })
    this.$bus.$on("out", this.outLogin)
  },
  methods: {
    //文章搜索
    searchArticle() {
      if (!this.searchValue.trim()) {
        this.$notify.warning("输入内容在搜索哦~")
        $(this.$refs.search).blur()
        return false
      }
      this.$emit("upColumnIdx", "/home/articles")
      this.$router.push({ name: 'Articles', query: { searchVal: this.searchValue } })
      this.searchValue = ""
      $(this.$refs.search).blur()
    },
    //清除搜索框
    closeSearch() {
      $(this.$refs.search).blur()
      this.searchValue = ""
    },
    //登录注册
    Login(type) {
      this.$router.push({
        path: "/home/page/login",
        query: {
          type: type,
          path: this.$route.path
        }
      })
    },
    //退出登录
    outLogin() {
      this.isLogin = false
      sessionStorage.removeItem("nickname")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("uid")
      if (this.$route.path === "/home/edit" || this.$route.path === "/home/chat") {
        this.$router.push("/home/page")
        this.$bus.$emit("addIdx", "/home/page")
      }

    }
  },
  watch: {
    "msgType"(val) {
      if (val) {
        this.outLogin()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search-sgin {
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;

  a {
    &:hover .out {
      background: url("../assets/images/out2.png") no-repeat;
      background-size: 20px 20px;
      background-position: center center;
    }
  }
}

.outLogin {
  a {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
  }

  .out {
    display: block;
    width: 20px !important;
    height: 20px !important;
    background: url("../assets/images/out1.png") no-repeat;
    background-size: 20px 20px;
    background-position: center center;
  }
}

//搜索框
@import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700");

.flexbox {
  position: fixed;
  left: 0;
  top: 0;
}

.search {
  position: absolute;
  top: 20px;
  left: 250px;
}

.search > div {
  display: inline-block;
  position: relative;
  filter: drop-shadow(0 1px #0091c2);
}

.search > div:after {
  content: "";
  background: #3cbbe5;
  width: 4px;
  height: 15px;
  position: absolute;
  top: 20px;
  right: -5px;
  transform: rotate(125deg);
}

.search > div > input {
  color: #3cbbe5;
  font-size: 16px;
  background: transparent;
  width: 30px;
  height: 30px;
  padding: 10px;
  border: solid 3px #3cbbe5;
  outline: none;
  border-radius: 35px;
  transition: width 0.5s;
}

.search > div > input::placeholder {
  color: #3cbbe5;
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.search > div > input:focus::placeholder {
  opacity: 1;
}

.search > div > input:focus,
.search > div > input:not(:placeholder-shown) {
  width: 250px;
}

//登录按钮
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap");

a {
  position: relative;
  display: inline-block;
  padding: 10px 15px;
  margin: 40px 0;
  color: #03e9f4;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  overflow: hidden;
  margin-right: 20px;
}

a:hover {
  background: #03e9f4;
  color: #050801;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 200px #03e9f4;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}

a:nth-child(0) {
  filter: hue-rotate(270deg);
}

a:nth-child(1) {
  filter: hue-rotate(110deg);
}

a span {
  position: absolute;
  display: block;
}

a span:nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: animate1 1s linear infinite;
}

@keyframes animate1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: animate2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes animate2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

a span:nth-child(3) {
  bottom: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: animate3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes animate3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: animate4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes animate4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}
</style>
    