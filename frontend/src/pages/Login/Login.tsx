import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Flex, Button, Checkbox, Form, Input, Alert } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import logoImage from "@/assets/logo.png";
import useAuth from "@/context/auth/useAuth";
import "./Login.css";

const LoginModal: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  // If user has auth token and enters login page, redirect to home page
  useEffect(() => {
    if (auth.authenticated) {
      redirect("/home");
    }
  });

  const onFinish = (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    auth
      .loginAction({
        email: values.email,
        password: values.password,
      })
      .then(() => navigate('/home'))
      .catch(() => setErrorMessage('Login failed.'));
  };

  return (
    <div className="login-modal">
      <Flex vertical gap="middle">
        <img src={logoImage} className="logo" />
        {errorMessage && (
          <Alert
            showIcon
            type='error'
            data-cy='invalid-alert'
            message={errorMessage}
          />
        )}
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            data-cy='email-validate'
            rules={[
              { type: "email", message: "The input is not a valid E-mail!" },
              { required: true, message: "Please input your Email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              data-cy='email-input'
              onChange={() => setErrorMessage('')}
            />
          </Form.Item>
          <Form.Item
            name="password"
            data-cy='password-validate'
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              data-cy='password-input'
              onChange={() => setErrorMessage('')}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            data-cy='login-form-button'
          >
            Log in
          </Button>
          <div className="login-form-register-now">
            <Link to="/reset-password">Forgot password</Link>
            {" or "}
            <Link to="/register">Register now</Link>
          </div>
        </Form>
      </Flex>
    </div>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <LoginModal />
    </div>
  );
};

export default LoginPage;
