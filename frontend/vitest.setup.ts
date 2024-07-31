import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { server } from "@/mocks/mockServer";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Start server before all tests
beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

// server.events.on("request:start", ({ request }) => {
//   console.log("Outgoing:", request.method, request.url);
// });
