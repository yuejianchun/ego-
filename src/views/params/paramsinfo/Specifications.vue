<template>
  <div id="spec">
    <div class="nav">
      <el-breadcrumb separator-class="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/params' }"
          >规格参数</el-breadcrumb-item
        >
        <el-breadcrumb-item>规格包装</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="header">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="input"
      ></el-input>
      <el-button type="primary" class="btn">查看</el-button>
      <el-button type="primary" class="btn" @click="showParams">添加</el-button>
    </div>

    <div class="my-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="itemCatId" label="规格参数ID" width="180">
        </el-table-column>
        <el-table-column prop="id" label="类目ID" width="180">
        </el-table-column>
        <el-table-column
          prop="specsName"
          label="规格名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="paramData"
          label="规格参数"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="address" label="操作">
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

    <div>
      <MyPagination
        :total="total"
        :pageSize="pageSize"
        @changePage="changePage"
      />
    </div>
    <div>
      <paramsDialog ref="dialog" />
    </div>
  </div>
</template>

<script>
import MyPagination from "../../../components/MyPagination.vue";
import paramsDialog from "./paramsDialog";
export default {
  name: "SPECIFICATIIONS",
  components: { MyPagination, paramsDialog },
  data() {
    return {
      input: "",
      tableData: [],
      total: 10,
      pageSize: 1,
    };
  },
  methods: {
    http(page) {
      this.$api
        .getParams({
          page,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    changePage() {},
    showParams(){
      this.$refs.dialog.dialogVisible = true
    }
  },
  created() {
    this.http(1);
  },
};
</script>

<style scoped>
.header {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  padding: 20px;
}
.btn {
  margin-left: 10px;
}
</style>