<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="clearForm"
    >
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="innerVisible = true"
            >类目选择</el-button
          >
          <span>{{ goodsForm.category }}</span>
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
          <el-button type="primary" @click="innerVisibleImg = true"
            >上传图片</el-button
          >
          <img :src="goodsForm.image" alt="" height="200px" />
        </el-form-item>

        <el-form-item label="商品描述" prop="descs">
          <editor ref="myeditor" @sendEditor="sendEditor" />
        </el-form-item>

        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>

      <el-dialog
        width="30%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <treegoods @sendTreeData="sendTreeData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="shoeTreeData">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
      >
        <uploadimg @sendImg="sendImg" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import treegoods from "./treegoods.vue";
import uploadimg from "./uploadimg.vue";
import editor from "./wangeditor.vue";
export default {
  name: "GOODSDIALOG",
  props: {
    title: {
      type: String,
      default: "添加商品",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    treegoods,
    uploadimg,
    editor,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      innerVisibleImg: false,
      treeData: {},
      imgUrl: "",
      goodsForm: {
        id:'',
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "",
        category: "",
        date1: "",
        date2: "",
        cid: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        // date1: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择日期",
        //     trigger: "change",
        //   },
        // ],
        // date2: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择时间",
        //     trigger: "change",
        //   },
        // ],
      },
    };
  },
  watch: {
    rowData(val) {
      this.goodsForm = val;
      this.$nextTick(() => {
        this.$refs.myeditor.editor.txt.html(val.descs);
      });
    },
  },
  methods: {
    sendEditor(val) {
      this.goodsForm.descs = val;
    },
    sendImg(val) {
      console.log(val);
      this.imgUrl = val;
    },
    showImg() {
      this.innerVisibleImg = false;
      this.goodsForm.image = this.imgUrl;
    },
    sendTreeData(val) {
      console.log(val);
      this.treeData = val;
    },
    shoeTreeData() {
      this.innerVisible = false;
      this.goodsForm.category = this.treeData.name;
      this.goodsForm.cid = this.treeData.cid;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.goodsForm);
          let { title, cid, category, sellPoint, price, num, descs, image,id } =
            this.goodsForm;

          if (this.title === "添加商品") {
            this.$api
              .addgoods({
                title,
                cid,
                category,
                sellPoint,
                price,
                num,
                descs,
                image,
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                  this.$parent.http(1);
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  this.clearForm();
                } else {
                  this.$message.error("添加失败");
                }
              });
          } else {
            console.log("编辑商品");
            this.$api.updateGoods({
              id,title, cid, category, sellPoint, price, num, descs, image
            })
            .then((res) => {
              console.log(res.data)
              if (res.data.status === 200) {
                  this.$parent.http(1)
                  this.$message({
                  message: "编辑成功",
                    type: "success",
                })
                  this.clearForm();
              } else {
                this.$message.error("编辑失败");
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearForm() {
      this.dialogVisible = false;
      this.goodsForm = {
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "",
        category: "",
        date1: "",
        date2: "",
        cid: "",
      };
      this.$refs.myeditor.editor.txt.clear();
    },
  },
};
</script>

<style scoped>
.form {
  background-color: #fff;
  padding: 1px;
  margin-top: 10px;
}
.line {
  text-align: center;
}
</style>