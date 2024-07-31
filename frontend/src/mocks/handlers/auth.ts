import { http, HttpResponse } from "msw";

const localhost = (path: string) => {
  return new URL(path, import.meta.env.VITE_API_URL).toString();
};

export const testUser = {
  appraisals: [],
  _id: "669f51f96b9bf41537a78187",
  name: "Test test",
  email: "test@gmail.com",
  employeeId: "1234567890",
  role: "business_owner",
  jobTitle: "admin",
  dept: "hr",
  employmentStatus: "full_time",
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
