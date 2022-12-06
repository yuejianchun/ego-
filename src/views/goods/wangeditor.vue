<template>
  <div id="main">
   
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
name:'EDITOR',
data() {
    return {
        editor:''
    }
},
mounted() {
    this.editor = new E('#main')
    this.editor.config.focus = false

    // 配置 onchange 回调函数--获取输入的值内容
    this.editor.config.onchange = newHtml => {
    //   console.log("change 之后最新的 html", newHtml);
      //把获取的富文本编辑内容--传递给弹框组件--- 父组件
        this.$emit('sendEditor',newHtml)
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms
    this.editor.config.menus = [
        'bold',
        'head',
        'link',
        'italic',
        'underline'
    ]



    this.editor.create()
    

},
}
</script>

<style>

</style>