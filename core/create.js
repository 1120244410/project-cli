const Maker = require("./maker");
const process = require("process");

const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");

module.exports = async (name, option) => {
  console.log("your project will be named " + chalk.green(name));
  console.log(chalk.red("option:", JSON.stringify(option)));
  const cwd = process.cwd(); // 获取当前进程的工作目录
  const targetDir = path.join(cwd, name); // 拼接为完整目录
  const hasDir = fs.existsSync(targetDir); // 判断当前工作目录下是否已存在目录
  if (hasDir) {
    if (option.force) {
      await fs.remove(targetDir);
    } else {
      const action = await checkDir();
      if (action) {
        await fs.remove(targetDir);
        getTemplate(name, targetDir);
      } else {
        console.log(
          chalk.green("Target directory already exists, creation stopped")
        );
        process.exit(1);
      }
    }
  } else {
    getTemplate(name, targetDir);
  }
};

async function checkDir() {
  // 使用 inquirer 询问使用者
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "Target directory already exists Pick an action:", // 目录已存在，选择下列一个操作
      choices: [
        {
          name: "Overwrite",
          value: true
        },
        {
          name: "Cancel",
          value: false
        }
      ]
    }
  ]);
  return action;
}

function getTemplate(name, targetDir) {
  const maker = new Maker(name, targetDir);
  maker.create();
}
