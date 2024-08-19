import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const AddSchool = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/registerSchool', values, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

      if (response.status === 201) {
        notification.success({
          message: 'Success',
          description: 'School registered successfully!',
        });

        form.resetFields();
      } else {
        throw new Error('Failed to register school');
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'An error occurred while registering school',
      });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Register School</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="School Name"
          rules={[{ required: true, message: 'Please input the school name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="School Address"
          rules={[{ required: true, message: 'Please input the school address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="contactEmail"
          label="Contact Email"
          rules={[{ required: true, message: 'Please input the contact email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="contactPhone"
          label="Contact Phone"
          rules={[{ required: true, message: 'Please input the contact phone!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register School
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSchool;
