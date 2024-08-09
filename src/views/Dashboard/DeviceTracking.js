import React, { useState } from 'react';
import axios from 'axios';

const DeviceTracking = () => {
    const [deviceId, setDeviceId] = useState('');
    const [location, setLocation] = useState({ type: 'Point', coordinates: [0, 0] });
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const sendDeviceData = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/devices/${deviceId}/data`, {
                location,
                status
            });
            console.log('Response:', response.data);
            setError('');
        } catch (error) {
            console.error('Error sending device data:', error.message);
            setError('Failed to update device data');
        }
    };

    return (
        <div>
            <h1>Track Device</h1>
            <input
                type="text"
                placeholder="Device ID"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location Longitude"
                value={location.coordinates[0]}
                onChange={(e) => setLocation({
                    ...location,
                    coordinates: [parseFloat(e.target.value), location.coordinates[1]]
                })}
            />
            <input
                type="text"
                placeholder="Location Latitude"
                value={location.coordinates[1]}
                onChange={(e) => setLocation({
                    ...location,
                    coordinates: [location.coordinates[0], parseFloat(e.target.value)]
                })}
            />
            <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <button onClick={sendDeviceData}>Send Data</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DeviceTracking;
