import React from 'react';
import {
  Card,
  Flex,
  Progress,
  Space,
  Tag,
  Typography
} from 'antd';

import { twoColors } from '@/utils/rateEmployee';
import './InfoComponents.css';

const { Text } = Typography;

type module = {
  name: string;
  progress: number;
  dueIn: number;
};
interface ModuleProps {
  modules: module[];
};

const ModuleProgress: React.FC<ModuleProps> = ({ modules }) => (
  <Card
    title='Module Progress Overview'
    className='module-container'
  >
    <Flex vertical gap={40}>
      {modules.map((module, index) => (
        <div key={index}>
          <Flex justify='space-between'>
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
            strokeColor={twoColors}
            className='progress-bar'
          />
        </div>
      ))}
    </Flex>
  </Card>
);

export default ModuleProgress;
