import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Select
} from "antd";

import RegisterForm from "./types/form.type";
import User, { DepartmentLabels, EmploymentStatusLabels, RoleLables } from "@/types/user.type";
import axiosClient from '@/lib/axiosInstance';
import logoImage from "@/assets/logo.png";
import useAuth from "@/context/auth/useAuth";
import "./Register.css";

const RegisterModal: React.FC = () => {
  const [form] = Form.useForm();
  const client = axiosClient();
  const auth = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  // If user has auth token and enters register page, redirect to home page
  useEffect(() => {
    if (auth.authenticated) {
      redirect("/home");
    }
  });

  const onFinish = (values: RegisterForm) => {
    // Handle confirmation and agreement separately
    const { confirm: string, agreement: boolean, ...rest } = values;
    const user: User = { ...rest, appraisals: [] };

    client
      .post("/user", user)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.error(err);
      });
  };

  return (
    <div className="register-modal">
      <Flex vertical gap="middle">
        <img src={logoImage} className="logo" />
        {errorMessage && (
          <Alert message={errorMessage} type="warning" showIcon />
        )}
        <Form name="register" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            name="email"
            label="Email"
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
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="mobileNo"
            label="Mobile Number"
            rules={[{ required: true, message: "Please input your mobile number!" }]}
          >
            <Input placeholder="Mobile Number" />
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
            label="Job Level"
            name="role"
            rules={[
              { required: true, message: "Please input your job level!" },
            ]}
          >
            <Select
              placeholder="Job Level"
              options={Object.entries(RoleLables)
                .map(([key, value]: [string, string]) => ({ value: key, label: value }))}
            />
          </Form.Item>

          <Form.Item
            name="dept"
            label="Department"
            rules={[
              { required: true, message: "Please input your Department!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Department"
              options={Object.entries(DepartmentLabels)
                .map(([key, value]: [string, string]) => ({ value: key, label: value }))}
            />
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
            label="Employment Status"
            name="employmentStatus"
            rules={[
              {
                required: true,
                message: "Please input your employment status!",
              },
            ]}
          >
            <Select
              placeholder="Employment Status"
              options={Object.entries(EmploymentStatusLabels)
                .map(([key, value]: [string, string]) => ({ value: key, label: value }))}
            />
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
