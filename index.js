#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 index.js 实现修改

const create = require("./create");
const process = require("process");

const program = require("commander");

program
  .version("1.0.0")
  .command("create <name>")
  .usage("<command> [option]")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, option) => {
    create(name, option);
  });

// 获取命令行参数
program.parse(process.argv);
