import React from "react";
import {
  Avatar,
  Card,
  Flex,
  Typography
} from "antd";

import {
  defaultUser,
  DepartmentLabels,
  EmploymentStatusLabels,
  RoleLables,
} from "@/types/user.type";
import useAuth from "@/context/auth/useAuth";

const { Title, Text } = Typography;

const AccountDetails: React.FC = () => {
  const auth = useAuth();
  const user = auth.user || defaultUser;

  return (
    <Card title="Account Details">
      <Flex justify="space-around">
        <Avatar
          size={{ xs: 30, sm: 30, md: 60, lg: 100, xl: 140, xxl: 180 }}
          src={'https://api.dicebear.com/7.x/miniavs/svg?'}
          style={{ border: '1px solid black' }}
        />
        <Flex vertical>
          <Title>{user.name}</Title>
          <Flex>
            <Flex vertical>
              <Text strong>Role:</Text>
              <Text strong>Department:</Text>
              <Text strong>Employee ID:</Text>
              <Text strong>Employment:</Text>
              <Text strong>Phone Number:</Text>
              <Text strong>Email:</Text>
            </Flex>
            <Flex vertical style={{ marginLeft: 10 }}>
              <Text>{RoleLables[user.role]}</Text>
              <Text>{DepartmentLabels[user.dept]}</Text>
              <Text>{user.employeeId}</Text>
              <Text>{EmploymentStatusLabels[user.employmentStatus]}</Text>
              <Text>{user.mobileNo}</Text>
              <Text>{user.email}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AccountDetails;
