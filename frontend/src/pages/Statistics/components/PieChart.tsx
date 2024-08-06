import React, { useEffect, useState } from 'react';
import { Card, Empty } from 'antd';
import { Pie } from '@ant-design/plots';

import {
  AVERAGE_KPI_THRESHOLD,
  HIGH_KPI_THRESHOLD,
  calculateOverallRating
} from '@/utils/rateEmployee';
import User from '@/types/user.type';
import axiosClient from '@/lib/axiosInstance';
import { fetchUsers } from '@/services/user.services';
import './StatsComponents.css';

type ChartDataType = {
  name: string;
  value: number;
};
interface PieChartProps {
  department: string;
};

const PieChart: React.FC<PieChartProps> = ({ department }) => {
  const client = axiosClient();
  const [data, setData] = useState<ChartDataType[]>([]);

  const config = {
    angleField: 'value',
    colorField: 'name',
    innerRadius: 0.4,
    height: 400,

    label: {
      text: 'name',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'Performance',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 20,
          fontStyle: 'bold',
        },
      },
    ],
  };

  /** Run each time the department changes */
  useEffect(() => {
    const loadData = async () => {
      const users: User[] = await fetchUsers(client);
      const employees: User[] = users.filter(user => user.dept === department);

      const ratings: number[] = await Promise.all(
        employees.map(async employee => await calculateOverallRating(client, employee))
      );

      let lowKPI = 0, aveKPI = 0, highKPI = 0;
      for (const rating of ratings) {
        if (rating >= HIGH_KPI_THRESHOLD) {
          highKPI++;
        }
        else if (rating >= AVERAGE_KPI_THRESHOLD) {
          aveKPI++;
        }
        else {
          lowKPI++;
        }
      }

      let chartData: ChartDataType[] = [];
      if (lowKPI > 0) {
        chartData.push({ name: 'Under-Performing', value: lowKPI });
      }
      if (aveKPI > 0) {
        chartData.push({ name: 'Average', value: aveKPI });
      }
      if (highKPI > 0) {
        chartData.push({ name: 'Exceptional', value: highKPI });
      }
      setData(chartData);
    };

    loadData();
  }, [department]);

  return (
    <Card title='Department Performance' className='stats-container'>
      {data.length ?
        <Pie {...config} data={data} /> :
        <Empty />
      }
    </Card>
  );
};

export default PieChart;
