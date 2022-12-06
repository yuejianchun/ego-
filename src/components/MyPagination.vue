<template>
  <div id="pages">
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total="total"
      :page-size="pageSize"
      @current-change = "changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "PAGINATION",
  props:{
      total:{
          type:Number,
          default:100
      },
      pageSize:{
          type:Number,
          default:10
      },
      currentchange:{
        type:Number,
        default:1
      }
  },
  methods: {
      changePage(page){
          this.$emit('changePage',page)
      }
  },
};
</script>

<style scoped>
#pages{
    text-align: center;
    margin: 10px;
}
</style>