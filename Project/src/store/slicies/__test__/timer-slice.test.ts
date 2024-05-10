import { Timer, timerSlice } from "../timer-slice";

describe("TimerSlice", () => {
  it("should return initial state", () => {
    expect(timerSlice.reducer(undefined, { type: "" })).toEqual({
      state: "inited",
      time: 0,
      currentTime: 0,
      totalTime: 0,
    });
  });
  it("should start", () => {
    const prevState = {
      state: "created",
      time: 0,
      totalTime: 1,
    } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.start())
    ).toMatchObject({
      state: "running",
      time: 0,
      totalTime: 1,
    });
  });
  it("should update time for running timer", () => {
    const prevState = { state: "running", time: 0, currentTime: 0 } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(50))
    ).toEqual({
      state: "running",
      currentTime: 50,
      time: 50,
    });
  });
  it("should reset currentTime then pause", () => {
    let prevState = { state: "running", time: 50, currentTime: 50 } as Timer;
    prevState = timerSlice.reducer(prevState, timerSlice.actions.stop());
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(30))
    ).toEqual({
      state: "pause",
      currentTime: 30,
      time: 50,
    });
  });
  it("should end if time exeed", () => {
    const prevState = { state: "running", time: 0, totalTime: 50 } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(50)).state
    ).toEqual("end");
  });
  it("should not update time for running timer", () => {
    const prevState = { state: "created", time: 0, currentTime: 0 } as Timer;
    expect(
      timerSlice.reducer(prevState, timerSlice.actions.updateTime(50))
    ).toEqual({
      state: "created",
      currentTime: 0,
      time: 0,
    });
  });
  it("should return correct value for 1 min 5 seconds", () => {
    const timerVal = timerSlice
      .getSelectors()
      .getTimerValue({ totalTime: 65 * 1000, time: 0 } as Timer);
    expect(timerVal.m).toBe(1);
    expect(timerVal.s).toBe("05");
  });
  it("should return correct value for 0 seconds", () => {
    expect(
      timerSlice
        .getSelectors()
        .getTimerValue({ totalTime: 60 * 1000, time: 0 } as Timer).s
    ).toBe("00");
  });
  it("should return correct value for -10 seconds", () => {
    expect(
      timerSlice
        .getSelectors()
        .getTimerValue({ totalTime: 60, time: 70 } as Timer).s
    ).toBe("00");
  });
});
