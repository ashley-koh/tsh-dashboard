import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/services/axiosInstance";

type LoginData = {
  email: string;
  password: string;
};

type LoginActionFunc = {
  (data: LoginData): Promise<void>;
};

type LogoutFunc = {
  (): void;
};

type IAuthContext = {
  user: object | null;
  authenticated: boolean;
  loginAction: LoginActionFunc;
  logout: LogoutFunc;
};

type ProviderProps = {
  children?: React.ReactNode;
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticatied] = useState(false);

  const navigate = useNavigate();
  const client = axiosClient();

  const loginAction: LoginActionFunc = async (data) => {
    console.log("Data sent:", data);
    client
      .post("/login", data, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        setAuthenticatied(true);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error: ", error.response.data);
      });
  };

  const logout = () => {
    setUser(null);
    setAuthenticatied(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
