import { normalizeDay } from "../normalize-day";

it("normilaze-day", () => {
  expect([...Array(6)].map((_, day) => normalizeDay(day))).toMatchSnapshot();
});
