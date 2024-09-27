import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import axios from "axios";

const SchoolsDetails = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/schools");
        console.log("Schools data:", response.data); // Debug log
        setSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools details:", error);
        setError("Error fetching schools details");
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const columns = [
    { title: "School Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Contact Email", dataIndex: "contactEmail", key: "contactEmail" },
    { title: "Contact Phone", dataIndex: "contactPhone", key: "contactPhone" },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
  ];

  if (loading) {
    return <Spin tip="Loading schools details..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <h1>Schools Details</h1>
      {schools.length === 0 ? (
        <p>No schools available</p>
      ) : (
        <Table dataSource={schools} columns={columns} rowKey="_id" />
      )}
    </div>
  );
};

export default SchoolsDetails;
