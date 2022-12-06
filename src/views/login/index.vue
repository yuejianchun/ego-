<template>
  <div>
    <div class="login-aera">
      <h3>登录</h3>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名/账号" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
import { mapMutations } from "vuex";
export default {
  name: "LOGIN",
  data() {
    
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        
      },
    };
  },
  methods: {
     ...mapMutations('loginmodule',['setUser']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('校验通过',this.loginForm)
          let {username,password} = this.loginForm
          this.$api.getLogin({
            username,password
          }).then((res) => {
            console.log(res.data)
            if(res.data.status ===200){
              console.log(jwt(res.data.data))
              let obj ={
                  user:jwt(res.data.data).username,
                  token:res.data.data
                }
                this.setUser(obj)
                //存储本地
                localStorage.setItem('user',JSON.stringify(obj))
                //跳转
                this.$router.push('/')
                // this.info=''
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
            }else{
              this.$message.error('账号或密码错误');
            }
          })

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-aera {
  width: 400px;
  height: 300px;
  padding: 20px;
  margin: 160px auto;
  border-radius: 20px;
  border: 1px solid #fff;
  background: #fff;
}
</style>