import { expect, describe, it } from "vitest";
import AccountDetails from "../components/AccountDetails";
import { render, screen } from "@testing-library/react";
import { testUser } from "@/mocks/handlers/auth";
import "@/mocks/utils/matchMedia.mock";
import {
  DepartmentLabels,
  EmploymentStatusLabels,
  RoleLables,
} from "@/types/user.type";
import ModuleProgress from "../components/ModuleProgress";
import OverallRating from "../components/OverallRating";
import InfoHome from "../InfoHome";
import authenticatedRender from "@/mocks/utils/authenticatedRender.mock";

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
    const modulesMock = [
      { name: "Elements of Software Construction", progress: 80, dueIn: 30 },
      { name: "Computer Software Engineering", progress: 60, dueIn: 7 },
      { name: "Machine Learning", progress: 100, dueIn: 12 },
      { name: "Foundations of Cybersecurity", progress: 75, dueIn: 21 },
      // { name: "Module 5 onwards will not display", progress: 15, dueIn: 40 },
    ];

    render(<ModuleProgress modules={modulesMock} />);

    expect(screen.getByText(/Module Progress Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Due in 7 days/i)).toBeInTheDocument();
    expect(screen.queryByText(/12/i)).not.toBeInTheDocument();
    expect(screen.getByText(modulesMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(modulesMock[1].name)).toBeInTheDocument();
    expect(screen.getByText(modulesMock[2].name)).toBeInTheDocument();
    expect(screen.getByText(modulesMock[3].name)).toBeInTheDocument();
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
