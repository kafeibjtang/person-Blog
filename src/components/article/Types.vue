<template>
  <div class="bodyBox">
    <!-- <div>
      <el-carousel
        :interval="3000"
        type="card"
        height="400px"
        indicator-position="none"
        arrow="always"
      >
        <el-carousel-item v-for="item in columns" :key="item.id">
          <div class="carousel">
            <div class="carousel-img">
              <img :src="imgSrc[item.cover]" alt="加载失败了...." />
            </div>
            <div class="carousel-text" @click="getColumnsList(item)">
              <div class="carousel-title">
                <div>
                  {{ item.name }}
                </div>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div> -->
    <div class="component">
      <ul class="align">
        <!-- Book 1
        <li>
          <figure class="book">
            Front
            <ul class="hardcover_front">
              <li>
                <img
                  src="https://s.cdpn.io/13060/book1.jpg"
                  alt=""
                  width="100%"
                  height="100%"
                />
                <span class="ribbon bestseller">Nº1</span>
              </li>
              <li></li>
            </ul>
            Pages
            <ul class="page">
              <li></li>
              <li>
                <a class="btn" href="#">Download</a>
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            Back
            <ul class="hardcover_back">
              <li></li>
              <li></li>
            </ul>
            <ul class="book_spine">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li> -->
        <!-- Book 2 -->
        <li v-for="item in columns" :key="item.id">
          <figure class="book">
            <!-- Front -->
            <ul class="hardcover_front">
              <li>
                <img :src="imgSrc[item.cover]" alt="" width="100%" height="100%" />
                <span class="ribbon new" v-if="item.cover > 4">NEW</span>
                <span class="ribbon bestseller" v-else>Nº1</span>
              </li>
              <li></li>
            </ul>
            <!-- Pages -->
            <ul class="page">
              <li></li>
              <li>
                <a class="btn" href="javascript:;" @click="getColumnsList(item)">{{ item.name }}</a>
              </li>
              <li style="background: #fffbec"></li>
              <li style="background: #fffbec"></li>
              <li style="background: #fffbec"></li>
            </ul>
            <!-- Back -->
            <ul class="hardcover_back">
              <li></li>
              <li></li>
            </ul>
            <ul class="book_spine">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["columns"],
  data() {
    return {
      imgSrc: [
        require("../../assets/images/book/1.jpg"),
        require("../../assets/images/book/2.jpg"),
        require("../../assets/images/book/3.jpg"),
        require("../../assets/images/book/4.jpg"),
        require("../../assets/images/book/5.jpg"),
        require("../../assets/images/book/6.jpg"),
        require("../../assets/images/book/7.jpg"),
        require("../../assets/images/book/8.jpg"),
        require("../../assets/images/book/9.jpg"),
        require("../../assets/images/book/10.jpg"),
      ],
      // imgSrc: ["https://img60.ddimg.cn/digital/product/88/60/1900778860_cc_cover.jpg?version=e6b67741-4464-4ead-bc32-8cf2ccec3be4",
      //   "https://img1.baidu.com/it/u=2294423868,4281810156&fm=253&fmt=auto&app=138&f=PNG?w=500&h=651",
      //   "https://s.cdpn.io/13060/book1.jpg", "https://s.cdpn.io/13060/book2.jpg", "https://s.cdpn.io/13060/book3.jpg"
      // ],
    }
  },
  methods: {
    getColumnsList(val) {
      this.$router.push({
        name: "Articles",
        query: {
          id: val.id,
          name: val.name
        }
      })
      this.$bus.$emit("addIdx", `/home/articles`)
    }
  },
  computed: {
    num() {
      let num = Math.floor(Math.random() * 10)
      if (num >= 3) {
        num = 0
      } else if (num > 3 && num <= 6) {
        num = 1
      } else {
        num = 2
      }
      return num
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../../assets/style/less/book.less);
</style>