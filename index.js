#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 index.js 实现修改

const create = require("./core/create");
const process = require("process");

const program = require("commander");

program
  .version("1.0.0")
  .command("create <name>") // 自定义一个 name 参数，例如 project-cli create test
  .usage("<command> [option]") // 运行命令的使用提示
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist") // 命令行参数，支持 -f 以及 --force，当创建目录存在时，使用 -f 来覆盖已有目录
  .action((name, option) => {
    create(name, option); // 命令运行的后续动作，调用 create.js
  });

// 获取命令行参数
program.parse(process.argv);
