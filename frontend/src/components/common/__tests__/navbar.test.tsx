import authenticatedRender, {
  logoutMockFn,
} from "@/mocks/utils/authenticatedRender.mock";
import { it, describe, expect } from "vitest";
import Navbar from "../Navbar";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";
import { testUser } from "@/mocks/handlers/auth";
import { RoleLables } from "@/types/user.type";
import logoImage from "@/assets/logo.png";
import userEvent from "@testing-library/user-event";

const TestDashboard = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const TestApp = () => {
  return (
    <MemoryRouter initialEntries={["/home"]}>
      <Routes>
        <Route path="/" element={<TestDashboard />}>
          <Route path="/home" element={<div>home page</div>} />
          <Route path="/statistics" element={<div>statistics page</div>} />
          <Route path="/dashboard" element={<div>appraisals page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

describe("Navbar", () => {
  it("includes necessary content", () => {
    authenticatedRender(<TestApp />);

    const logo = screen.getByAltText("Logo");

    expect(logo).toHaveAttribute("src", logoImage);
    expect(screen.getByText(testUser.name)).toBeInTheDocument();
    expect(screen.getByText(RoleLables[testUser.role])).toBeInTheDocument();
    expect(screen.getByText(testUser.employeeId)).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Department Statistics")).toBeInTheDocument();
    expect(screen.getByText("Appraisals")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("routes correctly", async () => {
    authenticatedRender(<TestApp />);
    const user = userEvent.setup();

    // verify default route
    expect(screen.getByText("home page")).toBeInTheDocument();

    // click on /statistics
    await user.click(screen.getByText("Department Statistics"));
    expect(screen.getByText("statistics page")).toBeInTheDocument();

    // click on /dashboard
    await user.click(screen.getByText("Appraisals"));
    expect(screen.getByText("appraisals page")).toBeInTheDocument();

    // click on /home
    await user.click(screen.getByText("Home"));
    expect(screen.getByText("home page")).toBeInTheDocument();
  });

  it("logs out correctly", async () => {
    authenticatedRender(<TestApp />);
    const user = userEvent.setup();

    // click Logout and trigger Popconfirm
    await user.click(screen.getByText("Logout"));

    // Popconfirm question and options
    expect(
      screen.getByText("Are you sure you want to log out?")
    ).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();

    // click yes
    await user.click(screen.getByText("Yes"));

    // ensure logout function of authContext is called
    expect(logoutMockFn).toHaveBeenCalledOnce();
  });
});
