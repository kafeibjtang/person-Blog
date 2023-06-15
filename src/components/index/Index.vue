<template>
  <div ref="vantaRef" style="width: 100%; height: 100vh" key="1">
    <div class="top-left" style="z-index: 1">
      <a class="gethub" href="https://github.com/kafeibjtang/person-Blog.git" title="GitHub" target="_blank">
        <i class="ent-github">
          <svg t="1686193496428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2351" width="32" height="32">
            <path
              d="M498.894518 100.608396c-211.824383 0-409.482115 189.041494-409.482115 422.192601 0 186.567139 127.312594 344.783581 295.065226 400.602887 21.13025 3.916193 32.039717-9.17701 32.039717-20.307512 0-10.101055 1.176802-43.343157 1.019213-78.596056-117.448946 25.564235-141.394311-49.835012-141.394311-49.835012-19.225877-48.805566-46.503127-61.793368-46.503127-61.793368-38.293141-26.233478 3.13848-25.611308 3.13848-25.611308 42.361807 2.933819 64.779376 43.443441 64.779376 43.443441 37.669948 64.574714 98.842169 45.865607 122.912377 35.094286 3.815909-27.262924 14.764262-45.918819 26.823925-56.431244-93.796246-10.665921-192.323237-46.90017-192.323237-208.673623 0-46.071292 16.498766-83.747379 43.449581-113.332185-4.379751-10.665921-18.805298-53.544497 4.076852-111.732757 0 0 35.46063-11.336186 116.16265 43.296085 33.653471-9.330506 69.783343-14.022365 105.654318-14.174837 35.869952 0.153496 72.046896 4.844332 105.753579 14.174837 80.606853-54.631248 116.00813-43.296085 116.00813-43.296085 22.935362 58.18826 8.559956 101.120049 4.180206 111.732757 27.052123 29.584806 43.443441 67.260893 43.443441 113.332185 0 162.137751-98.798167 197.850114-192.799074 208.262254 15.151072 13.088086 28.65155 38.804794 28.65155 78.17957 0 56.484456-0.459464 101.94381-0.459464 115.854635 0 11.235902 7.573489 24.381293 29.014824 20.2543C825.753867 867.330798 933.822165 709.10924 933.822165 522.700713c0-233.155201-224.12657-422.192601-434.927647-422.192601L498.894518 100.608396z"
              fill="#ffffff" p-id="2352"></path>
          </svg>
        </i>
        GitHub
      </a>
      <a class="gethub" href="https://gitee.com/Laoxiaoz/person-blog.git" title="码云" target="_blank">
        <i class="ent-github">
          <svg data-v-10aff0f3="" t="1678778031969" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2279" width="25" height="25">
            <path
              d="M512 1000.12c-268.466 0-488.12-219.654-488.12-488.12S243.533 23.88 512 23.88 1000.12 243.533 1000.12 512 780.467 1000.12 512 1000.12z m247.111-543.034H481.492c-12.203 0-24.406 12.203-24.406 24.406v61.016c0 12.203 12.203 24.406 24.406 24.406h167.792c12.203 0 24.406 12.203 24.406 24.406v12.203c0 39.66-33.558 73.218-73.218 73.218H371.665c-12.203 0-24.406-12.203-24.406-24.406V420.477c0-39.66 33.559-73.218 73.218-73.218h338.634c12.203 0 24.406-12.203 24.406-24.406v-61.015c0-12.203-12.203-24.406-24.406-24.406H420.477c-100.675 0-179.994 82.37-179.994 179.995V756.06c0 12.203 12.203 24.406 24.406 24.406h356.938c88.472 0 161.69-73.218 161.69-161.69V481.492c0-12.203-12.203-24.406-24.406-24.406z"
              fill="#C71D23" p-id="2280"></path>
          </svg>
        </i>
        Gitee
      </a>
    </div>
    <div class="container inner">
      <div class="eight columns">
        <h1 class="title">
          <i>Hi</i> 👋
          <div>
            <p>我是 MR XIAO</p>
            <img src="../../assets/images/maliao-8bcf1e95.webp" width="50" />
          </div>
        </h1>
        <h3>如果你有任何关于前端开发、技术交流或者生活分享的想法</h3>
        <h3>欢迎与我交流，一同探讨，共同成长！（嘻嘻，溜了~）</h3>
        <router-link class="efBtn" to="/Home">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          GO BLOG >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import 'animate.css'

import * as THREE from "three"
import BIRDS from 'vanta/src/vanta.birds'
export default {
  data() {
    return {
      vantaEffect: null
    }
  },
  mounted() {
    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef,
      THREE: THREE
    })

  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },
}
</script>
<style lang="less">
.top-left {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;

  .gethub {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    color: inherit;
    font-size: 16px;
    text-decoration: none;
    color: #fff;
    cursor: pointer;

    i {
      margin-right: 5px;
    }
  }
}

.inner {
  position: relative;
  top: 50%;
  z-index: 999;
  text-align: left;
  max-width: 1500px;
  color: #fff;

  .columns {
    float: left;
    margin-left: 10%;
    margin-right: 5%;
    transform: translateY(-50%);

    .title {
      margin-bottom: 10px;

      i {
        background-image: -webkit-linear-gradient(right,
            #f884f6,
            #fd8403,
            #10d8df);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      div {
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 18px;

        p {
          background-image: -webkit-linear-gradient(right,
              #f884f6,
              #fd8403,
              #10d8df);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    h3 {
      white-space: normal;
      line-height: 2.5rem;
      background-image: -webkit-linear-gradient(right,
          #f884f6,
          #fd8403,
          #10d8df);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .efBtn {
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

    .efBtn:hover {
      background: #03e9f4;
      color: #050801;
      box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
        0 0 200px #03e9f4;
      -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
    }

    .efBtn:nth-child(0) {
      filter: hue-rotate(270deg);
    }

    .efBtn:nth-child(1) {
      filter: hue-rotate(110deg);
    }

    .efBtn span {
      position: absolute;
      display: block;
    }

    .efBtn span:nth-child(1) {
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

    .efBtn span:nth-child(2) {
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

    .efBtn span:nth-child(3) {
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

    .efBtn span:nth-child(4) {
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
  }

  .btn {
    color: inherit;
    display: inline-block;
    margin-top: 20px;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    border: 2px solid;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    transition: all 0.1s;
    user-select: none;
  }
}
</style>
  