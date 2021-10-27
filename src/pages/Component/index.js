import React, { useState, useEffect } from 'react';
import {
  Card,
  Switch,
  Layout,
  Button,
  Form,
  Input,
  Row,
  Col,
  Avatar,
  Tag,
  Drawer,
  Select,
  Radio,
  Popover,
} from 'antd';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
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
} from '../../api/component/index';

const { Content } = Layout;
const { Meta } = Card;
const { CheckableTag } = Tag;

const RUNNING = {
  STARTING: { text: '已启动', value: 'enabled' },
  STOPPING: { text: '已停止', value: 'disabled' },
};

const option = [
  {
    label: '共享配置',
    value: true,
  },
  {
    label: '独立配置',
    value: false,
  },
];

function useComponentType() {
  const [componentType, setComponentType] = useState([]);

  //获取所有类型
  useEffect(async () => {
    const data = await getComponentType();
    if (data.code === 0) {
      setComponentType([...data.data]);
    }
  }, []);

  return [componentType];
}

function useComponentList() {
  const [componentList, setComponentList] = useState([]);
  const [typeFilterList, setTypeFilterList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [initData, setInitData] = useState();

  const getInitData = async () => {
    const dataSource = await getComponentList();
    // console.log(dataSource);
    if (dataSource.code !== 0) {
      console.log('获取数据失败！');
      return;
    }
    setInitData(dataSource.data);
  };

  //获取初始化列表
  useEffect(getInitData, []);

  //更新列表
  useEffect(() => {
    const data =
      initData &&
      initData.filter((item) => {
        console.log(item);
        //判断名称过滤
        if (nameFilter !== '' && item.name.indexOf(nameFilter) === -1) {
          return false;
        }
        //如果没有类型过滤
        if (typeFilterList.length === 0) {
          return true;
        }
        //判断类型过滤
        if (typeFilterList.indexOf(item.type) > -1) {
          return true;
        }
      });

    data && setComponentList([...data]);
    // console.log(data);
  }, [initData, typeFilterList.length, nameFilter]);

  //更新类型过滤条件
  const onTypeFilter = (tag) => {
    let filter = [];
    if (tag) {
      filter =
        typeFilterList.indexOf(tag) === -1
          ? [...typeFilterList, tag]
          : typeFilterList.filter((t) => {
              return t !== tag;
            });
    }
    setTypeFilterList(filter);
  };

  //更新名称过滤
  const onNameFilter = (tag) => {
    setNameFilter(tag);
  };

  return [
    componentList,
    onTypeFilter,
    onNameFilter,
    typeFilterList,
    getInitData,
  ];
}

function Home() {
  const [form] = Form.useForm();
  const [componentType] = useComponentType();
  const [
    componentList,
    onTypeFilter,
    onNameFilter,
    typeFilterList,
    getInitData,
  ] = useComponentList();
  const [visible, setVisible] = useState(false);
  const [popIndex, setPopIndex] = useState('');
  const [switchIndex, setSwitchIndex] = useState('');
  const [isAddType, setIsAddType] = useState(false);

  const onFinish = (values) => {
    onNameFilter(values.filter);
  };

  const onDrawerInit = (info) => {
    console.log(info);
    if (info === 'close') {
      setVisible(false);
      return;
    }
    if (info === 'add') {
      form.setFieldsValue({
        id: new Date().getTime().toString(),
        name: '',
        type: '',
        shareCluster: '',
      });
      setIsAddType(true);
    } else if (typeof info === 'object') {
      form.setFieldsValue(info);
      setIsAddType(false);
    }
    // console.log(visible);
    setVisible(!visible);
  };

  const onAddComponent = async (values) => {
    console.log(values);
    const state = await addComponent({
      ...values,
      state: RUNNING.STARTING,
    });
    if (state.code === 0) {
      getInitData();
      onDrawerInit('close');
    }
  };

  const onEditComponent = async (values) => {
    console.log('baocun');
    let data = values;
    if (!values.state) {
      data = {
        ...values,
        state: RUNNING.STOPPING,
      };
    }
    console.log(data);
    const state = await editComponent(data.id, data);

    if (state.code === 0) {
      getInitData();
      onDrawerInit('close');
      setSwitchIndex('');
    }
  };

  const onDeleteComponent = async (id) => {
    console.log(id);
    const state = await deleteComponent(id);
    if (state.code === 404) {
      console.log('删除失败，id不存在');
      return;
    }
    if (state.code === 0) {
      setPopIndex('');
      getInitData();
    }
  };

  const type = (
    <div className="component-type">
      <span>组件类型:</span>
      <CheckableTag type="text" size="small" onClick={() => onTypeFilter('')}>
        全部
      </CheckableTag>
      {componentType.map((item) => {
        return (
          <CheckableTag
            key={item.id}
            checked={typeFilterList.indexOf(item.id) > -1}
            onChange={() => onTypeFilter(item.id)}
          >
            {item.name}
          </CheckableTag>
        );
      })}
    </div>
  );

  const othersType = (
    <div className="component-others">
      <Form wrapperCol={{ span: 24 }} layout="inline" onFinish={onFinish}>
        <Form.Item label="其他选项:" />
        <Form.Item label="配置名称：" name="filter">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );

  const eachCard = componentList.map((item, index) => {
    return (
      <Col span={6} key={item.id}>
        <Card
          title={
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.name}
            />
          }
          actions={[
            <EditOutlined
              key="edit"
              onClick={() => {
                onDrawerInit(item);
              }}
            />,
            <>
              <CloseOutlined key="delete" onClick={() => setPopIndex(index)} />
              <Popover
                placement="topRight"
                visible={index === popIndex}
                content={
                  <>
                    <Button onClick={() => setPopIndex('')}>取消</Button>
                    <Button
                      type="primary"
                      onClick={() => onDeleteComponent(item.id)}
                    >
                      确认
                    </Button>
                  </>
                }
                title={`确认删除此组件吗？`}
                trigger="click"
              ></Popover>
            </>,
          ]}
        >
          <Row>
            <Col span={9}>
              <div className="card-type">
                组件类型<div>{item.type}</div>
              </div>
            </Col>
            <Col span={8} offset={7}>
              启动状态
              <Switch
                checked={item.state.value === 'enabled'}
                onClick={() => setSwitchIndex(index)}
              />
              <Popover
                placement="topRight"
                visible={index === switchIndex}
                content={
                  <>
                    <Button onClick={() => setSwitchIndex('')}>取消</Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        onEditComponent({
                          ...item,
                          state:
                            item.state.value === 'enabled'
                              ? RUNNING.STOPPING
                              : RUNNING.STARTING,
                        });
                      }}
                    >
                      确认
                    </Button>
                  </>
                }
                title={`确认${
                  item.state.value === 'enabled' ? `停止` : `启动`
                }?`}
                trigger="click"
              ></Popover>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  });

  const content = (
    <Row>
      <Col span={6}>
        <Card type="inner">
          <div className="card-component-add">
            <Button
              type="text"
              size="large"
              icon={[<PlusOutlined />]}
              onClick={() => onDrawerInit('add')}
            >
              新增组件
            </Button>
          </div>
        </Card>
      </Col>
      {eachCard}
    </Row>
  );

  const drawer = (
    <Drawer
      title={`${isAddType ? `新建` : `编辑`}网络组建`}
      width={370}
      visible={visible}
      onClose={() => onDrawerInit('close')}
      footer={
        <>
          <Button onClick={() => onDrawerInit('close')}>关闭</Button>
          <Button type="primary" onClick={form.submit}>
            保存
          </Button>
        </>
      }
      footerStyle={{ textAlign: 'right' }}
    >
      <Form form={form} onFinish={isAddType ? onAddComponent : onEditComponent}>
        <Form.Item name="id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item label="组件名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="组件类型" name="type" rules={[{ required: true }]}>
          <Select
            disabled={isAddType ? false : true}
            options={componentType.map((item) => {
              return { label: item.name, value: item.id };
            })}
          />
        </Form.Item>
        <Form.Item
          label="集群"
          name="shareCluster"
          rules={[{ required: true }]}
        >
          <Radio.Group options={option} />
        </Form.Item>
      </Form>
    </Drawer>
  );

  return (
    <div className="auths">
      <div className="auths-head">
        <Card>
          <Content style={{ margin: '15px 0' }}>{type}</Content>
          <Content style={{ margin: '15px 0' }}>{othersType}</Content>
        </Card>
      </div>
      <div className="auths-content">{content}</div>
      {drawer}
    </div>
  );
}

export default Home;
