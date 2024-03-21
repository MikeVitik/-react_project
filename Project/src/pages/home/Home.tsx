import { Description } from "./components/Description";
import { TaskActions } from "./components/TaskActions";
import { TaskDescription } from "./components/TaskDescription";
import { TaskHeader } from "./components/TaskHeader";
import { Tasks } from "./components/Tasks";
import { Timer } from "./components/Timer";

export function Home({
  mode = "pause",
  taskName = "Сверстать сайт",
  pomodoroCount = 1,
  taskNo = 1,
  currentTime = "25:00",
  primaryActionName = "Старт",
  secondaryActionName = "Стоп",
  secondaryActionDisabled = true,
  fullTime = 25,
}: Partial<{
  mode: "prepare" | "work" | "pause";
  taskName: string;
  pomodoroCount: number;
  taskNo: number;
  currentTime: string;
  primaryActionName: string;
  secondaryActionName: string;
  secondaryActionDisabled: boolean;
  fullTime: number;
}>) {
  return (
    <>
      <div className="px-20 pt-24 grid grid-cols-home gap-4">
        <div>
          <Description></Description>
          <Tasks />
        </div>
        <div className="bg-light-gray">
          <TaskHeader
            mode={mode}
            taskName={taskName}
            pomodoroCount={pomodoroCount}
          />
          <Timer />
          <TaskDescription />
          <TaskActions />
        </div>
      </div>
    </>
  );
}
