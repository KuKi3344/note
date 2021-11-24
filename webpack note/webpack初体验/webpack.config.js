// 向外暴露一个打包的配置对象
// 因为 webpack 是基于Node构建的；所以 webpack 支持所有Node API 和语法
// 那些 特性 Node 支持呢？Node是基于Chrome V8引擎实现的Javascript运行环境，如果 chrome 浏览器支持哪些，则 Node 就支持哪些；
module.exports = {
  mode: 'production' // development   production
}
 