import React from 'react';
import { Layout } from 'antd';
import { SideBar } from '../components';

const { Header, Content, Sider } = Layout;

function MainLayout(props) {
  const { children, location } = props;
  const pathName = location.pathname;

  //动态标头
  let headName = '';
  if (pathName.startsWith(`/home`)) {
    headName = `系统设置`;
  } else if (pathName.startsWith(`/auth`)) {
    headName = `权限设置`;
  } else if (pathName.startsWith(`/component`)) {
    headName = `组件管理`;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <SideBar pathname={pathName} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 25px' }}>
          <h2>{headName}</h2>
        </Header>
        <Content style={{ margin: '15px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
