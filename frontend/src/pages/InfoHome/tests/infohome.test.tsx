import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import AccountDetails from "../components/AccountDetails";
import {
  DepartmentLabels,
  EmploymentStatusLabels,
  RoleLables,
} from "@/types/user.type";
import InfoHome from "../InfoHome";
import ModuleProgress from "../components/ModuleProgress";
import OverallRating from "../components/OverallRating";
import authenticatedRender from "@/mocks/utils/authenticatedRender.mock";
import { lms } from "@/data/mockData";
import { testUser } from "@/mocks/handlers/auth";

describe("InfoHome Page", () => {
  it("AccountDetails", () => {
    render(<AccountDetails user={testUser} />);

    expect(screen.getByText(/Account Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Role:/i)).toBeInTheDocument();
    expect(screen.getByText(/Department:/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/Employment:/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(testUser.name)).toBeInTheDocument();
    expect(screen.getByText(RoleLables[testUser.role])).toBeInTheDocument();
    expect(
      screen.getByText(DepartmentLabels[testUser.dept])
    ).toBeInTheDocument();
    expect(screen.getByText(testUser.employeeId)).toBeInTheDocument();
    expect(screen.getByText(testUser.mobileNo)).toBeInTheDocument();
    expect(
      screen.getByText(EmploymentStatusLabels[testUser.employmentStatus])
    ).toBeInTheDocument();
    expect(screen.getByText(testUser.email)).toBeInTheDocument();
  });

  it("ModuleProgress", () => {
    render(<ModuleProgress modules={lms.modules} />);

    expect(screen.getByText(/Module Progress Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Due in 7 days/i)).toBeInTheDocument();
    expect(screen.queryByText(/12/i)).not.toBeInTheDocument();
    for (const module of lms.modules) {
      expect(screen.getByText(module.name)).toBeInTheDocument();
    }
  });

  it("OverallRating", () => {
    const rating = 90;
    render(<OverallRating rating={rating} />);

    expect(screen.getByText(/Overall Rating/i)).toBeInTheDocument();
    expect(screen.getByText(rating.toString() + "%")).toBeInTheDocument();
  });

  it("InfoHome", () => {
    authenticatedRender(<InfoHome />);

    expect(screen.getByText(/Account Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Module Progress Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Overall Rating/i)).toBeInTheDocument();
  });
});
