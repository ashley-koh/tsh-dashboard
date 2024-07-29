import { describe, expect, test, beforeEach } from "vitest";
import { server } from "@/mocks/mockServer";
import {
  authenticatedUserHandlers,
  testUser,
  unauthenticatedUserHandlers,
} from "@/mocks/handlers/auth";
import AuthProvider from "../AuthContext";
import useAuth from "../useAuth";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const TestComponent = () => {
  const { authenticated, loading, loginAction, logout, user } = useAuth();

  const loginBody = { email: "test@gmail.com", password: "password" };

  return (
    <div>
      <div data-testid="authenticated">{JSON.stringify(authenticated)}</div>
      <div data-testid="loading">{JSON.stringify(loading)}</div>
      <div data-testid="user">{JSON.stringify(user)}</div>
      <button onClick={() => loginAction(loginBody)} aria-label="login">
        Login
      </button>
      <button onClick={logout} aria-label="logout">
        LogOut
      </button>
    </div>
  );
};

const TestHome = () => {
  return (
    <>
      <TestComponent />
      <div>This is the homepage</div>
    </>
  );
};

// beforeEach(() => {
//   server.use(...unauthenticatedUserHandlers);
// });

describe("AuthContext", () => {
  test("Should render initial values", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<TestComponent />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    expect(screen.getByTestId("user")).toHaveTextContent("null");
  });

  // test("Should login", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/login"]}>
  //       <AuthProvider>
  //         <Routes>
  //           <Route path="/login" element={<TestComponent />} />
  //           <Route path="/" element={<TestHome />} />
  //         </Routes>
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );

  //   const loginButton = screen.getByRole("button", { name: "login" });
  //   fireEvent.click(loginButton);

  //   expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
  //   expect(screen.getByTestId("loading")).toHaveTextContent("false");
  //   expect(screen.getByTestId("user")).toHaveTextContent(
  //     JSON.stringify(testUser)
  //   );
  //   expect(screen.getByText(/This is the homepage/i)).toBeInTheDocument();
  // });
});
