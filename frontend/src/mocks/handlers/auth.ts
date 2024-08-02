import User, {
  DepartmentOptions,
  EmploymentStatusOptions,
  RoleOptions,
} from "@/types/user.type";
import { http, HttpResponse } from "msw";

const localhost = (path: string) => {
  return new URL(path, import.meta.env.VITE_API_URL).toString();
};

export const testUser: User = {
  appraisals: [],
  _id: "669f51f96b9bf41537a78187",
  name: "Test test",
  email: "test@gmail.com",
  employeeId: "1234567890",
  role: RoleOptions.OWNER,
  jobTitle: "admin",
  dept: DepartmentOptions.HR,
  mobileNo: "987654321",
  employmentStatus: EmploymentStatusOptions.FULL_TIME,
};

export const responseObj = (message: "login" | "verify") => {
  return {
    data: testUser,
    message,
  };
};

export const unauthenticatedUserHandlers = [
  http.post(localhost("/login"), () => {
    return HttpResponse.json(responseObj("login"));
  }),
  http.get(localhost("/verify"), () => {
    return HttpResponse.error();
  }),
  http.post(localhost("/logout"), () => {
    return HttpResponse.error();
  }),
];

export const authenticatedUserHandlers = [
  http.get(localhost("/verify"), () => {
    return HttpResponse.json(responseObj("verify"));
  }),
  http.post(localhost("/login"), () => {
    return HttpResponse.error();
  }),
];
