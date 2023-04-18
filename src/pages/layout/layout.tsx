import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ToolOutlined,
  TableOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ApplicationState } from '../../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const { Header, Sider, Content } = Layout;
const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userInfo  = useSelector((state: ApplicationState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    if(!userInfo) {
      navigate('/login')
    } 
  }, [userInfo]);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: 'home',
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: 'table',
              icon: <TableOutlined />,
              label: 'table',
            },

            {
              key: '*',
              icon: <ToolOutlined />,
              label: 'not found',
            },
            {
              key: 'login',
              icon: <LogoutOutlined />,
              label: 'logout',
            },
          ]}
          onClick={item => {
            navigate(`${item.key}`);
            if (item.key === 'login') {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              dispatch({ type: 'set', user: null });
            }
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
