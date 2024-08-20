import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';

const SchoolsList = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/schools', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Contact Email', dataIndex: 'contactEmail', key: 'contactEmail' },
    { title: 'Contact Phone', dataIndex: 'contactPhone', key: 'contactPhone' },
  ];

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/dash/AddSchool">Add New School</Link>
      </Button>
      <Table dataSource={schools} columns={columns} rowKey="_id" />
    </div>
  );
};

export default SchoolsList;
