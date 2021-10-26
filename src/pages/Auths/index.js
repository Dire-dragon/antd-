import React from 'react';
import { Card, Breadcrumb, Layout } from 'antd';
/**
 * 权限管理接口
 *
 * 接口统一返回格式
 *  { data: Object, code: number, msg: string },
 *  code: 接口返回状态
 *  data: 返回数据
 *  msg:  返回信息
 */
import { getAuthList, editAuth, addAuth } from '../../api/auth/index';
const { Content } = Layout;

function NewService1() {
  return (
    <Card>
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="/services">角色管理</Breadcrumb.Item>
        <Breadcrumb.Item href="/services/1">权限管理</Breadcrumb.Item>
      </Breadcrumb>

      <Content style={{ margin: '15px 0' }}>
        <p>权限管理内容</p>
      </Content>
    </Card>
  );
}

export default NewService1;
