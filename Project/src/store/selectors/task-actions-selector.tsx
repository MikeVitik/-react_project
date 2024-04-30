import { ActionCreator, createSelector } from "@reduxjs/toolkit";
import {
  completeTask,
  continueBreak,
  continueTask,
  nextOrContinueTask,
  pauseBreak,
  pauseTask,
  startBreak,
  startTask,
} from "../actions/task-actions";
import { CurrentTask } from "../slicies/current-task";
import { RootState } from "../store";

export const fakeTask = { id: -1, name: "", pomodoroCount: 0 };

const mapStateToPrimaryName: {
  [key in CurrentTask["state"]]: string;
} = {
  inited: "Старт",
  workInited: "Старт",
  workTimer: "Пауза",
  workPause: "Cтарт",
  break: "Старт",
  breakTimer: "Пауза",
  breakStop: "Продолжить",
  workStop: "Продолжить",
};
const mapStateToPrimaryAction: {
  [key in CurrentTask["state"]]: (() => ActionCreator<void>) | undefined;
} = {
  inited: undefined,
  workInited: startTask,
  workTimer: pauseTask,
  workPause: continueTask,
  break: continueBreak,
  breakTimer: pauseBreak,
  breakStop: continueBreak,
  workStop: pauseTask,
};
const mapStateToSecondaryName: {
  [key in CurrentTask["state"]]: string;
} = {
  inited: "Стоп",
  workInited: "Стоп",
  workTimer: "Стоп",
  workPause: "Стоп",
  break: "Стоп",
  breakTimer: "Продолжить",
  breakStop: "Продолжить",
  workStop: "Сделано",
};
const mapStateToSecondaryAction: {
  [key in CurrentTask["state"]]: (() => ActionCreator<void>) | undefined;
} = {
  inited: undefined,
  workInited: undefined,
  workTimer: startBreak,
  workPause: startBreak,
  break: nextOrContinueTask,
  breakTimer: nextOrContinueTask,
  breakStop: nextOrContinueTask,
  workStop: completeTask,
};

export const taskActions = createSelector(
  (state: RootState) => state.currentTask.state,
  (currentState) => {
    return {
      primaryActionName: mapStateToPrimaryName[currentState],
      primaryAction: mapStateToPrimaryAction[currentState],
      secondaryActionName: mapStateToSecondaryName[currentState],
      secondaryAction: mapStateToSecondaryAction[currentState],
    };
  }
);
