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
