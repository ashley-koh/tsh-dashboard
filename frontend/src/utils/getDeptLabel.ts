import { DepartmentOptions } from "@/types/user.type";

const getDeptLabel = (dept: DepartmentOptions) => {
  const deptMapping = {
    hr: "Human Resources (HR)",
    others: "Others",
  };

  return deptMapping[dept];
};

export default getDeptLabel;
