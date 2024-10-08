import { describe, expect, test, beforeEach } from "vitest";
import { testUser, unauthenticatedUserHandlers } from "@/mocks/handlers/auth";
import AuthProvider from "../AuthContext";
import useAuth from "../useAuth";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { server } from "@/mocks/mockServer";

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

describe("AuthContext", () => {
  beforeEach(() => {
    server.use(...unauthenticatedUserHandlers); // override authenticated routes
  });

  test.sequential("Should render initial values", () => {
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

  test.sequential("Should redirect on successful login attempt", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<TestComponent />} />
            <Route path="/home" element={<TestHome />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: "login" });
    await userEvent.click(loginButton);

    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    expect(screen.getByTestId("user")).toHaveTextContent(
      JSON.stringify(testUser)
    );
    expect(screen.getByText(/This is the homepage/i)).toBeInTheDocument();
  });

  test.sequential(
    "Should route to /login with unauthenticated user",
    async () => {
      const Home = () => <div>This is the homepage</div>;

      render(
        <MemoryRouter initialEntries={["/home"]}>
          <AuthProvider>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<TestComponent />} />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() =>
        expect(screen.getByTestId("authenticated")).toBeInTheDocument()
      );

      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
      expect(screen.getByTestId("loading")).toHaveTextContent("true");
      expect(screen.getByTestId("user")).toHaveTextContent("null");
      expect(screen.getByText(/Login/i)).toBeInTheDocument();
    }
  );
});
