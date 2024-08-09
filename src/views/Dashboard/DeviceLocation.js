import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeviceLocation = ({ deviceId }) => {
    const [device, setDevice] = useState(null);

    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/devices/${deviceId}`);
                setDevice(response.data);
            } catch (error) {
                console.error('Error fetching device data:', error);
            }
        };

        fetchDeviceData();
    }, [deviceId]);

    if (!device) return <div>Loading...</div>;

    return (
        <div>
            <h2>Device Location</h2>
            <p>Latitude: {device.location?.latitude}</p>
            <p>Longitude: {device.location?.longitude}</p>
            <p>Speed: {device.speed} km/h</p>
            <p>Timestamp: {device.timestamp}</p>
        </div>
    );
};

export default DeviceLocation;
