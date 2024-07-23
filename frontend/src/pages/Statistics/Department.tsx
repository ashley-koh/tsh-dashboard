import React, { useState } from "react";
import { Row, Col, Flex, Select, Space, Typography, Card } from "antd";
import useAuth from "@/context/auth/useAuth";
import getDeptLabel from "@/utils/getDeptLabel";
import { DepartmentOptions } from "@/types/user.type";

import Ranking from "./components/Ranking";
import PieChart from "./components/PieChart";

const { Text } = Typography;

const DepartmentStatistics: React.FC = () => {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentOptions>("hr");
  const deptOptions = [
    {
      value: "hr",
      label: "Human Resources (HR)",
    },
    {
      value: "others",
      label: "Others",
    },
  ];

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <span style={{ fontSize: 32, fontWeight: 500 }}>
            {getDeptLabel(selectedDepartment)}
          </span>
          {user?.role === "business_owner" && (
            <Space>
              <Text>Select Department: </Text>
              <Select
                size="large"
                options={deptOptions}
                defaultValue="hr"
                onChange={(value: DepartmentOptions) =>
                  setSelectedDepartment(value)
                }
                style={{ width: 300 }}
              />
            </Space>
          )}
        </Flex>
      </Card>

      <Row gutter={12} style={{ marginTop: 12 }}>
        <Col span={12}>
          <PieChart />
        </Col>
        <Col span={12}>
          <Ranking />
        </Col>
      </Row>
    </>
  );
};

export default DepartmentStatistics;
