import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboardLayout.css";
import { Link, useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Card } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,

  CarOutlined,
  DashboardOutlined,  
  BookOutlined,      
  UserAddOutlined     
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const DashLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({ schools: 0, buses: 0, children: 0 });
  const [showStats, setShowStats] = useState(true); 
  const location = useLocation(); 

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };

    fetchStats();
  }, []);

  // Toggle the statistics visibility based on route
  useEffect(() => {
    if (location.pathname === "/dash/AddSchool" || location.pathname === "/dash/AddBus" || location.pathname === "/dash/AddChild") {
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
  <Menu.Item key="5" icon={<UploadOutlined />} onClick={() => localStorage.removeItem("userLogedIn")}>
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
          {showStats && <HomeDashboard stats={stats} />} {/* Conditionally render statistics */}
          {!showStats && children} {/* Render form when stats are hidden */}
        </Content>
      </Layout>
    </Layout>
  );
};

const HomeDashboard = ({ stats }) => {
  return (
    <div>
      <Card title="Schools" bordered={false} style={{ width: 300 }}>
        <p>Total Schools: {stats.schools}</p>
      </Card>
      <Card title="Buses" bordered={false} style={{ width: 300 }}>
        <p>Total Buses: {stats.buses}</p>
      </Card>
      <Card title="Children" bordered={false} style={{ width: 300 }}>
        <p>Total Children: {stats.children}</p>
      </Card>
    </div>
  );
};

export default DashLayout;
