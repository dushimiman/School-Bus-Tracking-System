import React, { useState } from "react";
import "./dashboardLayout.css";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FastForwardOutlined,
  CarOutlined
} from "@ant-design/icons";


const { Header, Sider, Content } = Layout;

const DashLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: "150vh" }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
         
         
         
          <Menu.Item key="4" icon={<CarOutlined />}>
            <Link to="/dash/AddBus"> Add Bus Details </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<CarOutlined />}>
            <Link to="/dash/AddSchool"> Add School </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FastForwardOutlined />}>
            <Link to="/dash/allTours"> Track </Link>
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<UploadOutlined />}
            onClick={() => localStorage.removeItem("userLogedIn")}
          >
            <Link to="/">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* Render HomeDashboard here */}
          {children} {/* This is where additional content will be rendered */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashLayout;
