enum Role {
  Employee = "employee",
  HeadOfDepartment = "head_of_department",
  BusinessOwner = "business_owner",
  HR = "hr"
}

enum EmploymentStatus {
  FullTime = "full_time",
  PartTime = "part_time",
  Intern = "intern",
  Temp = "temp",
}

type User = {
  name: string;
  email: string;
  password: string;
  employeeID: string;
  role: Role;
  jobTitle: string;
  dept: string;
  employmentStatus: EmploymentStatus;
};

export default User;
export { Role, EmploymentStatus };
