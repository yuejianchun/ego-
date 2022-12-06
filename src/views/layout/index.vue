<template>
  <div class="layout">
  <!-- 左侧导航区域 -->
    <MyMenu class="mymenu"/>
  <!-- 右侧内容区域 -->
    <Content class="content"/>
  </div>
</template>

<script>
import Content from '../../components/Content.vue'
import MyMenu from '../../components/MyMenu.vue'
export default {
name:'LAYOUT',
components:{
    Content,MyMenu
},
data() {
  return {
    
  }
},
}
</script>

<style  scoped>
.layout{
  display: flex;
}
.mymenu{
    height: 100vh;
    background-color:rgb(84, 92, 100);
    
}
.content{
  flex: 1;
}

</style>