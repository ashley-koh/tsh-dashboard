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
  token: string;
  loginAction: LoginActionFunc;
  logout: LogoutFunc;
};

type ProviderProps = {
  children?: React.ReactNode;
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") || ""
  );

  const navigate = useNavigate();
  const client = axiosClient();

  const loginAction: LoginActionFunc = async (data) => {
    console.log("Data sent:", data);
    client
      .post("/login", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("Authorization");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
