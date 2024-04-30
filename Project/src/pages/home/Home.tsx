import { Description } from "./components/Description";
import { TaskActions } from "./components/TaskActions";
import { TaskDescription } from "./components/TaskDescription";
import { TaskHeader } from "./components/TaskHeader";
import { Tasks } from "./components/Tasks";
import { Timer } from "./components/Timer";

type Modes = "prepare" | "work" | "pause";

export function Home() {
  return (
    <>
      <div className="px-20 pt-24 grid grid-cols-home gap-4">
        <div>
          <Description></Description>
          <Tasks />
        </div>
        <div className="bg-light-gray">
          <TaskHeader />
          <Timer />
          <TaskDescription />
          <TaskActions />
        </div>
      </div>
    </>
  );
}
