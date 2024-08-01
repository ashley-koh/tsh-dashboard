import React from "react";
import { Col, Layout, Row } from "antd";

import AccountDetails from "./components/AccountDetails";
import Loading from "@/components/common/Loading";
import ModuleProgress from "./components/ModuleProgress";
import OverallRating from "./components/OverallRating";
import User from "@/types/user.type";
import { lms } from "@/data/mockData";
import useAuth from "@/context/auth/useAuth";
import "./InfoHome.css";

const { Content } = Layout;

/**
 * Calculates user rating from their appraisal ratings and module ratings (from LMS).
 *
 * The formula to calculate user rating is as follows:
 *     Rating = (Module progress average %) x 50% +
 *              (Previous appraisal rating %, default is 80%) x 50%
 *
 * @param user The user to calculate the overall rating for.
 *
 * @returns The rating of the user, from 0 to 100 (inclusive).
 */
export function calculateOverallRating(user: User) {
  let moduleProgress: number = 0;
  for (const module of lms.modules) {
    moduleProgress += module.progress;
  }
  return Math.round((moduleProgress / lms.modules.length + (user?.rating || 80)) * 50) / 100;
};

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
          <Row>
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
              modules={lms.modules}
            />
          </Content>
        </Layout>
      </Row>
    </Layout>
  );
};

export default InfoHome;
