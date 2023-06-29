import { expect } from "chai";
import { getCircuits } from "../scripts/export_circuits_src";

// TODO: this file should actually test the circuits

describe("circuit source-code getter", function () {
  it("should return circuit", async function () {
    const circuits = await getCircuits();
    expect(Object.keys(circuits).length).to.equal(1);
    expect(circuits["main.nr"]).to.be.a("string");
  });
});
