import { generateStatistics } from "../statistic-generator";

describe("generateStatistic", () => {
  it("should generate statistic for 2 weeks", () => {
    const items = generateStatistics(new Date(2024, 1, 20));
    expect(items.filter(({ type }) => type === "pause").length).toBeGreaterThan(
      0
    );
    expect(items.filter(({ type }) => type === "work").length).toBeGreaterThan(
      0
    );
    expect(
      items.filter(
        ({ completedPomodoro, workTime }) => completedPomodoro === workTime
      ).length
    ).toBeGreaterThan(0);
    expect(items).toMatchSnapshot();
  });
});
