import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { employees, HIGH_KPI_THRESHOLD, AVERAGE_KPI_THRESHOLD } from '../../data/mockData';
import './PieChartComponent.css';

interface PieChartComponentProps {
  department: string;
}

const COLORS = ['#66CDAA', '#FFD700', '#FF7F7F']; // Lighter colors

const PieChartComponent: React.FC<PieChartComponentProps> = ({ department }) => {
  const departmentEmployees = employees.filter(emp => emp.department === department);

  const highKPI = departmentEmployees.filter(emp => emp.kpi >= HIGH_KPI_THRESHOLD).length;
  const averageKPI = departmentEmployees.filter(emp => emp.kpi >= AVERAGE_KPI_THRESHOLD && emp.kpi < HIGH_KPI_THRESHOLD).length;
  const lowKPI = departmentEmployees.filter(emp => emp.kpi < AVERAGE_KPI_THRESHOLD).length;

  const data = [
    { name: 'High KPI', value: highKPI },
    { name: 'Average KPI', value: averageKPI },
    { name: 'Low KPI', value: lowKPI },
  ];

  return (
    <div className="pie-chart-component">
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={190}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
