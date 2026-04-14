import { expect, test } from "bun:test";
import { cn } from "./utils";

test("cn concatenates strings", () => {
  expect(cn("btn", "btn-primary")).toBe("btn btn-primary");
});

test("cn handles conditional classes", () => {
  expect(cn("btn", true && "btn-active", false && "hidden")).toBe("btn btn-active");
});

test("cn handles null and undefined", () => {
  expect(cn("btn", null, undefined, "active")).toBe("btn active");
});

test("cn handles object inputs", () => {
  expect(cn("btn", { "btn-primary": true, "btn-large": false })).toBe("btn btn-primary");
});

test("cn handles array inputs", () => {
  expect(cn(["btn", "active"], "extra")).toBe("btn active extra");
});

test("cn merges tailwind classes", () => {
  // Test that last utility wins (e.g., p-2 and p-4)
  expect(cn("p-2", "p-4")).toBe("p-4");
  expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
});
