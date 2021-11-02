import React, { useState, useEffect } from 'react';
import {
  Card,
  Breadcrumb,
  Layout,
  Form,
  Input,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Tabs,
  Radio,
  Typography,
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

const { TabPane } = Tabs;

// const page = {
//   pageSize: 5,
//   total: 0,
//   pageSizeOptions: [10, 20, 30],
// };

const options = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

const authDataSource = [
  {
    key: 'query',
    action: 'query',
    name: '查询列表',
    describe: '查询列表',
  },
  {
    key: 'get',
    action: 'get',
    name: '查询明细',
    describe: '查询明细',
  },
  {
    key: 'add',
    action: 'add',
    name: '新增',
    describe: '新增',
  },
  {
    key: 'update',
    action: 'update',
    name: '修改',
    describe: '修改',
  },
  {
    key: 'delete',
    action: 'delete',
    name: '删除',
    describe: '删除',
  },
  {
    key: 'import',
    action: 'import',
    name: '导入',
    describe: '导入',
  },
  {
    key: 'export',
    action: 'export',
    name: '导出',
    describe: '导出',
  },
];

let editAuthList = [];

let auth = {};

//用户权限列表
function useAuthList() {
  //初始用户列表数据
  const [initAuthList, setInitAuthList] = useState([]);
  //显示用户列表数据
  const [authList, setAuthList] = useState([]);
  //名称过滤
  const [nameFilter, setNameFilter] = useState('');
  //id过滤
  const [idFilter, setIdFilter] = useState('');
  //权限表单
  const [form] = Form.useForm();
  //信息表单
  const [infoForm] = Form.useForm();
  //模态框的显示
  const [visible, setVisible] = useState(false);
  //当前是否是新增权限
  const [isAddAuth, setIsAddAuth] = useState(true);

  //当前页码
  // const [current, setCurrent] = useState(1);

  //表头
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
      render: (_, record) => {
        return record.status ? '启用' : '禁用';
      },
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <>
            <Button type="link" onClick={() => onEditAuth(record)}>
              编辑
            </Button>
            |
            <Button type="link" onClick={() => onAuthDelete(record.id)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  /**
   * 删除权限
   */
  const onAuthDelete = (id) => {
    const tempList = initAuthList.filter((item) => {
      return item.id !== id;
    });
    setInitAuthList(tempList);
  };

  const onOk = () => {
    infoForm.submit();
  };

  const onAddAuthFinish = (values) => {
    auth = values;
    form.submit();
  };

  const onAuthFormFinish = async (values) => {
    auth = { ...auth, actions: [...values] };
    setVisible(false);
    if (isAddAuth) {
      setInitAuthList([auth, ...initAuthList]);
    } else {
      const newAuthList = initAuthList.map((item) => {
        if (item.id === auth.id) {
          return auth;
        }
        return item;
      });
      setInitAuthList(newAuthList);
    }
    // const state = await addAuth(auth);

    // if (state.code === 0) {
    //   auth = {};
    //   getInitAuthList();
    // }
  };

  const onEditAuth = (values) => {
    console.log(22);
    infoForm.setFieldsValue(values);
    editAuthList = values.actions.map((item) => {
      console.log(item);
      return {
        action: item.action,
        name: item.name,
        describe: item.describe,
        key: item.action,
      };
    });
    setIsAddAuth(false);
    setVisible(true);
    // console.log(values);
  };

  /**
   * 获取初始列表
   */
  const getInitAuthList = async () => {
    const authList = await getAuthList();
    setInitAuthList(authList.data);
  };

  useEffect(() => {
    getInitAuthList();
  }, []);

  useEffect(() => {
    let authListTemp = initAuthList;
    if (nameFilter) {
      authListTemp = authListTemp.filter((item) => {
        return item.name.indexOf(nameFilter) > -1;
      });
    }
    if (idFilter) {
      authListTemp = authListTemp.filter((item) => {
        return item.id.indexOf(idFilter) > -1;
      });
    }
    // page.total = authListTemp.length;
    setAuthList(authListTemp);
  }, [initAuthList, nameFilter, idFilter]);

  const AuthTable = () => {
    return (
      <div>
        <Table
          bordered={true}
          // pagination={{
          //   ...page,
          //   onChange: onPagenationChange,
          //   showSizeChanger: true,
          // }}
          dataSource={authList}
          columns={columns}
        ></Table>
      </div>
    );
  };

  //模态框中表格覆盖组件
  const EditableCell = ({ editing, dataIndex, title, children }) => {
    return (
      <td>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  //模态框中表格组件
  const EditableTable = () => {
    const [data, setData] = useState(isAddAuth ? authDataSource : editAuthList);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    //添加权限
    const onAdd = () => {
      form.setFieldsValue({
        name: '',
        action: '',
        describe: '',
      });
      const newData = [
        {
          key: ``,
          name: ``,
          action: ``,
          describe: ``,
        },
        ...data,
      ];
      setData(newData);
    };

    //编辑权限
    const onEdit = (record) => {
      console.log(record);
      form.setFieldsValue({
        name: '',
        action: '',
        describe: '',
        ...record,
      });
      setEditingKey(record.key);
    };

    //删除权限
    const onDelete = (record) => {
      const dataSource = data.filter((item) => item.key !== record.key);
      setData(dataSource);
    };

    //点击表格中取消的回调
    const onCancel = () => {
      onDelete({ key: '' });
      setEditingKey('');
    };

    //保存的回调
    const onSave = async (record) => {
      try {
        //返回校验成功的数组
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => record.key === item.key);

        //如果存在，则覆盖，不存在则添加
        if (index > -1) {
          console.log('1');
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row, key: row.action });
          setData(newData);
          setEditingKey('');
        } else {
          console.log('old', newData);
          newData.push({ ...row, key: row.action });
          console.log('old', newData);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const columns = [
      {
        title: '操作类型',
        dataIndex: 'action',
        editable: true,
      },
      {
        title: '名称',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '描述',
        dataIndex: 'describe',
        editable: true,
      },
      {
        title: () => {
          return (
            <>
              <span>操作</span>
              <Button
                icon={[<PlusOutlined />]}
                type="text"
                onClick={onAdd}
              ></Button>
            </>
          );
        },
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => onSave(record)}
                style={{
                  marginRight: 8,
                }}
              >
                保存
              </a>
              <a onClick={onCancel}>取消</a>
            </span>
          ) : (
            <>
              <Typography.Link
                disabled={editingKey !== ''}
                onClick={() => onEdit(record)}
              >
                编辑
              </Typography.Link>
              <span>|</span>
              <Typography.Link
                disabled={editingKey !== ''}
                onClick={() => onDelete(record)}
              >
                删除
              </Typography.Link>
            </>
          );
        },
      },
    ];

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => {
          return {
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          };
        },
      };
    });

    const component = {
      body: {
        cell: EditableCell,
      },
    };

    return (
      <Form
        form={form}
        component={false}
        onFinish={() => onAuthFormFinish(data)}
      >
        <Table
          components={component}
          bordered
          dataSource={data}
          columns={mergedColumns}
          pagination={false}
          size={`small`}
        />
      </Form>
    );
  };

  const AuthAddBtn = () => {
    return (
      <div>
        <Button
          type="primary"
          icon={[<PlusOutlined />]}
          onClick={() => {
            setIsAddAuth(true);
            infoForm.setFieldsValue({ name: '', status: '', id: '' });
            setVisible(true);
          }}
        >
          新建
        </Button>
      </div>
    );
  };

  const AddAuthModal = () => {
    return (
      <Modal
        title={`${isAddAuth ? '新建' : '编辑'}权限`}
        visible={visible}
        width={800}
        onCancel={() => setVisible(false)}
        onOk={onOk}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="基本信息" key="1">
            <Form form={infoForm} onFinish={onAddAuthFinish}>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label={`权限标识（ID）：`}
                    name={`id`}
                    rules={[{ required: true }]}
                  >
                    <Input
                      disabled={!isAddAuth}
                      placeholder={`只能由字母数字下划线组成`}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={`权限名称：`}
                    name={`name`}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                  <Form.Item
                    label={`状态`}
                    name={`status`}
                    rules={[{ required: true }]}
                  >
                    <Radio.Group options={options} optionType="button" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
        </Tabs>
        <EditableTable />
      </Modal>
    );
  };

  return [
    setNameFilter,
    setIdFilter,
    // setCurrent,
    AuthTable,
    AuthAddBtn,
    AddAuthModal,
  ];
}

function NewService1() {
  const [setNameFilter, setIdFilter, AuthTable, AuthAddBtn, AddAuthModal] =
    useAuthList();

  const [searchForm] = Form.useForm();

  //搜索表单提交回调
  const onFinish = (values) => {
    const { name, id } = values;
    name !== '' ? setNameFilter(name) : setNameFilter('');
    id !== '' ? setIdFilter(id) : setIdFilter('');
  };

  //搜索表单重置按钮回调
  const onReset = () => {
    setNameFilter('');
    setIdFilter('');
    searchForm.setFieldsValue({ name: '', id: '' });
  };

  //页码点击回调
  // const onPagenationChange = (p, psize) => {
  //   if (p) setCurrent(p);
  // };

  //搜索表单
  const AuthSerachForm = () => {
    return (
      <div>
        <Form form={searchForm} onFinish={onFinish}>
          <Row>
            <Col span={6}>
              <Form.Item label="ID：" name="id">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="名称：" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={5} offset={6}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={onReset}>重置</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  return (
    <Card>
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="/services">角色管理</Breadcrumb.Item>
        <Breadcrumb.Item href="/services/1">权限管理</Breadcrumb.Item>
      </Breadcrumb>

      <Content style={{ margin: '15px 0' }}>
        <AuthSerachForm />
        <AuthAddBtn />
        <AuthTable />
      </Content>
      <AddAuthModal />
    </Card>
  );
}

export default NewService1;
