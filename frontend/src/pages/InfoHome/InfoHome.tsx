import React, { useEffect, useState } from "react";
import { Col, Layout, Row } from "antd";

import AccountDetails from "./components/AccountDetails";
import Loading from "@/components/common/Loading";
import ModuleProgress from "./components/ModuleProgress";
import OverallRating from "./components/OverallRating";
import axiosClient from "@/lib/axiosInstance";
import { calculateOverallRating } from "@/utils/rateEmployee";
import { LMS } from "@/data/mockData";
import useAuth from "@/context/auth/useAuth";
import "./InfoHome.css";
import './components/InfoComponents.css';

const { Content } = Layout;

const InfoHome: React.FC = () => {
  const auth = useAuth();
  const client = axiosClient();

  const [rating, setRating] = useState<number>(-1);

  /** Run this once on home page load */
  useEffect(() => {
    const loadData = async () => {
      if (auth.user === null) {
        return;
      }

      const userRating: number = await calculateOverallRating(client, auth.user);
      setRating(userRating);
    };

    loadData();
  }, []);

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
                rating={rating}
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
