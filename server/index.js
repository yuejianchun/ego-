const express = require('express')
const app = express()
const router = require('./router')
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))
//资源共享
// const cors = require('cors')
// app.use(cors())
//静态文件托管 ----  访问：http:localhost:8989/图片.jpg
app.use(express.static('upload'))
app.use('/api',router)
app.listen(8989,() => {
    console.log(8989)
})