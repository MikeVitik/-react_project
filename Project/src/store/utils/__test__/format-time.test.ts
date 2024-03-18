import { getTimeFractions } from "../format-time";

describe("getTimeFraction", () => {
  it("Should return rigth value for 1 min 5 sec", () => {
    expect(getTimeFractions(new Date(65 * 1000))).toEqual({ h: 0, m: 1, s: 5 });
  });
});
