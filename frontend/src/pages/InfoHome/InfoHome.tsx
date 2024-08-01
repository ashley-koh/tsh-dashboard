import React from "react";
import { Col, Layout, Row } from "antd";

import AccountDetails from "./components/AccountDetails";
import Loading from "@/components/common/Loading";
import ModuleProgress from "./components/ModuleProgress";
import OverallRating from "./components/OverallRating";
import { calculateOverallRating } from "@/utils/rateEmployee";
import { LMS } from "@/data/mockData";
import useAuth from "@/context/auth/useAuth";
import "./InfoHome.css";
import './components/InfoComponents.css';

const { Content } = Layout;

const InfoHome: React.FC = () => {
  const auth = useAuth();

  if (auth.user === null) {
    console.error("User is not logged in, something went wrong.");
    alert("Something went wrong. Please try again later.");
    return <Loading />;
  }

  return (
    <Layout>
      <Row gutter={20}>
        <Col span={10}>
          <Row className='module-container'>
            <Col span={24} className='component'>
              <AccountDetails data-testid='AccountDetails' />
            </Col>
            <Col span={24} className='component'>
              <OverallRating
                data-testid='OverallRating'
                rating={calculateOverallRating(auth.user)}
              />
            </Col>
          </Row>
        </Col>
        <Layout>
          <Content className='component'>
            <ModuleProgress
              data-testid='ModuleProgress'
              modules={LMS.modules}
            />
          </Content>
        </Layout>
      </Row>
    </Layout>
  );
};

export default InfoHome;
