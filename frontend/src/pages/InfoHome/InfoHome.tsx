import React from "react";
import { Row, Col } from "antd";
import AccountDetails from "./components/AccountDetails";
import OverallRating from "./components/OverallRating";
import ModuleProgress from "./components/ModuleProgress";

import Loading from "@/components/common/Loading";
import useAuth from "@/context/auth/useAuth";
import { lms } from "@/data/mockData";
import "./InfoHome.css";

const InfoHome: React.FC = () => {
  const auth = useAuth();

  if (auth.user === null) {
    console.error("User is not logged in, something went wrong.");
    alert("Something went wrong. Please try again later.");
    return <Loading />;
  }

  return (
    <>
      <Row gutter={12}>
        <Col span={7}>
          <AccountDetails user={auth.user} />
        </Col>
        <Col span={12}>
          <ModuleProgress modules={lms.modules} />
        </Col>
        <Col span={5}>
          <OverallRating rating={lms.overallRating} />
        </Col>
      </Row>
      {/* <div className="container">
        <div className="info-panel">
          <div>
            <Avatar size={128} icon={<UserOutlined />} />
            <h1>{auth.user.name}</h1>
            <p>{auth.user.dept} Department</p>
            <p>{auth.user.role}</p>
          </div>
          <div className="overall">
            <h2>Overall Rating</h2>
            <Progress
              type="dashboard"
              percent={lms.overallRating}
              strokeColor={twoColors}
              size={125}
            />
          </div>
        </div>
        <Card
          title={<p className="module-title">Module Progress Overview</p>}
          className="card-panel"
        >
          {lms.modules.slice(0, 4).map((module, index) => (
            <Card.Grid
              hoverable
              key={index}
              className="module-card"
              style={{ width: "45%", fontSize: "15px" }}
            >
              <>
                <strong>
                  <span className="card-title">{module.name}</span>
                </strong>
                <Progress
                  percent={module.progress}
                  percentPosition={{ align: "center", type: "inner" }}
                  size={{ height: 20 }}
                  strokeColor={twoColors}
                />
              </>
            </Card.Grid>
          ))}
        </Card>
      </div> */}
    </>
  );
};

export default InfoHome;
