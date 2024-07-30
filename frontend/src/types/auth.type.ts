import User from "./user.type";

export type LoginData = {
  email: string;
  password: string;
};

export type LoginActionFunc = {
  (data: LoginData): Promise<void>;
};

export type LogoutFunc = {
  (): void;
};

export type ErrorResponse = {
  message: string;
};

type IAuthContext = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  loginAction: LoginActionFunc;
  logout: LogoutFunc;
};

export default IAuthContext;
