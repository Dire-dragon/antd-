import React, { useState, useEffect } from 'react';
import {
  Card,
  Switch,
  Breadcrumb,
  Layout,
  Button,
  Form,
  Input,
  Row,
  Col,
  Avatar,
  Tag,
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

let initData = [];

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

  //获取初始化列表
  useEffect(async () => {
    const dataSource = await getComponentList();
    if (dataSource.code !== 0) {
      console.log('获取数据失败！');
      return;
    }
    initData = await dataSource.data;
    setComponentList([...initData]);
  }, []);

  //更新列表
  useEffect(async () => {
    const data = initData.filter((item) => {
      if (nameFilter !== '' && item.name.indexOf(nameFilter) === -1) {
        return false;
      }
      if (typeFilterList.length === 0) {
        return true;
      }
      if (typeFilterList.indexOf(item.type) > -1) {
        return true;
      }
    });

    setComponentList([...data]);
    console.log(typeFilterList);
  }, [initData, typeFilterList.length, nameFilter]);

  //更新类型过滤条件
  const onTypeFilter = (tag) => {
    let filter = [];
    if (tag !== '') {
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

  return [componentList, onTypeFilter, onNameFilter, typeFilterList];
}

function Home() {
  const [componentType] = useComponentType();
  const [componentList, onTypeFilter, onNameFilter, typeFilterList] =
    useComponentList();

  const onFinish = (values) => {
    onNameFilter(values.filter);
  };

  const type = (
    <div className="component-type">
      <span>组件类型:</span>
      <Button type="text" size="small" onClick={() => onTypeFilter('')}>
        全部
      </Button>
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

  const content = (
    <Row>
      <Col span={6}>
        <Card type="inner">
          <div className="card-component-add">
            <Button type="text" size="large" icon={[<PlusOutlined />]}>
              新增组件
            </Button>
          </div>
        </Card>
      </Col>
      {componentList.map((item) => {
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
                <EditOutlined key="edit" />,
                <CloseOutlined key="delete" />,
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
                  <Switch defaultChecked />
                </Col>
              </Row>
            </Card>
          </Col>
        );
      })}
    </Row>
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
    </div>
  );
}

export default Home;
