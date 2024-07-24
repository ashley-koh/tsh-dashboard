import React, { useState } from "react";
import { Select } from "antd";
import PieChartComponent from "./components/PieChartComponent";
import EmployeeRanking from "./components/EmployeeRanking";
import DashboardFlexBox from "./components/DashboardFlexBox";
import useAuth from "@/context/auth/useAuth";
import { departments } from "../../data/mockData";
import "./DepartmentStatistics.css";

import getDeptLabel from "@/utils/getDeptLabel";

const { Option } = Select;

const DepartmentStatistics: React.FC = () => {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  return (
    <div className="department-statistics">
      <h2>{selectedDepartment} Statistics</h2>
      {user?.role === "hr" && (
        <div className="department-select">
          <Select
            defaultValue={selectedDepartment}
            onChange={handleDepartmentChange}
            style={{ width: 200 }}
          >
            {departments.map((department) => (
              <Option key={department} value={department}>
                {department}
              </Option>
            ))}
          </Select>
        </div>
      )}
      <div className="stats-container">
        <DashboardFlexBox title="KPI Distribution">
          <PieChartComponent department={selectedDepartment} />
        </DashboardFlexBox>
        <DashboardFlexBox title="Employee Ranking">
          <EmployeeRanking department={selectedDepartment} />
        </DashboardFlexBox>
      </div>
    </div>
  );
};

export default DepartmentStatistics;
