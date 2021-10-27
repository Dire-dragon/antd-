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

const page = {
  pageSize: 5,
  total: 0,
  pageSizeOptions: [10, 20, 30],
};

const options = [
  { label: '启用', value: 'Apple' },
  { label: '禁用', value: 'Pear' },
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

function useAuthList() {
  const [initAuthList, setInitAuthList] = useState([]);
  const [authList, setAuthList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [current, setCurrent] = useState(1);

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
            <Button type="link">编辑</Button>|
            <Button type="link" onClick={() => onAuthDelete(record.id)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const onAuthDelete = (id) => {
    const tempList = initAuthList.filter((item) => {
      return item.id !== id;
    });
    setInitAuthList(tempList);
  };

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
    page.total = authListTemp.length;
    setAuthList(authListTemp);
  }, [initAuthList, nameFilter, idFilter, current]);

  return [columns, authList, setNameFilter, setIdFilter, setCurrent];
}

function NewService1() {
  const [columns, authList, setNameFilter, setIdFilter, setCurrent] =
    useAuthList();

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    const { name, id } = values;
    name !== '' ? setNameFilter(name) : setNameFilter('');
    id !== '' ? setIdFilter(id) : setIdFilter('');
  };

  const onReset = () => {
    setNameFilter('');
    setIdFilter('');
    form.setFieldsValue({ name: '', id: '' });
  };

  const onPagenationChange = (p, psize) => {
    if (p) setCurrent(p);
  };

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

  const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(authDataSource);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

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

    const onEdit = (record) => {
      form.setFieldsValue({
        name: '',
        action: '',
        describe: '',
        ...record,
      });
      setEditingKey(record.key);
    };

    const onDelete = (record) => {
      const dataSource = data.filter((item) => item.key !== record.key);
      setData(dataSource);
    };

    const onCancel = () => {
      onDelete({ key: '' });
      setEditingKey('');
    };

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
      <Form form={form} component={false}>
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

  const authSerachForm = (
    <div>
      <Form form={form} onFinish={onFinish}>
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

  const authAddBtn = (
    <div>
      <Button
        type="primary"
        icon={[<PlusOutlined />]}
        onClick={() => setVisible(true)}
      >
        新建
      </Button>
    </div>
  );

  const AddAuthModal = () => {
    return (
      <Modal
        title={`新建权限`}
        visible={visible}
        width={800}
        onCancel={() => setVisible(false)}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="基本信息" key="1">
            <Form>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label={`权限标识（ID）：`}
                    name={`id`}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder={`只能由字母数字下划线组成`} />
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

  const authTable = (
    <div>
      <Table
        bordered={true}
        pagination={{
          ...page,
          onChange: onPagenationChange,
          showSizeChanger: true,
        }}
        dataSource={authList}
        columns={columns}
      ></Table>
    </div>
  );

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
      </Content>
      <AddAuthModal />
    </Card>
  );
}

export default NewService1;
