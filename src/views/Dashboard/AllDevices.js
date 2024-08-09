import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const DevicesList = () => {
    const [devices, setDevices] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/devices', {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setDevices(response.data);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };

        fetchDevices();
    }, []);

    // Filter devices based on search text
    const filteredDevices = devices.filter(device => 
        device.serialNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        device.deviceModel.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (text, record, index) => index + 1, // Incremental ID starting from 1
        },
        {
            title: 'Serial Number',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
        },
        {
            title: 'SIM Number',
            dataIndex: 'simNumber',
            key: 'simNumber',
        },
        {
            title: 'Device Model',
            dataIndex: 'deviceModel',
            key: 'deviceModel',
        },
        {
            title: 'Creation Date',
            dataIndex: 'creationDate',
            key: 'creationDate',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Added By',
            dataIndex: 'addedBy',
            key: 'addedBy',
            render: (user) => user ? user.email : 'Unknown',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Button type="primary" onClick={() => navigate('/dash/NewDevice')}>Add New Device</Button>
            <Input 
                placeholder="Search devices..." 
                style={{ 
                    margin: '20px 0', 
                    height: '32px',
                    fontSize: '14px', 
                    lineHeight: '32px' 
                    
                }} 
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Table
                dataSource={filteredDevices}
                columns={columns}
                rowKey="_id"
                style={{ marginTop: '20px' }}
            />
        </div>
    );
};

export default DevicesList;
