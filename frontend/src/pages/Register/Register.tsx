import React from "react";
import { Flex, Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import "./Register.css";

const RegisterModal: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="register-modal">
      <Flex vertical gap="middle">
        <img src={logoImage} className="logo" />
        <Form name="register" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: "email", message: "The input is not a valid E-mail!" },
              { required: true, message: "Please input your Email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="employeeId"
            label="Employee ID"
            rules={[
              { required: true, message: "Please input your employee ID!" },
            ]}
          >
            <Input placeholder="Employee ID" />
          </Form.Item>

          <Form.Item
            name="jobTitle"
            label="Job Title"
            rules={[
              { required: true, message: "Please input your job title!" },
            ]}
          >
            <Input placeholder="Job Title" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <Link to="">agreement</Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            <div className="register-form-login-now">
              {"Or "}
              <Link to="/login">login now</Link>
            </div>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <RegisterModal />
    </div>
  );
};

export default RegisterPage;
