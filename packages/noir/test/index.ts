import { expect } from "chai";
import { setup, getCircuits } from "../src/index";

describe("circuit source-code getter", function () {
  before(async function () {
    await setup();
  });

  it("should return circuit", async function () {
    const circuits = await getCircuits();
    expect(Object.keys(circuits).length).to.equal(1);
    expect(circuits["main.nr"]).to.be.a("string");
  });
});
