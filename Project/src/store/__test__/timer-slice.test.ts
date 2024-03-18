import { Timer, timerSlice } from "../slicies/timer-slice";

describe("TimerSlice", () => {
  it("should return initial state", () => {
    expect(timerSlice.reducer(undefined, { type: "" })).toEqual({
      isRunning: false,
      time: 0,
      totalTime: 0,
    });
  });
  it("should change isRunning after toggle", () => {
    const prevState = {
      isRunning: false,
      time: 0,
    } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.toggle())
    ).toMatchObject({
      isRunning: true,
      time: 0,
    });
  });
  it("should update time for running timer", () => {
    const prevState = { isRunning: true, time: 0 } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(50))
    ).toEqual({
      isRunning: true,
      time: 50,
    });
  });
  it("should not update time for running timer", () => {
    const prevState = { isRunning: false, time: 0 } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(50))
    ).toEqual({
      isRunning: false,
      time: 0,
    });
  });
  it("Should return correct value for 1 min 5 seconds", () => {
    const timerVal = timerSlice
      .getSelectors()
      .getTimerValue({ totalTime: 65 * 1000, time: 0 } as Timer);
    expect(timerVal.m).toBe(1);
    expect(timerVal.s).toBe("05");
  });
  it("Should return correct value for 0 seconds", () => {
    expect(
      timerSlice
        .getSelectors()
        .getTimerValue({ totalTime: 60 * 1000, time: 0 } as Timer).s
    ).toBe("00");
  });
});
