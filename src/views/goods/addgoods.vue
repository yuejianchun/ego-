<template>
  <div id="addgoods">
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }"
          >商品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary">类目选择</el-button>
        </el-form-item>

        <el-form-item label="商品名称" prop="title">
          <el-input v-model="goodsForm.title"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>

        <el-form-item label="商品数量" prop="num">
          <el-input v-model="goodsForm.num"></el-input>
        </el-form-item>

        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="goodsForm.sellPoint"></el-input>
        </el-form-item>

        <!-- <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="goodsForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="goodsForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item label="发布时间" prop="time">
          <el-input v-model="goodsForm.time"></el-input>
        </el-form-item> -->

        <el-form-item label="商品图片" prop="image">
          <el-button type="primary">上传图片</el-button>
        </el-form-item>

        <el-form-item label="商品描述" prop="descs">
          <textarea name="" id="" cols="40" rows="5"></textarea>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ADDGOODS",
  data() {
    return {
      goodsForm: {
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "",
        category: "",
        date1: "",
        date2:""
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
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
#addgoods {
  margin: 7px;
}
.title {
  padding: 5px;
  background-color: #fff;
  border: 1px solid #eee;
}
.form {
  background-color: #fff;
  padding: 1px;
  margin-top: 10px;
}
.line{
  text-align: center;
}
</style>