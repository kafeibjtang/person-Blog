<template>
  <div class="w">
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">没有帐户？</h2>
            <p class="user_unregistered-text">
              很高兴你能来到我的博客！有任何建议，欢迎在留言板向我留言...<br />
              <br />
              希望您能够留下真实的邮箱，可以收到我的来信哦~
            </p>
            <button
              class="user_unregistered-signup"
              id="signup-button"
              @click="changeTabs('left')"
            >
              Sign up
            </button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">已有账户？</h2>
            <p class="user_registered-text">
              很高兴你能来到我的博客！有任何建议，欢迎在留言板向我留言...<br />
              <br />
              登录后才能发表文章哦~
            </p>
            <button
              class="user_registered-login"
              id="login-button"
              @click="changeTabs('rigth')"
            >
              Login
            </button>
          </div>
        </div>

        <div
          class="user_options-forms"
          id="user_options-forms"
          :class="isType ? 'bounceLeft' : 'bounceRight'"
        >
          <div class="user_forms-login">
            <h2 class="forms_title">登录</h2>
            <el-form
              class="forms_form"
              :model="formData"
              :rules="formRules"
              ref="loginForm"
            >
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <el-form-item prop="username">
                    <el-input
                      type="text"
                      placeholder="账号：数字+字母 6-8位"
                      class="forms_field-input"
                      v-model="formData.username"
                    />
                  </el-form-item>
                </div>
                <div class="forms_field">
                  <el-form-item prop="password">
                    <el-input
                      type="password"
                      placeholder="密码：数字+字母 6-12位"
                      class="forms_field-input"
                      required
                      v-model="formData['password']"
                      show-password
                    />
                  </el-form-item>
                </div>
              </fieldset>
              <div class="forms_buttons" @click="login('loginForm')">
                <button class="forms_buttons-forgot"></button>
                <input
                  type="button"
                  value="Log In"
                  class="forms_buttons-action"
                />
              </div>
            </el-form>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title_sign">注册</h2>
            <el-form
              class="forms_form"
              :model="formData"
              :rules="formRules"
              ref="sginForm"
            >
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <el-form-item prop="nickname">
                    <el-input
                      type="text"
                      placeholder="昵称：数字/英文/汉字 1-8位"
                      class="forms_field-input"
                      required
                      v-model="formData.nickname"
                    />
                  </el-form-item>
                </div>
                <div class="forms_field">
                  <el-form-item prop="username">
                    <el-input
                      type="text"
                      placeholder="账号：数字+字母 6-8位"
                      class="forms_field-input"
                      required
                      v-model="formData.username"
                    />
                  </el-form-item>
                </div>
                <div class="forms_field">
                  <el-form-item prop="password">
                    <el-input
                      type="password"
                      placeholder="密码：数字+字母 6-12位"
                      class="forms_field-input"
                      required
                      v-model="formData.password"
                      show-password
                    />
                  </el-form-item>
                </div>
                <div class="forms_field">
                  <el-form-item prop="email">
                    <el-input
                      type="email"
                      placeholder="邮箱：请输入合法邮箱地址"
                      class="forms_field-input"
                      required
                      v-model="formData.email"
                    />
                  </el-form-item>
                </div>
              </fieldset>
            </el-form>

            <div class="forms_buttons" @click="login('sginForm')">
              <input
                type="button"
                value="Sign up"
                class="forms_buttons-action"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { ResLogin, ResRegister } from "@/api"
export default {
  data() {
    return {
      formData: {
        nickname: "",
        username: "",
        password: "",
        email: ""
      },
      formRules: {
        nickname: [
          { required: true, message: "昵称必填的哦~", trigger: "blur" },
          { min: 1, max: 6, message: "数字/英文/汉字 1-6位", trigger: "blur" },
        ],
        username: [
          { required: true, message: "账号必填的哦~", trigger: "blur" },
          { min: 6, max: 8, message: "数字+字母 6-8位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "数字+字母 6-12位",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "邮箱必填的哦~", trigger: "blur" },
          { type: "email", message: "请输入合法邮箱地址", trigger: ["blur", "change"] },
        ]
      },
      isType: false,
      typePath: "/home/page"
    }
  },
  created() {
    let type = this.$route.query.type
    if (this.$route.query.path) {
      this.typePath = this.$route.query.path
    }

    if (type === "login") {
      this.isType = false
    } else if (type === "sgin") {
      this.isType = true
    }
    this.$router.push({ query: {} })
  },
  methods: {
    changeTabs(type) {
      if (type === "left") {
        this.isType = true
        this.$refs['loginForm'].resetFields()
        return false
      }
      this.$refs['sginForm'].resetFields()
      this.isType = false
    },
    login(type) {

      this.$refs[type].validate(async (valid) => {
        if (valid) {
          //登录
          if (type === "loginForm") {
            let loginData = {
              username: this.formData.username,
              password: this.formData.password
            }
            try {

              let { nickname } = await ResLogin(loginData)
              this.$notify.success(`欢迎你 ${nickname} *(> . <)*`)
              this.$bus.$emit("isLogin")
              this.$router.push(this.typePath)
              this.$bus.$emit("addIdx", this.typePath)
            } catch (error) {
              this.$notify.error(error.response.data.message)
              return error
            }
            return false
          }
          //注册
          try {
            let { nickname } = await ResRegister(this.formData)
            this.$notify.success(`欢迎你 ${nickname} *(> . <)*`)
            this.$bus.$emit("isLogin")
            this.$bus.$emit("addIdx", this.typePath)
            this.$router.push(this.typePath)
          } catch (error) {
            this.$notify.error(error.response.data.message)
            return error
          }
        } else {
          this.$notify.error("请检查输入格式是否正确")
          return false;
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 0;
  border: none;
  box-sizing: border-box;
  color: #8b8b8b !important;
  display: inline-block;
  height: 34px;
  line-height: 40px;
  outline: 0;
  padding: 0;
  width: 100%;
  font-size: 1rem;
}

/deep/.el-input {
  padding: 0 !important;
}

/deep/.el-form-item {
  margin: 0 !important;
}

/**
 * General variables
 */
@bdrds: 3px;

@white: #fff;
@black: #000;
@gray: #ccc;
@salmon: #e8716d;
@smoky-black: rgba(#222222, 0.85);

@ff: "Montserrat", sans-serif;
@ff-body: 12px;
@ff-light: 300;
@ff-regular: 400;
@ff-medium: 500;

/**
 * General configs
 */

body {
  font-family: @ff;
  font-size: @ff-body;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;

  &[type="button"] {
    cursor: pointer;
  }

  &::placeholder {
    font-size: 0.85rem;
    font-family: @ff;
    font-weight: @ff-light;
    letter-spacing: 0.1rem;
    color: @gray;
  }
}

fieldset {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/**
 * Bounce to the left side
 */
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }

  50% {
    transform: translate3d(-30px, -50%, 0);
  }

  100% {
    transform: translate3d(0, -50%, 0);
  }
}

/**
 * Bounce to the left side
 */
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }

  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }

  100% {
    transform: translate3d(100%, -50%, 0);
  }
}

/**
 * Show Sign Up form
 */
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}

/**
 * Page background
 */
.user {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  background: #ecf0f1;
  background-size: cover;

  .user_options-container {
    position: relative;
    width: 80%;
  }

  .user_options-text {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: @smoky-black;
    border-radius: @bdrds;
  }
}

/**
 * Registered and Unregistered user box and text
 */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;

  color: @white;
  font-weight: @ff-light;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem !important;
  line-height: 1em;
  color: #fff !important;
  font-weight: 700 !important;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid @gray;
  border-radius: @bdrds;
  padding: 10px 30px;

  color: @white;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;

  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: @smoky-black;
    background-color: @gray;
  }
}

/**
 * Login and signup forms
 */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: @white;
  border-radius: @bdrds;
  box-shadow: 2px 0 15px rgba(@black, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;

  .forms_buttons-forgot {
    font-family: "Montserrat", sans-serif;
    letter-spacing: 0.1rem;
    color: #ccc;
    text-decoration: underline;
    transition: color 0.2s ease-in-out;
  }

  .forms_buttons-action {
    background-color: #e8716d;
    border-radius: 3px;
    padding: 10px 35px;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #e14641;
    }
  }

  .user_forms-login {
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  }

  .forms_title,
  .forms_title_sign {
    margin-bottom: 45px;
    font-size: 1.5rem;
    font-weight: @ff-medium;
    line-height: 1em;
    text-transform: uppercase;
    color: @salmon;
    letter-spacing: 0.1rem;
  }

  .forms_title_sign {
    margin-bottom: 25px;
  }

  .forms_field {
    &:not(:last-of-type) {
      margin-bottom: 15px;
    }
  }

  /deep/.el-input__inner {
    width: 100%;
    border-bottom: 1px solid @gray;
    padding: 6px 20px 6px 6px;

    font-family: @ff;
    font-size: 1rem;
    font-weight: @ff-light;
    color: darken(@gray, 30%);
    letter-spacing: 0.1rem;

    transition: border-color 0.2s ease-in-out;

    &::placeholder {
      font-size: 14px;
    }

    &:focus {
      border-color: darken(@gray, 30%);
    }
  }

  .forms_buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
  }

  .forms-forgot {
    font-family: @ff;
    letter-spacing: 0.1rem;
    color: @gray;
    text-decoration: underline;

    transition: color 0.2s ease-in-out;

    &:hover {
      color: darken(@gray, 10%);
    }
  }

  .forms-action {
    background-color: @salmon;
    border-radius: @bdrds;
    padding: 10px 35px;

    font-size: 1rem;
    font-family: @ff;
    font-weight: @ff-light;
    color: @white;
    text-transform: uppercase;
    letter-spacing: 0.1rem;

    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: darken(@salmon, 10%);
    }
  }

  .user_forms-signup,
  .user_forms-login {
    position: absolute;
    top: 70px;
    left: 40px;

    width: calc(100% - 80px);

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
      transform 0.5s ease-in-out;
  }

  .user_forms-signup {
    transform: translate3d(120px, 0, 0);

    .forms_buttons {
      justify-content: flex-end;
    }
  }

  .user_forms-login {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    visibility: visible;
  }
}

/**
 * Triggers
 */

.bounceLeft {
  animation: bounceLeft 1s forwards;

  .user_forms-signup {
    animation: showSignUp 1s forwards;
  }

  .user_forms-login {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(-120px, 0, 0);
  }
}

.bounceRight {
  animation: bounceRight 1s forwards;
}

/**
 * Responsive 990px
 */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 350px;

    .forms_buttons {
      flex-direction: column;
    }

    .user_forms-login {
      .forms_buttons-action {
        margin-top: 30px;
      }
    }

    .user_forms-signup,
    .user_forms-login {
      top: 40px;
    }
  }

  .user_options-registered,
  .user_options-unregistered {
    padding: 50px 45px;
  }
}
</style>