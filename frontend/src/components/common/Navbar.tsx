import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  PieChartOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, Tag } from "antd";

import { DepartmentOptions, RoleLables, RoleOptions } from "@/types/user.type";
import logo from "@/assets/logo.png";
import useAuth from "@/context/auth/useAuth";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const auth = useAuth();

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="logo-container">
            <img src={logo} alt="Logo" />
            {auth.user && (
              <>
                <Tag color="blue" style={{ marginLeft: "1rem" }}>
                  {auth.user.name}
                </Tag>
                <Tag color="geekblue">{RoleLables[auth.user.role]}</Tag>
                <Tag color="volcano">{auth.user.employeeId}</Tag>
              </>
            )}
          </div>
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active-nav" : "")}
              >
                <Space>
                  <HomeOutlined />
                  Home
                </Space>
              </NavLink>
            </li>
            {auth.user && (
              auth.user.role != RoleOptions.EMPLOYEE ||
              auth.user.dept === DepartmentOptions.HR
            ) && (
                <li>
                  <NavLink
                    to="/statistics"
                    className={({ isActive }) => (isActive ? "active-nav" : "")}
                  >
                    <Space>
                      <PieChartOutlined />
                      Department Statistics
                    </Space>
                  </NavLink>
                </li>
              )}
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active-nav" : "")}
              >
                <Space>
                  <FormOutlined />
                  Appraisals
                </Space>
              </NavLink>
            </li>
            <li>
              <Popconfirm
                title="Logout"
                description="Are you sure you want to log out?"
                onConfirm={auth.logout}
                placement="bottomRight"
                okText="Yes"
                cancelText="No"
              >
                <Space>
                  <LogoutOutlined />
                  Logout
                </Space>
              </Popconfirm>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
