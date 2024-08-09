import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDeviceForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {

        form.setFieldsValue({
            creationDate: new Date().toLocaleString(),
            addedBy: localStorage.getItem('userEmail') || 'Admin', 
        });
    }, [form]);

    const onFinish = async (values) => {
        try {
            
            const token = localStorage.getItem('token');
            
            
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            
            await axios.post('http://localhost:5000/api/devices', values, config);
            alert('Device added successfully');
            navigate('/dash/AllDevices'); 
        } catch (error) {
            console.error('Error adding device:', error.response?.data || error.message); // More detailed error message
            alert('Failed to add device');
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: '400px', margin: '0 auto' }}
        >
            <Form.Item
                label="Serial Number"
                name="serialNumber"
                rules={[{ required: true, message: 'Please input the serial number!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="SIM Number"
                name="simNumber"
                rules={[{ required: true, message: 'Please input the SIM number!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Device Model"
                name="deviceModel"
                rules={[{ required: true, message: 'Please input the device model!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Creation Date"
                name="creationDate"
            >
                <Input readOnly />
            </Form.Item>

            <Form.Item
                label="Added By"
                name="addedBy"
            >
                <Input readOnly />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Device
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDeviceForm;
