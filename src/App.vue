<template>
  <div id="app">
    <transition enter-to-class="e-to" enter-active-class="e-active">
      <router-view> </router-view>
    </transition>
  </div>
</template>
<script>
import { getPubKey } from "@/api";

export default {
  mounted() {
    let key = sessionStorage.getItem("pubKey");
    if (!key || key === "undefined") {
      getPubKey().then((result) => {
        key = result.pubKey;
        key = key.replace(/\. +/g, "");
        key = key.replace(/[\r\n]/g, "");
        sessionStorage.setItem("pubKey", key);
      }).catch((err) => {
        this.$notify.error("请刷新页面....");
        return Promise.reject(err);
      });
    }
  }
}
</script>
<style>
.e-active {
  opacity: 0;
}
.e-to {
  opacity: 1;
  transition: 1s;
}
.w {
  flex: 8;
}
/* 初始化样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Lobster", cursive !important;
}
/* em 和 i 斜体的文字不倾斜 */
em,
i {
  font-style: normal;
}

/* 去掉li的小圆点 */
li {
  list-style: none;
}

img {
  /* border 0 照顾低版本浏览器 如果图片外面包含了链接会有边框的问题 */
  border: 0;
  /* 取消图片底侧有空白缝隙的问题 */
  vertical-align: middle;
}

button {
  /* 鼠标经过button按钮的时候，鼠标变成小手 */
  cursor: pointer;
}

a {
  color: #fff;
  text-decoration: none;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
