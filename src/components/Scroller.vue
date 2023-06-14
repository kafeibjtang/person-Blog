<template>
  <div
    class="scrollTop"
    v-show="scrollerTop >= scrollTop ? true : false"
    @click="scroll"
  ></div>
</template>
<script>

export default {
  props: {
    "scrollTop": {
      type: String,
      default: () => {
        return "400"
      }
    },
    "time": {
      type: Number,
      default: () => {
        return 500
      }
    }
  },
  data() {
    return {
      scrollerTop: "",
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.scrollerTop = this.getScroll().top;
    },
    //获得页面向左、向上卷动的距离
    getScroll() {
      return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      };
    },
    scroll() {
      $("html,body").animate({ scrollTop: 0 }, this.time);
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
<style lang="less" scoped>
.scrollTop {
  position: fixed;
  bottom: 0;
  right: 50px;
  width: 100px;
  height: 200px;
  cursor: pointer;
  background: url(../assets/images/e1.png) no-repeat;
  background-position: center center;
  &:hover {
    background: url(../assets/images/e2.png) no-repeat;
    background-position: center center;
  }
}
</style>