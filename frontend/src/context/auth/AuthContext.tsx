import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/lib/axiosInstance";

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
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const client = axiosClient();

  const verifyAction = async () => {
    client
      .get("/verify", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setAuthenticatied(true);
        setLoading(false);
      })
      .catch(() => {
        logout();
      });
  };

  useEffect(() => {
    verifyAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginAction: LoginActionFunc = async (data) => {
    return client
      .post("/login", data, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        setAuthenticatied(true);
        setLoading(false);
        navigate("/");
      });
  };

  const logout = async () => {
    return client.post("/logout", { withCredentials: true }).then(() => {
      setUser(null);
      setAuthenticatied(false);
      setLoading(false);
      navigate("/login");
    });
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
