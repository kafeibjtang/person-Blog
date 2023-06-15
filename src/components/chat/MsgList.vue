<template>
  <div class="about w">
    <div class="wrapper">
      <div class="wrap-left">
        <div class="left-top">
          <div class="left-title">用户列表</div>
        </div>
        <div class="left-user">
          <ul class="infinite-list">
            <li v-for="item in userList" :key="item">
              <i class="el-icon-s-custom"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-right">
        <div class="rigth-top">
          <div class="left-title">当前在线 {{ userList.length }} 人</div>
        </div>
        <div class="rigth-content">
          <ul ref="scrollBox">
            <li :class="`socke-msg-${chat.dis}`" v-for="chat in chatList" :key="chat.id">
              <i class="el-icon-s-custom" v-show="chat.dis !== 'center'" v-if="chat.dis === 'left'"></i>
              <div class="msgLi">
                <div class="lisName" v-show="chat.dis === 'left'">
                  {{ chat.nickname }}
                </div>
                <span class="msg">{{ chat.msg }}</span>
                <p v-show="chat.dis === 'center'" class="date">
                  {{ chat.time }}
                </p>
              </div>
              <i class="el-icon-s-custom" v-show="chat.dis !== 'center'" v-if="chat.dis === 'right'"></i>
            </li>
          </ul>
        </div>
        <div class="rigth-bottom">
          <div class="write">
            <input type="text" placeholder="回车键发送消息..." v-model="sendMsg" @keyup.enter="sendChat" />
            <i class="el-icon-s-promotion" @click="sendChat"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import formatDate from '@/utils/formatDate'
let idx = 0

export default {
  data() {
    return {
      sendMsg: '',
      chatList: [],
      nickname: '',
      uid: '',
      ws: null,
      userList: [],
    }
  },
  created() {
    this.ws = io("ws://www.myblogvue.cn:3004", { transports: ['websocket'] })
    this.getUserInfo()

    //用户进入聊天室，把id和昵称带给服务器
    this.ws.emit('enterChat', { uid: this.uid, nickname: this.nickname })
    //获取聊天室成员
    this.ws.on('getUser', (data) => {
      this.userList = data;
    })


    //注册事件，获取服务器广播的消息数据
    this.ws.on('chat', (data) => {
      this.serverChat(data)
    })

    //离开聊天室
    this.ws.on('logout', (nickname) => {
      this.serverLog({ nickname, isLogin: false })
    })
    //进入聊天室
    this.ws.on('logged', (nickname) => {

      //   console.log(users);
      this.serverLog({ nickname, isLogin: true })
    })

  },
  methods: {
    //初始化用户信息
    getUserInfo() {
      let uid = sessionStorage.getItem("uid") || this.createTempId()
      let nickname = sessionStorage.getItem("nickname") || `游客${this.createTempId()}`
      this.nickname = nickname
      this.uid = uid
      this.ws.emit('online', { uid, nickname })
      this.ws.on("disconnect", () => {
        this.ws = null
        this.$notify.warning("账号已在其它设备登录")

        if (this.$route.name !== "Page") {
          this.$router.push("/home/page")
          this.$bus.$emit("addIdx", "/home/page", "login")
        }
      })
    },
    //创建一个临时昵称
    createTempId() {
      return Math.random().toString(36).slice(-6)
    },
    //发送消息
    sendChat() {
      if (!this.sendMsg) {
        this.$notify.warning("请输入内容")
        return false
      }
      let msg = this.sendMsg
      this.addChat({
        isMe: true,
        msg,
        nickname: this.nickname
      })
      //通知服务器广播消息
      this.ws.emit('send', msg)
      this.sendMsg = ''
    },
    enterChat() {
      this.ws.emit('enterChat', { nickname: this.nickname })
    },
    //存储发送的消息详情
    addChat({ type = "msg",
      msg = "",
      nickname = '',
      time = formatDate(),
      isMe = false }) {
      let dis = 'left'
      if (type === 'action') {
        dis = 'center'
      }
      if (isMe) {
        dis = 'right'
      }
      this.chatList.push({
        type, msg, nickname, time, isMe, dis, id: ++idx
      })
      this.$nextTick(() => {
        if (this.$refs["scrollBox"]) {
          this.$refs["scrollBox"].scrollTop = this.$refs["scrollBox"].scrollHeight
        }
      })
    },
    serverChat({ msg = '', nickname = "陌生人", time = "" }) {
      this.addChat({
        nickname, msg, time
      })
    },
    //监听用户进入离开
    serverLog({ nickname, isLogin }) {
      let state = isLogin ? '进入' : '离开'
      let msg = `${nickname} ${state}了聊天室`

      this.userList = this.userList.filter(item => {
        return item !== nickname
      })
      this.addChat({
        type: 'action', msg
      })
    }
  },
  beforeDestroy() {
    //关闭socket
    if (this.ws !== null) {
      this.ws.emit('leaveChat')
      //   this.ws.on('outChat', (data) => {
      //     this.userList = data
      //   })
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../../assets/style/less/chat.less);

.about {
  height: 600px;
  // overflow-y: auto !important;
  background-color: #fff;

  /*滚动条样式*/
  &::-webkit-scrollbar {
    width: 2px;
    background-color: red;
  }

  &::-webkit-scrollbar-thumb {
    left: 10px;
    width: 10px;
    height: auto;
    background-color: #000;
  }
}
</style>