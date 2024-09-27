import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import HomeDashboard from "./HomeDashboard";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  CarOutlined,
  DashboardOutlined,
  BookOutlined,
  UserAddOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import "./dashboardLayout.css";

const { Header, Sider, Content } = Layout;

const DashLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState({ schools: 0, buses: 0, children: 0 });
  const [showStats, setShowStats] = useState(true);
  const location = useLocation();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard");
        const result = await response.json();
        setData({
          children: result.children,
          schools: result.schools,
          buses: result.buses,
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
      location.pathname === "/dash/childrenDetails" ||
      location.pathname === "/dash/busesDetails" ||
      location.pathname === "/dash/schoolsDetails" ||
      location.pathname === "/dash/driverRegistration" ||
      location.pathname === "/dash/AddDestination"
    ) {
      setShowStats(false);
    } else {
      setShowStats(true);
    }
  }, [location]);

  // Icon mapping based on titles or paths
  const iconMapping = {
    "/dash/": <DashboardOutlined />,
    "/dash/AddSchool": <BookOutlined />,
    "/dash/AddBus": <CarOutlined />,
    "/dash/AddChild": <UserAddOutlined />,
    "/dash/AddDestination": <FlagOutlined />,
    "/dash/childrenDetails": <UserAddOutlined />,
    "/dash/BusesDetails": <CarOutlined />,
    "/dash/SchoolsDetails": <BookOutlined />,
    "/logout": <UploadOutlined />,
  };

  const menuItems = [
    { key: "1", path: "/dash/", label: "Overview" },
    { key: "2", path: "/dash/AddSchool", label: "Add School" },
    { key: "3", path: "/dash/AddBus", label: "Add Bus Details" },
    { key: "4", path: "/dash/AddChild", label: "Add Child Details" },
    { key: "5", path: "/dash/AddDestination", label: "Add Destination" },
    { key: "6", path: "/dash/childrenDetails", label: "Childrens" },
    { key: "7", path: "/dash/busesDetails", label: "Buses" },
    { key: "8", path: "/dash/schoolsDetails", label: "Schools" },
    { key: "9", path: "/dash/driverRegistration", label: "add Driver" },
    { key: "10", path: "/logout", label: "Logout" },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: "150vh" }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={iconMapping[item.path]}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: toggle,
          })}
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
