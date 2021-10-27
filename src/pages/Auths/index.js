import React, { useState, useEffect } from 'react';
import {
  Card,
  Breadcrumb,
  Layout,
  Form,
  Input,
  Button,
  Table,
  Pagination,
} from 'antd';
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
import { PlusOutlined } from '@ant-design/icons';
const { Content } = Layout;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    render: (_, record) => {
      console.log(record);
      return (
        <>
          <Button type="link">编辑</Button>|<Button type="link">删除</Button>
        </>
      );
    },
  },
];

const PAGE = {
  PAGETOTAL: 0,
  PAGEPER: 5,
};

function useAuthList() {
  const [initAuthList, setInitAuthList] = useState();
  const [authList, setAuthList] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [idFilter, setIdFilter] = useState();

  const getInitAuthList = async () => {
    const authList = await getAuthList();
    setInitAuthList(authList.data);
    console.log(initAuthList);
  };

  useEffect(() => {
    getInitAuthList();
  }, []);

  useEffect(() => {
    setAuthList(initAuthList);
  }, [initAuthList]);

  return [authList];
}

function NewService1() {
  // console.log(getAuthList());
  const [authList] = useAuthList();

  console.log(authList);

  const authSerachForm = (
    <div>
      <Form layout={'inline'}>
        <Form.Item label="ID：">
          <Input />
        </Form.Item>
        <Form.Item label="名称：">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Form.Item>
      </Form>
    </div>
  );

  const authAddBtn = (
    <div>
      <Button type="primary" icon={[<PlusOutlined />]}>
        新建
      </Button>
    </div>
  );

  const authTable = (
    <div>
      <Table
        pagination={<Pagination total={50} />}
        dataSource={authList}
        columns={columns}
      ></Table>
    </div>
  );

  const authListPage = <div></div>;

  return (
    <Card>
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="/services">角色管理</Breadcrumb.Item>
        <Breadcrumb.Item href="/services/1">权限管理</Breadcrumb.Item>
      </Breadcrumb>

      <Content style={{ margin: '15px 0' }}>
        {authSerachForm}
        {authAddBtn}
        {authTable}
        {authListPage}
      </Content>
    </Card>
  );
}

export default NewService1;
