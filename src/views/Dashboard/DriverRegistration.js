import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Spin, Alert } from "antd";
import axios from "axios";

const { Option } = Select;

const DriverRegistration = () => {
  const [driverDetails, setDriverDetails] = useState({
    name: "",
    licenseCategory: "",
    phoneNumber: "",
    bus: "", // Will store the bus ObjectId
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [busList, setBusList] = useState([]); // To store the bus objects

  // Fetch bus list from the backend
  useEffect(() => {
    const fetchBusList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/buses");
        setBusList(response.data); // Assuming response.data contains an array of bus objects
      } catch (error) {
        console.error("Error fetching bus list:", error);
      }
    };

    fetchBusList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails({
      ...driverDetails,
      [name]: value,
    });
  };

  const handleLicenseCategoryChange = (value) => {
    setDriverDetails({
      ...driverDetails,
      licenseCategory: value,
    });
  };

  const handleBusChange = (value) => {
    setDriverDetails({
      ...driverDetails,
      bus: value, // Assign the bus ObjectId
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post("http://localhost:5000/api/drivers", driverDetails); // Endpoint to save driver
      setSuccess("Driver registered successfully!");
      setDriverDetails({ name: "", licenseCategory: "", phoneNumber: "", bus: "" });
    } catch (error) {
      setError("Failed to register driver. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Driver Registration</h1>

      {loading && <Spin tip="Registering driver..." />}
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      {success && <Alert message="Success" description={success} type="success" showIcon />}

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Driver Name" required>
          <Input
            name="name"
            value={driverDetails.name}
            onChange={handleInputChange}
            placeholder="Enter driver's name"
          />
        </Form.Item>

        <Form.Item label="License Category" required>
          <Select
            value={driverDetails.licenseCategory}
            onChange={handleLicenseCategoryChange}
            placeholder="Select license category"
          >
            <Option value="B">B</Option>
            <Option value="F">F</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Phone Number" required>
          <Input
            name="phoneNumber"
            value={driverDetails.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
        </Form.Item>

        <Form.Item label="Bus" required>
          <Select
            value={driverDetails.bus}
            onChange={handleBusChange}
            placeholder="Select bus"
          >
            {busList.map((bus) => (
              <Option key={bus._id} value={bus._id}>
                {bus.plateNumber}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={loading}>
          Register Driver
        </Button>
      </Form>
    </div>
  );
};

export default DriverRegistration;
