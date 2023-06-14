<template>
  <div class="about w">
    <div class="about-content">
      <div class="about-top">
        <div class="top-title">
          <span>DEIT</span><span class="title-rigth">ARITCLE</span>
        </div>
        <div class="top-con post-title">文章编辑</div>
      </div>
      <div class="editer">
        <div class="editer-top">
          <div class="editer-title">
            <h3>文章标题：</h3>
            <input type="text" placeholder="请输入标题.." v-model="titleData" />
          </div>
          <div class="editer-columns">
            <h3>文章分类：</h3>
            <!-- <el-radio-group v-model="checkList">
              <el-radio :label="item.id" v-for="item in columns" :key="item.id" :name="item.name">
                {{ item.name }}
              </el-radio>
            </el-radio-group> -->
            <ul>
              <li v-for="item in columns" :key="item.id">
                <label>
                  <input type="radio" name="column" :checked="item.id === checkList" @click="addCheckId(item.id)">
                  <div class="icon-box">
                    {{ item.name }}
                  </div>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="editor-edit">
          <Toolbar :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
          <Editor style="height: 500px; overflow-y: hidden;" v-model="content" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="onCreated" />
        </div>
        <!-- <button @click="submitEditer">发送</button> -->

        <div class="container">
          <button class="btn play-pause" style="color: red;" @click="clearEditor">
            <i class="el-icon-delete"></i>
            清空
          </button>
          <button class="btn play-pause" style="color: #3cbbe5;" @click="submitEditer">
            <i class="el-icon-share"></i>
            提交文章
          </button>
        </div>

      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css"
import { getColumns, uploadArticle } from "@/api";
import Footer from '@/components/footer/Footer.vue'

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Notification } from "element-ui"
export default {
  components: { Editor, Toolbar, Footer },
  data() {
    return {
      checkList: "641e613b45ad351b7c9d2b2d",
      titleData: "",
      content: "",
      columns: [],
      //编辑器
      editor: null,
      toolbarConfig: {
        excludeKeys: ["fullScreen", "insertVideo", "uploadVideo"]
      },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: 'http://127.0.0.1:3000/upload/article',
            fieldName: 'file',
            maxFileSize: 5 * 1024 * 1024, // 10M
            maxNumberOfFiles: 5,
            allowedFileTypes: ['image/*'],
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
            timeout: 10 * 1000, //10 秒
            // 单个文件上传成功之后
            onSuccess(file, res) {
              Notification.success(`${file.name} 上传成功`)
            },
            // 单个文件上传失败
            onFailed(file, res) {
              Notification.error(`${file.name} 上传失败`)
            },
            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
              Notification.warning(`${file.name} 上传出错`, err)
            }
          }
        }
      },
      mode: 'default', // or 'simple'
    }
  },
  created() {
    this.getColumnsList();
  },
  mounted() {

    let token = sessionStorage.getItem("token")
    if (!token) {
      this.$notify.warning("登录后才能编辑文章~")
      this.$router.push({
        path: "/home/page/login",
        query: {
          path: this.$route.path
        }
      })
    }
  },
  methods: {
    //编辑器初始化
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    addCheckId(id) {
      this.checkList = id;
    },
    //获取分类列表
    async getColumnsList() {
      try {
        let data = await getColumns();
        this.columns = data;

      } catch (error) {
        this.$$notify.error(err.response.data.message);

        return Promise.reject(error);
      }
    },
    //上传文章
    async submitEditer() {
      let data = {
        title: this.titleData,
        content: this.content,
        column: this.checkList,
        writer: sessionStorage.getItem("uid"),
      };
      if (!this.verificationContent(data)) {
        return false;
      }
      await uploadArticle(data).then((res) => {
        this.$notify.success("上传成功");
        this.$router.push({
          path: "/home/articles",
          query: {
            AritceId: res.id
          }
        })
        this.$bus.$emit("addIdx", "/home/articles")
      }).catch((err) => {
        this.$notify.error(err.response.data.message);
        return Promise.reject(err);
      });
    },
    //校验内容
    verificationContent(data) {
      const dataMap = {
        title: "标题不能为空",
        content: "内容不能为空",
        column: "请选择分类",
      };

      let errData = Object.entries(data).filter(([key, value]) => {
        return !value || value.length === 0;
      })[0]?.[0]


      if (dataMap[errData]) {
        this.$notify.error(dataMap[errData]);
        return false;
      }
      return true;
    },
    clearEditor() {
      this.titleData = ""
      this.editor.clear()
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }

}
</script>
<style lang="less" scoped>
@import url(../../assets/style/css/common.css);
@import url(../../assets/style/less/edit.less);

.editer {
  margin-top: 30px;
}

.editor-edit {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px #000;
}

/deep/.w-e-bar {
  border-bottom: 1px solid #ccc;
}



@bg-color: #f2f2f2;



.icons {
  display: none;
}

button {
  border: 0;

  &:focus {
    border: none;
    outline: 0 !important;
    outline-style: none;
  }
}

.container {
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: right;

  .btn {
    position: relative;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 20px;
    margin-right: 20px;
    border-radius: 10px;
    background: @bg-color;
    transition: all 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0px -6px 10px rgba(255, 255, 255, 1), 0px 4px 15px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    &:after {
      // buttons pseudo element
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      z-index: 2;
    }

    &:active {
      // button state active
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.02);

      &:after {
        box-shadow: inset 0px -2px 5px rgb(255, 255, 255),
          inset 0px 2px 5px rgba(0, 0, 0, 0.15);
      }
    }

    &.active {

      // button with active class
      &.play-pause {
        .icon {
          &.pause {
            opacity: 1;
            transform: translate(-50%, -50%);
          }

          &.play {
            opacity: 0;
            transform: translate(-50%, 50%);
          }
        }
      }
    }

    .icon-container,
    a {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    a {
      z-index: 10;
    }

    .icon {
      // svg icons
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      fill: #868686;
      height: 1.4rem;
      vertical-align: middle;
      width: 1.4rem;
      transition: all 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    &.play-pause {

      // diff buttons
      .icon {
        &.pause {
          opacity: 0;
          transform: translate(-50%, 50%);
        }
      }
    }

    &.volume-control {
      height: 160px;
      border-radius: 50px;

      &::after {
        border-radius: 50px;
      }

      .icon-container {
        height: 50%;

        &:last-child {
          transform: translateY(100%);
        }

        &:active {}
      }

      .icon {
        width: 1.6rem;
        height: 1.6rem;

        &.plus {
          transform: translate(-50%, -50%);
        }

        &.minus {
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>