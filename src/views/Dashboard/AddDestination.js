import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const AddDestination = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/addDestination', {
        destinationName: values.destinationName,
      });

      notification.success({
        message: 'Destination Added',
        description: `The destination "${values.destinationName}" has been successfully added.`,
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Submission Failed',
        description: error.response?.data?.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Submission Failed',
      description: 'Please check the form for errors.',
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
      <h2>Add Destination</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Destination Name"
          name="destinationName"
          rules={[{ required: true, message: 'Please input the destination name!' }]}
        >
          <Input placeholder="Enter destination name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Destination
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDestination;
