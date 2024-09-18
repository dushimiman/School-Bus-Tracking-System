import React, { useState } from 'react';
import "./header.css";
import logo1 from "../Assets/sator.png";
import { Modal, Form, Input, Button } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', values);
            localStorage.setItem('userLogedIn', true);
            localStorage.setItem('token', response.data.token);
            navigate("/dash");
        } catch (error) {
            console.error('Login error', error);
            alert('Invalid email or password');
        }
    };

    return (
        <>
          <Modal
  open={visible} // Change 'visible' to 'open'
  width="40%"
  onOk={() => setVisible(false)}
  onCancel={() => setVisible(false)}
>
  {/* <h1>Signin Form</h1> */}
  <Form onFinish={onFinish}>
    <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
      <Input type="email" />
    </Form.Item>
    <Form.Item label="Password" name="password" rules={[{ required: true }]}>
      <Input type="password" />
    </Form.Item>
    <Button htmlType="submit">Login</Button>
  </Form>
</Modal>

          <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 logo">
                        <img src={logo1} alt="Logo" />
                    </div>
                    <div className="col-12 col-md-8 navbar d-flex justify-content-end">
                        <a href="#" onClick={() => setVisible(true)}>Login</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;