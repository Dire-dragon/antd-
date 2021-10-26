import { auths } from './data.js';

// 权限列表
const getAuthList = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: auths,
        code: 0,
        msg: '请求成功',
      });
    }, Math.random() * 2000);
  });
};

// 编辑权限
const editAuth = function (id, detail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const copiedAuth = [...auths];
      const target = auths.findIndex((c) => c.id === id);
      if (copiedAuth[target]) {
        copiedAuth[target] = detail;
        resolve({
          code: 0,
          data: null,
          msg: '修改成功',
        });
      } else {
        reject({
          code: 404,
          data: null,
          msg: '修改失败，id不存在',
        });
      }
    }, Math.random() * 2000);
  });
};

// 新增权限
const addAuth = function (newAuth) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      auths.unshift(newAuth);
      resolve({
        code: 0,
        data: null,
        msg: '修改成功',
      });
    }, Math.random() * 2000);
  });
};

export { getAuthList, editAuth, addAuth };
