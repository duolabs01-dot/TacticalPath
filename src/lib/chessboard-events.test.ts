import assert from "node:assert/strict";
import test from "node:test";

import { getChessboardSquare } from "./chessboard-events";

test("getChessboardSquare returns a raw square string unchanged", () => {
  assert.equal(getChessboardSquare("e4"), "e4");
});

test("getChessboardSquare reads the square from a chessboard callback payload", () => {
  assert.equal(getChessboardSquare({ square: "c6" }), "c6");
});

test("getChessboardSquare returns null for missing inputs", () => {
  assert.equal(getChessboardSquare(undefined), null);
  assert.equal(getChessboardSquare({ square: null }), null);
});
