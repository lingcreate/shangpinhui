<template>
  <div class="register-container">
    <!-- 注册内容
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button style="height: 38px; width: 100px" @click="getCode">
          获取验证码
        </button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password2"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="checked" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="getCheckRegister">完成注册</button>
      </div>
    </div> -->

    <!-- 表单区域 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm register"
    >
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>

      <div class="content">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
      </div>

      <div class="content">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
          <el-button
            :disabled="disabled"
            v-show="!sent"
            style="
              height: 38px;
              width: 100px;
              margin-left: 5px;
              padding: 12px 10px;
            "
            @click="getCode"
            >{{ isFirstSend == true ? "获取验证码" : "重新发送" }}</el-button
          >
          <span v-show="sent" style="margin-left: 15px"
            >重新发送({{ count_down }})</span
          >
        </el-form-item>
      </div>

      <div class="content">
        <el-form-item label="登录密码" prop="psw1">
          <el-input v-model="ruleForm.psw1"></el-input>
        </el-form-item>
      </div>

      <div class="content">
        <el-form-item label="确认密码" prop="psw2">
          <el-input v-model="ruleForm.psw2"></el-input>
        </el-form-item>
      </div>

      <div class="controls">
        <el-checkbox v-model="checked"
          >同意协议并注册《尚品汇用户协议》</el-checkbox
        >
      </div>

      <el-form-item>
        <div class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
        this.disabled = false;
      } else {
        this.disabled = true;
        return callback(new Error("手机号码格式有误"));
      }
    };

    return {
      sent: false,
      count_down: 60,
      isFirstSend: true,
      checked: false,
      disabled: true,
      // ele-ui
      ruleForm: {
        phone: "",
        code: "",
        psw1: "",
        psw2: "",
      },
      rules: {
        phone: [{ validator: checkPhone, required: true, trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { type: "number", message: "验证码错误", trigger: "blur" },
        ],
        psw1: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern:
              /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
            message:
              "密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符",
            trigger: "blur",
          },
        ],
        psw2: [
          { required: true, message: "确认密码", trigger: "blur" },
          {
            pattern:
              /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
            message:
              "密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    // 获取验证码
    async getCode() {
      try {
        if (this.ruleForm.phone) {
          let result = await this.$store.dispatch(
            "user/getRegisterCode",
            this.ruleForm.phone
          );
          if (result == "ok") {
            // 获取接口返回的验证码
            this.ruleForm.code = this.$store.state.user.code;
            this.sent = true;
            // 启动倒计时
            let timer = setInterval(() => {
              this.count_down -= 1;
              if (this.count_down == 0) {
                // 倒计时结束
                this.isFirstSend = false;
                this.sent = false;
                this.count_down = 60;
                clearInterval(timer);
              }
            }, 1000);
          }
        } else {
          alert("请输入手机号码");
        }
      } catch (e) {
        console.log(e);
      }
    },

    //完成注册
    async getCheckRegister() {
      try {
        const { phone, code, password, password2 } = this;
        if (phone && code && password == password2) {
          let result = await this.$store.dispatch("user/getCheckRegister", {
            phone,
            password,
            code,
          });
          console.log(result);
          this.$router.push("/login");
        }
      } catch (e) {
        alert(e);
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid);
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;
      margin-bottom: 40px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }
    // div:nth-of-type(1) {
    //   margin-top: 40px;
    // }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      .el-form-item__label {
        padding: 0;
        color: red;
      }

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input,
      .el-input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;
      margin-left: 56px;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 -30px;

      button {
        outline: none;
        width: 262px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>