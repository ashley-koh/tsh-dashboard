import React from "react";
import { Card, Flex, Progress } from "antd";

import { twoColors } from "@/utils/rateEmployee";
import "./OverallRating.css";

const OverallRating: React.FC<{ rating: number }> = ({ rating }) => (
  <Card title="Overall Rating" style={{ width: "100%" }}>
    <Flex justify="center">
      <Progress
        type="dashboard"
        percent={rating}
        size={256}
        strokeColor={twoColors}
        gapDegree={60}
      />
    </Flex>
  </Card>
);

export default OverallRating;
