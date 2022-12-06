<template>
  <div>
    <el-dialog title="添加规格参数" :visible.sync="dialogVisible" width="50%">
      <treegoods @sendTreeData="sendTreeData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="innerVisible = true"
          :disabled="isdisabled"
          >确 定并添加分组</el-button
        >
      </span>
      <el-dialog
        width="50%"
        title="商品规格参数配置"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div class="title">当前选中的商品：{{ treedata.name }}</div>
        <el-button type="primary" @click="addDomain">新增规格列表</el-button>
        <hr />
        <div>
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(item, index) in dynamicValidateForm.groups"
              :label="item.title + index"
              :key="item.key"
              :prop="item.title"
              :rules="{
                required: true,
                message: '域名不能为空',
                trigger: 'blur',
              }"
            >
              <div class="item">
                <el-input v-model="item.title"></el-input>
                <el-button @click.prevent="addChildDomain(index)"
                  >增加子组</el-button
                >
                <el-button @click.prevent="removeDomain(index)">删除</el-button>
              </div>

              <el-form-item
                v-for="(ele, i) in item.children"
                :label="ele.title + i"
                :key="i"
                :prop="ele.title"
                :rules="{
                  required: true,
                  message: '域名不能为空',
                  trigger: 'blur',
                }"
              >
                <div class="item">
                  <el-input v-model="item.title"></el-input>
                  <el-button @click.prevent="removeChildDomain(index, i)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>
            </el-form-item>

            <!-- <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('dynamicValidateForm')"
                >提交</el-button
              >
              <el-button @click="resetForm('dynamicValidateForm')"
                >重置</el-button
              >
            </el-form-item> -->
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import treegoods from "../../goods/treegoods.vue";
export default {
  name: "PARAMSDIALOG",
  components: {
    treegoods,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      isdisabled: true,
      treedata: {},

      dynamicValidateForm: {
        groups: [
        //   {
        //     value: "",
        //     title: "",
        //     children: [
        //       {
        //         value: "",
        //         title: "",
        //       },
        //     ],
        //   },
        //   {
        //     value: "",
        //     title: "",
        //     children: [],
        //   },
        ],
      },
    };
  },
  methods: {
    sendTreeData(val) {
      console.log(val);
      this.isdisabled = false;
      this.treedata = val;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          console.log("提交规格参数", this.dynamicValidateForm.groups);
          this.$api.getinsertItemParam({
              itemCatId:this.treedata.cid,
              specsName:this.treedata.name,
              content:JSON.stringify(this.dynamicValidateForm.groups),
          })
          .then((res) => {
               if(res.data.status===200){
                  //添加成功  隐藏弹框 更新规格列表
                  this.innerVisible = false;
                  this.dialogVisible = false; 
                  //清空数据
                  this.dynamicValidateForm.groups=[];
                  this.isdisabled = true;
                  this.$parent.http(1);
              }else{
                  console.log('信息提示--失败了--缺点：数据库没有去重');
              }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(index) {
      this.dynamicValidateForm.groups.splice(index, 1);
    },
    removeChildDomain(index, i) {
      this.dynamicValidateForm.groups[index].children.splice(i, 1);
    },
    addDomain() {
      this.dynamicValidateForm.groups.push({
        title: "",
        value: "",
        children: [],
      });
    },
    addChildDomain(index) {
      this.dynamicValidateForm.groups[index].children.push({
        value: "",
        title: "",
      });
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
}
.item > button {
  margin-left: 10px;
}
</style>