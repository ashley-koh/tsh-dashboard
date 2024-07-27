import React, { useState } from "react";
import { Select } from "antd";

import DashboardFlexBox from "./components/DashboardFlexBox";
import EmployeeRanking from "./components/EmployeeRanking";
import PieChartComponent from "./components/PieChartComponent";
import { DepartmentOptions, RoleOptions } from "@/types/user.type";
import useAuth from "@/context/auth/useAuth";
import { departments } from "../../data/mockData";
import "./DepartmentStatistics.css";

const { Option } = Select;

const DepartmentStatistics: React.FC = () => {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState("");

  return (
    <div className="department-statistics">
      <h2>{selectedDepartment} Statistics</h2>
      {(user?.role === RoleOptions.OWNER || user?.dept === DepartmentOptions.HR) && (
        <div className="department-select">
          <Select
            defaultValue={selectedDepartment}
            onChange={setSelectedDepartment}
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
