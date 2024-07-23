import React from "react";
import { Pie } from "@ant-design/plots";
import { Card } from "antd";

const PieChart: React.FC = () => {
  const config = {
    data: [
      { type: "Under Performing", value: 10 },
      { type: "Average", value: 50 },
      { type: "Exceptional", value: 20 },
    ],
    angleField: "value",
    colorField: "type",
    innerRadius: 0.4,
    height: 700,

    label: {
      text: "type",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Performance",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 24,
          fontStyle: "bold",
        },
      },
    ],
  };
  return (
    <Card title="Department Performance">
      <Pie {...config} />
    </Card>
  );
};

export default PieChart;
