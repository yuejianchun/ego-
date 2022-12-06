<template>
  <div>
    <!-- 搜索框区域 -->
    <div class="search">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="input"
        @change="searchInput"
      ></el-input>
      <el-button type="primary" class="btn">查询</el-button>
      <el-button type="primary" class="btn" @click="$router.push({name:'addgoods'})">页面添加</el-button>
      <el-button type="primary" class="btn" @click="addGoods">弹框添加</el-button>

    </div>

    <!-- 表格展示区域 -->
    <div class="wrap">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="80"></el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="num"
          label="商品数量"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="category"
          label="规格类目"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="image"
          label="商品图片"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品买点"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="descs"
          label="商品描述"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div class="pages">
      <MyPagination :total="total" :pageSize="pageSize" @changePage="changePage"/>

      <goodsdialog ref = "dialog" :title="title" :rowData = "rowData"/>

    </div>
  </div>
</template>

<script>
import goodsdialog from "./goodsDialog"
import MyPagination from '../../components/MyPagination.vue'
export default {
  name: "GOODS",
  components:{MyPagination,goodsdialog},
  data() {
    return {
      input: "",
      tableData: [],
      total:10,
      pageSize:1,
      searchList:[],
      type:1,
      dialogVisible: false,
      title:'添加商品',
      rowData:{}
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.dialog.dialogVisible = true
      this.title = '编辑商品'
      this.rowData = {...row}
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteGoods({
            id:row.id
          })
          .then((res) => {
            console.log(res)
            if (res.data.status ===200) {
              this.$message({
              type: 'success',
              message: '删除成功!'
              });
              this.http(1)
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addGoods(){
      //this.dialogVisible=true
      this.$refs.dialog.dialogVisible = true
      this.title = '添加商品'
    },
    searchInput(val){
      if(!val){
        this.http(1)
        return
      }
      this.$api.getSearch({
        search:val
      }).then((res) => {
        console.log(res)
        if (res.data.status===200) {
          this.searchList = res.data.result
          this.total = res.data.result.length
          this.pageSize = 3
          this.tableData = res.data.result.slice(0,3)
          this.type=2

        } else {
          this.tableData = []
          this.total =1
          this.pageSize=1
          this.type = 1 
        }
      })
    },
    changePage(num){
      if (this.type==1) {
       this.http(num)
        
      } else {
        this.tableData = this.searchList.slice((num-1)*3,num*3)
      }
    },
    http(page){
      this.$api
      .getGoodsList({
        page,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total
          this.pageSize = res.data.pageSize
        }
      });
    }

  },
  created() {
    this.http()
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.input {
  margin-right: 10px;
}
.btn {
  height: 40px;
}
</style>