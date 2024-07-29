import { http, HttpResponse } from "msw";

export const testUser = {
  appraisals: [],
  _id: "669f51f96b9bf41537a78187",
  name: "Test test",
  email: "test@gmail.com",
  password: "$2b$10$jkX9AcZdyXmt0H5wCjp3Oe0xu49KyFggr1O7CN/SmsKcKdLCd/Pbq",
  employeeId: "1234567890",
  role: "business_owner",
  jobTitle: "admin",
  dept: "hr",
  employmentStatus: "full_time",
  __v: 0,
};

export const responseObj = (message: "login" | "verify") => {
  return {
    data: testUser,
    message,
  };
};

export const unauthenticatedUserHandlers = [
  http.post("/login", () => {
    return HttpResponse.json(responseObj("login"));
  }),
  http.get("/verify", () => {
    return HttpResponse.error();
  }),
  http.post("/logout", () => {
    return HttpResponse.error();
  }),
];

export const authenticatedUserHandlers = [
  http.get("/verify", () => {
    return HttpResponse.json(responseObj("verify"));
  }),
  http.post("/login", () => {
    return HttpResponse.error();
  }),
];
