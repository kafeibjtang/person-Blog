<template>
  <div class="about w">
    <div class="about-content" id="scroll">
      <div class="about-top">
        <div class="top-title">
          <span>LOOK</span><span class="title-rigth">ARTICLE</span>
        </div>
        <div class="top-con post-title">{{ articleData.title }}</div>
      </div>
      <div class="article " v-loading="loading">
        <div class="post-time">
          <span><i class="el-icon-time"></i>{{ articleData.date }}</span>
          <span><i class="el-icon-document"></i>{{ articleData.column?.name }}</span>
        </div>
        <div class="post-body ">
          <div v-html="articleData.detailed ? articleData.detailed : articleData.content" class="post-detailed typo"
            ref="detailed"></div>
          <div class="post-footer">
            <div class="post-footer-tags">
              <i class="el-icon-edit-outline" style="color: orangered; margin-right: 5px">
              </i>
              <span style="font-size: 14px">笔记<!----></span>
            </div>
            <div class="post-footer-tags">
              <i class="el-icon-user" style="color: orangered; margin-right: 5px">
              </i>
              <span style="font-size: 14px">作者：{{ articleData.writer?.nickname }}</span>
            </div>
          </div>
        </div>
        <div class="post-hit_num">
          <p><i class="el-icon-view"></i>{{ articleData.hit_num }}</p>
          <p>
            <i class="el-icon-star-off" :class="{ active: isLike }" @click="likeArticle"></i>
            {{ likeNums }}
          </p>
          <p>
            <i class="el-icon-chat-dot-round"></i>{{ articleData.comments?.length }}
          </p>
        </div>
      </div>
    </div>
    <scroller />
    <Footer />
    <i class="goBack" @click="goBack">
      <svg t="1686416534789" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2085" width="32" height="32">
        <path
          d="M764.28847787 408.96539307c51.24041387 30.5463296 114.11019093 112.9447424 140.2667008 212.12910933 26.15978667 99.19092053 21.82239573 188.00858453 21.82239573 188.00858453s-33.86682027-54.6963456-47.59770453-73.87327146c-13.73088427-19.17146453-71.58934187-90.61116587-161.3955072-132.0157184-89.80616533-41.40346027-239.91855787-34.03066027-239.91855787-34.03066027v172.4121088L63.75560533 448.55241387l413.7091072-293.04531627v173.99808s99.38315947 7.4809344 151.3324544 18.23757653c87.49929813 18.12179627 135.49131093 61.22263893 135.49131094 61.22263894z m0 0"
          fill="#3cbbe5" p-id="2086"></path>
      </svg>
    </i>
  </div>
</template>
<script>
import { getArticle, likes } from "@/api";
import scroller from "@/components/Scroller.vue"
import Footer from '@/components/footer/Footer.vue'

export default {
  components: { scroller, Footer },
  data() {
    return {
      articleData: {},
      id: "",
      isLike: false,
      likeNum: 0,
      loading: false,
      el: "#scroll"
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getArticleDetails(this.id);

  },
  methods: {
    async getArticleDetails(id) {
      this.loading = true
      try {
        this.articleData = await getArticle(id);
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$notify.error("获取文章失败");
        return Promise.reject(error);
      }
    },
    likeArticle() {
      //每次点击清除定时器，防止多次点击同时开启多个定时器
      clearTimeout(this.time)
      this.likeNum += this.isLike ? -1 : 1
      this.isLike = !this.isLike
      try {
        //10s内只触发一次点赞，防止多次请求
        this.time = setTimeout(async () => {
          await likes(this.id).then(() => {
            this.likeNum = 0
            this.getArticleDetails(this.id)
          })
        }, 5000)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // },
    goBack() {
      this.$router.push("/home/articles")
    }
  },
  computed: {
    likeNums() {
      return this.articleData.like_num + this.likeNum
    }
  },
  beforeDestroy() {
    //组件销毁前判断定时器是否存在，如果有定时器，说明用户点击了点赞按钮需要发送请求
    if (this.time !== null) {
      clearTimeout(this.time)
      likes(this.id).then(() => {
        this.getArticleDetails(this.id)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../assets/style/css/common.css);
@import url(../assets/style/css/typo.css);

.about {
  position: relative;
}

.about-content {
  width: 60%;
}

.goBack {
  cursor: pointer;
  position: absolute;
  right: 17%;
  top: 50px;
  z-index: 200;
}

.post-title {
  text-align: center;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 20px;
}

.post-time {
  text-align: center;
  color: #8697a8;
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 10px;

    i {
      margin-right: 5px;
    }
  }
}

.post-body {
  color: #3c4e64;
  word-break: break-word;
  font-size: 16px;
  word-spacing: 10px;
  font-family: Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans,
    Arial, sans-serif;
  text-indent: 2em;
  padding: 20px;
  overflow: hidden;

  .post-detailed {
    p {
      width: 100%;
      word-wrap: normal;
    }
  }
}

.post-footer {
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  position: relative;
  display: flex;
  justify-content: space-between;

  &::before {
    content: "";
    background-color: #f5651e;
    height: 1px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 30%;
  }

  .post-footer-tags {
    padding-top: 20px;
    text-indent: 0;
  }
}

.post-hit_num {
  display: flex;
  justify-content: right;

  p {
    margin: 0 10px;
    color: #3c4e64;
    font-size: 16px;

    i {
      margin-right: 5px;
    }
  }
}

.post-hit_num {
  display: flex;
  justify-content: right;

  p {
    margin: 0 10px;
    color: #3c4e64;
    font-size: 16px;

    i {
      margin-right: 5px;
    }
  }
}
</style>