import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  List,
  message
} from 'antd';

import User from '@/types/user.type';
import axiosClient from '@/lib/axiosInstance';
import { fetchUsers } from '@/services/user.services';
import './StatsComponents.css';
import { LMS } from "@/data/mockData";
import { DepartmentLabels, EmploymentStatusLabels, RoleLables } from "@/types/user.type"
import { jsPDF } from 'jspdf';

interface RankingProps {
  department: string;
};

/**
 * Generate and allow download of employee report in PDF format.
 *
 * @param user The employee to generate the report for.
 */
export function downloadPDF(user: User) {
  const pdf = new jsPDF();

  // Set up PDF font and colors
  pdf.setFontSize(18);
  pdf.setTextColor(60);

  // Header for account details
  pdf.text('Account Details', 20, 20);

  // Draw a table for user information
  const userInfo = [
    ['Name', user.name || 'N/A'],
    ['Role', user.role || 'N/A'],
    ['Department', user.dept || 'N/A'],
    ['Employee ID', user.employeeId || 'N/A'],
    ['Employment', user.employmentStatus || 'N/A'],
    ['Phone Number', user.mobileNo || 'N/A'],
    ['Email', user.email || 'N/A'],
  ];

  // Set table start position
  let startY = 30;
  pdf.setFontSize(12);
  userInfo.forEach((info) => {
    pdf.text(`${info[0]}:`, 20, startY);
    pdf.text(`${info[1]}`, 60, startY);

    // Draw a line below each row
    pdf.setDrawColor(200);
    pdf.line(20, startY + 3, 180, startY + 3);

    startY += 8; // Reduced line spacing
  });

  // Module progress overview header
  pdf.setTextColor(60);
  pdf.setFontSize(18);
  pdf.text('Module Progress Overview', 20, startY + 15); // Reduced spacing

  // Assuming LMS is your module data and exists in the context
  const modules = LMS.modules;

  // Calculate overall rating as an average of module progress
  const overallRating = modules.reduce((sum, module) => sum + (module.progress || 0), 0) / modules.length;

  // Align progress bars to the left with padding and full width
  modules.forEach((module, index) => {
    const y = startY + 25 + (index * 12); // Reduced spacing
    pdf.setFontSize(12);
    pdf.setTextColor(60);
    pdf.text(`${module.name}: ${module.progress ?? 0}%`, 20, y);

    // Progress bar background, full width
    pdf.setFillColor(232, 232, 232);
    pdf.rect(20, y + 2, 160, 5, 'F'); // Full width of the page

    // Progress bar foreground with rounded corners, light blue
    pdf.setFillColor(173, 216, 230); // Light blue color
    pdf.roundedRect(20, y + 2, 1.6 * (module.progress || 0), 5, 1, 1, 'F'); // Adjusted to match full width
  });

  // Overall rating representation
  const ratingY = startY + 25 + (modules.length * 12) + 25; // Adjusted position
  pdf.setTextColor(60);
  pdf.setFontSize(18);
  pdf.text('Overall Rating:', 20, ratingY);

  // Move the circle slightly left and higher
  const circleX = 100; // Adjusted position left
  const circleY = ratingY + 10; // Moved circle up
  const radius = 20;

  // Draw the circle outline, light blue
  pdf.setDrawColor(173, 216, 230); // Light blue color
  pdf.circle(circleX, circleY, radius);

  // Fill a part of the circle based on overall rating
  const ratingAngle = (overallRating / 100) * 2 * Math.PI;
  pdf.setFillColor(173, 216, 230); // Light blue color

  // Draw filled arc
  const steps = 100;
  pdf.moveTo(circleX, circleY);
  for (let i = 0; i <= steps; i++) {
    const angle = (i * ratingAngle) / steps - Math.PI / 2;
    const x = circleX + radius * Math.cos(angle);
    const y = circleY + radius * Math.sin(angle);
    pdf.lineTo(x, y);
  }
  pdf.lineTo(circleX, circleY);
  pdf.fill();

  // Calculate text position to be centered
  pdf.setFontSize(24); // Increase font size for visibility
  pdf.setFont("helvetica", "italic"); // Set font style to italics
  pdf.setTextColor(0); // Set text color to black for visibility
  const ratingText = `${Math.round(overallRating)}%`;
  const textWidth = pdf.getStringUnitWidth(ratingText) * 24 / pdf.internal.scaleFactor; // Calculate width
  pdf.text(ratingText, circleX - textWidth / 2, circleY + 3); // Adjusted vertical position

  // List of appraisals
  const appraisalsY = circleY + 30; // Space below the circle
  pdf.setFontSize(18);
  pdf.setTextColor(60);
  pdf.setFont("helvetica", "normal"); // Non-italic for heading
  pdf.text('List of Appraisals:', 20, appraisalsY);

  pdf.setFontSize(12);
  const appraisals = user?.appraisals || [];
  const appraisalsText = appraisals.join(', '); // Join appraisals with commas

  // Define the width of the text box
  const textBoxWidth = 160;
  const lines = pdf.splitTextToSize(appraisalsText, textBoxWidth); // Wrap text within the defined width
  pdf.text(lines, 20, appraisalsY + 10); // Render wrapped text

  // Save the PDF with a file name
  pdf.save(`${user?.employeeId ?? 'unknown'}-report.pdf`);
}


const Ranking: React.FC<RankingProps> = ({ department }) => {
  const client = axiosClient();
  const [employees, setEmployees] = useState<User[]>([]);

  /** Run each time department changes */
  useEffect(() => {
    const loadData = async () => {
      const users: User[] = await fetchUsers(client);
      setEmployees(users.filter(user => user.dept === department));
    };

    loadData();
  }, [department]);

  return (
    <Card title='Department Ranking' className='stats-container'>
      <List
        pagination={{ position: 'bottom', align: 'center' }}
        itemLayout='horizontal'
        dataSource={employees}
        renderItem={(employee, index) => (
          <List.Item
            actions={[
              <a
                key='list-loadmore-view'
                onClick={() => downloadPDF(employee)}
              >
                Download Employee Report
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={employee.name}
              description={employee.jobTitle}
            />
            <div>{employee?.rating || 80}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Ranking;
