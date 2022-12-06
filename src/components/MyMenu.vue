<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="iscollapse"
    >
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-setting"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-submenu index="/params">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">规格参数</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/params/specifications">订单列表</el-menu-item>
          <!-- <el-menu-item index="/order/order-back">退回订单</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/advert">
        <i class="el-icon-document"></i>
        <span slot="title">广告分类</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">订单列表</el-menu-item>
          <el-menu-item index="/order/order-back">退回订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/user">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "MYMENU",
  data() {
    return {
      
    }
  },
  computed:{
    iscollapse(){
      return this.$store.state.tab.iscollapse
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>