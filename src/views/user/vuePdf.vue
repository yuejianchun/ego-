<template>
  <div>
    <el-dialog
      title="合同"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <hr />
    <el-button @click="num--">上一页</el-button>
    <el-button @click="num++">下一页</el-button>
    <hr />
    <!-- 写法一： -->
    <p>{{ currentPage }} / {{ pageCount }}</p>
    <el-button @click="print">打印合同</el-button>
    <pdf
      src="./sxt.pdf"
      ref='mypdf'
      :page="num"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
      style="display: inline-block; width: 400px"
    ></pdf>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  name: "PDF",
  components:{
      pdf
  },
  data() {
    return {
      dialogVisible: false,
      num: 1,
      currentPage: 0,
      pageCount: 0,
    };
  },
  methods: {
      print(){
        this.$refs.mypdf.print();
      }
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    });
  },
};
</script>

<style>
</style>