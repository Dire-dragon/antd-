import React from 'react';
import { Card, Breadcrumb, Layout } from 'antd';
/**
 * 组件管理接口
 *
 * 接口统一返回格式
 *  { data: Object, code: number, msg: string },
 *  code: 接口返回状态
 *  data: 返回数据
 *  msg:  返回信息
 */
import {
  getComponentList,
  deleteComponent,
  getComponentType,
  addComponent,
  editComponent,
} from '../../../api/component/index';

const { Content } = Layout;

function Home() {
  return (
    <Card>
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="/home">角色管理</Breadcrumb.Item>
        <Breadcrumb.Item href="/home/1">组件管理</Breadcrumb.Item>
      </Breadcrumb>

      <Content style={{ margin: '15px 0' }}>组件管理内容</Content>
    </Card>
  );
}

export default Home;
