## webpack

### webpack五个核心概念

#### Entry入口

入口指示webpack以哪个文件为入口起点开始打包，分析构建内部依赖图

#### Output输出

输出指示webpack打包后的资源bundles输出到哪里去，以及如何命名

#### Loader

loader让webpack能够去处理那些非js文件（webpack自身只理解js），相当于转换器

#### Plugins

插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。

#### Mode

模式Mode指示webpack使用相应模式的配置

| 选项        | 特点                       |
| ----------- | -------------------------- |
| development | 能让代码本地调试运行的环境 |
| production  | 能让代码优化上线运行的环境 |

