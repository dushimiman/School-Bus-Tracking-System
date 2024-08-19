import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddBus = () => {
  const [form] = Form.useForm();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        console.log('Fetching schools...');
        const response = await axios.get('http://localhost:5000/api/schools', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Schools fetched:', response.data);
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch schools',
        });
      }
    };

    fetchSchools();
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/addBus', values, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        notification.success({
          message: 'Success',
          description: 'Bus added successfully!',
        });

        form.resetFields();
      } else {
        throw new Error('Failed to add bus');
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'An error occurred while adding the bus',
      });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Add Bus</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="plateNumber"
          label="Plate Number"
          rules={[{ required: true, message: 'Please input the plate number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gpsModel"
          label="GPS Model"
          rules={[{ required: true, message: 'Please input the GPS model!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ownerName"
          label="Owner Name"
          rules={[{ required: true, message: 'Please input the owner name!' }]}
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Bus
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBus;
