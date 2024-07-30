import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import ErrorResponse, {
  LoginActionFunc,
  LoginData,
  LogoutFunc
} from "@/types/auth.type";
import IAuthContext from "@/types/auth.type";
import User, { UserResponse } from "@/types/user.type";
import axiosClient from "@/lib/axiosInstance";

type ProviderProps = {
  children?: React.ReactNode;
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const client = axiosClient();

  const verifyAction = () => {
    client
      .get<UserResponse>("/verify", { withCredentials: true })
      .then(response => {
        setUser(response.data.data);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        console.error(err);
        logout();
      });
  };

  useEffect(verifyAction, []);

  const loginAction: LoginActionFunc = async (data: LoginData) => {
    return client
      .post<UserResponse>("/login", data, { withCredentials: true })
      .then(response => {
        setUser(response.data.data);
        setAuthenticated(true);
        setLoading(false);
        navigate("/home");
      })
      .catch((err: AxiosError<ErrorResponse>) => console.error(err));
  };

  const logout: LogoutFunc = () => {
    client
      .post<UserResponse>("/logout", {}, { withCredentials: true })
      .then(_response => {
        setUser(null);
        setAuthenticated(false);
        setLoading(false);
      })
      .catch((err: AxiosError<ErrorResponse>) => console.error(err))
      .finally(() => navigate("/login"));
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, user, loading, loginAction, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
