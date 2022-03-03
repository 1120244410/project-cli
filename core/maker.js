const { getRepo, getRepoTag } = require("../lib/repo");
const utils = require("util");
const repoHandler = require("download-git-repo");
const chalk = require("chalk");
const loading = require("loading-cli");
const inquirer = require("inquirer");
const path = require("path");

class Generator {
  constructor(name, dir) {
    this.name = name;
    this.dir = dir;
    // download-git-repo 不支持promise风格，使用 utils.promisify 将其转换为支持 promise
    this.repoHandler = utils.promisify(repoHandler);
  }
  async create() {
    // 创建
    const name = await this.getRepos();
    const tag = await this.getRepoTags(name);
    console.log(chalk.green(`you choice template ${name} v${tag}`));
    await this.loading("downloading template...", { name, tag });
    console.log("work done");
    process.exit(1);
  }
  async getRepos() {
    // 1）从远程拉取模板数据
    const repoInfo = await getRepo();
    if (!repoInfo) return;

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: [repoInfo.name],
      message: "Please choose a template to create project"
    });

    // 3）return 用户选择的名称
    return repo;
  }
  async getRepoTags(name) {
    // 1）从远程拉取模板数据
    const tags = await getRepoTag(name);
    if (!tags) return;

    // 2）用户选择自己新下载的模板名称
    const { tag } = await inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tags.map(el => el.name),
      message: "Please choose a template tag"
    });

    // 3）return 用户选择的名称
    return tag;
  }
  async download({ name, tag }) {
    // 1）拼接下载地址
    const requestUrl = `1120244410/${name}#${tag}`;
    try {
      const res = this.repoHandler(
        requestUrl,
        path.resolve(process.cwd(), this.dir)
      );
      return res;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
  async loading(msg, form) {
    const l = loading(msg);
    l.start();
    try {
      const res = await this.download(form);
      l.stop();
      return res;
    } catch (error) {
      console.log(chalk.res(error));
      l.stop();
    }
  }
}

module.exports = Generator;
