import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { employees, HIGH_KPI_THRESHOLD, AVERAGE_KPI_THRESHOLD } from '../../data/mockData';

const PieChartComponent: React.FC = () => {
  const highKPI = employees.filter(emp => emp.kpi >= HIGH_KPI_THRESHOLD).length;
  const averageKPI = employees.filter(emp => emp.kpi >= AVERAGE_KPI_THRESHOLD && emp.kpi < HIGH_KPI_THRESHOLD).length;
  const lowKPI = employees.filter(emp => emp.kpi < AVERAGE_KPI_THRESHOLD).length;

  const data = [
    { name: 'High KPI', value: highKPI },
    { name: 'Average KPI', value: averageKPI },
    { name: 'Low KPI', value: lowKPI },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#D70040']; // Green, Orange, Red

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
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
