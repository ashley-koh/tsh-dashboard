import React from "react";
import { Card, Flex, Progress, ProgressProps } from "antd";
import './OverallRating.css';

const OverallRating: React.FC<{
  rating: number;
}> = ({ rating }) => {

  const twoColors: ProgressProps["strokeColor"] = {
    "0%": "#eb2a27",
    "100%": "#108ee9",
  };

  return (
    <>
      <Card title="Overall Rating">
        <Flex justify="center">
          <Progress type="dashboard" percent={rating} size={256} strokeColor={twoColors} gapDegree={60} />
        </Flex>
      </Card>
    </>
  );
};

export default OverallRating;
