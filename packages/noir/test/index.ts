import { expect } from "chai";
import { getHelloWorld } from "../src/index";

describe("hello world", function () {
  it("should return hello world", async function () {
    expect(getHelloWorld()).to.equal("Hello World!");
  });
});
