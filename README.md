运行命令 project-cli 即可启动脚手架
示例：当你需要创建一个项目时，运行以下命令
project-cli create my-project

注：本地调试时，可以运行 npm link 将命令链接到全局

依赖说明：
inquirer：实现与询问用户信息的功能
chalk: 美化命令行
commander：自定义命令
cross-spawn：跨平台命令运行

通过 package.json 的 "main" 字段指定入口文件 index.js，来运行相关命令
