import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import axios from "axios";

const BusesDetails = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/buses");
        console.log("Buses data:", response.data); // Debug log
        setBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses details:", error);
        setError("Error fetching buses details");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const columns = [
    { title: "Plate Number", dataIndex: "plateNumber", key: "plateNumber" },
    { title: "GPS Model", dataIndex: "gpsModel", key: "gpsModel" },
    { title: "Owner Name", dataIndex: "ownerName", key: "ownerName" },
    {
      title: "School Name",
      dataIndex: ["school", "name"], // Access nested school object
      key: "schoolName",
    },
    {
      title: "Destination",
      dataIndex: ["destination", "destinationName"], // Access nested destination object
      key: "destination",
      render: (text) => (text ? text : "No destination"), // Handle missing destination
    },
    {
      title: "Driver", // New Driver column
      dataIndex: ["driver", "name"], // Access nested driver object
      key: "driverName",
      render: (text) => (text ? text : "No driver assigned"), // Handle missing driver
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
  ];
  

  if (loading) {
    return <Spin tip="Loading buses details..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <h1>Buses Details</h1>
      {buses.length === 0 ? (
        <p>No buses available</p>
      ) : (
        <Table dataSource={buses} columns={columns} rowKey="_id" />
      )}
    </div>
  );
};

export default BusesDetails;
