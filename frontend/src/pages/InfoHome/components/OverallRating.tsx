import React from "react";
import { Card, Flex, Progress } from "antd";

const OverallRating: React.FC<{
  rating: number;
}> = ({ rating }) => {
  return (
    <>
      <Card title="Overall Rating">
        <Flex justify="center">
          <Progress type="dashboard" percent={rating} size={256} />
        </Flex>
      </Card>
    </>
  );
};

export default OverallRating;
