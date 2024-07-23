type User = {
  name: string;
  email: string;
  password: string;
  employeeID: string;
  role: "employee" | "head_of_department" | "business_owner";
  jobTitle: string;
  dept: "hr" | "others";
  employmentStatus: "full_time" | "part_time" | "intern" | "temp";
};

export default User;
