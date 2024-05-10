import { PomodoroIcon } from "../../../components/icons/Pomodoro";

export const PomodoroCount = ({ pomodoroCount }: { pomodoroCount: number }) => {
  return (
    <div className="flex flex-col bg-light-gray">
      <div className="flex justify-center items-center text-light-text p-4">
        <PomodoroIcon />
        <span>&nbsp;x&nbsp;{pomodoroCount}</span>
      </div>
      <div className="bg-light-red">
        <span className="font-extrabold p-2">{pomodoroCount} помидора</span>
      </div>
    </div>
  );
};
