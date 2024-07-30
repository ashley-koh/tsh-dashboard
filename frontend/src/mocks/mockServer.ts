import { setupServer } from "msw/node";
import { unauthenticatedUserHandlers } from "./handlers/auth";

export const server = setupServer(...unauthenticatedUserHandlers);
