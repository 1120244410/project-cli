// 通过 axios 处理请求
const axios = require("axios");

axios.interceptors.response.use(res => {
  return res.data;
});

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepo() {
  return axios.get(
    "https://api.github.com/repos/1120244410/vite-vue3-template"
  );
}

/**
 * 获取版本信息
 * @returns Promise
 */
async function getRepoTag(name) {
  return axios.get(`https://api.github.com/repos/1120244410/${name}/tags`);
}

module.exports = {
  getRepo,
  getRepoTag
};
