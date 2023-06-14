<template>
  <div class="about w">
    <div class="about-content">
      <div class="about-top">
        <div class="top-title">
          <span>LEISURE</span><span class="title-rigth">TIME</span>
        </div>
        <div class="top-con post-title">闲暇时间</div>
      </div>
      <div class="mesList">
        <MsgList></MsgList>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import MsgList from '@/components/chat/MsgList.vue'
import Footer from '@/components/footer/Footer.vue'

export default {
  components: {
    MsgList,
    Footer
  }
}
</script>
<style lang="less" scoped>
@import url(../../assets/style/css/common.css);

.mesList {
  width: 80%;
  margin: 50px auto;
}
</style>