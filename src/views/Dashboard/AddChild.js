import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddChild = () => {
  const [form] = Form.useForm();
  const [schools, setSchools] = useState([]);
  const [destinations, setDestinations] = useState([]);

  // Fetch schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schools', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assumes JWT token is stored in localStorage
          },
        });
        setSchools(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch schools',
        });
      }
    };

    fetchSchools();
  }, []);

  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/destinations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assumes JWT token is stored in localStorage
          },
        });
        setDestinations(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch destinations',
        });
      }
    };

    fetchDestinations();
  }, []);

  const onFinish = async (values) => {
    console.log('Form values:', values); // Log form values

    try {
      const response = await axios.post('http://localhost:5000/api/addChild', values, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        notification.success({
          message: 'Success',
          description: 'Child registered successfully!',
        });
        form.resetFields();
      } else {
        throw new Error('Failed to add child');
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'An error occurred while adding the child',
      });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Add Child</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input the first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input the last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="parentName"
          label="Parent Name"
          rules={[{ required: true, message: 'Please input the parent name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="parentPhone"
          label="Parent Phone"
          rules={[{ required: true, message: 'Please input the parent phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="schoolId"
          label="School"
          rules={[{ required: true, message: 'Please select a school!' }]}
        >
          <Select placeholder="Select a school">
            {schools.map((school) => (
              <Option key={school._id} value={school._id}>
                {school.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="destinationId"
          label="Destination"
          rules={[{ required: true, message: 'Please select a destination!' }]}
        >
          <Select placeholder="Select a destination">
            {destinations.map((destination) => (
              <Option key={destination._id} value={destination._id}>
                {destination.destinationName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Child
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddChild;
