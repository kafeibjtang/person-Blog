<template>
  <div class="about w">
    <div class="about-content">
      <div class="about-top">
        <div class="top-title">
          <span>BLOG</span><span class="title-rigth">ARTICLE</span>
        </div>
        <div class="top-con">文章详情 - {{ columnName }}</div>
      </div>
      <div class="article" v-loading="loading">
        <rigth-tab :columnName="columnName" :columnIdx="columnIdx" :expand="expand" @getData="getData"
          @upExpand="upExpand"></rigth-tab>
        <transition name="animate__animated" enter-active-class="animate__animated animate__fadeInRight"
          leave-active-class="animate__animated animate__fadeOutLeft">
          <ArticleList :articleList="articleList" @loadList="loadList" v-show="isShow"></ArticleList>
        </transition>
      </div>
      <div class="load" v-if="isBox">没有更多了....</div>
      <div class="load" v-if="columnName == '全部'" v-show="!isBox">
        滚动加载更多 <i class="el-icon-bottom"></i>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/footer/Footer.vue'

import ArticleList from '@/components/article/ArticleList.vue';
import RigthTab from '@/components/article/RigthTab.vue';
import qs from "qs";

import { getArticleList, getcolumnList, getSearchData } from '@/api'

export default {
  components: {
    ArticleList,
    RigthTab,
    Footer
  },
  data() {
    return {
      loading: false,
      total: 45,
      size: 9,
      page: 1,
      articleList: [],
      columnName: "全部",
      columnIdx: "1",
      isShow: true,
      flag: true,
      expand: true,
      isBox: false
    }
  },
  created() {

    let val = this.$route.query.searchVal
    if (val) {
      this.searchArticle(val)
      return false
    }
    if (this.$route.query.id) {
      this.columnIdx = this.$route.query.id
      this.columnName = this.$route.query.name
      this.getColumnsList(this.$route.query.id)
      this.$router.push({ query: {} })
      return false
    }
    this.getList()

  },
  methods: {
    //获取分页全部文章
    async getList() {
      if (!this.flag) {
        return false
      }

      this.page = 1;
      this.size = 10
      this.flag = false
      this.loading = true
      try {
        let { list, total } = await getArticleList({ params: { size: this.size, page: this.page } })
        this.articleList = list
        this.total = total
        if (this.articleList.length >= this.total) {
          this.isBox = true
        }
        this.loading = false
        this.flag = true
        this.upExpand()

      } catch (error) {
        this.$notify.error("获取文章失败")
        this.loading = false
        return Promise.reject(error)
      }
    },
    //获取分类文章
    async getColumnsList(id) {
      if (!this.flag) {
        return false
      }
      this.isShow = !this.isShow
      this.loading = true
      this.flag = false

      setTimeout(() => {
        this.isShow = !this.isShow
      }, 300)
      if (id == "1") {
        this.getList()
        return false
      }
      try {
        let { aids } = await getcolumnList(id)
        this.articleList = aids
        this.loading = false
        this.flag = true
        this.upExpand()

      } catch (error) {
        this.$notify.error("获取文章失败")
        this.loading = false
        return Promise.reject(error)
      }
    },
    //点击侧边栏获取分类文章
    getData(data) {
      this.columnIdx = data.id
      if (data.id == '1') {
        this.columnName = data.name
        this.getList()
      }
      this.columnName = data.name
      this.getColumnsList(data.id)
    },
    upExpand() {
      this.expand = !this.expand
    },
    //滚动加载
    async loadList() {
      if (this.articleList.length >= this.total) {
        this.isBox = true
      }
      if (this.columnName !== "全部" || !this.flag) {
        return false
      }
      this.page++;
      this.loading = true
      this.flag = false
      try {
        let { list } = await getArticleList({ params: { size: this.size, page: this.page } })
        this.articleList.push(...list)
        this.loading = false
        this.flag = true
      } catch (error) {
        this.$notify.error("获取文章失败")
        this.loading = false
        return Promise.reject(error)
      }
    },
    //搜索文章
    searchArticle(val) {
      this.columnName = val
      this.$router.push({ query: {} })
      let data = {}
      let q = val || undefined
      let query = JSON.parse(JSON.stringify({ q }))
      if (Object.entries(query).length > 0) {
        data.query = qs.stringify(query)
      }
      this.getSearchValue(data)
    },
    //获取搜索文章
    async getSearchValue(data) {
      this.columnIdx = "1"
      this.loading = true
      try {
        let res = await getSearchData(qs.stringify(data))
        this.articleList = res.list
        if (this.articleList.length <= 0) {
          this.$notify.warning("没有搜索到文章，换个搜索词试试吧~")
        }
        this.upExpand()
        this.loading = false
      } catch (error) {
        this.$notify.error("搜索出错啦")
        this.loading = false
        return Promise.reject(error)
      }

    },

  },
  watch: {
    "$route.query.searchVal"(val) {
      if (val) {
        this.searchArticle(val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../../assets/style/css/common.css);

.article {
  margin-top: 3rem;
  padding: 0 4rem;
  width: 100%;
}

.about {
  background-color: #f6f6f6 !important;
}

.load {
  margin-top: 10px;
  text-align: center;
  color: #61c4dc;
}

/deep/.el-loading-mask {
  background-color: #f6f6f6 !important;
}
</style>
    