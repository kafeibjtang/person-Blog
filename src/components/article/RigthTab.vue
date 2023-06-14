<template>
  <div class="rigthArticle">
    <!-- <div class="rigth-tab">
      <div class="circle-menu" @click="upExpand">
        <i :class="expand ? 'el-icon-close' : 'el-icon-collection-tag'"></i>
      </div>
      <div class="menu-list">
        <el-collapse-transition>
          <div class="menu-active" v-show="expand">
            <ul>
              <li
                :class="columnIdx == '1' ? 'active' : ''"
                @click="upDate({ id: '1', name: '全部' })"
              >
                全部
                <i
                  :class="columnIdx == '1' ? 'el-icon-collection-tag' : ''"
                ></i>
              </li>
              <li
                v-for="item in columns"
                :key="item.id"
                :class="columnIdx == item.id ? 'active' : ''"
                @click="upDate(item)"
              >
                {{ item.name }}
                <i
                  :class="columnIdx == item.id ? 'el-icon-collection-tag' : ''"
                ></i>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </div>
    </div> -->
    <button class="btn share" ref="share" @click="upExpand" :class="expand ? 'active' : ''">
      <svg class="close icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 47.971 47.971" xml:space="preserve">
        <g>
          <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,
									0L23.986,19.744L5.121,0.88c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,
									3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242C1.465,
									47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,
									47.091c0.586,0.586,1.354,0.879,2.121,0.879s1.535-0.293,2.121-0.879c1.172-1.171,
									1.172-3.071,0-4.242L28.228,23.986z" />
        </g>
      </svg>
      <svg t="1686539843948" class="upload icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2343" width="32" height="32">
        <path
          d="M187.392 70.656q28.672 0 48.64 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t47.616-19.456l54.272 0zM889.856 70.656q27.648 0 47.616 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t48.64-19.456l437.248 0zM187.392 389.12q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t47.616-19.968l54.272 0zM889.856 389.12q27.648 0 47.616 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t48.64-19.968l437.248 0zM187.392 708.608q28.672 0 48.64 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t47.616-19.968l54.272 0zM889.856 708.608q27.648 0 47.616 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t48.64-19.968l437.248 0z"
          p-id="2344" fill="#ffffff"></path>
      </svg>
    </button>

    <ul :class="expand ? 'leftActive' : ''">
      <li @click="upDate({ id: '1', name: '全部' })" :class="columnIdx == '1' ? 'liActive' : ''">
        全部
        <i :class="columnIdx == '1' ? 'el-icon-collection-tag' : ''"></i>
      </li>
      <li v-for="item in columns" :key="item.id" :class="columnIdx == item.id ? 'liActive' : ''" @click="upDate(item)">
        {{ item.name }}
        <i :class="columnIdx == item.id ? 'el-icon-collection-tag' : ''"></i>
      </li>
    </ul>
  </div>
</template>
<script>
import { getColumns } from '@/api'
export default {
  props: {
    "columnName": {
      type: String,
    },
    "columnIdx": {
      type: String,
    },
    "expand": {
      type: Boolean
    }
  },
  data() {
    return {
      columns: [],
    }
  },
  created() {

    this.getColumnsList()
  },
  methods: {

    //获取分类列表
    async getColumnsList() {
      try {
        let res = await getColumns()
        this.columns = res;

      } catch (error) {
        this.$notify.error("获取文章分类失败")
        return Promise.reject(error)
      }
    },
    //修改有侧边栏展开缩放
    upExpand() {
      this.$emit("upExpand")
    },
    //点击侧边栏除非自定义事件，修改数据
    upDate(data) {
      this.$emit("getData", data)
    },
    shareClick() {
      this.isShare = !this.isShare
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../../assets/style/less/rigthTab.less);

.rigthArticle {
  position: relative;
  z-index: 10000;
  width: 100%;
}

.liActive {
  font-weight: 700;
  color: #00a5c0;

  i {
    color: #009fb9;
  }
}
</style>
    