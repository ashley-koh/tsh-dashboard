import { RoleOptions } from "@/types/user.type";

const getRoleLabel = (role: RoleOptions) => {
  const roleMapping = {
    employee: "Employee",
    head_of_department: "Head of Department (HOD)",
    business_owner: "Business Owner",
  };

  return roleMapping[role];
};

export default getRoleLabel;
