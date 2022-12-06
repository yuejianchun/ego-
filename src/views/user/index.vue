<template>
  <div>
    <h2>个人中心</h2>
    <el-button @click="lookpdf">查看合同</el-button>
    <mypdf ref="mypdf" />
  </div>
</template>

<script>
import mypdf from "./vuePdf.vue";
export default {
  name: "USER",
  components: {
    mypdf,
  },
  methods: {
      lookpdf(){
          this.$refs.mypdf.dialogVisible = true
      }
  },
};
</script>

<style>
</style>