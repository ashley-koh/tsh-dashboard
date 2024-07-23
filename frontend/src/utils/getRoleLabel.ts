const getRoleLabel = (
  role: "employee" | "head_of_department" | "business_owner"
) => {
  const roleMapping = {
    employee: "Employee",
    head_of_department: "Head of Department",
    business_owner: "Business Owner",
  };

  return roleMapping[role];
};

export default getRoleLabel;
