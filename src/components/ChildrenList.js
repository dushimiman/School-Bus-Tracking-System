import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const ChildrenList = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/children", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChildren(response.data);
      } catch (error) {
        console.error("Failed to fetch children data:", error);
      }
    };

    fetchChildren();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    // Add more columns as needed
  ];

  return (
    <Layout>
      <Content
        style={{
          padding: '0 24px',
          minHeight: 280,
        }}
      >
        <Title level={2}>Children List</Title>
        <Table dataSource={children} columns={columns} rowKey="id" />
      </Content>
    </Layout>
  );
};

export default ChildrenList;
