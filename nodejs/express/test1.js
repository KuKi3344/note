const express = require('express');
const app = express()

const router = require('./router.js');
app.use(router)
app.listen(80,()=>{
    console.log('running');
})