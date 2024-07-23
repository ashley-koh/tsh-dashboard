import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  PieChartOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, Tag } from "antd";

import useAuth from "@/context/auth/useAuth";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import getRoleLabel from "@/utils/getRoleLabel";

const Navbar: React.FC = () => {
  const auth = useAuth();

  const roles = ["business_owner", "head_of_department"];
  const dept = "hr";

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
                <Tag color="geekblue">{getRoleLabel(auth.user.role)}</Tag>
                <Tag color="volcano">{auth.user.employeeID}</Tag>
              </>
            )}
          </div>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-nav" : "")}
              >
                <Space>
                  <HomeOutlined />
                  Home
                </Space>
              </NavLink>
            </li>
            {auth.user &&
              (roles.includes(auth.user.role) ||
                dept.includes(auth.user.dept)) && (
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
                description="Are you sure you want to Logout?"
                onConfirm={auth.logout}
                placement="bottomRight"
                okText="Yes"
                cancelText="No"
              >
                <NavLink to="/" className="logout">
                  <Space>
                    <LogoutOutlined />
                    Logout
                  </Space>
                </NavLink>
              </Popconfirm>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
