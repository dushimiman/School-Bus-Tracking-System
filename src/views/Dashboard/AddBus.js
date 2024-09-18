import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddBus = () => {
  const [form] = Form.useForm();
  const [schools, setSchools] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchSchoolsAndDestinations = async () => {
      try {
        console.log('Fetching schools and destinations...');
        const [schoolsResponse, destinationsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/schools', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get('http://localhost:5000/api/destinations', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        setSchools(schoolsResponse.data);
        setDestinations(destinationsResponse.data);
      } catch (error) {
        console.error('Error fetching schools or destinations:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch schools or destinations',
        });
      }
    };

    fetchSchoolsAndDestinations();
  }, []);

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/addBus', values, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      notification.success({
        message: 'Success',
        description: 'Bus added successfully',
      });
      form.resetFields();
    } catch (error) {
      console.error('Error adding bus:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to add bus',
      });
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        plateNumber: '',
        gpsModel: '',
        ownerName: '',
        schoolId: '',
        destinationId: '',
      }}
    >
      <Form.Item
        label="Plate Number"
        name="plateNumber"
        rules={[{ required: true, message: 'Please enter the plate number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="GPS Model"
        name="gpsModel"
        rules={[{ required: true, message: 'Please enter the GPS model' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Owner Name"
        name="ownerName"
        rules={[{ required: true, message: 'Please enter the owner name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="School"
        name="schoolId"
        rules={[{ required: true, message: 'Please select a school' }]}
      >
        <Select placeholder="Select a school">
          {schools.map(school => (
            <Option key={school._id} value={school._id}>
              {school.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Destination"
        name="destinationId"
        rules={[{ required: true, message: 'Please select a destination' }]}
      >
        <Select placeholder="Select a destination">
          {destinations.map(destination => (
            <Option key={destination._id} value={destination._id}>
              {destination.destinationName}
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
  );
};

export default AddBus;
