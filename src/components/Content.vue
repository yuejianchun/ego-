<template>
  <div>
    <el-container>
      <el-header style="padding: 0">
        <div class="header">
          <i class="iconfont icon-indent_right" @click="changeMenu"></i>
          <!-- <i class="iconfont icon-indent_left"></i> -->
          <div class="header-right">
          
              <el-dropdown>
                <span class="el-dropdown-link" style="color:#fff"> 
                  下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>中文</el-dropdown-item>
                  <el-dropdown-item>English</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            
            <div class="user">
              <span> 欢迎：{{ userinfo.user }}</span>
              <i class="iconfont icon-tuichu" @click="loginout"></i>
            </div>
          </div>
        </div>
      </el-header>
      <el-main class="content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CONTENT",
  computed: {
    ...mapState("loginmodule", ["userinfo"]),
  },
  methods: {
    ...mapMutations("loginmodule", ["clearUser"]),
    changeMenu() {
      this.$store.commit("collapse");
    },
    loginout() {
      //退出登录
      //清空vuex数据
      this.clearUser();
      //清空本地存储
      localStorage.removeItem("user");
      //返回登录
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: rgb(21, 116, 194);
}
.iconfont {
  font-size: 25px;
  line-height: 60px;
  margin-left: 10px;
}
.header-right {
  float: right;
  padding: 20px;
  display: flex;
  
}
.user{
  margin-left: 20px;
  height: 30px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.user >span{
  display: block;
}
.user > i{
  padding: 0;
  height: 50px;
  position: absolute;
  top: -1px;
  right: 20px;
}
</style>