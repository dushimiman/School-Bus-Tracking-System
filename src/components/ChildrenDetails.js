import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import axios from "axios";

const ChildrenDetails = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/children");
        console.log("Children data:", response.data); // Debug log
        setChildren(response.data);
      } catch (error) {
        console.error("Error fetching children details:", error);
        setError("Error fetching children details");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const columns = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Parent Name", dataIndex: "parentName", key: "parentName" },
    { title: "Parent Phone", dataIndex: "parentPhone", key: "parentPhone" },
    {
      title: "School Name",
      dataIndex: ["school", "name"], // Access nested school object
      key: "schoolName",
    },
    {
      title: "Destination",
      dataIndex: ["destination", "destinationName"],
      key: "destination",
      render: (text) => (text ? text : "No destination"), // Handle missing destination
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
  ];

  if (loading) {
    return <Spin tip="Loading children details..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <h1>Children Details</h1>
      {children.length === 0 ? (
        <p>No data available</p>
      ) : (
        <Table dataSource={children} columns={columns} rowKey="_id" />
      )}
    </div>
  );
};

export default ChildrenDetails;
