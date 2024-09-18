import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Statistic, Row, Col } from "antd";

const HomeDashboard = ({ data }) => {
  return (
    <div className="dashboard">
      <Row gutter={16} justify="center">
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Children"
              value={data.children}
              valueStyle={{ color: '#3f8600' }}
              prefix={<i className="fas fa-child"></i>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Schools"
              value={data.schools}
              valueStyle={{ color: '#1890ff' }}
              prefix={<i className="fas fa-school"></i>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Buses"
              value={data.buses}
              valueStyle={{ color: '#cf1322' }}
              prefix={<i className="fas fa-bus"></i>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};


export default HomeDashboard;
