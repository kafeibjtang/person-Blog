<template>
  <div class="about w">
    <div class="about-content">
      <div class="about-top">
        <div class="top-title">
          <span>POR</span><span class="title-rigth">PORTFOLIO</span>
        </div>
        <div class="top-con">往期文章分类展示</div>
      </div>
      <div class="article" v-loading="loading">
        <!-- <div class="rigth-tab">
          <div class="circle-menu" @click="addClass">
            <i
              :class="ulClass ? 'el-icon-close' : 'el-icon-collection-tag'"
            ></i>
            <span class="active-text">{{ activeName }}</span>
          </div>
          <div class="menu-list">
            <el-collapse-transition>
              <div class="menu-active" v-show="ulClass">
                <ul>
                  <li
                    :class="activeIdx == '1' ? 'active' : ''"
                    @click="getcolumArticle('1')"
                  >
                    全部
                    <i
                      :class="activeIdx == '1' ? 'el-icon-collection-tag' : ''"
                    ></i>
                  </li>
                  <li
                    v-for="item in columns"
                    :key="item.id"
                    :class="activeIdx == item.id ? 'active' : ''"
                    @click="getcolumArticle(item)"
                  >
                    {{ item.name }}
                    <i
                      :class="
                        activeIdx == item.id ? 'el-icon-collection-tag' : ''
                      "
                    ></i>
                  </li>
                </ul>
              </div>
            </el-collapse-transition>
          </div>
        </div> -->

        <Types :columns="columns"></Types>
      </div>
    </div>
    <scroller />
    <Footer />
  </div>
</template>
<script>
import { getColumns } from '@/api'
import Types from "@/components/article/Types.vue"
import scroller from "@/components/Scroller.vue"
import Footer from '@/components/footer/Footer.vue'

export default {
  components: {
    Types,
    scroller,
    Footer
  },
  data() {
    return {
      loading: false,
      columns: []
    }
  },
  created() {
    this.getColumnsList()
  },
  methods: {

    //获取分类列表
    async getColumnsList() {
      this.loading = true
      try {
        let res = await getColumns()
        this.columns = res;
        this.loading = false

      } catch (error) {
        this.$notify.error("获取文章分类失败")
        this.loading = false

        return Promise.reject(error)
      }
    }

  }
}
</script>
<style lang="less" scoped>
@import url(../../assets/style/css/common.css);

.active {
  color: yellow !important;
  background-image: linear-gradient(to right, #f86535 0%, #f0da50 100%);
}

.active-text {
  flex: 1;
  text-align: center;
  font-size: 16px !important;
}

.article {
  position: relative;
  margin-top: 3rem;
  width: 100%;
}

.about {
  background: #ecf0f1;
  color: #34495e;
  font-family: "Lato", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.2;
}
</style>
    