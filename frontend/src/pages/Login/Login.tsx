import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, Button, Checkbox, Form, Input, Alert } from "antd";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import "./Login.css";
import useAuth from "@/context/auth/useAuth";

const LoginModal: React.FC = () => {
  const auth = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

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
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="login-modal">
      <Flex vertical gap="middle">
        <img src={logoImage} className="logo" />
        {errorMessage && (
          <Alert message={errorMessage} type="warning" showIcon />
        )}
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "The input is not a valid E-mail!" },
              { required: true, message: "Please input your Email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/reset-password" className="login-form-forgot">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <div className="login-form-register-now">
              {"Or "}
              <Link to="/register">register now</Link>
            </div>
          </Form.Item>
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
