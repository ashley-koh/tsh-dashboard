import BaseResponse from "./response.type";

/** List of all department options as stored in backend. */
export enum DepartmentOptions {
  BOX_BUILD = "box_build",
  HR = "hr",
  HQ = "hq",
  MACHINING = "machining",
  OTHER = "others",
};

/** List of all department options as rendered in frontend. */
export const DepartmentLabels = {
  [DepartmentOptions.BOX_BUILD]: "Box Build",
  [DepartmentOptions.HR]: "Human Resources (HR)",
  [DepartmentOptions.HQ]: "HQ",
  [DepartmentOptions.MACHINING]: "Machining",
  [DepartmentOptions.OTHER]: "Others",
};

/** List of all employment status options as stored in backend. */
export enum EmploymentStatusOptions {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  INTERN = "intern",
  TEMP = "temp",
};

/** List of all employment status options as rendered in frontend. */
export const EmploymentStatusLabels = {
  [EmploymentStatusOptions.FULL_TIME]: "Full time",
  [EmploymentStatusOptions.PART_TIME]: "Part time",
  [EmploymentStatusOptions.INTERN]: "Intern",
  [EmploymentStatusOptions.TEMP]: "Temporary",
};

/** List of all role options as stored in backend. */
export enum RoleOptions {
  EMPLOYEE = "employee",
  HOD = "head_of_department",
  OWNER = "business_owner",
};

/** List of all role options as rendered in frontend. */
export const RoleLables = {
  [RoleOptions.EMPLOYEE]: "Employee",
  [RoleOptions.HOD]: "Head of Department (HOD)",
  [RoleOptions.OWNER]: "Business Owner",
};

export type BaseUser = {
  _id?: string;
  __v?: number;
  name: string;
  email: string;
  employeeId: string;
  mobileNo: string;
  role: RoleOptions;
  jobTitle: string;
  dept: DepartmentOptions;
  employmentStatus: EmploymentStatusOptions;
};

type User = BaseUser & {
  appraisals: string[]; /* leave as string to avoid circular dependency */
};

/** Backend response object */
export type ExtendUser = User & {
  __v: number;
  password: string;
};

export const defaultUser: User = {
  appraisals: [],
  name: 'name',
  email: 'email',
  employeeId: 'XXXXXXXXXX',
  mobileNo: '12345678',
  role: RoleOptions.EMPLOYEE,
  jobTitle: 'job',
  dept: DepartmentOptions.OTHER,
  employmentStatus: EmploymentStatusOptions.FULL_TIME,
};

export type UserResponse = BaseResponse & {
  data: ExtendUser;
};

export type UsersResponse = BaseResponse & {
  data: ExtendUser[];
};

export default User;
