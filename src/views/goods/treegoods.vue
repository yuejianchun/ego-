<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy @node-click="nodeClick"> </el-tree>
  </div>
</template>

<script>
export default {
  name: "TREE",
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    nodeClick(data,node){
        console.log(data,node);
        //传递数据给父组件
        this.$emit('sendTreeData',data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
          //进入页面 获取第一层的tree数据  
          this.$api.getselectCategory()
          .then(res=>{
             return resolve(res.data.result);
          })
      }
      if (node.level >= 1){
          //请求当前的点击的tree下面的数据
            this.$api.getselectCategory({
                id:node.data.cid
            })
          .then(res=>{
              if(res.data.status===200){
                  return resolve(res.data.result);
              }else{
                  return resolve([])
              }
          })
      }
      
    },
  },
};
</script>

<style>
</style>