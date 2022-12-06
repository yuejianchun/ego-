<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-success="successUpload"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import base from "../../api/base"
export default {
  name: "UPLOADIMG",
   data() {
      return {
        url:base.uploadUrl,
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      successUpload(response,file,fileList){
            console.log('上传成功',response,file,fileList)
            this.$message({
            showClose: true,
            message: '恭喜你，图片上传成功',
            type: 'success'
        });
            let imgUrl = base.host+ '/'+ response.url.slice(7)
            this.$emit('sendImg',imgUrl) 
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
};
</script>

<style>
</style>