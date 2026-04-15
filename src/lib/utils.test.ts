import assert from "node:assert/strict";
import test from "node:test";

import { cn } from "./utils";

test("cn concatenates strings", () => {
  assert.equal(cn("btn", "btn-primary"), "btn btn-primary");
});

test("cn handles conditional classes", () => {
  assert.equal(cn("btn", true && "btn-active", false && "hidden"), "btn btn-active");
});

test("cn handles null and undefined", () => {
  assert.equal(cn("btn", null, undefined, "active"), "btn active");
});

test("cn handles object inputs", () => {
  assert.equal(cn("btn", { "btn-primary": true, "btn-large": false }), "btn btn-primary");
});

test("cn handles array inputs", () => {
  assert.equal(cn(["btn", "active"], "extra"), "btn active extra");
});

test("cn merges tailwind classes", () => {
  assert.equal(cn("p-2", "p-4"), "p-4");
  assert.equal(cn("bg-red-500", "bg-blue-500"), "bg-blue-500");
});
