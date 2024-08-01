import React from "react";
import { vi } from "vitest";
import { AuthContext } from "@/context/auth/AuthContext";
import { render, RenderOptions } from "@testing-library/react";
import IAuthContext from "@/types/auth.type";
import { testUser } from "../handlers/auth";

export const loginMockFn = vi.fn();
export const logoutMockFn = vi.fn();

const authenticatedRender = (
  ui: React.ReactNode,
  renderOptions?: RenderOptions
) => {
  const providerProps: { value: IAuthContext } = {
    value: {
      user: testUser,
      authenticated: true,
      loading: false,
      loginAction: loginMockFn,
      logout: logoutMockFn,
    },
  };

  return render(
    <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

export default authenticatedRender;
