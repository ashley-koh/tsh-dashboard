import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Progress, Statistic, Row, Col } from 'antd';
import { employees, HIGH_KPI_THRESHOLD, AVERAGE_KPI_THRESHOLD } from '../../data/mockData';
import useAuth from '../../context/auth/useAuth';
import './DetailedEmployeeStats.css';

const DetailedEmployeeStats: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const employee = employees.find(emp => emp.id === employeeId);
  const { user } = useAuth();

  const handleDownloadPDF = () => {
    // Logic to generate and download PDF
  };

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const kpiColor = employee.kpi >= HIGH_KPI_THRESHOLD
    ? 'green'
    : employee.kpi >= AVERAGE_KPI_THRESHOLD
    ? 'orange'
    : 'red';

  return (
    <Card title={`Employee Stats: ${employee.name}`} className="detailed-employee-stats">
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="KPI" value={employee.kpi} valueStyle={{ color: kpiColor }} />
          <Progress
            percent={employee.kpi}
            status={employee.kpi >= HIGH_KPI_THRESHOLD ? 'success' : employee.kpi >= AVERAGE_KPI_THRESHOLD ? 'active' : 'exception'}
            strokeColor={kpiColor}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Department" value={employee.department} />
          <Statistic title="Appraisals" value={employee.appraisals.length} />
        </Col>
      </Row>
      {user?.role === 'hr' && (
        <Button type="primary" onClick={handleDownloadPDF} style={{ marginTop: '16px' }}>
          Download Report
        </Button>
      )}
    </Card>
  );
};

export default DetailedEmployeeStats;