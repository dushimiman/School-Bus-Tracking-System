import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboardLayout.css";
import { Layout } from "antd";
import { Card } from "antd";

const { Content } = Layout;

const HomeDashboard = () => {
  const [schoolCount, setSchoolCount] = useState(0);
  const [busCount, setBusCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const schoolResponse = await axios.get('/api/schoolCount', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSchoolCount(schoolResponse.data.count);

        const busResponse = await axios.get('/api/busCount', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBusCount(busResponse.data.count);

        const childResponse = await axios.get('/api/childCount', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setChildCount(childResponse.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <div className="dashboard-cards">
        <Card title="Total Schools" bordered={false}>
          {schoolCount}
        </Card>
        <Card title="Total Buses" bordered={false}>
          {busCount}
        </Card>
        <Card title="Total Children" bordered={false}>
          {childCount}
        </Card>
      </div>
    </Content>
  );
};

export default HomeDashboard;
