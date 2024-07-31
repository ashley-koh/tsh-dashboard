import React from "react";
import { vi } from "vitest";
import { AuthContext } from "@/context/auth/AuthContext";
import { render, RenderOptions } from "@testing-library/react";
import IAuthContext from "@/types/auth.type";
import { testUser } from "../handlers/auth";

const authenticatedRender = (
  ui: React.ReactNode,
  renderOptions?: RenderOptions
) => {
  const providerProps: { value: IAuthContext } = {
    value: {
      user: testUser,
      authenticated: true,
      loading: false,
      loginAction: vi.fn(),
      logout: vi.fn(),
    },
  };

  return render(
    <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

export default authenticatedRender;
