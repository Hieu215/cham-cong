import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [required, setRequired] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'set', user: null });
  },[])

  const login = (username: string, password: string) => {
    return axios.post('http://chamcong-nestjs.tda-uet.xyz:3434/auth/login', { username, password });
  };

  const onFinish = (values: any) => {
    login(values.username, values.password)
      .then(response => {
        const { access_token, user_info } = response.data;
        console.log(user_info);
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user_info));
        dispatch({ type: 'set', user: user_info });
        navigate('/');
        setRequired(false);
      })
      .catch(() => {
        setRequired(true);
      });
  };

  return (
    <div className="login-main">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, backgroundColor: 'white', padding: '32px 16px 0px 16px' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Username" name="username" htmlFor="username">
          <Input placeholder="username" id="username" />
        </Form.Item>
        <Form.Item label="Password" name="password" htmlFor="password">
          <Input.Password placeholder="password" id="password" />
        </Form.Item>
        {<div className={`required-login ${required ? 'show' : 'hidden'}`}>Incorrect account or password</div>}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" style={{ backgroundColor: '#73d13d', color: 'white' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
