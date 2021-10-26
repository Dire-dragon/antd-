import { componentType, componentList } from './data.js';

// 组件分类
const getComponentType = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        msg: '请求成功',
        data: componentType,
      });
    }, Math.random() * 2000);
  });
};

// 组件列表
const getComponentList = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: componentList,
        code: 0,
        msg: '请求成功',
      });
    }, Math.random() * 2000);
  });
};

// 新增组件
const addComponent = function (data) {
  return new Promise((resolve, reject) => {
    componentList.push(data);
    setTimeout(() => {
      resolve({
        code: 0,
        data: null,
        msg: '添加组件成功',
      });
    }, Math.random() * 2000);
  });
};

// 编辑组件
const editComponent = function (id, detail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const target = componentList.find((c) => c.id === id);
      if (target) {
        target.name = detail.name;
        target.shareCluster = detail.shareCluster;
        target.state = detail.state;
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

// 删除组件
const deleteComponent = function (id) {
  return new Promise((resolve, reject) => {
    const target = componentList.find((c) => c.id === id);
    if (target) {
      componentList = componentList.filter((c) => c.id !== id);
      resolve({
        code: 0,
        data: null,
        msg: '删除成功',
      });
    } else {
      reject({
        code: 404,
        data: null,
        msg: '删除失败，id不存在',
      });
    }
  });
};

// getComponentType: 组件管理 => 组件类型
// getComponentType: 组件管理 => 组件列表

export {
  getComponentList,
  deleteComponent,
  getComponentType,
  addComponent,
  editComponent,
};
