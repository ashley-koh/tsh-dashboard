import React from "react";
import { Flex, Spin } from "antd";

const Loading: React.FC = () => {
  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Spin size="large" />
      </Flex>
    </>
  );
};

export default Loading;
