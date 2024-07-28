export const employees = [
  { id: '1', name: 'Alice', kpi: 95, appraisals: ['Outstanding', 'Exceeds Expectations'], department: "HQ" },
  { id: '2', name: 'Bob', kpi: 85, appraisals: ['Exceeds Expectations', 'Meets Expectations'], department: "HQ"  },
  { id: '3', name: 'Charlie', kpi: 80, appraisals: ['Meets Expectations', 'Needs Improvement'], department: "HQ"  },
  { id: '4', name: 'David', kpi: 75, appraisals: ['Needs Improvement', 'Below Expectations'], department: "Machining"  },
  { id: '5', name: 'Eve', kpi: 70, appraisals: ['Meets Expectations', 'Exceeds Expectations'], department: "HQ"  },
  { id: '6', name: 'Frank', kpi: 65, appraisals: ['Meets Expectations', 'Needs Improvement'], department: "Machining"  },
  { id: '7', name: 'Grace', kpi: 60, appraisals: ['Exceeds Expectations', 'Outstanding'], department: "Box Build"  },
  { id: '8', name: 'Hank', kpi: 55, appraisals: ['Needs Improvement', 'Below Expectations'], department: "HQ"  },
  { id: '9', name: 'Ivy', kpi: 50, appraisals: ['Meets Expectations', 'Exceeds Expectations'], department: "HQ"  },
  { id: '10', name: 'Jack', kpi: 45, appraisals: ['Needs Improvement', 'Below Expectations'], department: "HQ"  },
];

export const lms = {
  modules: [
    { name: "Elements of Software Construction", progress: 80, dueIn: 30 },
    { name: "Computer Software Engineering", progress: 60, dueIn: 7 },
    { name: "Machine Learning", progress: 100, dueIn: 12 },
    { name: "Foundations of Cybersecurity", progress: 75, dueIn: 21 },
    // { name: "Module 5 onwards will not display", progress: 15, dueIn: 40 },
  ],
  overallRating: 85,
};

export const HIGH_KPI_THRESHOLD = 80;
export const AVERAGE_KPI_THRESHOLD = 60;
