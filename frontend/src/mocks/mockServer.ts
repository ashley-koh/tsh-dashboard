import { setupServer } from "msw/node";
import { authenticatedUserHandlers } from "./handlers/auth";

export const server = setupServer(...authenticatedUserHandlers);
