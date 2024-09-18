import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Card, Statistic, Row, Col } from "antd";
import HomeDashboard from "./HomeDashboard";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  CarOutlined,
  DashboardOutlined,
  BookOutlined,
  UserAddOutlined,
  FlagOutlined, // New icon for destination
} from "@ant-design/icons";
import "./dashboardLayout.css";

const { Header, Sider, Content } = Layout;

const DashLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState({ schools: 5, buses: 10, children: 20 });
  const [showStats, setShowStats] = useState(true);
  const location = useLocation();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData({
          children: 20,
          schools: 5,
          buses: 10,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/dash/AddSchool" ||
      location.pathname === "/dash/AddBus" ||
      location.pathname === "/dash/AddChild" ||
      location.pathname === "/dash/AddDestination" // Add condition to hide stats on this page
    ) {
      setShowStats(false);
    } else {
      setShowStats(true);
    }
  }, [location]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: "150vh" }}>
        <div className="logo" />
        
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dash/">Overview</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/dash/AddSchool">Add School</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CarOutlined />}>
            <Link to="/dash/AddBus">Add Bus Details</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserAddOutlined />}>
            <Link to="/dash/AddChild">Add Child Details</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FlagOutlined />}> {/* New destination menu item */}
            <Link to="/dash/AddDestination">Add Destination</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<UploadOutlined />} onClick={() => localStorage.removeItem("token")}>
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
          {showStats && <HomeDashboard data={data} />}
          {!showStats && children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashLayout;
