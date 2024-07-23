type User = {
  _id?: string,
  name: string;
  email: string;
  password: string;
  employeeID: string;
  role: RoleOptions;
  jobTitle: string;
  dept: DepartmentOptions;
  employmentStatus: EmploymentStatusOptions;
};

export type DepartmentOptions = "hr" | "others";

export type RoleOptions = "employee" | "head_of_department" | "business_owner";

export type EmploymentStatusOptions =
  | "full_time"
  | "part_time"
  | "intern"
  | "temp";

export default User;
