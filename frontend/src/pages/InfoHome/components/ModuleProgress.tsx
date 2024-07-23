import React from "react";
import { Card, Flex, Progress, Typography, Tag, Space } from "antd";

const { Text } = Typography;

const ModuleProgress: React.FC<{
  modules: { name: string; progress: number; dueIn: number }[];
}> = ({ modules }) => {
  return (
    <>
      <Card title="Module Progress Overview">
        <Flex vertical gap={48}>
          {modules.slice(0, 4).map((module, index) => (
            <div key={index}>
              <Flex justify="space-between" style={{ marginTop: 8 }}>
                <Space>
                  <Text strong>{module.name}</Text>
                  {module.dueIn < 10 && (
                    <Tag color="warning" style={{ marginRight: 0 }}>
                      Due in {module.dueIn} days
                    </Tag>
                  )}
                </Space>
                {module.progress !== 100 && <a href="#">Continue</a>}
              </Flex>
              <Progress
                percent={module.progress}
                percentPosition={{ align: "center", type: "inner" }}
                size={{ height: 18 }}
                style={{ marginTop: 8 }}
              />
            </div>
          ))}
        </Flex>
      </Card>
    </>
  );
};

export default ModuleProgress;
