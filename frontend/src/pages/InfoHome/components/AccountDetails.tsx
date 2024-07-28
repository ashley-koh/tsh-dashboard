import React from "react";
import { Card, Avatar, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import User, {
  DepartmentLabels,
  EmploymentStatusLabels,
  RoleLables
} from "@/types/user.type";

const { Title, Text } = Typography;

const AccountDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <>
      <Card title="Account Details">
        <Flex justify="space-evenly">
          <Avatar size={180} icon={<UserOutlined />} />
          <Flex vertical style={{ marginLeft: 24 }}>
            <Title>{user.name}</Title>
            <Flex>
              <Flex vertical>
                <Text strong>Role:</Text>
                <Text strong>Department:</Text>
                <Text strong>Employee ID:</Text>
                <Text strong>Employemt:</Text>
                <Text strong>Email:</Text>
              </Flex>
              <Flex vertical style={{ marginLeft: 10 }}>
                <Text>{RoleLables[user.role]}</Text>
                <Text>{DepartmentLabels[user.dept]}</Text>
                <Text>{user.employeeId}</Text>
                <Text>{EmploymentStatusLabels[user.employmentStatus]}</Text>
                <Text>{user.email}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default AccountDetails;
