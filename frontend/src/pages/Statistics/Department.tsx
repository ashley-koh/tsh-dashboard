import React, { useState } from "react";
import {
  Card,
  Col,
  Flex,
  Row,
  Select,
  Space,
  Typography,
} from "antd";

import {
  DepartmentLabels,
  DepartmentOptions,
  RoleOptions
} from "@/types/user.type";
import PieChart from "./components/PieChart";
import Ranking from "./components/Ranking";
import useAuth from "@/context/auth/useAuth";

const { Text } = Typography;

const DepartmentStatistics: React.FC = () => {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentOptions>(DepartmentOptions.HR);

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <span style={{ fontSize: 32, fontWeight: 500 }}>
            {DepartmentLabels[selectedDepartment]}
          </span>
          {user?.role === RoleOptions.OWNER && (
            <Space>
              <Text>Select Department: </Text>
              <Select
                size="large"
                options={Object.entries(DepartmentLabels)
                  .map(([key, value]: [string, string]) => ({ value: key, label: value }))}
                defaultValue={DepartmentOptions.HR}
                onChange={setSelectedDepartment}
                style={{ width: 300 }}
              />
            </Space>
          )}
        </Flex>
      </Card>

      <Row gutter={12} style={{ marginTop: 12 }}>
        <Col span={12}>
          <PieChart department={selectedDepartment} />
        </Col>
        <Col span={12}>
          <Ranking department={selectedDepartment} />
        </Col>
      </Row>
    </>
  );
};

export default DepartmentStatistics;
