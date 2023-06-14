<template>
  <div class="msg">
    <div class="msg-title">
      <h2 class="title">留言板</h2>
      <span class="sub-title">已收到 <span>{{ len }}</span> 条留言
      </span>
    </div>
    <div class="cards-box">
      <section class="cards">
        <article class="card card--1" v-for="item in msgList" :key="item.id">
          <div class="card__info-hover">
            <svg class="card__like" viewBox="0 0 24 24">
              <path fill="#000000"
                d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
            </svg>
            <div class="card__clock-info">
              <svg class="card__clock" viewBox="0 0 24 24">
                <path
                  d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
              </svg><span class="card__time">{{ item.date }}</span>
            </div>
          </div>
          <div class="card__img"></div>
          <a href="javascript:;" class="card_link">
            <div class="card__img--hover"></div>
          </a>
          <div class="card__info">
            <span class="card__category"> {{ item.date }}</span>
            <h3 class="card__title">{{ item.content }}</h3>
            <span class="card__by">by
              <a href="javascript:;" class="card__author" title="author">{{
                item.fullname
              }}</a></span>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    'msgList': {
      type: Array
    },
    "len": {
      type: Number
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../assets/style/css/msg.css);

.msg {
  font-family: "Roboto Slab", serif;
  margin: 0;
  width: 80%;
  height: 100%;
  padding: 30px;
  display: flex;
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  justify-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .cards-box {
    width: 100%;
  }

  .msg-title {
    width: 100%;

    .title {
      padding-bottom: 10px;
      background-image: linear-gradient(to bottom, #00bbd6 0%, #01162f 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .sub-title {
      font-size: 14px;
      color: #ccc;

      span {
        color: red;
        font-size: 20px;
      }
    }
  }
}
</style>