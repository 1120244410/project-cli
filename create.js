const process = require("process");

const chalk = require("chalk");
const inquirer = require("inquirer");
const spawn = require("cross-spawn");
const fs = require("fs-extra");
const path = require("path");

module.exports = async (name, option) => {
  console.log("your project will be named " + chalk.green(name));
  console.log(chalk.red("option:", JSON.stringify(option)));
  const cwd = process.cwd(); // 获取当前进程的工作目录
  const targetDir = path.join(cwd, name); // 拼接为完整目录
  const hasDir = fs.existsSync(targetDir);
  if (hasDir) {
    if (option.force) {
      await fs.remove(targetDir);
    } else {
      checkDir();
    }
  }
};

const checkDir = async function() {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "Target directory already exists Pick an action:",
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
  if (action) {
    await fs.remove(targetDir);
  } else {
    process.exit(1);
  }
};
